import Detail from './modules/detail'
import Landing from './modules/landing'

export default class App { 
    
    /*
    * First method to be initialized on the class
    * will call other necessary methods.
    */
    init(){
        this.eventBinders();

        if(document.location.search){
            this.movieID = document.location.search.split("movie=")[1];
            Detail.prototype.getDetailjon(this.movieID);
        }
    }

    /*
    * Events to be dinded to the dom elements.
    */
    eventBinders(){

        document.getElementById("getdata").onclick = () => {
            Landing.prototype.getData();
        };
        
        document.getElementById("moviename").addEventListener("keyup", function(event) {
            event.preventDefault();
            if (event.keyCode === 13) {
                document.getElementById("getdata").click();
            }
        });
    }

}


var themoviedb = new App();
    themoviedb.init();