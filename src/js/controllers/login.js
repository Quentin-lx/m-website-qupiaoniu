import loginView from '../views/login.art';



class Login{
    constructor(){

    }
    render(){
        let loginHtml = loginView({});
        $('#choiceTheater').html(loginHtml);

        $('.checkbox').on('click',this.bindEvent)
    }
    bindEvent(){
        if($(this).hasClass('active2')){
            console.log(1);
            $(this).removeClass('active2')
        }else{
            console.log(0)
            $(this).addClass('active2')
        }
       
    }
}

export default new Login()
