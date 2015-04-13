'use strict';
var TD = TD || {};

//擦玻璃
TD.erasure = function(elBox, opt){
	var that = this;
	var coverEl = null;
	var coverImg = null;
	var canvasW = null;
	var canvasH = null;
	var ctx = null;

	var cover = opt.cover || '#ccc';
	var position = opt.position || 'relative';
	var lineWidth = opt.lineWidth || 50;
	var percent = opt.percent || 30;
	var count = 0;

	//初始化
	var init = function(){
		var el = elBox;
		el.css({
			'position' : position
		});			
		coverEl = $('<canvas>');
		ctx = coverEl.get(0).getContext('2d');
		//按2倍去做适配高清手机
		canvasW = el.width() * 2;
		canvasH = el.height() * 2;

		coverEl.attr('width', canvasW);
		coverEl.attr('height', canvasH);
		coverEl.css({
			'position': 'absolute',
			'z-index': '3',
			'top': '0',
			'left': '0',
			'width': '100%',
			'height': '100%'
		});

		//判断传入的cover值是imgobject、rgba、十六进制、url
		if(typeof cover == 'object'){
			cover.onload = imgonload;
			//that.preFill();

		}else if(cover.indexOf('rgba') != -1 || cover.indexOf('RGBA') != -1){
			addCover();
		}
		else if(cover.indexOf('#') != -1){		
			addCover();		
		}else{
			coverImg = new Image();
			coverImg.onload = imgonload;
			coverImg.src = cover;
			//that.preFill();
		}
		
		el.append(coverEl);
	}

	//图片载入完成
	var imgonload = function(){
		opt.preloadback();
		addCover();
	}

	//添加遮罩层
	var addCover = function(){
		//ctx.clearRect(0,0,canvasW,canvasH);
		
		if(typeof cover == 'object'){
			ctx.drawImage(cover, 0, 0, canvasW, canvasH);
		}else if(cover.indexOf('rgba') != -1 || cover.indexOf('RGBA') != -1){
			ctx.fillStyle = cover;
			ctx.fillRect(0, 0, canvasW, canvasH);		
		}
		else if(cover.indexOf('#') != -1){			
			ctx.fillStyle = cover;
			ctx.fillRect(0, 0, canvasW, canvasH);				
		}else{
			ctx.drawImage(coverImg, 0, 0, canvasW, canvasH);
		}

		tapClip();	
	}

	//擦除
	var tapClip = function(){

		var touchstartEvent = function(e){
			e.preventDefault();

			var e0 = e.targetTouches[0];
			var elPos = coverEl.offset();
			var x = (e0.clientX - elPos.left) * 2;
			var y = (e0.clientY - elPos.top) * 2;

			//绘制擦除图形
			ctx.save();
			ctx.globalCompositeOperation = "destination-out";
			ctx.beginPath();
			ctx.arc(x, y, lineWidth, 0, 2*Math.PI);
			ctx.fill();
			ctx.restore();

			$(document).on('touchmove', touchmoveEvent);
			$(document).on('touchend', touchendEvent);
			coverEl.off('touchstart', touchstartEvent);
		}

		var touchmoveEvent = function(e){
			e.preventDefault();

			var e0 = e.targetTouches[0];
			var elPos = coverEl.offset();
			var x = (e0.clientX - elPos.left) * 2;
			var y = (e0.clientY - elPos.top) * 2;

			//绘制擦除图形
			ctx.save();
			ctx.globalCompositeOperation = "destination-out";
			ctx.beginPath();
			ctx.arc(x, y, lineWidth, 0, 2*Math.PI);
			ctx.fill();
			ctx.restore();

		}

		var touchendEvent = function(e){
			e.preventDefault();

			var imgData = ctx.getImageData(0, 0, canvasW, canvasH);
			var dd = 0;
			var jump = 30;
			var i;

			for (var x = 0; x < imgData.width; x+=jump){
				for (var y = 0; y < imgData.height; y+=jump){
					i = (y*imgData.width + x) * 4;  
					//判断A不为0，>0及没被擦除的。
					if (imgData.data[i+3] > 0) { 
						dd++;
					}; 
				}
			}
			//计算没被擦除的占总数的多少
			if (dd*jump*jump/(imgData.width*imgData.height) < percent/100) {
				//这里执行回调
				// coverEl.css({
				// 	'opacity': 0,
				// 	'-webkit-transition': 'opacity 300ms linear'
				// });
				// coverEl.on('webkitTransitionEnd', function(e){
				// 	$(this).remove();
				// 	opt.callback && opt.callback();
				// });
				that.destroy();
			};
			//解除move end绑定
			$(document).off('touchmove', touchmoveEvent);
			$(document).off('touchend', touchendEvent);
			coverEl.on('touchstart', touchstartEvent);
		}

		if(count == 0){
			coverEl.on('touchstart', touchstartEvent);
			count++;
		}
		
	}

	//改变尺寸更新  
	this.upData = function(){
		var el = elBox;

		canvasW = el.width() * 2;
		canvasH = el.height() * 2;
		coverEl.attr('width', canvasW);
		coverEl.attr('height', canvasH);
		addCover();
	}

	//清除
	this.destroy = function(){
		coverEl.css({
			'opacity': 0,
			'-webkit-transition': 'opacity 500ms linear'
		});
		coverEl.on('webkitTransitionEnd', function(e){
			$(this).remove();
			opt.callback && opt.callback();
		});
	}

	init();
} 