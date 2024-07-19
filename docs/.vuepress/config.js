const nav = require('./nav')
const sidebar = require('./sidebar')

module.exports = {
  title: 'Vue2-Openlayers中文文档',
  description: '数据驱动地图',
  markdown: {
    lineNumbers: true
  },
  base: '/vue2-openlayers/',
  extraWatchFiles: [
    '.vuepress/nav.js', 
    '.vuepress/sidebar.js'
  ],
  themeConfig: {
    sidebarDepth: 2,
    smoothScroll: false,//右上角github跳转显示
    // repo: 'Vue2-Openlayers/docs',
    sidebar,
    docsDir: 'docs',
    editLinks: false,  //编辑连接
    editLinkText: '在 Github 上编辑此页',  //编辑文字连接
    lastUpdated: '更新时间',
  }
}
