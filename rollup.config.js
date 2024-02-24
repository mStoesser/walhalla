import { babel } from "@rollup/plugin-babel";
import json from "@rollup/plugin-json";
import copy from "rollup-plugin-copy";
import nodeResolve from "@rollup/plugin-node-resolve";

const config = {
    input: "src/app.js",
    output: {
        format: "esm",
        file: "docs/app.js",
    },
    plugins: [
        nodeResolve(),
        babel({
            exclude: "node_modules/**",
            presets: ["@babel/preset-env"],
            plugins: ["babel-plugin-transform-html-import-to-string"],
            extensions: [".js", ".html"],
        }),
        json(),
        copy({
            targets: [
                { src: 'src/index.html', dest: 'docs/' },
                { src: 'src/service-worker.js', dest: 'docs/' },
                { src: 'src/style.css', dest: 'docs/' },
                { src: 'src/assets/routes.json', dest: 'docs/assets/' },
                { src: 'src/assets/icon-512.png', dest: 'docs/assets/' },
                { src: 'src/assets/icon-256.png', dest: 'docs/assets/' },
                { src: 'src/assets/icon-128.png', dest: 'docs/assets/' },
                { src: 'src/assets/icon-maskable.png', dest: 'docs/assets/' },
                { src: 'src/manifest.json', dest: 'docs/' },
            ]
        })
    ],
};

export default config;