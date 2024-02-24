import { babel } from "@rollup/plugin-babel";
import json from "@rollup/plugin-json";
import copy from "rollup-plugin-copy";

const config = {
    input: "src/app.js",
    output: {
        format: "esm",
        file: "dist/app.js",
    },
    plugins: [
        babel({
            exclude: "node_modules/**",
            presets: ["@babel/preset-env"],
            plugins: ["babel-plugin-transform-html-import-to-string"],
            extensions: [".js", ".html"],
        }),
        json(),
        copy({
            targets: [
                { src: 'src/index.html', dest: 'dist/' },
                { src: 'src/service-worker.js', dest: 'dist/' },
                { src: 'src/style.css', dest: 'dist/' },
                { src: 'src/assets/routes.json', dest: 'dist/assets/' },
                { src: 'src/assets/icon-512.png', dest: 'dist/assets/' },
                { src: 'src/assets/icon-256.png', dest: 'dist/assets/' },
                { src: 'src/assets/icon-128.png', dest: 'dist/assets/' },
                { src: 'src/assets/icon-maskable.png', dest: 'dist/assets/' },
                { src: 'src/manifest.json', dest: 'dist/' },
            ]
        })
    ],
};

export default config;