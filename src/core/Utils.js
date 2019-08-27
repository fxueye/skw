/**
*Created on 2019年8月20日
*@author: skw QQ:281431280 
*/
function format(str, ... args){
		for(var i= 0; i <  args.length; i++)
			str = str.replace(new RegExp("\\{" + i + "\\}", "g"),args[i]);
		return str;
}
function paseNum(num,fixed = 0){
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
//解决手机端无法使用解析yyyy-MM-dd hh:mm:ss直接格式 new Date(dateString)  
function string2Date(dateString){
	if(dateString){
		try{
			var arr = dateString.split(' ');
			var ymd = arr[0].split('-');
			var him = arr[1].split(':');
			return new Date(ymd[0],ymd[1],ymd[2],him[0],him[1],him[2]);
		}catch(e){
			//TODO handle the exception
		}
	}
	return new Date(dateString);
}
function isEmail(email){
	var reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
	return reg.test(email);
}
function isPhone(phone){
	var reg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
	return reg.test(phone);
}
function random(n,m){
	return Math.floor(Math.random() * (m-n+1) + n);
}
function uniq(array, isSorted, iteratee) {
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
function randomData(arr,m){
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
function getRatio(ctx){
	var backingStore = ctx.backingStorePixelRatio ||ctx.webkitBackingStorePixelRatio ||ctx.mozBackingStorePixelRatio ||ctx.msBackingStorePixelRatio ||ctx.oBackingStorePixelRatio ||ctx.backingStorePixelRatio || 1;
    return ((window.devicePixelRatio || 1) / backingStore);
}
function stringSplit (str, len){
    let arr = [],
      offset = 0,
      char_length = 0
    for (let i = 0; i < str.length; i++) {
      let son_str = str.charAt(i)
      encodeURI(son_str).length > 2 ? char_length += 1 : char_length += 0.5
      if (char_length >= len || (char_length < len && i === str.length - 1)) {
        let sub_len = char_length == len ? i + 1 : i
        arr.push(str.substr(offset, sub_len - offset + ((char_length < len && i === str.length - 1) ? 1 : 0)))
        offset = i + 1
        char_length = 0
      }
    }
    return arr
  }
export {
	format,
	paseNum,
	string2Date,
	isEmail,
	isPhone,
	random,
	uniq,
	getRatio,
	randomData,
	stringSplit
}
