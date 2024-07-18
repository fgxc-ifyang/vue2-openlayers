module.exports = {
  '/guide/':[
    {
      title: '项目介绍',
      collapsable: false,
      children:[
        'quick-start',
      ]
    },
    {
      title: '组件',
      collapsable: false,
      children:[
        'yl-map',
        'yl-line',
        'yl-point',
        'yl-fiy-line',
        'yl-geo-json',
        'yl-layer',
        'yl-window',
      ]
    }
  ],
  // '/doc/':[
  //   {
  //     title: 'Api',
  //     collapsable: false,
  //     children:[
  //     //   'spreadsheet',
  //     //   'data_proxy',
  //     //   'sheet',
  //     //   'editor',
  //     //   'element',
  //     //   'table',
  //     //   'row',
  //     //   'style'
  //     ]
  //   }
  // ],
  '/config/':[
    {
      title: '配置指南',
      collapsable: false,
      children:[
        '',
        'config_list',
      ]
    },
  ],
  '/help/': [
    {
      title: '协作指南',
      collapsable: false,
      children:[
        '',
        'markdown',
      ]
    },
  ]
}