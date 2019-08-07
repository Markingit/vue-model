export function getTimeline(timestamp) {
    function zeroize(num) {
      return (String(num).length == 1 ? '0' : '') + num;
    }
    const curTimestamp = parseInt(new Date().getTime() / 1000); //当前时间戳
    const timestampDiff = curTimestamp - timestamp; // 参数时间戳与当前时间戳相差秒数
    const curDate = new Date(curTimestamp * 1000); // 当前时间日期对象
    const tmDate = new Date(timestamp * 1000); // 参数时间戳转换成的日期对象
    var Y = tmDate.getFullYear(),
      m = tmDate.getMonth() + 1,
      d = tmDate.getDate();
    if (curDate.getFullYear() == Y && curDate.getMonth() + 1 == m && curDate.getDate() == d) {
      return '今天';
    } else {
      var newDate = new Date((curTimestamp - 86400) * 1000); // 参数中的时间戳加一天转换成的日期对象
      if (newDate.getFullYear() == Y && newDate.getMonth() + 1 == m && newDate.getDate() == d) {
        return '昨天';
      } else {
        return Y + '-' + zeroize(m) + '-' + zeroize(d);
      }
    }
  }
  
  
  export function getFormatDate(timestamp, strFormat) {
    if (timestamp && timestamp.length == 10) {
      timestamp = timestamp * 1000;
    }
    var newDate = new Date(timestamp);
    Date.prototype.format = function (format) {
      var date = {
        'M+': this.getMonth() + 1,
        'd+': this.getDate(),
        'h+': this.getHours(),
        'm+': this.getMinutes(),
        's+': this.getSeconds(),
        'q+': Math.floor((this.getMonth() + 3) / 3),
        'S+': this.getMilliseconds()
      };
      if (/(y+)/i.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
      }
      for (var k in date) {
        if (new RegExp('(' + k + ')').test(format)) {
          format = format.replace(RegExp.$1, RegExp.$1.length == 1 ?
            date[k] : ('00' + date[k]).substr(('' + date[k]).length));
        }
      }
      return format;
    }
    return newDate.format(strFormat || 'yyyy-MM-dd'); // yyyy-MM-dd h:m
  }
  
  
  export function formatDateToZeroTime(time) {
    let date = new Date(time);
    var startTime, endTime;
    date.setHours(0);
    date.setMinutes(0);
    date.setMilliseconds(0);
    date.setSeconds(0);
    startTime = date.getTime();
    date.setHours(23);
    date.setMinutes(59);
    date.setSeconds(59);
    endTime = date.getTime();
    return {
      startTime: startTime,
      endTime: endTime
    }
  }
  
  export function getNextMonth(date) {
    var arr = date.split('-');
    var year = arr[0]; //获取当前日期的年份
    var month = arr[1]; //获取当前日期的月份
    var day = arr[2]; //获取当前日期的日
    var days = new Date(year, month, 0);
    days = days.getDate(); //获取当前日期中的月的天数
    var year2 = year;
    var month2 = parseInt(month) + 1;
    if (month2 == 13) {
      year2 = parseInt(year2) + 1;
      month2 = 1;
    }
    var day2 = day;
    var days2 = new Date(year2, month2, 0);
    days2 = days2.getDate();
    if (day2 > days2) {
      day2 = days2;
    }
    if (month2 < 10) {
      month2 = '0' + month2;
    }
  
    var t2 = year2 + '-' + month2 + '-' + day2;
    return t2;
  }
  
  export function formatCurrencyByFen(num, decimals, prefix) {
    var num = formatFenToYuan(num);
    return formatCurrency(num, decimals, prefix)
  }
  
  
  export function formatFenToYuan(num, toFixed) {
    
    if (!num) return 0;
    
    //分到元
    num = num / 100;
  
    if (toFixed && (num+'').indexOf('.') > 0) {
      // console.log(2)
      num = toDecimal2(num);
    }
    // console.log("num",num);
    return num;
  }
  
  export function formatFenToYuan2(num) {
    console.log(num);
    //  不四舍五入
    if (!num) return 0;
    num = Math.floor(num/100 * 100) / 100
    // num = Number((num/100).toString().match(/^\d+(?:\.\d{0,2})?/)) 
  
  
  
    return num;
  }
  
  function toDecimal2(x) {
    var f = parseFloat(x);
    if (isNaN(f)) {
      return false;
    }
    var f = Math.round(x * 100) / 100;
    var s = f.toString();
    var rs = s.indexOf('.');
    if (rs < 0) {
      rs = s.length;
      s += '.';
    }
    while (s.length <= rs + 2) {
      s += '0';
    }
    return s;
  }
  
  
  // 小数点转百分比
  export function toPercent(point) {
    return parseFloat((point * 100).toPrecision(12)) + "%";
  }
  
  function formatCurrency(number, decimals, prefix) {
  
    var chineseReg = RegExp('[\u4e00-\u9fa5]+$');
  
    decimals = decimals || 2;
    if (isNaN(number)) {
      console.warn('[NumberFormat.formatCurrency]');
      number = 0
    }
  
    number = +number;
    number = number.toFixed(decimals)
  
    if (chineseReg.test(prefix)) {
      return number + prefix
    }
  
    if (prefix) {
      return prefix + number;
    }
  
    return number;
  }
  
  
  // beforMonth 前一个月
  export function beforMonth() {
    Date.prototype.format = function (format) {
      var o = {
        "M+": this.getMonth() + 1, // month
        "d+": this.getDate(), // day
        "h+": this.getHours(), // hour
        "m+": this.getMinutes(), // minute
        "s+": this.getSeconds(), // second
        "q+": Math.floor((this.getMonth() + 3) / 3), // quarter
        "S": this.getMilliseconds()
        // millisecond
      }
      if (/(y+)/.test(format))
        format = format.replace(RegExp.$1, (this.getFullYear() + "")
          .substr(4 - RegExp.$1.length));
      for (var k in o)
        if (new RegExp("(" + k + ")").test(format))
          format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] :
            ("00" + o[k]).substr(("" + o[k]).length));
      return format;
    }
    var begin = new Date();
    new Date(begin.setMonth((new Date().getMonth() - 1)));
    var begintime = begin.format("yyyy-MM-dd");
    return begintime;
  }
  
  
  
  export function priceFontSizeLen(num,fz){
    num = formatFenToYuan(num) + '';
    if(fz){
      if (num.indexOf('.') != -1 && num.length > 6) {
        num = '<span style="font-size: '+ fz +'px;">¥' + num + '</span>'
      } else if (num.length >= 6) {
        num = '<span class="fz'+ fz +'">¥' + num + '</span>'
      } else {
        num = '¥' + num
      }
    }
    return num;
  }
  
  
  export function parseFloatNum (num){
    // return parseFloat((num).toPrecision(12))
    return Math.floor(num * 100) / 100
  }
  
  
  
  var accMul = function(num1, num2) {
    num1 = Number(num1);
    num2 = Number(num2);
    var times = 0, s1 = num1.toString(), s2 = num2.toString();
    try { times += countDecimals(s1); } catch (e) { }
    try { times += countDecimals(s2); } catch (e) { }
    var result = convertToInt(s1) * convertToInt(s2) / Math.pow(10, times);
    return getCorrectResult("mul", num1, num2, result);
    // return result;
  };
  
  // 相加
  export function accAdd(num1, num2) {
    num1 = Number(num1);
    num2 = Number(num2);
    var dec1, dec2, times;
    try { dec1 = countDecimals(num1)+1; } catch (e) { dec1 = 0; }
    try { dec2 = countDecimals(num2)+1; } catch (e) { dec2 = 0; }
    times = Math.pow(10, Math.max(dec1, dec2));
    // var result = (num1 * times + num2 * times) / times;
    var result = (accMul(num1, times) + accMul(num2, times)) / times;
    return getCorrectResult("add", num1, num2, result);
    // return result;
  };
  
  // 相减
  export function accSub(num1, num2) {
    num1 = Number(num1);
    num2 = Number(num2);
    var dec1, dec2, times;
    try { dec1 = countDecimals(num1)+1; } catch (e) { dec1 = 0; }
    try { dec2 = countDecimals(num2)+1; } catch (e) { dec2 = 0; }
    times = Math.pow(10, Math.max(dec1, dec2));
    // var result = Number(((num1 * times - num2 * times) / times);
    var result = Number((accMul(num1, times) - accMul(num2, times)) / times);
    return getCorrectResult("sub", num1, num2, result);
    // return result;
  };
  
  
  
  var countDecimals = function(num) {
    var len = 0;
    try {
        num = Number(num);
        var str = num.toString().toUpperCase();
        if (str.split('E').length === 2) { // scientific notation
            var isDecimal = false;
            if (str.split('.').length === 2) {
                str = str.split('.')[1];
                if (parseInt(str.split('E')[0]) !== 0) {
                    isDecimal = true;
                }
            }
            let x = str.split('E');
            if (isDecimal) {
                len = x[0].length;
            }
            len -= parseInt(x[1]);
        } else if (str.split('.').length === 2) { // decimal
            if (parseInt(str.split('.')[1]) !== 0) {
                len = str.split('.')[1].length;
            }
        }
    } catch(e) {
        throw e;
    } finally {
        if (isNaN(len) || len < 0) {
            len = 0;
        }
        return len;
    }
  };
  
  var convertToInt = function(num) {
    num = Number(num);
    var newNum = num;
    var times = countDecimals(num);
    var temp_num = num.toString().toUpperCase();
    if (temp_num.split('E').length === 2) {
        newNum = Math.round(num * Math.pow(10, times));
    } else {
        newNum = Number(temp_num.replace(".", ""));
    }
    return newNum;
  };
  
  var getCorrectResult = function(type, num1, num2, result) {
    var temp_result = 0;
    switch (type) {
        case "add":
            temp_result = num1 + num2;
            break;
        case "sub":
            temp_result = num1 - num2;
            break;
        case "div":
            temp_result = num1 / num2;
            break;
        case "mul":
            temp_result = num1 * num2;
            break;
    }
    if (Math.abs(result - temp_result) > 1) {
        return temp_result;
    }
    return result;
  };
  