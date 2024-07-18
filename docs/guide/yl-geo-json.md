### GeoJson数据层

GeoJson数据组件

#### 基础示例

```html
<yl-map>
	<yl-geo-json :geoJsonUrl="https://geo.datav.aliyun.com/areas_v3/bound/510000.json"></yl-geo-json>
</yl-map>
```



#### 样式示例

![](D:\test\vue2-openlayers\docs\.vuepress\public\images\yl-geo-json.png)



#### **动态属性**

支持响应式。

| 名称       | 类型 | 说明            |
| ---------- | ---- | --------------- |
| geoJsonUrl | url  | geojson数据地址 |

