import { defineConfig } from 'vite';
import { resolve } from 'path';
import fs from 'fs';

// Plugin customizado para copiar as pastas estáticas html/ e imagens/ para a dist/
function copyStaticFoldersPlugin() {
  return {
    name: 'copy-static-folders',
    closeBundle() {
      const foldersToCopy = ['html', 'imagens'];
      foldersToCopy.forEach((folder) => {
        const src = resolve(__dirname, folder);
        const dest = resolve(__dirname, 'dist', folder);
        if (fs.existsSync(src)) {
          fs.cpSync(src, dest, { recursive: true });
        }
      });
    }
  };
}

export default defineConfig({
  root: './',
  build: {
    outDir: 'dist',
    minify: 'esbuild',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html')
      },
      output: {
        entryFileNames: 'js/[name].js',
        chunkFileNames: 'js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return 'css/[name].[ext]';
          }
          return 'assets/[name].[ext]';
        }
      }
    }
  },
  plugins: [copyStaticFoldersPlugin()]
});
