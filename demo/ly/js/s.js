"use strict"

;(function(){
    //分享文案
    window.weixinData = {
        title: '',
        desc: '',
        link: '',
        imgUrl: '',
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