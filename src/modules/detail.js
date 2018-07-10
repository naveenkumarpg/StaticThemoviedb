import FavList from './favlist'

export default class detail {
    /*
    * @movieID - is to get he the json using selected movie
    * This will be read from the page URL, with param name called ?movie=**** 
    */
    getDetailjon(movieID){
        let url =  `http://api.themoviedb.org/3/movie/${movieID}?api_key=66fa95d87d40faf5c50324a339937e6c`;
        //let url = '/dist/json/detail.json';

        //promise to make a call
        var getDetailData = new Promise((resolve,reject) =>{
            fetch(url).then((data) => {
                return data.json();
            }).then((data) =>{
                resolve(data);
            });
        });

        //On Sucessfull promise resolved, calling the method to render the detais to the page.
        getDetailData.then((response) =>{
            this.renderDetailTempalte(response);
        })
    }
    /*
    * @movie - is response about the selected movie
    * 
    */
    renderDetailTempalte(movie){
        let imagePath =""

        // Condition to check the image is not availabel
        // Setting defaut image.
        
        if(!movie.poster_path){
            imagePath = "../public/images/dummy.jpg";
        }else{
            imagePath = `https://image.tmdb.org/t/p/w500/${movie.poster_path}` 
        }

        //forming image path.
        let bgimagePath =  `${'https://image.tmdb.org/t/p/w500'+movie.backdrop_path}`;
        this.setbodyBackground(bgimagePath);

        //Template to display movie details details.
        let HTML = `<div id="movieid" data-movieid=${movie.id} class="row">
                    <div class="col-xs-4">
                        <img class="detailposter" src=${imagePath} />
                    </div>
                    <div class="col-xs-8">
                        <h1>${movie.original_title}</h1>

                        <h4 class="inline">Number of Votes : </h4> 
                        <p>${movie.vote_count}</p>
                        
                        <h4 class="inline">Rating : </h4> 
                        <p>${movie.vote_average}</p>

                        <h3>Overview : </h3> 
                        <p>${movie.overview}</p>
                        
                        <h3>Languages : </h3> 
                        <p>${movie.spoken_languages.map((item) => `<span>${item.name}</span>` ).join(" | ")}</p>
                        
                        <h3>Favorites List : </h3> 
                        <div id="tools"></div>
                        <p class="disclaimer">* Green buttons represents they are added as Favorites</p>

                    </div>
                    </div>`;
        document.getElementById("moviedetail").innerHTML = HTML;
        document.getElementById("detailwrapper").classList.remove("hide");
        FavList.prototype.updateSelect();
    }

    /*
    * @image - is image path.
    * is to set backdrop image to the wrapper container.
    */

    setbodyBackground(image){
        document.getElementById("detailwrapper").style.backgroundImage = `url('${image}')`;
    }


}
