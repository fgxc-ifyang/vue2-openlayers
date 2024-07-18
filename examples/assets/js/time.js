var now = new Date(); // 当前日期
var nowDayOfWeek = now.getDay(); // 今天本周的第几天
var nowDay = now.getDate(); // 当前日
var nowMonth = now.getMonth(); // 当前月
var nowYear = now.getYear(); // 当前年
nowYear += nowYear < 2000 ? 1900 : 0;
/**
 * @param 日期格式化
 * @returns {String}
 */
function formatDate(date) {
  var myyear = date.getFullYear();
  var mymonth = date.getMonth() + 1;
  var myweekday = date.getDate();

  if (mymonth < 10) {
    mymonth = "0" + mymonth;
  }
  if (myweekday < 10) {
    myweekday = "0" + myweekday;
  }
  return myyear + "-" + mymonth + "-" + myweekday;
}

/**
 * 获得当前日期
 *
 */
export function getNowDay() {
  return formatDate(new Date());
}
/**
 * 获得本周的开始时间
 *
 */
export function getStartDayOfWeek() {
  var day = nowDayOfWeek || 7;
  return formatDate(
    new Date(now.getFullYear(), nowMonth, nowDay + 1 - day)
  );
}

/**
 * 获得本周的结束时间
 *
 */
export function getEndDayOfWeek() {
  var day = nowDayOfWeek || 7;
  return formatDate(
    new Date(now.getFullYear(), nowMonth, nowDay + 7 - day)
  );
}

/**
 * 获得本月的开始时间
 *
 */
export function getStartDayOfMonth() {
  var monthStartDate = new Date(nowYear, nowMonth, 1);
  return formatDate(monthStartDate);
}

/**
 * 获得本月的结束时间
 *
 */
export function getEndDayOfMonth() {
  var monthEndDate = new Date(nowYear, nowMonth, getMonthDays());
  return formatDate(monthEndDate);
}

/**
 * 获得本月天数
 *
 */
export function getMonthDays() {
  var monthStartDate = new Date(nowYear, nowMonth, 1);
  var monthEndDate = new Date(nowYear, nowMonth + 1, 1);
  var days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
  return days;
}

/**
 * 获取当前年份的第一天
 * @returns {string} 例如 2022-01-01
 */
export function getYearFirstDay() {
  var date = new Date();
  var year = date.getFullYear();
  return year + '-01-01'
}

/**
 * 获取当前年份的最后一天
 * @returns {string} 2022-12-31
 */
export function getYearLastDay() {
  var date = new Date();
  var year = date.getFullYear();
  return year + '-12-31'
}