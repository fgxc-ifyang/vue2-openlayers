/**
 * WGS－84原始坐标系，一般用国际GPS纪录仪记录下来的经纬度，通过GPS定位拿到的原始经纬度
 * 
 * GCJ－02坐标系，又名“火星坐标系”，是我国国测局独创的坐标体系，由WGS－84加密而成
 * 
 * 百度坐标系:bd-09，百度坐标系是在GCJ－02坐标系的基础上再次加密偏移后形成的坐标系，只适用于百度地图
 */

const PI = 3.14159265358979324;

// const x_pi = 3.14159265358979324 * 3000.0 / 180.0;

function delta(lat, lon) {
    // Krasovsky 1940
    //
    // a = 6378245.0, 1/f = 298.3
    // b = a * (1 - f)
    // ee = (a^2 - b^2) / a^2;
    let a = 6378245.0; //  a: 卫星椭球坐标投影到平面地图坐标系的投影因子。
    let ee = 0.00669342162296594323; //  ee: 椭球的偏心率。
    let dLat =  transformLat(lon - 105.0, lat - 35.0);
    let dLon =  transformLon(lon - 105.0, lat - 35.0);
    let radLat = lat / 180.0 *  PI;
    let magic = Math.sin(radLat);
    magic = 1 - ee * magic * magic;
    let sqrtMagic = Math.sqrt(magic);
    dLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) *  PI);
    dLon = (dLon * 180.0) / (a / sqrtMagic * Math.cos(radLat) *  PI);
    return {'lat': dLat+0.000004, 'lon': dLon+0.000004};
}

function outOfChina(lat, lon) {
    if (lon < 72.004 || lon > 137.8347)
        return true;
    if (lat < 0.8293 || lat > 55.8271)
        return true;
    return false;
}
function transformLat (x, y) {
    let ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x));
    ret += (20.0 * Math.sin(6.0 * x *  PI) + 20.0 * Math.sin(2.0 * x *  PI)) * 2.0 / 3.0;
    ret += (20.0 * Math.sin(y *  PI) + 40.0 * Math.sin(y / 3.0 *  PI)) * 2.0 / 3.0;
    ret += (160.0 * Math.sin(y / 12.0 *  PI) + 320 * Math.sin(y *  PI / 30.0)) * 2.0 / 3.0;
    return ret;
}
function transformLon (x, y) {
    let ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));
    ret += (20.0 * Math.sin(6.0 * x *  PI) + 20.0 * Math.sin(2.0 * x *  PI)) * 2.0 / 3.0;
    ret += (20.0 * Math.sin(x *  PI) + 40.0 * Math.sin(x / 3.0 *  PI)) * 2.0 / 3.0;
    ret += (150.0 * Math.sin(x / 12.0 *  PI) + 300.0 * Math.sin(x / 30.0 *  PI)) * 2.0 / 3.0;
    return ret;
}

/**
 * gps-->高德
 * @param {*} wgsLat lat 纬度
 * @param {*} wgsLon lng 经度
 */
export function gps2gd( wgsLat , wgsLon ) {
    if(typeof wgsLat === 'string' ) wgsLat = Number(wgsLat);
    if(typeof wgsLon === 'string' ) wgsLon = Number(wgsLon);
    if ( outOfChina(wgsLat, wgsLon))
        return {'lat': wgsLat, 'lng': wgsLon};

    let d =  delta(wgsLat, wgsLon);
    return {'lat' : wgsLat + d.lat,'lng' : wgsLon + d.lon};
}

/**
 *  高德坐标系转gps
 */
export   function  gd2gps(gcjLat, gcjLon){
    if(typeof gcjLat === 'string' ) gcjLat = Number(gcjLat);
    if(typeof gcjLon === 'string' ) gcjLon = Number(gcjLon);
    if (outOfChina(gcjLat, gcjLon))
        return { 'lat': gcjLat, 'lng': gcjLon };
    let d = delta(gcjLat, gcjLon);
    let lat = gcjLat - d.lat;
    let lon = gcjLon - d.lon;
    for (let i = 0; i < 1; i++) {
        d = delta(lat, lon);
        lat = gcjLat - d.lat;
        lon = gcjLon - d.lon;
    }
    return {'lat' :lat,'lng' : lon};

}




/**
 * 批量gps--->高德
 * @param [{ lat :xxx,lng:xxx}] list 
 */
export function batchGps2gd(list){
    let rlist = [];
    for(let i=0;i<list.length;i++){
        rlist.push(gps2gd(list[i].lat,list[i].lng))
    }
    return rlist;
}

////无返回 直接处理字段 阻塞型
export function localConvert(list,lngName,latName,usePR){
    if(list instanceof Array){
        //原有点
        let locations = list.map(n=>{return {lat:n[latName],lng:n[lngName]}});
        // console.info('批量坐标转换数量:'+locations.length);
        let results = batchGps2gd(locations);
        if(usePR){
            for(let i=0;i<results.length;i++){
                list[i].P = results[i].lat;
                list[i].R = results[i].lng;
            } 
        }else{
            for(let i=0;i<results.length;i++){
                list[i][latName] = results[i].lat;
                list[i][lngName] = results[i].lng;
            } 
        }

    }else if((list instanceof Object)&&list!=null&&list!=undefined){
        // console.info('转换坐标1个');
       let res = gps2gd(list[latName],list[lngName]);
       if(usePR){
        list.P = res.lat;
        list.R = res.lng;     
       }else{
        list[latName] = res.lat;
        list[lngName] = res.lng;  
       }
    
    }
}

/// gps->Gd 转换 结构如同 [[104.31892600,30.71867200], [104.31836300,30.71835900], [104.31769800,30.71797600]]的数据机构点 
export function localConvertArray(arrayList){
    arrayList.forEach(arr => {
        let p = gps2gd(arr[1],arr[0])
        arr[0] = p.lng;
        arr[1] = p.lat;
    });
    return arrayList;
}


export function gpsToGd(wgLon, wgLat) {
    let pi = 3.14159265358979324;
    let a = 6378245.0;
    let ee = 0.00669342162296594323;
    let cj, cw;

    if (outOfChina(wgLat, wgLon)) {
        return false;
    } else {
        wgLat = parseFloat(wgLat);
        wgLon = parseFloat(wgLon);
        let dLat = transformLat(wgLon - 105.0, wgLat - 35.0);
        let dLon = transformLon(wgLon - 105.0, wgLat - 35.0);
        let radLat = wgLat / 180.0 * pi;
        let magic = Math.sin(radLat);
        let magic2 = 1 - ee * magic * magic;
        let sqrtMagic = Math.sqrt(magic2);
        dLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic2 * sqrtMagic) * pi);
        dLon = (dLon * 180.0) / (a / sqrtMagic * Math.cos(radLat) * pi);

        cw = wgLat + dLat;
        cj = wgLon + dLon;
        return [cj, cw]
    }

    //判断经纬度是否在中国
    function outOfChina(lat, lon) {
        if (lon < 72.004 || lon > 137.8347)
            return true;
        if (lat < 0.8293 || lat > 55.8271)
            return true;
        return false;
    }

    function transformLat(x, y) {
        let ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x));
        ret += (20.0 * Math.sin(6.0 * x * pi) + 20.0 * Math.sin(2.0 * x * pi)) * 2.0 / 3.0;
        ret += (20.0 * Math.sin(y * pi) + 40.0 * Math.sin(y / 3.0 * pi)) * 2.0 / 3.0;
        ret += (160.0 * Math.sin(y / 12.0 * pi) + 320 * Math.sin(y * pi / 30.0)) * 2.0 / 3.0;
        return ret;
    }

    function transformLon(x, y) {
        let ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));
        ret += (20.0 * Math.sin(6.0 * x * pi) + 20.0 * Math.sin(2.0 * x * pi)) * 2.0 / 3.0;
        ret += (20.0 * Math.sin(x * pi) + 40.0 * Math.sin(x / 3.0 * pi)) * 2.0 / 3.0;
        ret += (150.0 * Math.sin(x / 12.0 * pi) + 300.0 * Math.sin(x / 30.0 * pi)) * 2.0 / 3.0;
        return ret;
    }
}

