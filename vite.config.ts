import { defineConfig, type UserConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import terser from "@rollup/plugin-terser";
import purgeCss from 'vite-plugin-purgecss';
import { chunk } from 'lodash'
import { imagetools } from 'vite-imagetools';
import viteCompression from 'vite-plugin-compression';

// https://vitejs.dev/config/
export default defineConfig(({ mode }): UserConfig => {
  const isProd = mode === 'production';

  return {
    server: {
      host: "::",
      port: 8081,
    },
    plugins: [
      react(),
      imagetools(),
      viteCompression({
        algorithm: "brotliCompress", // or 'brotliCompress' (requires Brotli)
        threshold: 10240, // compress files > 10KB (default)
        deleteOriginFile: false, // keep original files (set to `true` to remove them)
      }),
      isProd && terser({
        compress: {
          drop_console: true,
          pure_funcs: ['console.debug', 'console.warn'],
        },
      }),
      isProd && purgeCss({
        safelist: [/^ant-/]
      }),
      isProd,
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        'react': path.resolve(__dirname, './node_modules/react'),
        'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
      },
    },
    build: {
      chunkSizeWarningLimit: 1000,
      target: 'esnext', // لتحسين tree-shaking
      minify: "terser",
      terserOptions: {
        compress: {
          unused: true,
          dead_code: true,
          passes: 3, // زيادة عدد محاولات التحسين
        },
      },
      rollupOptions: {
        output: {
          manualChunks: {
            react: ['react', 'react-dom', 'react-router-dom'],
          }
        },
      },
      sourcemap: isProd ? false : 'inline',
    },
    css: {
      modules: {
        localsConvention: 'camelCase'
      }
    },
    preview: {
      port: 8081,
    },
    optimizeDeps: {
      include: ['react', 'react-dom'],
      exclude: ['js-big-decimal']
    },
  };
});