"use strict";$("header").load("../html/headWithoutSearch.html"),$("footer").load("../html/foot.html"),"null"!=$.cookie("uName")?$("#name").val($.cookie("uName")):$("#name").val(""),$("#logincode~p").html(function(){$(this).html(randomCode()),$(this).css({color:randomColor(16),background:'url("../img/ranCode'.concat(parseInt(3*Math.random()+1),'")')})}).on("click",function(){$(this).html(randomCode()),$(this).css({color:randomColor(16),background:'url("../img/ranCode'.concat(parseInt(3*Math.random()+1),'")')})}),$(".loginBtn").on("click",function(){$("#name").val().trim()&&$("#psw").val().trim()&&$("#logincode").val().trim()?$("#logincode").val().trim().toLowerCase()==$("#logincode").next().html().toLowerCase()?($(".loginTitle").css("visibility","hidden").html(""),new Promise(function(l){$.ajax({type:"post",url:"../api/loginRegister.php",data:{type:"login",username:$("#name").val().trim(),password:$("#psw").val().trim()},success:function(i){var o=JSON.parse(i);l(o)}})}).then(function(i){i.status?($(".loginTitle").css("visibility","visible").html(i.msg).addClass("success"),$.cookie("uName",$("#name").val(),{expires:7}),location.href="".concat($.cookie("urlNow"))):$(".loginTitle").css("visibility","visible").html(i.msg).removeClass("success")})):$(".loginTitle").css("visibility","visible").html("验证码填写错误"):$(".loginTitle").css("visibility","visible").html("请输入完整")});