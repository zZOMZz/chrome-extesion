import { defineManifest } from '@crxjs/vite-plugin'

export default defineManifest(async () => {
  return {
    manifest_version: 3,
    name: 'Extension Test',
    description: '__MSG_appDesc__',
    // default_locale: 'en',
    version: '1.45.7',
    icons: {
      '16': 'src/assets/react.svg',
      '32': 'src/assets/react.svg',
      '48': 'src/assets/react.svg',
      '128': 'src/assets/react.svg',
    },
    host_permissions: ["<all_urls>"],
    background: {
      service_worker: 'src/background/index.js',
      type: 'module',
    },
    action: {},
    permissions: ['activeTab', 'storage'],
    content_scripts: [
      {
        matches: ['<all_urls>'],
        js: ['src/content-script/content.js'],
      },
    ],
    // commands: {
    //   'open-app': {
    //     suggested_key: {
    //       default: 'Alt+J',
    //       windows: 'Alt+J',
    //       linux: 'Alt+J',
    //       mac: 'Command+J',
    //     },
    //     description: 'Open ChatHub app',
    //   },
    // },
    web_accessible_resources: [
      {
        resources: [
          "assets/*",
          "src/assets/*",
        ],
        matches: [
          "<all_urls>"
        ],
        use_dynamic_url: false
      }
    ],
  }
})
