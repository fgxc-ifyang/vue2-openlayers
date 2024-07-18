### 飞线

飞线组件

#### 基础示例

```html
<yl-map>
	<yl-fiy-line :pointData="pointData" :lineData="lineData" :flyPointFun="flyPointFun"
		:lineFun="flyLineFun"></yl-fiy-line>
</yl-map>

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
				lineData: [{
						data: [
							[
								[103.001033, 29.987722],
								[103.979246, 30.68538]
							], //路段1
							[
								[103.201033, 29.917722],
								[103.279246, 30.61538]
							], //路段2
						],
						info: {
							id: 1,
							desc: '雅安成都'
						}, // info属性用于 点位点击回传
					},
					{
						data: [
							[
								[103.101033, 29.187722],
								[103.179246, 30.18538]
							]
						],
						info: {
							id: 2,
							desc: '起它线'
						}, // info属性用于 点位点击回传
					}, // lineData 可以接收多个路线
				],
				flyPointFun: (el) => {
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
				flyLineFun: (el) => {
					// el 是传入的 info信息
					// 可以通过判断el参数 颜色和宽度
					return {
						color: 'rgb(76, 255, 255)', // rgb格式字符串
						width: 6 // Number类型
					}
				}
			}
		}
	}
</script>
```



#### 样式示例

![](D:\test\vue2-openlayers\docs\.vuepress\public\images\yl-fly.png)



#### 静态属性

仅且可以初始化配置，不支持响应式。

| 名称        | 类型     | 说明       |
| ----------- | -------- | ---------- |
| flyPointFun | Function | 点坐标样式 |
| flyLineFun  | Function | 飞线样式   |
| lineData    | Array    | 飞线数据   |



#### flyPointFun(e)

可以通过判断e参数 设置不同的点位样式

| 属性  | 类型   | 说明                    |
| ----- | ------ | ----------------------- |
| e     | Obejct | pointData传入的info属性 |
| style | Object | 点位样式属性            |
| type  | String | 点位类型                |



#### flyPointFun-style

| 属性     | 类型   | 说明          | 示例 |
| -------- | ------ | ------------- | ---- |
| src      | String | 图片地址      | url  |
| scale    | Number | 图片缩放大小  | 1    |
| rotation | Number | 旋转角度0-360 | 0    |

#### flyLineFun(e)

| 属性  | 类型   | 说明                   |
| ----- | ------ | ---------------------- |
| e     | Object | lineData传入的info属性 |
| style | Object | 折线样式属性           |



#### flyLineFun-style

| 属性  | 类型   | 说明     | 示例                |
| ----- | ------ | -------- | ------------------- |
| color | String | 线型颜色 | ‘rgb(76, 255, 255)’ |
| width | Number | 线型宽度 | 6                   |



#### pointInitAnimation

| 属性  | 类型   | 说明                                            |
| ----- | ------ | ----------------------------------------------- |
| key   | String | 需要扩散动画的键名，值为pointData传入的info属性 |
| value | -      | 需要扩散动画的值                                |



#### **动态属性**

支持响应式。

| 名称      | 类型  | 说明       |
| --------- | ----- | ---------- |
| pointData | Array | 点坐标数据 |

