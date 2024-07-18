### 地图

地图组件



#### **基础示例**

```html
<yl-map @handleDownEvent="handleDownEvent" @handleDownFeatureEvent="handleDownFeatureEvent"></yl-map>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			//地图点击事件
			handleDownEvent(evt) {

			},
			//地图元素事件
			handleDownFeatureEvent(evt) {

			},
		}
	}
</script>
```



#### 样式示例

![](D:\test\vue2-openlayers\docs\.vuepress\public\images\yl-map.png)



#### 静态属性

仅且可以初始化配置，不支持响应式。

| 名称   | 类型   | 默认值                                                       | 说明                                   |
| ------ | ------ | ------------------------------------------------------------ | -------------------------------------- |
| mapUrl | String | https://webrd04.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z} | 瓦片地图地址                           |
| center | Array  | [104.06, 30.67]                                              | 地图中心点坐标值                       |
| zooms  | Array  | [5-20]                                                       | 地图显示的缩放级别范围，取值范围[3-20] |
| zoom   | Number | 7                                                            |                                        |



#### mapUrl瓦片地址

高德矢量底图

```
https://webrd04.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}
```

高德卫星影像

```
https://webrd04.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}
```

高德路网注记

```
https://webrd04.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}
```



#### **动态属性**

支持响应式。
todo：



#### **ref 可用方法**

提供地图封装方法

| 函数              | 参数                   | 说明                                                         |
| ----------------- | ---------------------- | ------------------------------------------------------------ |
| fitCenter         | center, zoom, duration | center坐标点，层级，居中动画持续时长。作用：聚焦坐标到地图中心 |
| fitViewfeature    | feature                | 聚焦feature到地图中心                                        |
| fitViewSource     | source                 | 聚焦source到当前中心                                         |
| fitViewfeatures() | features               | 聚焦features到地图中心                                       |



#### 事件

|  事件   | 说明 |
|  ----  | ----  |
| handleDownEvent(evt) | 地图点击事件回传 |
| handleDownFeatureEvent(evt) | 地图元素点击事件回传 |
