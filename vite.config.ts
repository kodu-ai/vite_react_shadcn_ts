import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { componentTagger } from 'lovable-tagger';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react(), mode === 'development' && componentTagger()].filter(
    Boolean
  ),
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    // Explicitly set the output directory
    outDir: 'dist',
    // Prevent Vite from clearing the dist directory before building,
    // so the esbuild output (dist/server/index.js) is preserved.
    emptyOutDir: false,
  },
}));
