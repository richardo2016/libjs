const util = require('util');
const path = require('path');

const commonjs = require('rollup-plugin-commonjs');
const typescript = require('rollup-plugin-typescript');
const json = require('rollup-plugin-json');
const replace = require('rollup-plugin-replace');
const alias = require('rollup-plugin-alias');
const tsCompiler = require('typescript')

const { default: rollup, fibjsResolve, getCustomizedVBox } = require('fib-rollup')
const { registerTsCompiler } = require('fib-typify')

function _resolve (modulePath = '') {
    return path.resolve(__dirname, '../', modulePath)
}

const extensions = ['.ts', '.js', '.json']

const rollupGlobals = {
}

async function rollupCompiler (srcpath, targetpath, otherCfg) {
    const vbox = getCustomizedVBox({
        prettier: {
            format: (content) => content
        }
    })

    registerTsCompiler(vbox)
    
    const bundle = await rollup.rollup({
        input: srcpath,
        external: [
        ]
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
            typescript({
                typescript: tsCompiler
            }),
            json(),
            fibjsResolve({
                // vbox,
                extensions,
                jsnext: true,
                browser: true
            }),
            commonjs()
        ],
        ...otherCfg
    }).catch(e => console.error(e.stack))


    console.log(`========generating: ${srcpath} --> ${targetpath} ==========`);

    await bundle.write({
        file: targetpath,
        // 'iife'
        // format: 'umd', // ,
        format: 'umd',
        name: 'RayJS',
        // globals: {
        // }
    }).catch(e => {
        console.error('[e] write', e.stack)
    });

    console.log(`========generated: ${srcpath} --> ${targetpath} ==========`);
}

await rollupCompiler(
    _resolve('./src/index.ts'),
    _resolve('./lib/umd/index.js')
)