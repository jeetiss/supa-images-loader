import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'
import pkg from './package.json'

const umdBuild = minify => ({
  input: 'src/index.js',
  output: [
    {
      name: 'supaImagesLoader',
      file: minify ? 'dist/umd/index.min.js' : 'dist/umd/index.js',
      format: 'umd',
    },
  ],
  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),
    minify ? uglify() : {},
  ],
})

export default [
  {
    input: 'src/index.js',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
      },
      {
        file: pkg.module,
        format: 'es',
      },
    ],
    plugins: [
      babel({
        exclude: 'node_modules/**',
      }),
    ],
  },
  umdBuild(true),
  umdBuild(false),
]
