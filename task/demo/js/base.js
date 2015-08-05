// JavaScript Document
$(function(){

	$(".link-tabs").find("a").bind("click", function(e) {
		$(this).addClass("active").siblings("a").removeClass("active");
		var index = $(this).index();
		$(".link-items").children().eq(index).show().siblings().hide();
	})	
//提交订单(免费设计)
	$("#mianf").click(function(){
		var city_id=cityInfo["city_id"];
    //免费装修设计
		var name = $(this).parents('.form-list').find('.inp-user').val();
		var tele = $(this).parents('.form-list').find('.inp-tel').val();
		var comeurl = window.location.href; 
    var _value=$(".self-design").attr("id");
		if(tele == "电话号码（必填）"){
			$(".errxia").show();		
			return false;  
		}
		//检查手机号码是否正确
		var reg = /(1[3-9]\d{9}$)/;
		if(!reg.test(tele)){
			$(".errxia").html('<i class="err-ico"></i><sapn>手机号码错误</sapn>');
			$(".errxia").show();
			return false; 
		}
		$(".collect-close-r").trigger("click")//关闭弹窗
		
		var url = '/tapi/order/applyIndent';
		var data = {
				"userid":0,
				"ownername":name,
				"cellphone":tele,
				"province":'',
				"city":city_id,
				"request":'',
				"source":_value,
				"comeurl":comeurl
		}
		$.ajax({
			type:"post",
			url:url,
			data:data,
			success:function(msg){
				$data = jQuery.parseJSON(msg);
				if(msg == 1){
					$(".self-apply").modal({
						opacity: 70
					});
				}
			}
		})

	});	


/******************************************/
 var $lis=$(".slider-container").find("li");
 var index=0;//当前页数 
 var sums = $lis.length; // 总个数
 var pages = (sums%4) == 0 ? sums/4 : (Math.floor(sums/4) + 1); // 总页数
 var viewWidth = 600; // 当前屏宽度

 $(".prev").bind("click",function(){
  index--;
  if (index<0) {
    index = 0;
  }
  showPic(index);
 })

 $(".next").bind("click",function(){
   index++;
   if (index>=pages) {
     index = pages-1;
    }
    
    showPic(index);   
  })

 function showPic(i){
    $("#example-1").animate({
      left: -i*viewWidth
    }, 500);
  }



    // 返回顶部动画
	$(".return-top").click(function() {
		$("html, body").animate({
			"scrollTop": 0
		}, 200);
	})
	$(".form-item input").bind("focus",function(){
		var value = $(this).val();
		var _value = $(this).attr("data-value");
		if(value == _value) {
			$(this).val("");
		}
  }).bind("blur", function() {
		var value = $(this).val();
		var _value = $(this).attr("data-value");
		if(value == "" || value == _value) {
			$(this).val(_value);
		}
	}); 
	$(".wx-img input").bind("focus",function(){
		var value = $(this).val();
		var _value = $(this).attr("data-value");
		if(value == _value) {
			$(this).val("");
		}
  }).bind("blur", function() {
		var value = $(this).val();
		var _value = $(this).attr("data-value");
		if(value == "" || value == _value) {
			$(this).val(_value);
		}
	});

	/*头部内容滚动*/
	setInterval(function(){
		$(".order-info li:first").slideUp(500,function(){
			$(this).remove();
		}).clone().appendTo(".order-info");;
		},3000);



	//导航栏订单电话号码输入框获取焦点隐藏错误提示
 	$(".inptshang").focus(function(){
 		$(".errshang").html('<i class="err-ico"></i><sapn>手机号码不可以为空</sapn>');
 		$(".errshang").hide();
 	})
	
	//头部导航申请四份报价
	$('.header-nav').find('.apply-wrap').find('.submit-btn').click(function(){
		var applyUserVal=$('.header-nav').find('#applyuser').val();
		var applyTelVal=$('.header-nav').find('#applytel').val();
		var comeurl = window.location.href; 
		
		var tbscity = $.cookie('tbscity');
		var regtid = /tbs_tid=([0-9]+)&(.*?)/;
		var cityarr = tbscity.match(regtid);
		var city = cityarr[1];
		
		if(applyTelVal == ""){
			$(".errshang").show();		
			return false;  
		}
		//检查手机号码是否正确
		var reg = /(1[3-9]\d{9}$)/;
		if(!reg.test(applyTelVal)){
			$(".errshang").html('<i class="err-ico"></i><sapn>手机号码错误</sapn>');
			$(".errshang").show();
			return false; 
		}
		
		//防止短时间重复点击
		var that = $(this);
		if(that.attr('flag') == 2){
			return false;
			}
		that.attr('flag','2');
		
		var data = {
			"userid":0,
			"ownername":applyUserVal,
			"cellphone":applyTelVal,
			"request":'',
			"source":813,
			"comeurl":comeurl,
			'city':city
		}
		$.ajax({
			url:'/tapi/order/applyIndent',
			type:'post',
			data:data,
			success:function(msg){
				that.attr('flag','1');
				if(msg == 1){
					$(".self-apply").modal({
						opacity: 70
					});
				}
			}
		});
	});
	
 	//免费户型设计弹出框中电话号码获取焦点隐藏错误提示
 	$(".inp-tel").focus(function(){
 		$(".errxia").html('<i class="err-ico"></i><sapn>手机号码不可以为空</sapn>');
 		$(".errxia").hide();
 	})

/*免费申请四份装修报价鼠标经过改变图标*/
 $('.nav-rs').hover(function(){
    $(this).children("a").children("img").attr('src','images/ico_up.png');
  },function(){
    $(this).children("a").children("img").attr('src','images/ico_down.png');
  });  
 
	/*免费装修设计*/
		$(".wrap-img").find(".fls").bind("click", function() {
				$(".self-design").modal({
				opacity: 70,
				dataId: 811
		});
	})

	$(window).ready(function(){
			//浏览器判断
	  	var userAgent = navigator.userAgent.toLowerCase();
    	jQuery.browser = {
	        version: (userAgent.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [])[1],
	        safari: /webkit/.test(userAgent),
	        opera: /opera/.test(userAgent),
	        msie: /msie/.test(userAgent) && !/opera/.test(userAgent),
	        mozilla: /mozilla/.test(userAgent) && !/(compatible|webkit)/.test(userAgent)
    	};	
   		if($.browser.msie && $.browser.version<8.0){
      		//浏览器弹出层
			$(".self-browser").modal({
				opacity: 70
			});
		}

	 	try{
	 		document.domain="tobosu.com";
	 	}catch(e){

	 	}

   	});



   	/*头部搜索下拉选项效果*/
	$("#searchVal").find("a").bind("click", function() {
		var value = $(this).text();
		var conValue=$(this).attr('value');
		var showValue=$(this).attr('showtxt');
		$(".search-input>input").val(showValue);
		$(".search-input>input").attr("value",showValue);
		$(".search-input>input").attr("data-value",showValue);
		$("#showPic").attr("data-value",conValue);
		$("#showPic").css("background","#f6f6f6");
		$("#showPic").find(".value").text(value);
		$("#searchVal").hide();
	});
  $(".search-input>input").bind("focus",function(){
		var value = $(this).val();
		var _value = $(this).attr("data-value");
		if(value == _value) {
			$(this).val("");
		}
  }).bind("blur", function() {
		var value = $(this).val();
		var _value = $(this).attr("data-value");
		if(value == "" || value == _value) {
			$(this).val(_value);
		}
	});


	/*头部效果图选项卡切换*/
	$("#showPic").hover(function(){
		var cur=$(this);
			 $(this).css("background","#fff");
			 $("#searchVal").show();
			 setTimeout(function() {
			 	$(document).one("click", function(e) {
					var target = e.target;
					if(!$(e.target).is("#searchVal a")) {
						cur.css("background","#f6f6f6");
						$("#searchVal").hide();
					}
				});
			 }, 200);
	},function(){
			 	$(this).css("background","#f6f6f6");
			 });
	/*鼠标离开效果图选项卡隐藏*/
	$(".search-l").mouseleave(function(){
		$("#searchVal").hide();
	});


	//头部搜索
	$('.header-middle').find('#dosearch').click(function(){
		var keyVal=$(this).parents('.search-wrap').find('.search-input').find('input').val();
		if(keyVal){
			var keyType=$(this).parents('.search-wrap').find('#showPic').attr('data-value');
			doSearch(keyType,keyVal);
		}
	});

	//头部输入框回车触发搜索
	$('.header-middle').find('.search-wrap').find('.search-input').keydown(function(e){
		if(e.keyCode==13){
			var keyVal=$(this).find('input').val();
			var keyType=$('.header-middle').find('.search-wrap').find('#showPic').attr('data-value');
			if(keyVal!=''){
				doSearch(keyType,keyVal);
			}
		}
	});
	var city_val=cityInfo["city_code"];
	//执行搜索跳转函数
	var doSearch=function(keyType,keyVal){
		if(keyType==1){
			//搜索效果图
			window.location.href='http://www.tobosu.com/pic/search.html?key='+keyVal;
		}
		if(keyType==2){
			//搜索装修公司
			window.location.href='http://'+city_val+'.tobosu.com/zx/search.html?kw='+keyVal;
		}
		if(keyType==3){
			//搜索楼盘案例
			window.location.href='http://'+city_val+'.tobosu.com/search/1_'+keyVal;
		}
		if(keyType==4){
			//搜索装修问答
			window.location.href='http://ask.tobosu.com/search.html?q='+keyVal;
		}
	}


	$("ul.c-parent li").hover(function(){ 
		$(this).find("div.tips").show();
	},function(){
		$(this).find("div.tips").hide();
	});


	$("div.case-screen li").on("click",function(){ 
		$(this).siblings().removeClass("on").end().addClass("on");
	});
});


  
(function($,window,document){
	var pluginName='textSilde',
	defaults={
		speed:2000,
		animatespeed:300,
		isscroll:true,
		viewNum:2,
		aspect:"top", 
		callback:function(){}
	};

	function textSilde(element, options){
		
		this.element = element;
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName; 
        this.init();
	}
	 
	textSilde.prototype={
		init:function(){ 
			var that=this;
			var _li=$(this.element).find("li");
			var _ul=$(this.element).find("ul");
			var liheight=_li.eq(0).outerHeight();
			var liwidth=_li.eq(0).outerWidth(); 
			var ulwidth=_ul.eq(0).outerWidth(); 
			var ulheight=_ul.eq(0).outerHeight(); 
			var lisize=$(this.element).find("li").size();

 

			switch(that.settings.aspect){
				case "top": 
					that.translate(-liheight,lisize); 
					break;
				/*case "bottom":
					_ul.css({top:-ulheight}); 
					that.translate(liheight,lisize); 
					break;
				case "left": 
					that.translate(-liwidth,lisize); 
					break;
				case "right":
					that.translate(liwidth,lisize); 
					break;
				default: break;*/
			} 
		},
		cloneElm:function(){ 
			for (var i = 0; i < this.settings.viewNum; i++) { 
				$(this.element).find("ul").append($(this.element).find("li").eq(i).clone());
			};

		},
		translate:function(scale,lisize){
			var that=this;
			var index=0;
			
			var eleUl=$(that.element).find("ul");
			setInterval(function(){
				index++; 
				if (index>lisize-1) {
					index=0;   
				} 
				switch(that.settings.aspect){
				case "top": 
					eleUl.animate({"top":scale*index},that.settings.animatespeed);
					break;
				/*case "bottom":
					eleUl.animate({"bottom":-scale*index},300);
					break;
				case "left": 
				case "right":
					eleUl.animate({"left":scale*index},300);
				break;
				default: break;*/
			}
				 
			},that.settings.speed);
		},
		removebeforeEle:function(){

		} 
	};
	$.fn[pluginName]=function(options){ 
		this.each(function() {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new textSilde(this, options));
            }
        }); 

		return this;
	}
})(jQuery);