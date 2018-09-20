const util = require('util');
const path = require('path');
const jstStylus = require('jstransformer-stylus')
const fpug = require('fib-pug')

const { default: rollup, fibjsResolve, getCustomizedVBox } = require('fib-rollup')

function _resolve (modulePath = '') {
    return path.resolve(__dirname, '../../', modulePath)
}

const extensions = ['.ts', '.js', '.json']

const rollupGlobals = {
}

const rollupCompiler = async function (vbox, input, otherCfg) {
    const commonjs = require('rollup-plugin-commonjs');
    const typescript = require('rollup-plugin-typescript');
    const json = require('rollup-plugin-json');
    const replace = require('rollup-plugin-replace');
    const alias = require('rollup-plugin-alias');

    const tsCompiler = require('typescript')

    return await rollup.rollup({
        input: input,
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
            vuePlugin({
                css: true,
                style: {
                    trim: true,
                    preprocessOptions: {
                        stylus: {
                            paths: [
                                _resolve('')
                            ]
                        }
                    }
                }
            }),
            json(),
            pugjs(),
            fibjsResolve({
                vbox: vbox,
                extensions: extensions,
                jsnext: true,
                browser: true
            }),
            commonjs()
        ],
        ...otherCfg
    }).catch(e => console.error(e.stack))
}

exports.getFebox = (sb) => {
    if (!sb) {
        sb = getCustomizedVBox({
            prettier: {
                format: (content) => content
            }
        })
    }

    const stylusOptions = {}
    const pugOptions = {}
    
    const moduleTimeouts = {}

    function makeCacheTimeoutForModuleId (moduleId, options) {
        const { suffix = '.ts', _timeout = 1000, noclear = false } = options || {}
        if (moduleTimeouts[moduleId]) {
            clearTimeout(moduleTimeouts[moduleId])
        }

        if (process.env.IMT_DEBUG && !noclear) {
            moduleTimeouts[moduleId] = setTimeout(() => {
                console.log(`清理了 ${suffix}`, moduleId)
                sb.remove(moduleId)
                moduleTimeouts[moduleId] = null
            }, _timeout)
        }
    }

    sb.setModuleCompiler('.ts', (buf, requireInfo) => {
        makeCacheTimeoutForModuleId(requireInfo.filename, { suffix: '.ts', _timeout: 3000 })

        const rollupBundler = util.sync(rollupCompiler, true)(sb, requireInfo.filename)

        const { code } = util.sync(rollupBundler.generate, true)({
            format: 'umd',
            name: requireInfo.filename.replace('/', '_'),
            globals: rollupGlobals
        })

        return `module.exports = ${JSON.stringify(code)}`
    })

    sb.setModuleCompiler('.styl', (buf, requireInfo) => {
        makeCacheTimeoutForModuleId(requireInfo.filename, { suffix: '.styl', _timeout: 1000 })

        let stylusRaw = buf + ''

        const renderer = (locals = {}) => {
            if (!stylusRaw) {
                return ''
            }
            return jstStylus.render(stylusRaw, stylusOptions, locals)
        }
        const locals = {}

        const resultCSS = renderer(locals)

        return `module.exports = ${JSON.stringify(resultCSS)}`
    })

    sb.setModuleCompiler('.pug', (buf, requireInfo) => {
        makeCacheTimeoutForModuleId(requireInfo.filename, { suffix: '.pug', _timeout: 1000 })

        let pugRaw = buf + ''

        const renderer = (locals = {}) => {
            if (!pugRaw) {
                return ''
            }
            return fpug.compile(pugRaw, pugOptions)(locals)
        }
        const locals = {}

        const resultHtml = renderer(locals)

        return `module.exports = ${JSON.stringify(resultHtml)}`
    })

    return sb
}