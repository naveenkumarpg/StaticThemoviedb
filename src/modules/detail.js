import FavList from './favlist'

export default class detail {
    
    getDetailjon(movieID){
        let url =  `http://api.themoviedb.org/3/movie/${movieID}?api_key=66fa95d87d40faf5c50324a339937e6c`;
        //let url = '/dist/json/detail.json';
        var getDetailData = new Promise((resolve,reject) =>{
            fetch(url).then((data) => {
                return data.json();
            }).then((data) =>{
                resolve(data);
            });
        });

        getDetailData.then((response) =>{
            this.renderDetailTempalte(response);
        })
    }

    renderDetailTempalte(movie){
        let imagePath =""

        if(!movie.poster_path){
            imagePath = "../public/images/dummy.jpg";
        }else{
            imagePath = `https://image.tmdb.org/t/p/w500/${movie.poster_path}` 
        }


        let bgimagePath =  `${'https://image.tmdb.org/t/p/w500'+movie.backdrop_path}`;
        this.setbodyBackground(bgimagePath);

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

                    </div>
                    </div>`;
        document.getElementById("moviedetail").innerHTML = HTML;
        document.getElementById("detailwrapper").classList.remove("hide");
        FavList.prototype.Updateselect();
    }

    setbodyBackground(image){
        document.getElementById("detailwrapper").style.backgroundImage = `url('${image}')`;
    }


}
