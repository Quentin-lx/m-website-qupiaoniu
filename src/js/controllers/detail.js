import detailView from '../views/detail.art'


class Detail{
    constructor(){

    }
    render(){
        let detailHtml = detailView({});
        $('#choiceTheater').html(detailHtml);
    }
}

export default new Detail()