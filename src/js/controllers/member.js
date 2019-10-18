const memberView = require('../views/member.art');

class Member{
    constructor(){

    }
    render(){
        let memberHtml = memberView({});
        $('#choiceTheater').html(memberHtml);

    }
}
export default new Member()