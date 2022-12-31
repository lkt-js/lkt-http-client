
import { resolve } from 'path';

const src = resolve(__dirname, 'src');
const outDir = resolve(__dirname, 'dist');
const test = resolve(__dirname, 'test');
const snapshots = resolve(__dirname, 'snapshots');

export default {
    plugins: [  ],
    resolve: {
        alias: { '@': src, '@test': test }
    },
    build: {
        lib: {
            entry: `${ src }/index.ts`,
            name: 'LktHTTP',
            fileName: (format) => `lkt-http-client.${ format }.js`
        },
        outDir,
        minify: true,
        rollupOptions: {
            external: [ 'axios', 'downloadjs', 'lkt-control-tools', 'lkt-string-tools', 'lkt-object-tools', 'lkt-ts-interfaces' ],
            output: {
                globals: {
                    axios: 'axios',
                    'lkt-control-tools': 'LktControlTools',
                    'lkt-string-tools': 'LktStringTools',
                    'lkt-object-tools': 'LktObjectTools',
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
};