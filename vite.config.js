
import { resolve } from 'path';
import { defineConfig } from 'vitest/config';

const src = resolve(__dirname, 'src');
const outDir = resolve(__dirname, 'dist');
const test = resolve(__dirname, 'test');
const snapshots = resolve(__dirname, 'snapshots');

export default defineConfig({
    plugins: [  ],
    resolve: {
        alias: { '@': src, '@test': test }
    },
    build: {
        lib: {
            entry: `${ src }/index.js`,
            name: 'LktHTTP',
            fileName: (format) => `lkt-http.${ format }.js`
        },
        outDir,
        minify: false,
        rollupOptions: {
            external: [ 'lkt-tools', 'axios' ],
            output: {
                globals: {
                    "lkt-tools": 'LktTools',
                    axios: 'axios'
                },
                sourcemapExcludeSources: true
            }
        }
    },
    test: {
        coverage: {
            reporter: [ 'text', 'lcov' ]
        },
        resolveSnapshotPath: (testPath, snapExtension) => {
            const path = testPath.split('/').splice(-2);
            return `${ snapshots }/${ path[0] }/${ path[1] }${ snapExtension }`;
        }
    }
});