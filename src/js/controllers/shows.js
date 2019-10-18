import showsView from '../views/shows.art';
import showsRequest from '../views/shows-request.art';
import allShowsModel from '../models/showss';
const BScroll = require('better-scroll');

class shows{
    constructor(){
        this.list = [];
        this.pageIndex = 1;
        this.pageSize = 13;
        this.totalNum = 0;
        this.categoryId = 0;
        

    }
    renders(list){
        let requestHtml = showsRequest({
            list
        });
        $('.allshows-list >ul').html(requestHtml);

    }
    async render(){
        let that = this; 
        let $imghead = $('.head img');
        let $imgFoot = $('.foot img');
        let showsHtml = showsView({});        
        $('#choiceTheater').html(showsHtml);
        this.domReload()

        let result = await allShowsModel.get({
            
        });
        console.log(result);
        let list = this.list = result.data;
        that.totalNum = result.totalNum;
        this.renders(list);

        let bscroll = new BScroll.default('main',{
            probeType:2,
        });
        bscroll.on('scrollEnd',async function(){
            if(this.maxScrollY >= this.y && Math.ceil(that.totalNum/that.pageSize) >= that.pageIndex && location.hash == '#shows'){
                that.pageIndex++;
                $imgFoot.attr('src','/assets/images/ajax-loader.gif');
                let result = await allShowsModel.get({
                    pageIndex:that.pageIndex
                })
                let {data:list,totalNum} = result;
                //更新totalNum，有新的内容发布
                that.totalNum = totalNum;
                
                that.list =[...that.list,...list];
                that.renders(that.list);
                bscroll.refresh();
                bscroll.scrollBy(0,40);   
            }
            
        })
        $('.showskinds ul').get(0).addEventListener('touchstart', (e) => {
            
            e.stopPropagation();
        });
        $('.showskinds ul li').on('click',this.bindEvent);
    }
    bindEvent(){
       $(this).addClass('active2').siblings().removeClass('active2');
       
        
    }
    domReload(){
        let $imgFoot = $('foot img');
        if(location.hash == '#shows'){
            $imgFoot.attr('src','/assets/images/arrow.png');
        }
    }
}
export default new shows();