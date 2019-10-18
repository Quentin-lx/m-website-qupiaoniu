// require('../controllers/index.js');
// require('../controllers/slide-menu.js');
import indexController from '../controllers/index.js';

import positionController from '../controllers/position.js';
import showsController from '../controllers/shows.js';
import memberController from '../controllers/member.js';
import loginController from '../controllers/login.js';


class Router{
    constructor(){
        
        
        this.render();
    }
    render(){
        window.addEventListener('hashchange' , this.handleHashChange.bind(this));
        window.addEventListener('load',this.handlePageLoad.bind(this));
        
    }
    handlePageLoad(){
        let hash = location.hash.substr(1) || "position"
        indexController.render();
        location.hash = hash;
        this.renderDom(hash);
    }
    handleHashChange(e){
        // console.log(location.hash)
        // console.log(e);

        let hash = location.hash.substr(1);
        this.renderDom(hash);
        
    }
    renderDom(hash){
        let pageControllers = {
            positionController,
            showsController,
            memberController,
            loginController
        }
        pageControllers[hash + 'Controller'].render(); 

            if(location.hash !== '#position'){
            $('foot img').attr('src','/assets/images/arrow.png');
            $('.foot b').html('上拉加载更多...');
        }

    }
    
        
}


 export default new Router();