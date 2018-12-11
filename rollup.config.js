import babel from 'rollup-plugin-babel';
import {terser} from 'rollup-plugin-terser';

function getRollupObject ({minifying, format = 'umd'} = {}) {
    const nonMinified = {
        input: 'index.js',
        output: {
            format,
            file: `dist/index-${format}${minifying ? '.min' : ''}.js`,
            name: 'rtlDetect'
        },
        plugins: [
            babel()
        ]
    };
    if (minifying) {
        nonMinified.plugins.push(terser());
    }
    return nonMinified;
};
export default [
    getRollupObject(),
    getRollupObject({minifying: true}),
    getRollupObject({minifying: false, format: 'es'}),
    getRollupObject({minifying: true, format: 'es'})
];
