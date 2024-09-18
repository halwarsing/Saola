/* eslint-env node */

const { configure } = require('quasar/wrappers')

module.exports = configure(function (/* ctx */) {
  return {
    boot: [
      'firebase',
      'axios'
    ],
    css: [
      'app.scss'
    ],
    extras: [
      'fontawesome-v6',
      'roboto-font'
    ],
    build: {
      target: {
        browser: ['es2019', 'edge88', 'firefox78', 'chrome87', 'safari13.1'],
        node: 'node20'
      },
      vueRouterMode: 'history',
      vitePlugins: [
        ['vite-plugin-checker', { server: false }]
      ]
    },
    devServer: {
      open: true
    },
    framework: {
      config: {
        dark: true
      },
      iconSet: 'fontawesome-v6',
      lang: 'ru',
      plugins: [
        'Notify'
      ]
    },
    animations: 'all',

    ssr: {
      pwa: false,
      prodPort: 3000,
      middlewares: [
        'render'
      ]
    },
    pwa: {
      workboxMode: 'injectManifest',
      injectPwaMetaTags: true,
      swFilename: 'sw.js',
      manifestFilename: 'manifest.json',
      useCredentialsForManifestTag: false
    },
    cordova: {},
    capacitor: {
      hideSplashscreen: true
    },
    electron: {
      inspectPort: 5858,
      bundler: 'packager',
      packager: {},
      builder: {
        appId: 'saola'
      }
    },
    bex: {
      contentScripts: [
        'my-content-script'
      ]
    }
  }
})
