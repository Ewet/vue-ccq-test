const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


module.exports = {
  configureWebpack: {
    plugins: [
      new BundleAnalyzerPlugin({
        // 8888是默认端口号
        analyzerPort: 8888,
        // host地址
        analyzerHost: 'localhost',
        analyzerMode: 'static',
        // analyzerMode为static或json时候的输出位置
        reportFilename: 'report.html',
        defaultSizes: 'parsed',
        // 是否自动打开统计页面
        openAnalyzer: false,
        // generateStatsFile: false, // 如果为true，则Webpack Stats JSON文件将在bundle输出目录中生成。
        // statsFilename: 'stats.json',
        /**
         * 配置
         * https://webpack.js.org/configuration/stats/#stats-options
         */
        statsOptions: null,
        logLevel: 'info',
        // 用于排除分析一些文件
        excludeAssets: null
      })
    ],
    externals: {
      Vue: 'Vue',
      Vuex: 'Vuex',
      VueRouter: 'VueRouter',
    }
  },
  // 生产环境是否生成 sourceMap 文件 sourceMap的详解请看末尾  
  productionSourceMap: false,
  devServer: {
    port: 3333
  }
};