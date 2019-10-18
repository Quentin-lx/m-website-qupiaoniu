const slideMenuView = require('../views/slide-menu.art');



// $('.select').on('click',function(){
//     $('.slide-menu').css({'width':'80%'});
// })


class slideView {
    constructor() {
        // this.render();

    }
    render() {
        let _this = this;
        //点击事件
        $('.select').click(function () {
            if ($('.select').hasClass('active')) {
                _this._swipeRight();
            } else {
                _this._swipeLeft();
            }
        });
        _this.renders();


    }
    _swipeLeft() {
        $('.slide-menu').animate({ 'margin-left': '0' }, "50");
        $('.slide-menu').addClass('act');

        $('.index').animate({ 'margin-left': '80%' }, "50");
        $('.select').addClass('active');
    }
    _swipeRight() {
        $('.slide-menu').animate({ 'margin-left': '-80%' }, "50");

        $('.index').animate({ 'margin-left': '0' }, "50");
        $('.select').removeClass('active');
    }
    bindEvent() {
        $(this).addClass('active').siblings().removeClass('active');
        // console.log($(this).attr('data-to'))


        location.hash =$(this).attr('data-to')
        
        // let pageTitle = $(this).attr('data-page');
        // let pageControllers = {
        //     positionController,
        //     showsController
        // }
        // pageControllers[pageTitle + 'Controller'].render(); 
    }
    bindEvent1() {
        location.hash =$(this).attr('data-to')
        console.log(location.hash);
    }
    renders() {
        let slideMenuHtml = slideMenuView({});
        $('.slide-menu').html(slideMenuHtml);
        $('.nav-menu li').on('click', this.bindEvent);
        $('.login-register a').on('click',this.bindEvent1);
    }


}
export default new slideView();


// var swiperFun = {
//     init:function(){
//         var _this = this ;
//         //点击事件
//         $('.select').click(function(){
//             if($(this).hasClass('active')){
//                 _this._swipeRight();
//             }else{
//                 _this._swipeLeft();
//             }
//         });
//     },
//     _swipeLeft:function(){
//         $('.slide-menu').animate({'width':'80%'},"50");
//         $('.index').animate({'margin-left':'80%'},"50");
//         $('.select').addClass('active');
//     },
//     _swipeRight:function(){
//         $('.slide-menu').animate({'width':'0'},"50");
//         $('.index').animate({'margin-left':'0'},"50");
//         $('.select').removeClass('active');
//     }
// }
// swiperFun.init();
