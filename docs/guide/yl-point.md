### 点坐标

点坐标组件

**基础示例**

```html
<yl-map>
	<yl-point :pointData="pointData" :pointFun="pointFun"></yl-point>
</yl-map>

// 参数说明
// pointData：传入的坐标点位数据
// pointFun: 点位样式回调
<script>
	export default {
		data() {
			return {
				pointData: [{
						lat: '29.987722', // gps坐标 纬度
						lng: '103.001033', // gps坐标 经度
						info: {
							id: 1,
							desc: '雅安点位'
						}, // info属性用于 点位点击回传
					},
					{
						lat: '30.68538',
						lng: '103.979246',
						info: {
							id: 2,
							desc: '成都点位'
						}, // info属性用于 点位点击回传
					}
				],
				pointFun: (el) => {
					// el 是传入的 info信息
					// 可以通过判断el参数 设置不同的图片路径
					return {
						style: {
							src: 'url', // 图片地址
							scale: 1, // 图片缩放大小
							rotation: 0 // 旋转角度 
						},
						type: 'Icon', // 点位样式2种类型 Icon和 Circle 推荐Icon。不使用Circle
					}
				},
                
			}
		}
	}
</script>
```

**样式示例**

![](D:\test\vue2-openlayers\docs\.vuepress\public\images\yl-point2.png)



#### 静态属性

仅且可以初始化配置，不支持响应式。

| 名称               | 类型     | 说明                                               |
| ------------------ | -------- | -------------------------------------------------- |
| pointFun           | Function | 点坐标样式                                         |
| pointInitAnimation | Object   | pointAnimation为true时生效，动画点属性过滤         |
| radius             | Number   | pointAnimation为true时生效，扩散圈半径             |
| color              | String   | pointAnimation为true时生效，扩散圈颜色             |
| pointInitAnimation | Object   | pointAnimation为true时生效，过滤需要显示动画的点位 |



#### pointFun(e)

可以通过判断e参数 设置不同的点位样式

| 属性  | 类型   | 说明                    |
| ----- | ------ | ----------------------- |
| e     | Object | pointData传入的info属性 |
| style | Object | 点位样式属性            |
| type  | String | 点位类型                |



#### pointFun-style

| 属性     | 类型   | 说明          | 示例 |
| -------- | ------ | ------------- | ---- |
| src      | String | 图片地址      | url  |
| scale    | Number | 图片缩放大小  | 1    |
| rotation | Number | 旋转角度0-360 | 0    |



#### pointInitAnimation

| 属性  | 类型   | 说明                                            |
| ----- | ------ | ----------------------------------------------- |
| key   | String | 需要扩散动画的键名，值为pointData传入的info属性 |
| value | -      | 需要扩散动画的值                                |



#### **动态属性**

支持响应式。

| 名称           | 类型    | 说明         |
| -------------- | ------- | ------------ |
| pointData      | Array   | 点坐标数据   |
| pointAnimation | Boolean | 扩散动画属性 |

