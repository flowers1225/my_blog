/**
 * Created by user on 14-8-24.
 * pages[
 *  {dom|addedClassname|data-type|data-delay}
 * ]
 *
 *
 */
var Sugar = function(){
    var $domList = [];
    var fireIn = function(name){
        var page = name;

        var $animates = $(page).find('.animation');
        $domList = [];
        $animates.each(function(){
            var an = {};
            an.dom = $(this);
            an.cn = an.dom.attr('data-class');
            an.type = an.dom.attr('data-type');
            an.delay = an.dom.attr('data-delay');
            if(an.delay == 0 || !an.delay){
                an.dom.addClass(an.cn);
            } else {
                an.dom.addClass(an.cn);
                an.dom.addClass('animation-delay' + an.delay);
            }
            $domList.push(an.dom);
        });
    };

    var fireOut = function(){
        while($domList.length > 0){
            var $dom = $domList.pop();
            $dom.removeClass($dom.attr('data-class'));
        }   
    };

    return {
        fireIn: fireIn,
        fireOut: fireOut
    }
};


