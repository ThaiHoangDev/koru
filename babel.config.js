module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['/'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json', '.svg'],
        alias: {
          '@Assets': './src/assets',
          '@Assets/*': './src/assets/*',
          '@Screens': './src/screens',
          '@Navigators': './src/navigators',
          '@Containers': './src/containers',
          '@Components': './src/components',
          '@Constants': './src/constants',
          '@Store': './src/store',
          '@Reducers': './src/reducers',
          '@Utils': './src/utils',
          '@Theme': './src/theme',
          '@Theme/*': './src/theme/*',
          '@Interfaces': './src/interfaces',
          '@I18N': './src/i18n',
          '@Layouts': './src/layouts',
        },
      },
    ],
  ],
};
