// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { crx } from "@crxjs/vite-plugin";

// manifest.config.ts
import { defineManifest } from "@crxjs/vite-plugin";
var manifest_config_default = defineManifest(async () => {
  return {
    manifest_version: 3,
    name: "Extension Test",
    description: "__MSG_appDesc__",
    version: "1.45.7",
    icons: {
      "16": "src/assets/react.svg",
      "32": "src/assets/react.svg",
      "48": "src/assets/react.svg",
      "128": "src/assets/react.svg"
    },
    host_permissions: ["<all_urls>"],
    background: {
      service_worker: "src/background/index.js",
      type: "module"
    },
    action: {},
    permissions: ["activeTab", "storage"],
    content_scripts: [
      {
        matches: ["<all_urls>"],
        js: ["src/content-script/content.js"]
      }
    ],
    web_accessible_resources: [
      {
        resources: [
          "assets/*",
          "src/assets/*"
        ],
        matches: [
          "<all_urls>"
        ],
        use_dynamic_url: false
      }
    ]
  };
});

// vite.config.ts
var viteManifestHackIssue846 = {
  name: "manifestHackIssue846",
  renderCrxManifest(_manifest, bundle) {
    bundle["manifest.json"] = bundle[".vite/manifest.json"];
    bundle["manifest.json"].fileName = "manifest.json";
    delete bundle[".vite/manifest.json"];
  }
};
var vite_config_default = defineConfig({
  plugins: [react(), viteManifestHackIssue846, crx({ manifest: manifest_config_default })],
  build: {
    rollupOptions: {
      input: "src/main.tsx",
      output: {
        dir: "chrome-extension/dist",
        format: "cjs",
        entryFileNames: "assets/[name].js",
        chunkFileNames: "assets/[name]",
        assetFileNames: "assets/[name].[ext]"
      }
    }
  },
  define: {
    "process.env": {}
  },
  resolve: {
    alias: {
      "@": "src/"
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAibWFuaWZlc3QuY29uZmlnLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0J1xuaW1wb3J0IHsgY3J4IH0gZnJvbSAnQGNyeGpzL3ZpdGUtcGx1Z2luJ1xuaW1wb3J0IG1hbmlmZXN0IGZyb20gJy4vbWFuaWZlc3QuY29uZmlnLnRzJ1xuaW1wb3J0IHR5cGUgeyBQbHVnaW4gfSBmcm9tICd2aXRlJ1xuXG5jb25zdCB2aXRlTWFuaWZlc3RIYWNrSXNzdWU4NDY6IFBsdWdpbiAmIHsgcmVuZGVyQ3J4TWFuaWZlc3Q6IChtYW5pZmVzdDogYW55LCBidW5kbGU6IGFueSkgPT4gdm9pZCB9ID0ge1xuICAvLyBXb3JrYXJvdW5kIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL2NyeGpzL2Nocm9tZS1leHRlbnNpb24tdG9vbHMvaXNzdWVzLzg0NiNpc3N1ZWNvbW1lbnQtMTg2MTg4MDkxOS5cbiAgbmFtZTogJ21hbmlmZXN0SGFja0lzc3VlODQ2JyxcbiAgcmVuZGVyQ3J4TWFuaWZlc3QoX21hbmlmZXN0LCBidW5kbGUpIHtcbiAgICBidW5kbGVbJ21hbmlmZXN0Lmpzb24nXSA9IGJ1bmRsZVsnLnZpdGUvbWFuaWZlc3QuanNvbiddXG4gICAgYnVuZGxlWydtYW5pZmVzdC5qc29uJ10uZmlsZU5hbWUgPSAnbWFuaWZlc3QuanNvbidcbiAgICBkZWxldGUgYnVuZGxlWycudml0ZS9tYW5pZmVzdC5qc29uJ11cbiAgfSxcbn1cblxuXG4vLyBodHRwczovL3ZpdGUuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtyZWFjdCgpLCB2aXRlTWFuaWZlc3RIYWNrSXNzdWU4NDYsIGNyeCh7IG1hbmlmZXN0IH0pXSxcbiAgYnVpbGQ6IHtcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBpbnB1dDogJ3NyYy9tYWluLnRzeCcsIC8vIFx1NjMwN1x1NUI5QVx1NTE2NVx1NTNFM1x1NjU4N1x1NEVGNlxuICAgICAgb3V0cHV0OiB7XG4gICAgICAgIC8vIGVudHJ5RmlsZU5hbWVzOiBcImRyYXdlci1hcHAuanNcIiwgLy8gXHU4MUVBXHU1QjlBXHU0RTQ5XHU4RjkzXHU1MUZBXHU2NTg3XHU0RUY2XHU1NDBEXG4gICAgICAgIGRpcjogXCJjaHJvbWUtZXh0ZW5zaW9uL2Rpc3RcIiwgLy8gXHU4RjkzXHU1MUZBXHU3NkVFXHU1RjU1XG4gICAgICAgIGZvcm1hdDogXCJjanNcIiwgLy8gXHU4RjkzXHU1MUZBXHU2ODNDXHU1RjBGXG4gICAgICAgIC8vIG5hbWU6IFwiRHJhd2VyQXBwXCIsIC8vIFx1NUJGQ1x1NTFGQVx1NzY4NFx1NTE2OFx1NUM0MFx1NTNEOFx1OTFDRlx1NTQwRFx1RkYwOFx1NTk4Mlx1Njc5Q1x1OTcwMFx1ODk4MVx1RkYwOSxcbiAgICAgICAgZW50cnlGaWxlTmFtZXM6IFwiYXNzZXRzL1tuYW1lXS5qc1wiLFxuICAgICAgICBjaHVua0ZpbGVOYW1lczogXCJhc3NldHMvW25hbWVdXCIsXG4gICAgICAgIGFzc2V0RmlsZU5hbWVzOiBcImFzc2V0cy9bbmFtZV0uW2V4dF1cIixcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbiAgZGVmaW5lOiB7XG4gICAgJ3Byb2Nlc3MuZW52Jzoge30gLy8gXHU2QTIxXHU2MkRGXHU3QTdBXHU3Njg0IHByb2Nlc3MuZW52IFx1NUJGOVx1OEM2MVxuICB9LFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgICdAJzogXCJzcmMvXCIgLy8gXHU4QkJFXHU3RjZFIGBAYCBcdTYzMDdcdTU0MTEgYHNyY2AgXHU3NkVFXHU1RjU1XG4gICAgfVxuICB9XG59KVxuIiwgImltcG9ydCB7IGRlZmluZU1hbmlmZXN0IH0gZnJvbSAnQGNyeGpzL3ZpdGUtcGx1Z2luJ1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVNYW5pZmVzdChhc3luYyAoKSA9PiB7XG4gIHJldHVybiB7XG4gICAgbWFuaWZlc3RfdmVyc2lvbjogMyxcbiAgICBuYW1lOiAnRXh0ZW5zaW9uIFRlc3QnLFxuICAgIGRlc2NyaXB0aW9uOiAnX19NU0dfYXBwRGVzY19fJyxcbiAgICAvLyBkZWZhdWx0X2xvY2FsZTogJ2VuJyxcbiAgICB2ZXJzaW9uOiAnMS40NS43JyxcbiAgICBpY29uczoge1xuICAgICAgJzE2JzogJ3NyYy9hc3NldHMvcmVhY3Quc3ZnJyxcbiAgICAgICczMic6ICdzcmMvYXNzZXRzL3JlYWN0LnN2ZycsXG4gICAgICAnNDgnOiAnc3JjL2Fzc2V0cy9yZWFjdC5zdmcnLFxuICAgICAgJzEyOCc6ICdzcmMvYXNzZXRzL3JlYWN0LnN2ZycsXG4gICAgfSxcbiAgICBob3N0X3Blcm1pc3Npb25zOiBbXCI8YWxsX3VybHM+XCJdLFxuICAgIGJhY2tncm91bmQ6IHtcbiAgICAgIHNlcnZpY2Vfd29ya2VyOiAnc3JjL2JhY2tncm91bmQvaW5kZXguanMnLFxuICAgICAgdHlwZTogJ21vZHVsZScsXG4gICAgfSxcbiAgICBhY3Rpb246IHt9LFxuICAgIHBlcm1pc3Npb25zOiBbJ2FjdGl2ZVRhYicsICdzdG9yYWdlJ10sXG4gICAgY29udGVudF9zY3JpcHRzOiBbXG4gICAgICB7XG4gICAgICAgIG1hdGNoZXM6IFsnPGFsbF91cmxzPiddLFxuICAgICAgICBqczogWydzcmMvY29udGVudC1zY3JpcHQvY29udGVudC5qcyddLFxuICAgICAgfSxcbiAgICBdLFxuICAgIC8vIGNvbW1hbmRzOiB7XG4gICAgLy8gICAnb3Blbi1hcHAnOiB7XG4gICAgLy8gICAgIHN1Z2dlc3RlZF9rZXk6IHtcbiAgICAvLyAgICAgICBkZWZhdWx0OiAnQWx0K0onLFxuICAgIC8vICAgICAgIHdpbmRvd3M6ICdBbHQrSicsXG4gICAgLy8gICAgICAgbGludXg6ICdBbHQrSicsXG4gICAgLy8gICAgICAgbWFjOiAnQ29tbWFuZCtKJyxcbiAgICAvLyAgICAgfSxcbiAgICAvLyAgICAgZGVzY3JpcHRpb246ICdPcGVuIENoYXRIdWIgYXBwJyxcbiAgICAvLyAgIH0sXG4gICAgLy8gfSxcbiAgICB3ZWJfYWNjZXNzaWJsZV9yZXNvdXJjZXM6IFtcbiAgICAgIHtcbiAgICAgICAgcmVzb3VyY2VzOiBbXG4gICAgICAgICAgXCJhc3NldHMvKlwiLFxuICAgICAgICAgIFwic3JjL2Fzc2V0cy8qXCIsXG4gICAgICAgIF0sXG4gICAgICAgIG1hdGNoZXM6IFtcbiAgICAgICAgICBcIjxhbGxfdXJscz5cIlxuICAgICAgICBdLFxuICAgICAgICB1c2VfZHluYW1pY191cmw6IGZhbHNlXG4gICAgICB9XG4gICAgXSxcbiAgfVxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBQSxTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFdBQVc7QUFDbEIsU0FBUyxXQUFXOzs7QUNGcEIsU0FBUyxzQkFBc0I7QUFFL0IsSUFBTywwQkFBUSxlQUFlLFlBQVk7QUFDeEMsU0FBTztBQUFBLElBQ0wsa0JBQWtCO0FBQUEsSUFDbEIsTUFBTTtBQUFBLElBQ04sYUFBYTtBQUFBLElBRWIsU0FBUztBQUFBLElBQ1QsT0FBTztBQUFBLE1BQ0wsTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLElBQ1Q7QUFBQSxJQUNBLGtCQUFrQixDQUFDLFlBQVk7QUFBQSxJQUMvQixZQUFZO0FBQUEsTUFDVixnQkFBZ0I7QUFBQSxNQUNoQixNQUFNO0FBQUEsSUFDUjtBQUFBLElBQ0EsUUFBUSxDQUFDO0FBQUEsSUFDVCxhQUFhLENBQUMsYUFBYSxTQUFTO0FBQUEsSUFDcEMsaUJBQWlCO0FBQUEsTUFDZjtBQUFBLFFBQ0UsU0FBUyxDQUFDLFlBQVk7QUFBQSxRQUN0QixJQUFJLENBQUMsK0JBQStCO0FBQUEsTUFDdEM7QUFBQSxJQUNGO0FBQUEsSUFZQSwwQkFBMEI7QUFBQSxNQUN4QjtBQUFBLFFBQ0UsV0FBVztBQUFBLFVBQ1Q7QUFBQSxVQUNBO0FBQUEsUUFDRjtBQUFBLFFBQ0EsU0FBUztBQUFBLFVBQ1A7QUFBQSxRQUNGO0FBQUEsUUFDQSxpQkFBaUI7QUFBQSxNQUNuQjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzs7O0FEOUNELElBQU0sMkJBQWlHO0FBQUEsRUFFckcsTUFBTTtBQUFBLEVBQ04sa0JBQWtCLFdBQVcsUUFBUTtBQUNuQyxXQUFPLG1CQUFtQixPQUFPO0FBQ2pDLFdBQU8saUJBQWlCLFdBQVc7QUFDbkMsV0FBTyxPQUFPO0FBQUEsRUFDaEI7QUFDRjtBQUlBLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVMsQ0FBQyxNQUFNLEdBQUcsMEJBQTBCLElBQUksRUFBRSxrQ0FBUyxDQUFDLENBQUM7QUFBQSxFQUM5RCxPQUFPO0FBQUEsSUFDTCxlQUFlO0FBQUEsTUFDYixPQUFPO0FBQUEsTUFDUCxRQUFRO0FBQUEsUUFFTixLQUFLO0FBQUEsUUFDTCxRQUFRO0FBQUEsUUFFUixnQkFBZ0I7QUFBQSxRQUNoQixnQkFBZ0I7QUFBQSxRQUNoQixnQkFBZ0I7QUFBQSxNQUNsQjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixlQUFlLENBQUM7QUFBQSxFQUNsQjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSztBQUFBLElBQ1A7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
