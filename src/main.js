import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import axios from 'axios' // axios
Vue.prototype.$axios = axios; // axios实例化

import Qs from 'qs' // qs
Vue.prototype.$qs = Qs; // Qs实例化

// ElementUI框架
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// import '../element-variables.scss'
Vue.use(ElementUI);

import ReconnectingWebSocket from '../public/static/js/io'

// echarts
import echarts from 'echarts'
import china from 'echarts/map/json/china.json'
echarts.registerMap('china', china)
Vue.prototype.$echarts = echarts

// dataV
import dataV from '@jiaminghi/data-view'
Vue.use(dataV)

import Print from 'vue-print-nb'
Vue.use(Print)

// momentjs
import moment from 'moment'
Vue.prototype.$moment = moment;
moment.locale('zh-cn'); // 汉化

// // 全局Loading - 打开
// const showLoading = () => {
// 	ElementUI.Loading.service({
// 		// spinner: 'el-icon-loading',
// 		fullscreen: true,
// 		text: "拼命加载中",
// 		background: "rgba(0,0,0,.4)"
// 	});
// }

// // 全局Loading - 关闭
// const closeLoading = () => {
// 	ElementUI.Loading.service({}).close();
// }

import { Message, Loading } from 'element-ui';
import _ from 'lodash';
let loadingInstance; //loading 实例
let needLoadingRequestCount = 0; //当前正在请求的数量

function showLoading() {
	let main = document.querySelector('#elMain')
	// if (main) {
	if (needLoadingRequestCount === 0 && !loadingInstance) {
		loadingInstance = Loading.service({
			target: main,
			text: '正在加载...',
			spinner: 'el-icon-loading',
			background: 'rgba(0,0,0,0.3)',
		});
	}
	needLoadingRequestCount++;
	// }
}
function closeLoading() {
	Vue.nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
		needLoadingRequestCount--;
		needLoadingRequestCount = Math.max(needLoadingRequestCount, 0); // 保证大于等于0
		if (needLoadingRequestCount === 0) {
			if (loadingInstance) {
				hideLoading()
			}
		}
	});
}
//防抖：将 300ms 间隔内的关闭 loading 便合并为一次。防止连续请求时， loading闪烁的问题。
//因为有时会碰到在一次请求完毕后又立刻又发起一个新的请求的情况（比如删除一个表格一行后立刻进行刷新）
//这种情况会造成连续 loading 两次，并且中间有一次极短的闪烁。通过防抖可以让 300ms 间隔内的 loading 便合并为一次，避免闪烁的情况。
var hideLoading = _.debounce(() => {
	// needLoadingRequestCount = 0;
	loadingInstance.close();
	loadingInstance = null;
}, 300);

// 1 - 开发环境;2 - 生产环境
let urlType = 2;
if (urlType == 1) {
	Vue.prototype.urla = 'urla';
	Vue.prototype.urlb = 'urlb';
	Vue.prototype.esb = 'esb';
} else {
	// Vue.prototype.urla = 'http://192.168.100.107:11212/index.php/';
	Vue.prototype.urla = 'https://api.yumoyo.cn/index.php/';
	// Vue.prototype.urlb = 'http://192.168.100.107:11212/index.php/';
	Vue.prototype.urlb = 'https://api.yumoyo.cn/index.php/';
	Vue.prototype.esb = 'https://esb.yumaoyou.cn/index.php/';
}
Vue.prototype.pc = '/api/pc/'
Vue.prototype.mach = '/api/mach/'

Vue.prototype.api_4 = '/api_4/comm/'

//定义headers格式
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';

// 请求拦截器
axios.interceptors.request.use(function (config) {
	let username = localStorage.getItem("username");
	let uid = localStorage.getItem(username + 'uid');
	let token = localStorage.getItem(uid + 'token');
	// config.headers.X - Api - Type = 'H5'

	if (token) {
		config.headers.Apptoken = localStorage.getItem(uid + 'token');
	} else {
		localStorage.clear();
		router.push("/");
		ElementUI.Message.error("登录已失效，请重新登录");
	}

	// if (config.method === 'post') {
	// 	config.data = Qs.stringify(config.data);
	// }
	showLoading();
	return config;
}, function (error) {
	closeLoading();
	return Promise.reject(error);
});

// 响应拦截器
axios.interceptors.response.use(function (response) {
	// setTimeout(function () {
	closeLoading();
	// }, 500);
	// 请求成功
	if (response.status == 200) {
		// token失效
		if (response.data.code == 128 || response.data.code == 101 || response.data.code == -2 || response.data.code == -1) {
			localStorage.clear()
			router.push('/')
			ws.onclose()
			elementUi.Message.error('该账号已在其他设备登录，请重新登录!')
			closeLoading()
			return false
			// 服务器失败
		} else {
			return response
		}
		// token失效
	} else {
		elementUi.Message.error(response.data.message + ',请联系管理员!')
		closeLoading()
		return false
	}
}, function (error, response) {
	ElementUI.Message.error(response.data.message + ',请联系管理员!');
	closeLoading();
	return Promise.reject(error);
});

// // 监听浏览器刷新
// function beforeunloadHandler(e) {
// 	e = e || window.event
// 	if (e) {
// 		e.returnValue = '关闭提示'
// 	}
// 	window.sessionStorage.setItem('a', 1)
// 	sessionStorage.clear('loginStatus')
// 	let loginStatus = sessionStorage.getItem('loginStatus')

// 	if (loginStatus == undefined) {
// 		localStorage.clear()
// 	}

// 	return '关闭提示'
// }

// window.addEventListener('beforeunload', e => beforeunloadHandler(e))

var beginTime = 0;//执行onbeforeunload的开始时间
var differTime = 0;//时间差
window.onunload = function () {
	differTime = new Date().getTime() - beginTime;
	if (differTime <= 5) {
		// console.log("浏览器关闭")
		localStorage.clear()
	} else {
		// console.log("浏览器刷新")
	}

}
window.onbeforeunload = function () {
	beginTime = new Date().getTime();
};

// axios - 请求
Vue.prototype.myAjax = (type, url, data = {}, F) => {
	if (type == 'get') {
		axios({
			method: type,
			url: url,
			params: data,
		}).then(res => {
			return F(res);
		},
			err => {
				return err
			})
	} else {
		axios({
			method: type,
			url: url,
			data: data
		}).then(res => {
			return F(res);
		},
			err => {
				return err
			})
	}
}

// 时间戳转 - 年-月-日 时：分：秒
Date.prototype.Format = function (fmt) {
	var o = {
		"M+": this.getMonth() + 1, // 月份
		"d+": this.getDate(), // 日
		"h+": this.getHours(), // 小时
		"m+": this.getMinutes(), // 分
		"s+": this.getSeconds(), // 秒
		"q+": Math.floor((this.getMonth() + 3) / 3), // 季度
		"S": this.getMilliseconds() // 毫秒
	};
	if (/(y+)/.test(fmt))
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + ""));
	for (var k in o)
		if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
	// new Date(1542274800000).Format('yy-MM-dd hh:mm:ss');  // 用法
}

// 裕茂优 - 定时器线路转换
Vue.prototype.line = (num) => {
	let arr1 = [0, 0, 0, 0, 0, 0, 0, 0];
	let arr2 = [0, 0, 0, 0, 0, 0, 0, 0];
	if (num > 8) {
		arr2.splice(16 - num, 1, 1);
		let newarr2 = arr2.join("");
		let newString2 = '00' + (Array(2).join(0) + parseInt(newarr2, 2).toString(16)).slice(-2);
		return newString2;
	} else {
		arr1.splice(8 - num, 1, 1);
		let newarr1 = arr1.join("");
		let newString1 = (Array(2).join(0) + parseInt(newarr1, 2).toString(16)).slice(-2) + '00';
		return newString1;
	}
}

// 裕茂优 - 16进制转字符串
Vue.prototype.hexCharCodeToStr = (hexCharCodeStr) => {
	var trimedStr = hexCharCodeStr.trim();
	var rawStr = trimedStr.substr(0, 2).toLowerCase() === "0x" ? trimedStr.substr(2) : trimedStr;
	var len = rawStr.length;
	if (len % 2 !== 0) {
		// ElementUI.Message.error("存在非法字符!");
		return "";
	}
	var curCharCode;
	var resultStr = [];
	for (var i = 0; i < len; i = i + 2) {
		curCharCode = parseInt(rawStr.substr(i, 2), 16);
		resultStr.push(String.fromCharCode(curCharCode));
	}
	return resultStr.join("");
}

// 裕茂优 - 16进制转2进制
Vue.prototype.hex_to_bin = (str) => {
	let hex_array = [{ key: 0, val: "0000" }, { key: 1, val: "0001" }, { key: 2, val: "0010" }, { key: 3, val: "0011" }, { key: 4, val: "0100" }, { key: 5, val: "0101" }, { key: 6, val: "0110" }, { key: 7, val: "0111" },
	{ key: 8, val: "1000" }, { key: 9, val: "1001" }, { key: 'a', val: "1010" }, { key: 'b', val: "1011" }, { key: 'c', val: "1100" }, { key: 'd', val: "1101" }, { key: 'e', val: "1110" }, { key: 'f', val: "1111" }]
	let value = ""
	for (let i = 0; i < str.length; i++) {
		for (let j = 0; j < hex_array.length; j++) {
			if (str.charAt(i).toLowerCase() == hex_array[j].key) {
				value = value.concat(hex_array[j].val)
				break
			}
		}
	}
	return value
}

// 截取字符串后几位
Vue.prototype.getString1 = (str) => {
	return str.substr(str.length - 4);
}

// 截取字符串前几位
Vue.prototype.getString2 = (str, lengthNum) => {
	return str.substr(0, lengthNum);
}

// 截取数组第几位到第几位
Vue.prototype.getString3 = (str, lengthNum) => {
	return str.slice(0, lengthNum);
}

// 数字数组变成字符串数字
Vue.prototype.arrToString = (arr) => {
	return arr.join(',')
}

// 去掉字符串中所有特殊符号
Vue.prototype.specialSymbols = (str) => {
	let text = str.replace(/[&\|\\\*^%,:$#@\-]/g, "").replace(/\s*/g, "");
	return text;
}

// 判定input的值限制只能是数(包括小数),小数点后几位
Vue.prototype.oninput = (num, limit) => {
	var str = num
	var len1 = str.substr(0, 1)
	var len2 = str.substr(1, 1)
	// 如果第一位是0，第二位不是点，就用数字把点替换掉
	if (str.length > 1 && len1 == 0 && len2 != ".") {
		str = str.substr(1, 1)
	}
	// 第一位不能是.
	if (len1 == ".") {
		str = "";
	}
	// 限制只能输入一个小数点
	if (str.indexOf(".") != -1) {
		var str_ = str.substr(str.indexOf(".") + 1)
		if (str_.indexOf(".") != -1) {
			str = str.substr(0, str.indexOf(".") + str_.indexOf(".") + 1)
		}
	}
	// 正则替换
	str = str.replace(/[^\d^\.]+/g, '') // 保留数字和小数点
	if (limit == 1) {
		str = str.replace(/^\D*([0-9]\d*\.?\d{0,1})?.*$/, '$1') // 小数点后只能输 1 位
	} else {
		str = str.replace(/^\D*([0-9]\d*\.?\d{0,2})?.*$/, '$1') // 小数点后只能输 2 位
	}
	return str
	// 用法：在input中 @keyup.native="data绑定的值 = oninput(data绑定的值,小数后几位)"
}

// 判定input的值限制为正整数
Vue.prototype.positiveInteger = (num) => {
	if (!(/(^[1-9]\d*$)/.test(num))) {
		num = '';
	} else {
		return num;
	}
}

// 删除对象属性值
Vue.prototype.delObject = (num) => {
	for (var key in num) {
		delete num[key];
	}
	return num;
}

// webSocket
var timer = '';
var gettimer = '';
var ws = ''
Vue.prototype.socket = () => {
	// var uid = $api.getStorage('uid');
	// if (uid == 0 || uid == undefined) {
	// 	return false;
	// }
	let username = localStorage.getItem("username");
	var uid = localStorage.getItem(username + 'uid');

	// var uid = localStorage.getItem('uid')
	ws = new ReconnectingWebSocket('wss://esb.yumaoyou.cn:7250');
	ws.debug = false; // 此实例是否应该记录调试消息
	ws.binaryType = 'arraybuffer';  // 二进制
	ws.automaticOpen = true;  // websocket是否应在实例化后立即尝试连接。
	ws.reconnectDecay = 3.0;  // 重新连接延迟的增加速率。
	ws.timeoutInterval = 3000;   // 关闭并重试之前等待连接成功的最长时间
	ws.timeoutInterval = 5400;  // 尝试重新连接之前要延迟的毫秒数。
	ws.maxReconnectAttempts = 10;  // 放弃之前将进行的最大重新连接尝试次数
	ws.maxReconnectInterval = 10000;  // 延迟重新连接尝试的最大毫秒数。

	ws.onopen = function (event) {
		// console.log(JSON.stringify(event));
		// console.log(ws.readyState);
		if (ws.readyState == 1) {  // 连接成功建立，可以进行通信
			// if (uid > 0) {
			clearInterval(timer);
			ws.send('a_web' + uid + '_');
			timer = setInterval(() => { ws.send('a_web' + uid + '_') }, 50000);
			// }

			// let getout = localStorage.getItem('getout')
			// if (getout == 'getout') {
			// 	uid = ''
			// 	ws.onclose()
			// 	// clearInterval(timer);
			// }

		} else if (ws.readyState == 2) {   // 连接正在进行关闭握手，即将关闭
			// console.log(ws.readyState);
			// clearInterval(heart);
		} else if (ws.readyState == 3) {   // 连接已经关闭或者根本没有建立
			// console.log(ws.readyState);
			// clearInterval(heart);
		} else {
			// console.log('socket？？？？');
		}
	}
	ws.onmessage = function (event) {
		var data = JSON.parse(event.data);
		store.commit("setsocketData", data);
		// console.log(JSON.stringify(data));
	}
	ws.onerror = function (event) {
		// console.log(JSON.stringify(event));
		if (event.isTrusted == false) {
			clearInterval(timer);
		}
	}
	ws.onclose = function (event) {
		// console.log(JSON.stringify(event));
		// if (event.isTrusted == true) {
		// 	clearInterval(timer);
		// } else if (event.isTrusted == false) {

		// }
		ws.close()
		clearInterval(timer)
		// console.log('断开连接')
		// console.log(ws.readyState)
	}
}

Vue.prototype.closeSocket = () => {
	ws.onclose()
}


// 判断浏览器的类型
Vue.prototype.myBrowser = () => {
	let message;
	var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
	var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
	var isIE = userAgent.indexOf("compatible") > -1
		&& userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
	var isEdge = userAgent.indexOf("Edge") > -1; //判断是否IE的Edge浏览器
	var isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器
	var isSafari = userAgent.indexOf("Safari") > -1
		&& userAgent.indexOf("Chrome") == -1; //判断是否Safari浏览器
	var isChrome = userAgent.indexOf("Chrome") > -1
		&& userAgent.indexOf("Safari") > -1; //判断Chrome浏览器
	if (isIE) {
		var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
		reIE.test(userAgent);
		var fIEVersion = parseFloat(RegExp["$1"]);
		if (fIEVersion < 9) {
			alert("小于IE9版本")
			message = "小于IE9版本";
		}
	}
	if (isOpera) {
		alert("Opera")
		return "Opera";
	}
	if (isEdge) {
		alert("Edge")
		return "Edge";
	}
	if (isFF) {
		alert("FF")
		return "FF";
	}
	if (isSafari) {
		alert("Safari")
		return "Safari";
	}
	if (isChrome) {
		alert("Chrome")
		return "Chrome";
	}
}

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount("#app");