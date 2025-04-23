// vite.config.ts
import { defineConfig } from "file:///Users/nahmanimatan/code/web-starter-vite/node_modules/vite/dist/node/index.js";
import react from "file:///Users/nahmanimatan/code/web-starter-vite/node_modules/@vitejs/plugin-react-swc/index.mjs";
import path from "path";
import { componentTagger } from "file:///Users/nahmanimatan/code/web-starter-vite/node_modules/lovable-tagger/dist/index.js";
var __vite_injected_original_dirname = "/Users/nahmanimatan/code/web-starter-vite";
var vite_config_default = defineConfig(({ mode }) => ({
  server: {
    proxy: {
      // Proxy /api requests to our Hono server running on port 6363
      "/api": {
        target: "http://localhost:6363",
        changeOrigin: true,
        // Optional: remove /api prefix if Hono routes don't expect it
        rewrite: (path2) => path2.replace(/^\/api/, "")
      }
    }
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(
    Boolean
  ),
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  },
  build: {
    // Explicitly set the output directory
    outDir: "dist",
    // Prevent Vite from clearing the dist directory before building,
    // so the esbuild output (dist/server/index.js) is preserved.
    emptyOutDir: false
  }
}));
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvbmFobWFuaW1hdGFuL2NvZGUvd2ViLXN0YXJ0ZXItdml0ZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL25haG1hbmltYXRhbi9jb2RlL3dlYi1zdGFydGVyLXZpdGUvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL25haG1hbmltYXRhbi9jb2RlL3dlYi1zdGFydGVyLXZpdGUvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2MnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBjb21wb25lbnRUYWdnZXIgfSBmcm9tICdsb3ZhYmxlLXRhZ2dlcic7XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgbW9kZSB9KSA9PiAoe1xuICBzZXJ2ZXI6IHtcbiAgICBwcm94eToge1xuICAgICAgLy8gUHJveHkgL2FwaSByZXF1ZXN0cyB0byBvdXIgSG9ubyBzZXJ2ZXIgcnVubmluZyBvbiBwb3J0IDYzNjNcbiAgICAgICcvYXBpJzoge1xuICAgICAgICB0YXJnZXQ6ICdodHRwOi8vbG9jYWxob3N0OjYzNjMnLFxuICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXG4gICAgICAgIC8vIE9wdGlvbmFsOiByZW1vdmUgL2FwaSBwcmVmaXggaWYgSG9ubyByb3V0ZXMgZG9uJ3QgZXhwZWN0IGl0XG4gICAgICAgIHJld3JpdGU6IChwYXRoKSA9PiBwYXRoLnJlcGxhY2UoL15cXC9hcGkvLCAnJyksXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG4gIHBsdWdpbnM6IFtyZWFjdCgpLCBtb2RlID09PSAnZGV2ZWxvcG1lbnQnICYmIGNvbXBvbmVudFRhZ2dlcigpXS5maWx0ZXIoXG4gICAgQm9vbGVhblxuICApLFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgICdAJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjJyksXG4gICAgfSxcbiAgfSxcbiAgYnVpbGQ6IHtcbiAgICAvLyBFeHBsaWNpdGx5IHNldCB0aGUgb3V0cHV0IGRpcmVjdG9yeVxuICAgIG91dERpcjogJ2Rpc3QnLFxuICAgIC8vIFByZXZlbnQgVml0ZSBmcm9tIGNsZWFyaW5nIHRoZSBkaXN0IGRpcmVjdG9yeSBiZWZvcmUgYnVpbGRpbmcsXG4gICAgLy8gc28gdGhlIGVzYnVpbGQgb3V0cHV0IChkaXN0L3NlcnZlci9pbmRleC5qcykgaXMgcHJlc2VydmVkLlxuICAgIGVtcHR5T3V0RGlyOiBmYWxzZSxcbiAgfSxcbn0pKTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBNlMsU0FBUyxvQkFBb0I7QUFDMVUsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sVUFBVTtBQUNqQixTQUFTLHVCQUF1QjtBQUhoQyxJQUFNLG1DQUFtQztBQU16QyxJQUFPLHNCQUFRLGFBQWEsQ0FBQyxFQUFFLEtBQUssT0FBTztBQUFBLEVBQ3pDLFFBQVE7QUFBQSxJQUNOLE9BQU87QUFBQTtBQUFBLE1BRUwsUUFBUTtBQUFBLFFBQ04sUUFBUTtBQUFBLFFBQ1IsY0FBYztBQUFBO0FBQUEsUUFFZCxTQUFTLENBQUNBLFVBQVNBLE1BQUssUUFBUSxVQUFVLEVBQUU7QUFBQSxNQUM5QztBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxTQUFTLENBQUMsTUFBTSxHQUFHLFNBQVMsaUJBQWlCLGdCQUFnQixDQUFDLEVBQUU7QUFBQSxJQUM5RDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssS0FBSyxRQUFRLGtDQUFXLE9BQU87QUFBQSxJQUN0QztBQUFBLEVBQ0Y7QUFBQSxFQUNBLE9BQU87QUFBQTtBQUFBLElBRUwsUUFBUTtBQUFBO0FBQUE7QUFBQSxJQUdSLGFBQWE7QUFBQSxFQUNmO0FBQ0YsRUFBRTsiLAogICJuYW1lcyI6IFsicGF0aCJdCn0K
