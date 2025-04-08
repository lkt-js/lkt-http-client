import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['src/index.ts'],
    format: ['cjs', 'esm'],
    dts: true,
    minify: true,
    external: [
        'axios',
        'downloadjs',
        'vue',
        'lkt-control-tools',
        'lkt-object-tools',
        'lkt-string-tools',
        'lkt-http-client',
        'lkt-string-tools',
        'lkt-i18n',
    ],
});