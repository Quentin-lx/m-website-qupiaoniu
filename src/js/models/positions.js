module.exports = {
    get({pageIndex=1,pageSize=10 }){
        return $.ajax({
            url : `/api?pageIndex=${pageIndex}&pageSize=${pageSize}`,
            // data:{
            //     pageIndex:1,
            //     pageSize:10
            // },
            // success:function(res){
            //     console.log(res);
            // }
        })
    }
}