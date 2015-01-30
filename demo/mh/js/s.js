"use strict"

;(function(){

    var swipe = null;
    var sugar = null;
    var imageLoader = new LoadImages();

    function pageControl(index,elem){
               
        setTimeout(function(){
            sugar.fireOut(elem);
            sugar.fireIn(elem);            
        },300);

    }

    //添加其他loading的内容
    var preloadimgs = [
        './img/bg_index.jpg',
        './img/bg_section_2.jpg',
        './img/bg_section_3.jpg',
        './img/bg_section_4.jpg',
        './img/bg_section_5.jpg',
        './img/bg_section_6.jpg'
    ];

    var init = function(){
        
        imageLoader.load(preloadimgs);

        imageLoader.addEventListener('onLoad', function(){
        
            $('.m-load').remove();

            //初始化rotate
            sugar = new Sugar();
            sugar.fireIn($('.m-section-index'));
            
            //初始化swipe
            swipe = Swipe(document.querySelector('.m-wrap'),{
                continuous: false,
                callback: pageControl,
                transitionEnd: function(index, elem) {}
            });
        
        });    
	}

    init();
})();