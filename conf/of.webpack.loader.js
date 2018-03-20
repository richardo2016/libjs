module.exports = {
  include: [/rayjs\/src/],
  use: [
    {
      loader: 'babel-loader',
      options: {
        babelrc: false,
        "presets": [
          [
            "env", {
              "targets": {
                "chrome": 50,
                "browsers": [
                  "safari >= 8"
                ]
              },
              "useBuiltIns": "usage",
              "modules": false,
              "exclude": [
                "transform-async-to-generator"
              ],
              "debug": true
            }
          ],
          "stage-3"
        ],
        "plugins": [
          "fast-async", ["transform-runtime", {
            "helpers": false,
            "polyfill": false,
            "regenerator": true,
            "moduleName": "babel-runtime"
          }],
          "transform-object-rest-spread"
        ]
      }
    }
  ]
}
