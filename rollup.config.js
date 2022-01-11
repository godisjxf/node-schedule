import pkg from "./package.json";
import jsonLoader from "@rollup/plugin-json";
export default {
  input: "./index.js",
  output: [
    // 1. cjs -> commonjs
    // 2. esm
    {
      format: "cjs",
      file: pkg.main,
    },
    {
      format: "es",
      file: pkg.module,
    },
  ],
  plugins: [jsonLoader()],
};
