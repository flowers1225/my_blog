"use strict"

;(function(){
    //分享文案
    window.weixinData = {
        title: '赠送礼物',
        desc: '赠送礼物',
        link: 'http://www.flowers1225.com/demo/ly/index.html',
        imgUrl: 'http://www.flowers1225.com/demo/ly/img/bg_inventory.png',
        callback:function(){ 
        }
    };

    var swipe = null;
    
    function pageControl(index,elem){

        
    }

    
    var init = function(){

        //初始化swipe
    	swipe = Swipe(document.querySelector('.m-wrap'),{
            continuous: false,
            callback: pageControl,
            transitionEnd: function(index, elem) {}
       	});	
	}

    init();
})();