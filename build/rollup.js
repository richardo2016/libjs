const util = require('util');
const path = require('path');

const { default: rollup, plugins, getCustomizedVBox } = require('fib-rollup')
const vbox = getCustomizedVBox({
    prettier: {
        format: (content) => content
    }
})
const { registerTsCompiler } = require('fib-typify')

const commonjs = require('rollup-plugin-commonjs');
const typescript = vbox.require('rollup-plugin-typescript', __dirname);
const json = require('rollup-plugin-json');
const replace = require('rollup-plugin-replace');
const alias = require('rollup-plugin-alias');
const buble = require('rollup-plugin-buble');

const tsCompilerOptions = require('../tsconfig.json').compilerOptions;

function _resolve (modulePath = '') {
    return path.resolve(__dirname, '../', modulePath)
}

const extensions = ['.ts', '.js', '.json']

const rollupGlobals = {}

async function rollupCompiler (srcpath, targetpath, otherCfg) {

    registerTsCompiler(vbox)

    const bundle = await rollup.rollup({
        input: srcpath,
        external: []
          .concat(Object.keys(rollupGlobals))
          .concat(util.buildInfo().modules),
        plugins: [
            replace({
                __DEV__: !!process.env.IMT_DEBUG,
                'process.env.NODE_ENV': process.env.NODE_ENV
            }),
            alias({
                resolve: extensions
            }),
            json(),
            plugins['rollup-plugin-fibjs-resolve']({
                extensions,
                jsnext: true,
                browser: true
            }),
            buble(),
            // typescript({
            //   ...tsCompilerOptions,
            //   typescript: require('typescript'),
            //   tslib: require('tslib')
            // }),
            commonjs(),
            plugins['rollup-plugin-uglify-js']()
        ],
        ...otherCfg
    }).catch(e => console.error(e.stack))

    console.log(`========generating: ${srcpath} --> ${targetpath} ==========`);

    await bundle.write({
        file: targetpath,
        format: 'umd',
        name: 'RayJS'
    }).catch(e => {
        console.error('[e] write', e.stack)
    });

    console.log(`========generated: ${srcpath} --> ${targetpath} ==========`);
}

await rollupCompiler(
    _resolve('./lib/cjs/index.js'),
    _resolve('./lib/umd/index.js')
)
