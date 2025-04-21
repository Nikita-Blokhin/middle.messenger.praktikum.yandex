import { defineConfig } from 'vite';

export default defineConfig({
    root: '.',
    server: {
        port: 3000
    },
    build: {
        outDir: 'dist',
        rollupOptions: {
            input: {
                main: 'src/main.ts',
                index: './index.html'
            },
            output: {
                entryFileNames: `assets/[name].js`,
                assetFileNames: `assets/[name].[ext]`
            }
        },
        manifest: false
    },
    resolve: {
        alias: {
            '@': '/src',
            '@components': '/src/components',
            '@icons': '/public'
        }
    },
    assetsInclude: ['**/*.hbs', '**/*.html']
});
