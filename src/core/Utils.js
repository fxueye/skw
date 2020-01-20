/**
*Created on 2019年8月20日
*@author: skw QQ:281431280 
*/
class Utils{
	static format(str, ... args){
			for(var i= 0; i <  args.length; i++)
				str = str.replace(new RegExp("\\{" + i + "\\}", "g"),args[i]);
			return str;
	}
	static paseNum(num,fixed = 0){
			var str;
			if(num > 99999999){
				var b = Math.floor(num / 100000000);
				var t =  (num - b * 100000000)/10000;
				str = format("{0}亿{1}万",b.toFixed(fixed),t.toFixed(fixed));
			}else if( num >= 10000){
				var v =num / 10000;
				str = format("{0}万",v.toFixed(fixed));
			}else {
				str = num;
			}
			return str;
	}
	static dateFormat(fmt, date) {
		let ret;
		const opt = {
			"Y+": date.getFullYear().toString(),        // 年
			"m+": (date.getMonth() + 1).toString(),     // 月
			"d+": date.getDate().toString(),            // 日
			"H+": date.getHours().toString(),           // 时
			"M+": date.getMinutes().toString(),         // 分
			"S+": date.getSeconds().toString()          // 秒
			// 有其他格式化字符需求可以继续添加，必须转化成字符串
		};
		for (let k in opt) {
			ret = new RegExp("(" + k + ")").exec(fmt);
			if (ret) {
				fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
			};
		};
		return fmt;
	}
	//不超过一小时
	static secondFormat(second){
		var minute = Math.floor(second / 60 );
		var sec = second % 60;
		return format("{0}:{1}",pad(minute,2),pad(sec,2)); 
	}
	static pad(num,n){
		var len = num.toString().length;
		while(len < n){
			num = "0"+num;
			len++;
		}
		return num;
	}
	static string2Date(dateString){
		dateString.replace(/-/g,'/');
		return Date.parse(dateString);
	}
	static isEmail(email){
		var reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
		return reg.test(email);
	}
	static isPhone(phone){
		var reg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
		return reg.test(phone);
	}
	static random(n,m){
		return Math.floor(Math.random() * (m-n+1) + n);
	}
	static uniq(array, isSorted, iteratee) {
		var res = [];
		var seen = [];
		array.forEach(function (element, index) {
			if (iteratee) {
				//判断iteratee是否存在，存在的话，取出真正要比较的属性
				var computed = element[iteratee];
				if (seen.indexOf(computed) < 0) {
					seen.push(computed);
					res.push(element);
				}
			} else if (isSorted) {
				//当数组有序
				if (!index || seen !== element) res.push(element);
				seen = element;
			} else {
				if (res.indexOf(element) < 0) {
					res.push(element);
				}
			}
		}, this);
		return res;
	}
	static randomData(arr,m){
		var len = arr.length;
		if(len <= m){
			return arr;
		}
		var key = [];
		var value = [];
		while(value.length < m){
			var index = Math.floor(Math.random() * len);
			if(key.indexOf(index) < 0){
				var i = arr[index];
				key.push(index);
				value.push(i);   
			}
		}
		return value;
	}
	static getRatio(ctx){
		var backingStore = ctx.backingStorePixelRatio ||ctx.webkitBackingStorePixelRatio ||ctx.mozBackingStorePixelRatio ||ctx.msBackingStorePixelRatio ||ctx.oBackingStorePixelRatio ||ctx.backingStorePixelRatio || 1;
		return ((window.devicePixelRatio || 1) / backingStore);
	}

	static stringLength(str){
		var  char_length = 0
		for (let i = 0; i < str.length; i++) {
			let son_str = str.charAt(i)
			encodeURI(son_str).length > 2 ? char_length += 1 : char_length += 0.5
		}
		return char_length;
	}

	static stringSplit (str, len){
		let arr = [],
		offset = 0,
		char_length = 0
		for (let i = 0; i < str.length; i++) {
		let son_str = str.charAt(i)
		encodeURI(son_str).length > 2 ? char_length += 1 : char_length += 0.5
		if (char_length >= len || (char_length < len && i === str.length - 1)) {
			let sub_len = char_length == len ? i + 1 : i
			arr.push(str.substr(offset, sub_len - offset + ((char_length < len && i === str.length - 1) ? 1 : 0)))
			offset = i 
			char_length = 0
		}
		}
		return arr
	}
	static isWeixin(){  
		var ua = navigator.userAgent.toLowerCase();  
		if(ua.match(/MicroMessenger/i)=="micromessenger") {  
			return true;  
		} else {  
			return false;  
		}  
	}  
	static ios() {
		return /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent);
	}
	static android(){
		return /(Android)/i.test(navigator.userAgent)
	}
	//权重随机
	static randomW(weights){
		var sum = 0;
		var index = 0;
		for(var i = 0,len = weights.length; i < len; i++){
			sum += weights[i];
		}
		for(var i = 0,len = weights.length; i < len; i++){
			var rand = Math.floor(Math.random() * sum + 1);
			if(weights[i] >= rand){
				index = i;
				break;
			}else{
				sum -= weights[i];
			}

		}
		return index;
	}
	
}


export default Utils;