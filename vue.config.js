'use strict'

const path = require('path')

const px2rem = require('postcss-pxtorem');
const postcss = px2rem({
    rootValue: 100,
    propList: ['*'],
    selectorBlackList: ['.echarts'] // 排除.echarts选择器
});

function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  devServer: {  
    proxy: {  
      '/file': {  
        target: 'http://8.137.153.28:33660', // 你想要请求的服务器地址  
        changeOrigin: true, // 是否改变源地址  
        pathRewrite: {  
          '^/api': '' // 重写路径，去掉 /api  
        }  
      }  
    }  
  },
  lintOnSave: true,
  css: {
    loaderOptions: {
        postcss: {
          postcssOptions: {
            // exclude: /node_modules|ECharts.css/, // 排除 node_modules 目录下的文件和 ECharts.css 文件
            plugins: [
              postcss
            ]
          }
        }
    }
  },
  // 修改 src 为 examples
  pages: {
    index: {
      entry: "examples/main.js",
      template: "public/index.html",
      filename: "index.html"
    }
  },
  // 扩展 webpack 配置，使 packages 加入编译
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('examples'))
      .set('~', resolve('packages'))
  }
};