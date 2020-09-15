$(function(){
 
        /**
     * ajax封装
     * url 发送请求的地址
     * data 发送到服务器的数据，数组存储
     * isLoading 是否显示loading
     * dataType 预期服务器返回的数据类型，常用的如：xml、html、json、text
     * successfn 成功回调函数
     * errorfn 失败回调函数
     */
    var loadNum = 0;
    jQuery.axspost=function(url, data,isLoading,successfn,errorfn) {
       
        $.ajax({
            type: "POST",
            data: data, 
            url: "http://10.6.4.154:8081/app/v6/membersExchange/"+url,
            dataType: "json",
            beforeSend:function(){
                if(isLoading){
                    loadNum++;
                    $(".loading").show();
                }
               
            },
            success: function(d){
                console.log("成功",d)
                if(d.result == "000"){
                    successfn(d);
                }else{
                    console.log(d)
                    if(typeof errorfn === "function"){
                        errorfn("success",d);
                    }else{
                        $.toast(d.msg);
                    }   
                }  
            },
            error: function(e){
                console.log("失败",e)
                if(typeof errorfn === "function"){
                    errorfn("error",e);
                }else{
                    toast("请求出错！");
                    console.log(e)
                }   
               
            },
            complete:function(e){
                if(isLoading){
                    loadNum--
                    if(loadNum === 0){
                        $(".loading").hide();
                    }
                }
               
            }
        });
    };
    
    jQuery.toast=function(msg, duration) {
        duration = isNaN(duration) ? 2000 : duration;
        var m = document.createElement('div');
        m.innerHTML = msg;
        m.setAttribute("class", "toast");
        
        m.style.cssText = "font-family:siyuan;padding:1.5vw  3.0557333vw;color: rgb(255, 255, 255);line-height: 5.7306667vw;text-align: center;border-radius: 0.8730667vw;position: fixed;top: 50%;left: 50%;transform: translate(-50%, -50%);z-index: 999999;background: rgba(0, 0, 0,.7);font-size:  3.4922667vw;word-break:break-all;";
        if(msg.length > 10){
            m.style.cssText+="min-width: 62%;"
        }
        document.body.appendChild(m);
        setTimeout(function() {
            var d = 0.5;
            m.style.webkitTransition = '-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in';
            m.style.opacity = '0';
            setTimeout(function() {
                document.body.removeChild(m)
            }, d * 1000);
        }, duration);
    }

  //校验手机号
  jQuery.PhoneNumberVerify=function(tel) {
    if(tel != ""){
        var reg =/^0?1[3|4|5|6|7|8|9][0-9]\d{8}$/;
        return reg.test(tel);
    }
  };

    //校验邮箱
    jQuery.emailVerify=function(email) {
        if (email != "") {
            var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
            return reg.test(email);
            
        };
    };

     //保留两位小数
     jQuery.returnFloat=function(value){
        var value=Math.round(parseFloat(value)*100)/100;
        var xsd=value.toString().split(".");
        if(xsd.length==1){
            value=value.toString()+".00";
            return value;
        }
        if(xsd.length>1){
        if(xsd[1].length<2){
            value=value.toString()+"0";
        }
        return value;
        }
    }

    jQuery.add = function (arg1, arg2, d) {
        arg1 = arg1.toString(), arg2 = arg2.toString();
        var arg1Arr = arg1.split("."),
            arg2Arr = arg2.split("."),
            d1 = arg1Arr.length == 2 ? arg1Arr[1] : "",
            d2 = arg2Arr.length == 2 ? arg2Arr[1] : "";
        var maxLen = Math.max(d1.length, d2.length);
        var m = Math.pow(10, maxLen);
        var result = Number(((arg1 * m + arg2 * m) / m).toFixed(maxLen));
        var d = arguments[2];
        return typeof d === "number" ? Number((result).toFixed(d)) : result;
    }

    jQuery.accSub = function (arg1, arg2) {
        var r1, r2, m, n;
        try {
            r1 = arg1.toString().split(".")[1].length
        } catch (e) {
            r1 = 0
        };
        try {
            r2 = arg2.toString().split(".")[1].length
        } catch (e) {
            r2 = 0
        };
        m = Math.pow(10, Math.max(r1, r2));
        // 动态控制精度长度
        n = (r1 >= r2) ? r1 : r2;
        return ((arg1 * m - arg2 * m) / m).toFixed(n);
    }
    //乘法
    jQuery.accMul = function (arg1, arg2) {
        var m = 0,
            s1 = arg1.toString(),
            s2 = arg2.toString();
        try {
            m += s1.split(".")[1].length
        } catch (e) {};
        try {
            m += s2.split(".")[1].length
        } catch (e) {};
        return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
    }

    //android禁止微信浏览器调整字体大小
   if (typeof WeixinJSBridge == "object" && typeof WeixinJSBridge.invoke == "function") {
       handleFontSize();
   } else {
       if (document.addEventListener) {
           document.addEventListener("WeixinJSBridgeReady", handleFontSize, false);
       } else if (document.attachEvent) {
           document.attachEvent("WeixinJSBridgeReady", handleFontSize);
           document.attachEvent("onWeixinJSBridgeReady", handleFontSize);  }
   }
   function handleFontSize() {
       // 设置网页字体为默认大小
       WeixinJSBridge.invoke('setFontSizeCallback', { 'fontSize' : 0 });
       // 重写设置网页字体大小的事件
       WeixinJSBridge.on('menu:setfont', function() {
           WeixinJSBridge.invoke('setFontSizeCallback', { 'fontSize' : 0 });
       });
   }
});

