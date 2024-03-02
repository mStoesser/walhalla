// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  routes: [
    {
      match: 'routes',
      src: '.*',
      dest: '/walhalla/index.html',
    },
  ],
  mount: {
     src: '/walhalla/',
     //docs: '/walhalla/' // use for prod mode
  },
  plugins: [
    /* ... */
  ],
  workspaceRoot: '..',
  packageOptions: {
    /* ... */
    /*knownEntrypoints: ['../value-multiselect']
    */
    /*external: ['value-multiselect'],*/
  },
  devOptions: {
    port: 3000,
    openUrl: 'http://localhost:3000/walhalla/'
    /* ... */
  },
  buildOptions: {
    /* ... */
  },
};
