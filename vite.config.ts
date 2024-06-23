import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData:
          '@import "./src/styles/common/_utils.scss"; @import "./src/styles/common/_typography.scss";  @import "./src/styles/common/variable.scss";',
      },
    },
  },
});
