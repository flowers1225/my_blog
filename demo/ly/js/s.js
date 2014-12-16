"use strict"

;(function(){
    //分享文案
    window.weixinData = {
        title: '赠送礼物',
        desc: '赠送礼物',
        link: 'http://www.flowers1225.com/demo/ly/index.html',
        imgUrl: 'http://www.flowers1225.com/demo/ly/img/bg_inventory.png',
        callback:function(){ 
            $('.m-share-mask').remove();
        }
    };

    var swipe = null;
    var sugar = null;

    function pageControl(index,elem){
        
        sugar.fireOut(elem);
        sugar.fireIn(elem);

        $('input').blur();
        
        if($(elem).hasClass('m-section-fourth')&& !$(elem).hasClass('already-init')){
            $(elem).addClass('already-init');
            
            $('.btn-yue').on('click',function(e){
                swipe.next();
            })
        }

        if($(elem).hasClass('m-section-fifth') && !$(elem).hasClass('already-init')){

            $(elem).addClass('already-init');

            $('.btn-share').on('click',showTips);
        }        
    }

    function showTips(){
        var name = $('#J_input_name').val().trim(),
            ly = $('#J_input_ly').val().trim();
        
        if(!name || !ly){
            return alert('请输入完整信息！');
        }

        $('body').append('<div class="m-share-mask"><div class="tips"></div></div>');

        weixinData.desc= '我叫'+name+'!我要的礼物是'+ly+'!快来送我吧！';
    }

    var init = function(){

        sugar = new Sugar();
        sugar.fireIn($('.m-section-index'));
        
        //初始化swipe
    	swipe = Swipe(document.querySelector('.m-wrap'),{
            continuous: false,
            callback: pageControl,
            transitionEnd: function(index, elem) {}
       	});
	}

    init();
})();