### 快速上手

本节将介绍如何在项目中使用 Vue2-Openlayers。

**安装**

```
npm install vue2-openlayers
```

**引入 Vue2-Openlayers**

你可以引入整个 Vue2-Openlayers，或是根据需要仅引入部分组件。我们先介绍如何引入完整的 Vue2-Openlayers。

**完整引入**

在 main.js 中写入以下内容：

```
import Vue from 'vue';
import VueOpenlayers from 'vue2-openlayers';
import 'vue2-openlayers/vue2-openlayers.css';
import App from './App.vue';
Vue.use(VueOpenlayers);
new Vue({
  el: '#app',
  render: h => h(App)
});
```

以上代码便完成了 Vue2-Openlayers 的引入。需要注意的是，样式文件需要单独引入。

**按需引入**

借助 babel-plugin-component，我们可以只引入需要的组件，以达到减小项目体积的目的。

首先，安装 babel-plugin-component：

```
npm install babel-plugin-component -D
```

然后，将 .babelrc 修改为：

```
{
  "presets": [["es2015", { "modules": false }]],
  "plugins": [
    [
      "component",
      {
        "libraryName": "vue2-openlayers",
      }
    ]
  ]
}
```

接下来，如果你只希望引入部分组件，比如 YlMap 和 YlPoint，那么需要在 main.js 中写入以下内容：

```
import Vue from 'vue';
import { YlMap, YlPoint } from 'vue2-openlayers';
import App from './App.vue';

Vue.component(YlMap.name, YlMap);
Vue.component(YlPoint.name, YlPoint);
/* 或写为
 * Vue.use(YlMap)
 * Vue.use(YlPoint)
 */

new Vue({
  el: '#app',
  render: h => h(App)
});
```

完整组件列表和引入方式：

```
import {
    install,
    // 以下是具体的组件列表
    YlMap,
    YlLine,
    YlPoint,
    YlFiyLine,
    YlGeoJson
} from 'vue2-openlayers';
```