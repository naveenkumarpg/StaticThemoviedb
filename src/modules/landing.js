import ErrorMsg from './error'
import Text from '../text/messages'

export default class landing{

    /*
    * to determine to show error message or to proceed with user entered text
    */
    getData(){
        //TODO 
        // WHY Prototype while calling error messaage.
        var movieSText = document.getElementById("moviename").value;
        (movieSText.length < 2) ? ErrorMsg.prototype.showErrorMessage(Text.inputError) : this.proceedSearch(movieSText);
        //(movieSText.length <= 3) ? this.showErrorMessage(messages.inputError) : this.proceedSearch("Pirates");
    }

    /*
    * @movieSText - is user entered text.
    * call has to be made to get the data from the tmdb
    */
    proceedSearch(movieSText){
        let url = `http://api.themoviedb.org/3/search/movie?api_key=66fa95d87d40faf5c50324a339937e6c&query=${movieSText}`;
        //let url = '/dist/json/results.json';
        var getData = new Promise((resolve,reject) =>{
            fetch(url).then((response) => {
                return response.json();
            }).then((response) => {
                resolve(response);
            });
        });

        getData.then((response) => {
            if(response.results.length <=0){
                ErrorMsg.prototype.showErrorMessage(Text.nomovies)
            }else{
                this.renderTable(response);    
            }
            
        })
    }

    /*
    * @response - response form tmdb  
    * on sucess full feth of the data, rendeting the column shows movies details/
    */
    renderTable(response){ 
        let movieLength = response.results.length;
        document.getElementById("total").innerHTML =`We have found ${movieLength} Movies with search term`

        let HTML =  response.results.map((data) =>{
            let imagePath =""
            if(!data.poster_path){
                imagePath = "../public/images/dummy.jpg";
            }else{
                imagePath = `https://image.tmdb.org/t/p/w500/${data.poster_path}` 
            }
            console.log(imagePath);
            return `<div class="col-xs-2"><a href="${'/index.html?movie='+data.id}" class="movieitem">
                    <div class="poster_wrap">
                        <img class="poster" src=${imagePath} />
                        <p class="title">${data.title}</p>
                    </div>
                    </a></div>`;
        });

        document.getElementById("moviesData").innerHTML = HTML.join("");
        document.getElementById("detailwrapper").classList.add("hide");
        document.getElementById("moviesData").classList.remove("hide");
        
    }

}