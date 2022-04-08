module.exports = {
  presets: [[
    '@babel/preset-env',
    {
      targets: {
        browsers: ['ie 11'],
      },
      useBuiltIns: 'usage',
      corejs: 3,
    },
  ], '@babel/preset-react'],
  plugins: [
    '@babel/transform-runtime',
    '@babel/plugin-proposal-class-properties',
  ],
};
