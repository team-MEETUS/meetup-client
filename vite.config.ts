import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default ({ mode }: { mode: string }) => {
  const isDevelop = mode === 'development';
  const env = loadEnv(mode, process.cwd(), '');
  const API_URL = env.VITE_API_URL;

  return defineConfig({
    plugins: [svgr(), react()],
    server: isDevelop
      ? {
          port: 3000,
          proxy: {
            '/api': {
              target: API_URL,
              changeOrigin: true,
              rewrite: (path) => path.replace(/^\/api/, ''),
            },
          },
        }
      : undefined,
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
};
