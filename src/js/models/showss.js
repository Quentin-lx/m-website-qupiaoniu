module.exports = {
    get({pageIndex=1,pageSize=15,categoryId=0}){
        return $.ajax({
            url:`/allshows?pageIndex=${pageIndex}&categoryId=${categoryId}&pageSize=${pageSize}`
        })
    }
}