### 折线

折线组件

#### 基础示例

```html
<yl-map>
	<yl-line :lineData="lineData" :lineFun="lineFun"></yl-line>
</yl-map>

// 参数说明
// lineData：传入的折线坐标折线数据
// lineFun: 先样式回调
<script>
	export default {
		data() {
			return {
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
						}, // info属性用于 折线点击回传
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
						}, // info属性用于 折线点击回传
					}, // lineData 可以接收多个路线
				],
				lineFun: (el) => {
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

![](D:\test\vue2-openlayers\docs\.vuepress\public\images\yl-line.png)



#### 静态属性

仅且可以初始化配置，不支持响应式。

| 名称    | 类型     | 说明       |
| ------- | -------- | ---------- |
| lineFun | Function | 点坐标样式 |



#### lineFun(e)

| 属性  | 类型   | 说明                   |
| ----- | ------ | ---------------------- |
| e     | Object | lineData传入的info属性 |
| style | Object | 折线样式属性           |



#### lineFun-style

| 属性  | 类型   | 说明     | 示例                |
| ----- | ------ | -------- | ------------------- |
| color | String | 线型颜色 | ‘rgb(76, 255, 255)’ |
| width | Number | 线型宽度 | 6                   |



#### **动态属性**

支持响应式。

| 名称     | 类型  | 说明     |
| -------- | ----- | -------- |
| lineData | Array | 折线数据 |

