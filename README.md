

## vue2-openlayers

vue2-openlayers是一套基于Vue 2.0和openlayers地图的地图组件。




## 文档
https://elemefe.github.io/vue2-openlayers



## 快速上手

#### 安装

```
npm install -S vue-amap
```



#### 引入vue2-openlayers

```js
import Vue from 'vue';

// 引入vue2-openlayers
import VueOpenlayers from 'vue2-openlayers';
// 引入 vue2-openlayers css
import 'vue2-openlayers/vue2-openlayers.css';
import App from './App.vue';

Vue.use(VueOpenlayers);

new Vue({
  el: '#app',
  render: h => h(App)
});
```



## 组件

vue2-openlayers组件列表

todo:a:待完善

#### 地图

```html
<yl-map></yl-map>
```



#### 点坐标

```html
<yl-map>
	<yl-point :pointData="[]"></yl-point>
</yl-map>
```



#### 折线

```html
<yl-map>
	<yl-line :lineData="[]"></yl-line>
</yl-map>
```



#### 飞线

```html
<yl-map>
	<yl-fiy-line :pointData="[]" :lineData="[]"></yl-fiy-line>
</yl-map>
```



#### GeoJson数据层

```html
<yl-map>
	<yl-geo-json geoJsonUrl="https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json"></yl-geo-json>
</yl-map>
```



#### 信息窗体

```html
// 自己定义Div 这个只是产考  具体使用请看文档
<div id="popup">
    
</div>
```



### 其他特性

支持自定义组件
支持官方 UI 组件库
