// 地图底图
import YlMap from './yl-map/index';
// 地图线型
import YlLine from './yl-map/yl-line/index';
// 地图点位
import YlPoint from './yl-map/yl-point/index';
// 地图飞点
import YlFiyLine from './yl-map/yl-fiy-line/index';
// 地图GeoJson
import YlGeoJson from './yl-map/yl-geo-json/index';

// 存储组件列表
const components = [
    YlMap,
    YlLine,
    YlPoint,
    YlFiyLine,
    YlGeoJson
]

// 定义 install 方法，接收 Vue 作为参数。如果使用 use 注册插件，则所有的组件都将被注册
const install = function (Vue) {
 
// 判断是否安装
if (install.installed) return
 // 遍历注册全局组件
 components.map(component => Vue.component(component.name, component))
}

// 判断是否是直接引入文件
if (typeof window !== 'undefined' && window.Vue) {
 install(window.Vue)
}
export {
    install,
    // 以下是具体的组件列表
    YlMap,
    YlLine,
    YlPoint,
    YlFiyLine,
    YlGeoJson
}

export default {
 // 导出的对象必须具有 install，才能被 Vue.use() 方法安装
 install,
 // 以下是具体的组件列表
 ...components
}