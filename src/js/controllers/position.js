const positionView = require('../views/position.art');
const positionModel = require('../models/positions');
const positionRequestView = require('../views/position-request.art');
const Swiper = require('swiper');
const BScroll = require('better-scroll');


class Position{
    constructor(){

        this.list = [];
        this.pageIndex = 1;
        this.totalNum = 0;
        this.pageSize = 10;
        // this.render();
        
    }
     renders(list){
        let requestHtml = positionRequestView({
            list
        });
        $('.showsRecommend').html(requestHtml);
         
        // $imgFoot.attr('src','/assets/images/arrow.png');
    }

    async render(){
        let that = this;
        //渲染
        let bscroll = new BScroll.default('main',{
            //probeType可以侦测scroll事件
            // scrollX:true,
            // freeScroll:true,
            // startY:0,
            // scrollX:0,
            // eventPassthrough:'',
            
            // directionLockThreshold:0,
            // preventDefault:true,
            // preventDefaultException:{
            //     // className:/(^|\s)showsList(\s|$)/,
            //     tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT|DIV)$/
            // },
            // eventPassthrough:horizontal,
            probeType:2
            // scrollY: true,
            // click: true
        });

        // console.log(result.totalNum);
        let html = positionView({})
        $('#choiceTheater').html(html);
        
        let result = await positionModel.get({
            pageIndex :that.pageIndex,
            
        });
         
        let list = this.list = result.data;
        that.totalNum = result.totalNum;
        this.renders(list);
        bscroll.refresh();
        //betterScroll组件  
        
        $('.hotshow .detail ').get(0).addEventListener('touchstart', (e) => {
            
            e.stopPropagation();
        });
        $('.discountArea .detail').get(0).addEventListener('touchstart', (e) => {
            
            e.stopPropagation();
        });
        $('.index-swiper').get(0).addEventListener('touchstart', (e) => {
            
            e.stopPropagation();
        });
        
       
        
        let $imghead = $('.head img');
        let $imgFoot = $('.foot img');
        
        bscroll.on('scrollEnd',async function(){
            //上拉加载
            
            if(this.maxScrollY >= this.y && Math.ceil(that.totalNum/that.pageSize) >= that.pageIndex && location.hash == '#position'){
                that.pageIndex++;
                
                $imgFoot.attr('src','/assets/images/ajax-loader.gif');
                let result = await positionModel.get({
                    pageIndex : that.pageIndex,
                })
                let {data : list , totalNum} = result;
                //更新totalNum，有新的内容发布
                that.totalNum = totalNum;
                
                that.list =[...that.list,...list];
                that.renders(that.list);
                bscroll.refresh();
                bscroll.scrollBy(0,40);   
            }
            if(Math.ceil(that.totalNum/that.pageSize) < that.pageIndex && location.hash == '#position'){
                $('.foot b').html('没有更多数据了');
                $imgFoot.attr('src','');
            }
        })
        bscroll.on('scroll',function(){
            if(this.maxScrollY > this.y){
                $imgFoot.addClass('down');
            }
        })

         //swiper-banner
         new Swiper.default('.swiper-container', {
            loop: true, // 循环模式选项
            autoplay: true,
            effect: 'slider',
            autoplay:{
                disableOnInteraction:false
            },
            //如果需要分页器
            pagination: {
              el: '.swiper-pagination',
              clickable: true
            }
          });
    }
}
export default new Position();