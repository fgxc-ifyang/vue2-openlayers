(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{430:function(s,n,e){"use strict";e.r(n);var a=e(62),l=Object(a.a)({},(function(){var s=this,n=s.$createElement,e=s._self._c||n;return e("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[e("h3",{attrs:{id:"快速上手"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#快速上手"}},[s._v("#")]),s._v(" 快速上手")]),s._v(" "),e("p",[s._v("本节将介绍如何在项目中使用 Vue2-Openlayers。")]),s._v(" "),e("p",[e("strong",[s._v("安装")])]),s._v(" "),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v("npm install vue2-openlayers -save\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])]),e("p",[e("strong",[s._v("引入 Vue2-Openlayers")])]),s._v(" "),e("p",[s._v("你可以引入整个 Vue2-Openlayers，或是根据需要仅引入部分组件。我们先介绍如何引入完整的 Vue2-Openlayers。")]),s._v(" "),e("p",[e("strong",[s._v("完整引入")])]),s._v(" "),e("p",[s._v("在 main.js 中写入以下内容：")]),s._v(" "),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v("import Vue from 'vue';\nimport VueOpenlayers from 'vue2-openlayers';\nimport 'vue2-openlayers/vue2-openlayers.css';\nimport App from './App.vue';\nVue.use(VueOpenlayers);\nnew Vue({\n  el: '#app',\n  render: h => h(App)\n});\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br"),e("span",{staticClass:"line-number"},[s._v("5")]),e("br"),e("span",{staticClass:"line-number"},[s._v("6")]),e("br"),e("span",{staticClass:"line-number"},[s._v("7")]),e("br"),e("span",{staticClass:"line-number"},[s._v("8")]),e("br"),e("span",{staticClass:"line-number"},[s._v("9")]),e("br")])]),e("p",[s._v("以上代码便完成了 Vue2-Openlayers 的引入。需要注意的是，样式文件需要单独引入。")]),s._v(" "),e("p",[e("strong",[s._v("按需引入")])]),s._v(" "),e("p",[s._v("借助 babel-plugin-component，我们可以只引入需要的组件，以达到减小项目体积的目的。")]),s._v(" "),e("p",[s._v("首先，安装 babel-plugin-component：")]),s._v(" "),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v("npm install babel-plugin-component -D\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])]),e("p",[s._v("然后，将 .babelrc 修改为：")]),s._v(" "),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v('{\n  "presets": [["es2015", { "modules": false }]],\n  "plugins": [\n    [\n      "component",\n      {\n        "libraryName": "vue2-openlayers",\n      }\n    ]\n  ]\n}\n')])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br"),e("span",{staticClass:"line-number"},[s._v("5")]),e("br"),e("span",{staticClass:"line-number"},[s._v("6")]),e("br"),e("span",{staticClass:"line-number"},[s._v("7")]),e("br"),e("span",{staticClass:"line-number"},[s._v("8")]),e("br"),e("span",{staticClass:"line-number"},[s._v("9")]),e("br"),e("span",{staticClass:"line-number"},[s._v("10")]),e("br"),e("span",{staticClass:"line-number"},[s._v("11")]),e("br")])]),e("p",[s._v("接下来，如果你只希望引入部分组件，比如 YlMap 和 YlPoint，那么需要在 main.js 中写入以下内容：")]),s._v(" "),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v("import Vue from 'vue';\nimport { YlMap, YlPoint } from 'vue2-openlayers';\nimport App from './App.vue';\n\nVue.component(YlMap.name, YlMap);\nVue.component(YlPoint.name, YlPoint);\n/* 或写为\n * Vue.use(YlMap)\n * Vue.use(YlPoint)\n */\n\nnew Vue({\n  el: '#app',\n  render: h => h(App)\n});\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br"),e("span",{staticClass:"line-number"},[s._v("5")]),e("br"),e("span",{staticClass:"line-number"},[s._v("6")]),e("br"),e("span",{staticClass:"line-number"},[s._v("7")]),e("br"),e("span",{staticClass:"line-number"},[s._v("8")]),e("br"),e("span",{staticClass:"line-number"},[s._v("9")]),e("br"),e("span",{staticClass:"line-number"},[s._v("10")]),e("br"),e("span",{staticClass:"line-number"},[s._v("11")]),e("br"),e("span",{staticClass:"line-number"},[s._v("12")]),e("br"),e("span",{staticClass:"line-number"},[s._v("13")]),e("br"),e("span",{staticClass:"line-number"},[s._v("14")]),e("br"),e("span",{staticClass:"line-number"},[s._v("15")]),e("br")])]),e("p",[s._v("完整组件列表和引入方式：")]),s._v(" "),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v("import {\n    install,\n    // 以下是具体的组件列表\n    YlMap,\n    YlLine,\n    YlPoint,\n    YlFiyLine,\n    YlGeoJson\n} from 'vue2-openlayers';\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br"),e("span",{staticClass:"line-number"},[s._v("5")]),e("br"),e("span",{staticClass:"line-number"},[s._v("6")]),e("br"),e("span",{staticClass:"line-number"},[s._v("7")]),e("br"),e("span",{staticClass:"line-number"},[s._v("8")]),e("br"),e("span",{staticClass:"line-number"},[s._v("9")]),e("br")])])])}),[],!1,null,null,null);n.default=l.exports}}]);