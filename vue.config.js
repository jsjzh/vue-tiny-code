module.exports = {
  configureWebpack: config => {
    config.devtool = 'eval-source-map'
    // TODO 想办法引入 svg 的文件，参考 vue-element-admin 的项目
    // config.module.rules.push({
    //   test: /\.svg$/,
    //   loader: 'svg-sprite-loader',
    //   include: [resolve('@/icons')],
    //   options: {
    //     symbolId: 'icon-[name]'
    //   }
    // })
  }
}
