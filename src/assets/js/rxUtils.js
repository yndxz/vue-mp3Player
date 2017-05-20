export const rxUtils = {
  // apiUrl: "http://rx.ichu.cn/",
  //开发图片用
  // imgUrl: "http://jrjr-test.img-cn-hangzhou.aliyuncs.com/",
  hz: "@100_1l_100p_q90_0-0-0bgc_90sh.png",
  hz2: ""
}, u = window.navigator.userAgent;
rxUtils.imgRulesJPG = '?x-oss-process=image/format,jpg/interlace,1/quality,q_80'; //阿里图片规则放在获取到的图片后面
rxUtils.imgRulesPNG = '?x-oss-process=image/format,png/interlace,1/quality,q_80'; //阿里图片规则放在获取到的图片后面
// rxUtils.hostname = 'iqiaorong.com';//测试
rxUtils.hostname = 'findaily.cn';//线上
// rxUtils.subUrl = 'rest.'; //测试
rxUtils.subUrl = 'mobile.'; //线上

rxUtils.www = 'https://www.'; // www
rxUtils.user = 'https://user.'; // user



// schema:'http',
rxUtils.schema = 'https';
rxUtils.apiUrl = 'https://' + rxUtils.subUrl + rxUtils.hostname + '/';
rxUtils.apiUrlFuLi = 'https://www.findaily.cn/';//福利用
// rxUtils.imgUrl = 'https://img.' + rxUtils.hostname;//图片
rxUtils.imgUrl = 'https://img.findaily.cn/';//图片 线上
//直连接口
rxUtils.zhiLianUrl = 'https://zl.' + rxUtils.hostname + '/';//直连测试
//H5URL
rxUtils.h5ShareUrlWX = 'https://m.' + rxUtils.hostname + '/wx/'; // H5分享链接
rxUtils.h5ShareUrlAPP = 'https://m.' + rxUtils.hostname + '/appshare/'; // H5分享链接
rxUtils.h5WvUrl = 'https://jrwv.' + rxUtils.hostname + '/';// H5webview


//阿里云图片根据设备设置
rxUtils.imgJPG3x = '@' + rxUtils.winW * 3 + rxUtils.imgArgs + '.jpg';
rxUtils.imgPng3x = '@' + rxUtils.winW * 3 + rxUtils.imgArgs + '.png';

//千分符
rxUtils.mil = function (str) {
  return str.replace(/\d/g,function(r,i){
    let n=(str.length-1-i);
    return (n>0&&n%3===0) && (r+",") || r
  })
}
//获取样式
rxUtils.getCss = function (curEle, attr) {
  var val = null;
  if ("getComputedStyle" in window) {
    val = window.getComputedStyle(curEle, null)[attr];
  } else {
    val = curEle.currentStyle[attr];
  }
  var reg = /^(((margin|padding)?(top|left|bottom|right))|(width|height))$/i;
  if (reg.test(attr)) {
    if (val.indexOf("%") === -1) {
      return parseFloat(val);
    }
  }
  return val;
};
//观察者模式
rxUtils.Observer = (function () {
  //防止消息队列暴漏而被篡改故将消息容器作为静态私有变量保存
  let __msg = {};
  return {
    on: function (eType, handler) {//1.如果此消息不存在则应该创建一个该消息类型 2.将动作推入到该消息对应的动作执行队列中 3.将动作方法推入该消息对应的动作执行序列中
      !(eType in __msg) ? __msg[eType] = [handler] : __msg[eType].push(handler)
    },
    run: function (eType, args) {
      if (!__msg[eType])return;//如果该消息没有注册，则返回
      let i = 0, len = __msg[eType].length;//定义消息信息
      for (; i < len; i++) __msg[eType][i].call(this, args)//遍历消息动作//依次执行注册的消息对应的动作序列;
    },
    off: function (eType, handler) {
      if (__msg[eType] instanceof Array) {//如果消息动作队列存在
        let i = __msg[eType].length - 1;//从最后一个消息动作遍历
        for (; i >= 0; i--)__msg[eType][i] === handler && __msg[eType].splice(i, 1);//如果存在该动作则在消息动作序列中移除相应动作
      }
    }
  }
})();

//移动端适配
rxUtils.autoPage = function (desW, fs) {
  var that = this
  window.onresize = change
  change();
  function change() {
    var html = document.getElementsByTagName('html')[0], winW = html.clientWidth;
    winW >= desW ? html.style.fontSize = fs + 'px' : html.style.fontSize = fs / desW * winW + 'px';
  }

  var html = document.getElementsByTagName("html")[0]
  var fW = parseInt(html.style.fontSize)
  var w = html.clientWidth
  var imgw = parseInt(w - fW * 0.8333 * 2)
  var imgh = parseInt(456 / 1155 * imgw)
  that.hz2 = "@" + imgw + "w_" + imgh + "h_1e_1l_100p_q90_0-0-0bgc_90sh.jpg"
  // that.hz2="@100p.jpg"
}
//rem 适配
rxUtils.setRem = function (itemNum) {
  let size = itemNum || 15;
  window.onresize = remSize;
  remSize();
  function remSize() {
    let html = document.getElementsByTagName('html')[0], w = html.clientWidth;
    w = w > 768 ? 768:w;
    html.style.fontSize = w / size + 'px'
  }
}

//时间处理方法集合
rxUtils.date = {
  //当前时间对象，用于保存获取的服务器当前时间，
  //在rx.date.useServerTime中初始化
  currentDate: null,
  /*
   传入字串格式化时间,常用字串格式：YYYY-MM-dd HH:ii:ss w
   yyyy:年 MM:月 dd:日 HH:小时 ii:分钟 ss:秒 w:周 e:周(英文)
   pattern : 格式化字符串
   source : 时间对象或时间戳。可选，默认使用 this.currentDate 或 new Date()
   */
  format: function (pattern, source) {
    if (typeof source == 'number') source = new Date(source);
    else source = source || this.currentDate || new Date();

    if ('string' != typeof(pattern)) {
      return source.toString();
    }

    function replacer(patternPart, result) {
      pattern = pattern.replace(patternPart, result + '');
    }

    var pad = rxUtils.pad,
      year = source.getFullYear(),
      month = source.getMonth() + 1,
      date2 = source.getDate(),
      hours = source.getHours(),
      minutes = source.getMinutes(),
      seconds = source.getSeconds(),
      weekDay = source.getDay();

    //星期日~星期六
    var weekDays = ['\u661f\u671f\u65e5', '\u661f\u671f\u4e00', '\u661f\u671f\u4e8c', '\u661f\u671f\u4e09', '\u661f\u671f\u56db', '\u661f\u671f\u4e94', '\u661f\u671f\u516d'];
    var weekDays_EN = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    replacer(/yyyy|YYYY/g, pad(year, 4));
    replacer(/yy|YY/g, pad(year.toString().slice(2), 2));
    replacer(/MM|mm/g, pad(month, 2));
    replacer(/M|m/g, month);
    replacer(/dd/g, pad(date2, 2));
    replacer(/d/g, date2);

    replacer(/HH/ig, pad(hours, 2));
    replacer(/H/ig, pad(hours % 12, 2));
    replacer(/i+/g, pad(minutes, 2));
    replacer(/s+/g, pad(seconds, 2));
    replacer(/w|W/g, weekDays[weekDay]);
    replacer(/e|e/g, weekDays_EN[weekDay]);

    return pattern;

  },
  /*
   传入日期字串，返回日期对象
   source : 日期字串格式：2011-11-22 12:34:56或2011-11-22 或 时间戳 或时间对象
   doffset : 整数日偏移量，前N天，后N天
   hoffset : 整数时偏移量，前N小时，后N小时
   moffset : 整数分偏移量，前N分，后N分
   soffset : 整数秒偏移量，前N秒，后N秒
   */
  getDate: function (source, doffset, hoffset, moffset, soffset) {
    doffset = doffset || 0;
    hoffset = hoffset || 0;
    moffset = moffset || 0;
    soffset = soffset || 0;
    if ('string' == typeof( source)) {
      var r = 'replace',
        dateArr = source[r](' ', '-')[r](/:/g, '-').split('-');
      if (dateArr.length == 3) {
        dateArr = dateArr.concat([0, 0, 0]);
      }
      $.each(dateArr, function (k, v) {
        dateArr[k] = parseInt(v, 10);
      });
      return new Date(dateArr[0], dateArr[1] - 1, dateArr[2] + doffset, dateArr[3] + hoffset, dateArr[4] + moffset, dateArr[5] + soffset);
    } else if ('number' == typeof( source)) {
      var date = new Date(source);
      if (date.getTime() != source) {
        date.setTime(source);
        if (date.getTime() != source) {
          var secondTime = 1000,
            minuteTime = 60 * secondTime,
            hourTime = 60 * minuteTime,
            dayTime = 24 * hourTime,

            days = Math.floor(source / dayTime),
            hours = Math.floor(source % dayTime / hourTime),
            minutes = Math.floor(source % hourTime / minuteTime),
            seconds = Math.floor(source % minuteTime / secondTime);

          date = this.getDate('1970-01-01 08:00:00', days, hours, minutes, seconds);
        }
      }

      return this.getDate(date, doffset, hoffset, moffset, soffset);
    } else {
      source = source || this.currentDate || new Date();
      var year = source.getFullYear(),
        month = source.getMonth(),
        date2 = source.getDate(),
        hours = source.getHours(),
        minutes = source.getMinutes(),
        seconds = source.getSeconds();

      return new Date(year, month, (date2 + doffset), hours + hoffset, minutes + moffset, seconds + soffset);
    }
  },
  /*
   计算从日期source到dest的毫秒数
   dest 日期字串格式：2011-11-22 12:34:56或2011-11-22 或 时间戳 或 时间对象
   source 日期字串格式：2011-11-22 12:34:56或2011-11-22 或 时间戳 或 时间对象
   */
  duration: function (dest, source) {
    if (typeof(dest) == 'undefined')return false;
    return this.getDate(dest, 0) - this.getDate(source, 0);

  },
  //倒计时
  countDown: function (dest, src) {
    var f_floor = Math.floor,
      times = Math.round(this.duration(dest, src) / 1000);

    if (times < 0) return null;

    var days = f_floor(times / (3600 * 24)),
      hours = f_floor((times - (days * 3600 * 24)) / 3600),
      minutes = f_floor((times - (hours * 3600) - (days * 3600 * 24)) / 60);
    seconds = times % 60;

    return {days: days, hours: hours, minutes: minutes, seconds: seconds};
  },
  //使用服务器时间，当需要与服务器时间同步时使用
  useServerTime: function () {
    var path = location.href;

    var req = new XMLHttpRequest();

    req.open('HEAD', path + (path.indexOf('?') > -1 ? '&' : '?') + Math.random(), false);
    req.send(null);
    var dateStr = req.getResponseHeader("Date");
    if (dateStr) {
      var gmtDate = new Date(dateStr);

      var utcYear = gmtDate.getUTCFullYear(),
        utcMonth = gmtDate.getMonth(),
        utcDate = gmtDate.getUTCDate(),

        utcHours = gmtDate.getUTCHours(),
        utcMinutes = gmtDate.getUTCMinutes(),
        utcSeconds = gmtDate.getUTCSeconds();

      this.currentDate = new Date(utcYear, utcMonth, utcDate, utcHours + 8, utcMinutes, utcSeconds);

      var interval = 1000,
        self = this;
      setInterval(function () {
        self.currentDate = new Date(self.currentDate.getTime() + interval);
      }, interval);
    }
  }
}
//url操作方法集合
rxUtils.dateFormat = function (fmt, date) {
  date = date || new Date();
  var o = {
    "M+": date.getMonth() + 1, //月份
    "d+": date.getDate(), //日
    "h+": date.getHours(), //小时
    "m+": date.getMinutes(), //分
    "s+": date.getSeconds(), //秒
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
    "S": date.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}


rxUtils.url = {
  //当前页面url
  href: location.href,
  //当前页面查询字符串
  search: location.search,
  //查询URL传递的参数值
  query: function (key, search) {
    search = search || this.search;
    var reg = new RegExp('(^|&|\\?|#)' + key + '=([^&]*)(&|\x24)', '');
    var match = search.match(reg);
    if (match) {
      return match[2];
    }
    return null;
  },
  //将查询字符串转成json对象
  query2json: function (search) {
    search = search || this.search;
    var f_indexOf = 'indexOf',
      f_split = 'split';
    if (search[f_indexOf]('=') < 0) {
      return {};
    }
    if (search[f_indexOf]('?') > -1) {
      search = search.substr(1);
    }
    var searchArr = search[f_split]('&'),
      ret = {};

    for (var i = searchArr.length - 1; i >= 0; i--) {
      var kv = searchArr[i][f_split]('='),
        k = kv[0],
        v = kv[1];
      ret[k] = v;
    }
    return ret;
  },
  //将json对象转成查询字符串
  json2query: function (o) {
    var ret = [];
    for (k in o) {
      ret.push(k + '=' + o[k]);
    }
    return ret.join('&');
  },
  //重命名encodeURIComponent
  encode: function (url) {
    return encodeURIComponent(url || this.href);
  },
  //重命名decodeURIComponent
  decode: function (url) {
    return decodeURIComponent(url || this.href);
  },
  //获取文件路径
  getPath: function (url) {
    url = url || this.href;
    return url.substring(0, url.lastIndexOf('/') + 1);
  },
  //获取文件名
  getFile: function (url) {
    url = (url || this.href).split('?')[0];
    return url.substring(url.lastIndexOf('/') + 1);
  },
  //获取文件扩展名
  getFileExt: function (url) {
    url = this.getFile(url);
    return url.substring(url.lastIndexOf('.'));
  },
  //获取不含后缀文件名
  getFilename: function (url) {
    url = this.getFile(url);
    return url.substring(0, url.lastIndexOf('.'));
  },
  //获取域名
  getDomain: function (url) {
    url = url || this.href;
    var beginPos = url.indexOf('//');
    if (beginPos < 0)return '';

    beginPos += 2;

    var endPos = url.indexOf('/', beginPos);
    if (endPos < 0) endPos = url.length;
    return url.substring(beginPos, endPos);
  }
}
//打印
rxUtils.log = function () {
  if (window.console) {
    $.each(arguments, function (k, v) {
      console.log(v)
    });
  }
}
//是否JSON对象
rxUtils.isJSON = function (obj) {
  var isJSON = typeof(obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length;
  return isJSON;
}
//补齐前缀0
rxUtils.pad = function (source, length) {
  return rxUtils.repeat('0', length - (source + '').length) + source;
}
//重复字符串
rxUtils.repeat = function (source, length) {
  return (new Array(length > -1 ? length + 1 : 0)).join(source);
}
//随机数
rxUtils.random = function () {
  return new Date().getTime() + (Math.random() + '').substring(2);
}
//sessionStorage操作方法，使支持存储json对象
rxUtils.sessionStorage = {
  setItem: function (key, val) {
    if (window.sessionStorage) sessionStorage.setItem(key, JSON.stringify(val));
  },
  getItem: function (key) {
    if (window.sessionStorage) return JSON.parse(sessionStorage.getItem(key));
  },
  removeItem: function (key) {
    if (window.sessionStorage) sessionStorage.removeItem(key);
  }
}
//localStorage操作方法，使支持存储json对象
rxUtils.localStorage = {
  setItem: function (key, val) {
    if (window.localStorage) localStorage.setItem(key, JSON.stringify(val));
  },
  getItem: function (key) {
    if (window.localStorage) return JSON.parse(localStorage.getItem(key));
  },
  removeItem: function (key) {
    if (window.localStorage) localStorage.removeItem(key);
  }
}
rxUtils.isAndroid = '';
rxUtils.isiOS = '';
rxUtils.androidVer = '';
rxUtils.isWeixin = (function () {
  return u.toLowerCase().match(/MicroMessenger/i) == 'micromessenger' && true || false
})()//微信
rxUtils.detectionVersion = (function () {
  rxUtils.isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 || u.indexOf('Linux') > -1; //android终端
  rxUtils.isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  if (rxUtils.isAndroid) {
    //安卓版本
    rxUtils.androidVer = u.substr(u.indexOf('Android') + 8, 3);
  }
})();

//颜色RGB转16进制
rxUtils.RGBToHex = function (rgb) {
  var regexp = /^rgb\(([0-9]{0,3})\,\s([0-9]{0,3})\,\s([0-9]{0,3})\)/g,
    re = rgb.replace(regexp, "$1 $2 $3").split(" "),//利用正则表达式去掉多余的部分,
    hexColor = "#", hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
  for (var i = 0; i < 3; i++) {
    var r = null;
    var c = re[i];
    var hexAr = [];
    while (c > 16) {
      r = c % 16;
      c = (c / 16) >> 0;
      hexAr.push(hex[r]);
    }
    hexAr.push(hex[c]);
    hexColor += hexAr.reverse().join('');
  }
  return hexColor;
}
//扩展对象
rxUtils.extend = function () {
  var a = arguments,
    len = a.length;
  if (len < 1)return a[0];
  else if (len < 2) {
    this.extend(this, a[0]);
  } else if (len < 3) {
    for (let k in a[1]) {
      a[0][k] = a[1][k];
    }
    return a[0];
  } else {
    var obj = a[0];
    for (let i = 1; i < len; i++) {
      obj = this.extend(obj, a[i]);
    }
    return obj;
  }
}
//JSON字符串转对象
rxUtils.parseJson = function (jsonStr) {
  if (typeof jsonStr != 'string')return jsonStr;
  if (window.JSON) {
    return JSON.parse(jsonStr);
  } else {
    return eval('(' + jsonStr + ')');
  }
}

~function () {
  var aryPro = Array.prototype;
  aryPro.myDistinct = function () {
    var obj = {};
    for (var i = 0; i < this.length; i++) {
      var cur = this[i];
      if (obj[cur] == cur) {
        this[i] = this[this.length - 1];
        this.length -= 1;
        i--;
        continue;
      }
      obj[cur] = cur;
    }
    obj = null;
  };
  aryPro.myForEach = function (fn, context) {
    context = context || window;
    if (Array.prototype.forEach) {
      this.forEach(fn, context);
    } else {
      for (var i = 0; i < this.length; i++) {
        fn.apply(context, [this[i], i, this]);
      }
    }
  };
  var strPro = String.prototype;
  strPro.myTrim = function () {
    return this.replace(/(^\s*|\s*$)/g, "");
  };
  strPro.mySub = function () {
    var len = arguments[0] || 10, isD = arguments[1] || false, str = "", n = 0;
    for (var i = 0; i < this.length; i++) {
      var s = this.charAt(i);
      /[\u4e00-\u9fa5]/.test(s) ? n += 2 : n++;
      if (n > len) {
        isD ? str += "..." : void 0;
        break;
      }
      str += s;
    }
    return str;
  };
  strPro.myQueryURLParameter = function () {
    var reg = /([^?&=]+)=([^?&=]+)/g, obj = {};
    this.replace(reg, function () {
      obj[arguments[1]] = arguments[2];
    });
    return obj;
  };
}();
rxUtils.addZero = function (val) {
  return val < 10 ? "0" + val : val;
}
rxUtils.countDown = function (over) {
  var tarTime = new Date(over);
  var nowTime = new Date();
  //1、获取两个时间之间的毫秒差
  var span = tarTime - nowTime;
  //2、计算span中包含多少个小时
  var hours = Math.floor(span / (1000 * 60 * 60));
  var _hours = parseInt(Math.floor(span / (1000 * 60 * 60) % 24), 10);
  var days = parseInt(Math.floor(hours / 24), 10);
  //3、获取除了小时以外剩余的毫秒数
  span = span - (hours * 60 * 60 * 1000);
  //4、计算剩下的span中包含多少分钟
  var minutes = parseInt(Math.floor(span / (1000 * 60)), 10);
  //5、获取除了分钟以外的剩余的毫秒数
  span = span - (minutes * 60 * 1000);
  //6、计算剩下的span中包含多少秒
  var seconds = parseInt(Math.floor(span / 1000), 10);
  //7、拼接我们的字符串
//        return days +'-'+rxUtils.addZero(_hours)+'-'+rxUtils.addZero(minutes)+'-'+rxUtils.addZero(seconds)
  return {
    days: days,
    hours: rxUtils.addZero(_hours),
    minutes: rxUtils.addZero(minutes),
    seconds: rxUtils.addZero(seconds)
  }
//        return days+"天"+rxUtils.addZero(_hours) +"时" + rxUtils.addZero(minutes) +"分" + rxUtils.addZero(seconds)+"秒";
}


export default rxUtils
