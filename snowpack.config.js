// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  routes: [
    {
      match: 'routes',
      src: '.*',
      dest: '/index.html',
    },
  ],
  mount: {
     // src: '/',
     docs: '/' // use for prod mode
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
    port: 3000
    /* ... */
  },
  buildOptions: {
    /* ... */
  },
};
