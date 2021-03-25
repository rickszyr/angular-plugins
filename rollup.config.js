import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

const commonModules = ["@angular/core", "@angular/common", "@angular/platform-browser", "interfaces"];

export default [
  {
    input: 'dist/plugin1/esm2015/lib/plugin1.module.js',
    output: {
      file: './server/public/plugin1.module.js',
      name: 'plugin1.module.umd.js',
      format: 'umd',
    },
    external: commonModules,
    plugins: [nodeResolve(), commonjs()]
  },
  {
    input: 'dist/plugin2/esm2015/lib/plugin2.module.js',
    output: {
      file: './server/public/plugin2.module.js',
      name: 'Plugin2Module',
      format: 'umd',
    },
    external: [...commonModules, "plugin1"],
    plugins: [nodeResolve(), commonjs()]
  }
];