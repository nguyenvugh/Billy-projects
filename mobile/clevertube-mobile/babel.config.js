module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@clvtube': './src',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
}
