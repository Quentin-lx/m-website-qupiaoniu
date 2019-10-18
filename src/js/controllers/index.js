
const layoutView = require('../views/layout.art')
import slideController from './slide-menu.js';


class Index {
    constructor(){
        // this.render();
    }
    render(){
        
        const html = layoutView({})
        $('#root').html(html);
        slideController.render();
        
        
        
    }
    
}
export default new Index();






