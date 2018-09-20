const path = require('path')
const fibTypify = require('fib-typify')

const baseDir = path.resolve(__dirname, '../src')
const distDir = path.resolve(__dirname, '../lib/cjs')

fibTypify.compileDirectoryTo(
    baseDir,
    distDir,
    {
        compilerOptions: {
            target: 'es5',
            module: 'commonjs'
        }
    }
)