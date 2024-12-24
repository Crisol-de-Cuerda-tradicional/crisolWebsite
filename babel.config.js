module.exports = function (api) {
  api.cache.never();
  return {
    presets: [
      [
        require.resolve('next/babel'),
        {
          'styled-jsx': {
            plugins: [require.resolve('styled-jsx-plugin-postcss')],
          },
        },
      ],
    ],
    plugins: [require.resolve('babel-plugin-macros')],
  };
};
