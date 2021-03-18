import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

const commonModules = ["@angular/core", "@angular/common", "@angular/platform-browser", "interfaces"];

export default [
  {
    input: 'dist/plugin1/esm2015/lib/plugin1.module.ngfactory.js',
    output: {
      file: './server/public/plugin1.module.umd.js',
      name: 'plugin1.module.umd.js',
      format: 'umd',
    },
    external: commonModules,
    plugins: [nodeResolve(), commonjs()]
  },
  {
    input: 'dist/plugin2/esm2015/lib/plugin2.module.ngfactory.js',
    output: {
      file: './server/public/plugin2.module.umd.js',
      name: 'Plugin2Module',
      format: 'umd',
    },
    external: commonModules,
    plugins: [nodeResolve(), commonjs()]
  }
];