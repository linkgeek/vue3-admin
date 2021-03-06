const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  devServer: {
    port: 9097,
    // 配置反向代理
    proxy: {
      // 当地址中有/api的时候回触发代理机制
      '/admin': {
        // 要代理的服务器地址 这里不用写 api
        // target: 'https://api.imooc-admin.lgdsunday.club/',
        target: 'http://127.0.0.1:9092/',
        changeOrigin: true // 是否跨域
      }
    }
  },
  chainWebpack(config) {
    // 设置 svg-sprite-loader
    config.module.rule('svg').exclude.add(resolve('src/icons')).end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  }
}
