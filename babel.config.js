module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ]
  ],
  plugins: [
    [
      'import',
      {
        libraryName: 'antd',
        style: 'css'
      }
    ],
    '@vue/babel-plugin-jsx'
  ]
};
