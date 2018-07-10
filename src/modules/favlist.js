export default class favlist{
    Updateselect(){

        let url = "https://jsonblob.com/api/jsonBlob/cd68be36-83f5-11e8-b682-811851c5a022";
        //let url = '/dist/json/categories.json';

        let getFavList = new Promise((resolve, reject)=>{

            fetch(url).then((data) =>{
                return data.json();
            }).then(data =>{
                resolve(data);
            });

        });

        getFavList.then((data)=>{
            this.totalFavList = data;
            this.crateCheckboxes(data);
            this.getfavedList();
        })
    }

    crateCheckboxes(favlist){
        let HTML = "";
        for(let key in favlist){
            HTML = HTML + `<button class="btn favbuttons" data-cat="${favlist[key]}" id="${'cat-'+favlist[key]}" type="checkbox">${favlist[key]}</button>`;
        }
        document.getElementById("tools").innerHTML = HTML;

        this.favAddEvents();
    }
    
    favAddEvents(){
        var favbuttons = document.getElementsByClassName("favbuttons");
        for(var i = 0; i < favbuttons.length; i++) {
            favbuttons[i].addEventListener('click', (e) =>{
               let ele =  e.target || e.srcElement;
                this.classToggler(ele.dataset.cat);
            }, false);
        }
    }

    classToggler(favitem){
        var el = document.getElementById('cat-'+favitem);
        
        if(el.classList.contains("btn-success")){
            document.getElementById('cat-'+favitem).classList.remove("btn-success");
            this.removefromFavList(favitem);
        }else{
            document.getElementById('cat-'+favitem).classList.add("btn-success");
            this.addtoFavList(favitem);
        }
    }

    removefromFavList(item){
        let url = "https://jsonblob.com/api/jsonBlob/2ed05992-8401-11e8-b682-59b3e06478e3";
        let movieid = document.getElementById("movieid").dataset.movieid;
        let movieIndex = this.selectedFavList[movieid].indexOf(item);
        this.selectedFavList[movieid].splice(movieIndex, 1);

        fetch(url, {
            method: 'PUT', // or 'PUT'
            body: JSON.stringify(this.selectedFavList), // data can be `string` or {object}!
            headers:{
              'Content-Type': 'application/json'
            }
          }).then(res => res.json())
          .catch(error => console.error('Error:', error))
          .then(response => console.log('Success:', response));

    }
    addtoFavList(item){
        let url = "https://jsonblob.com/api/jsonBlob/2ed05992-8401-11e8-b682-59b3e06478e3";
        let movieid = document.getElementById("movieid").dataset.movieid;
        if(!this.selectedFavList[movieid]){
            this.selectedFavList[movieid] = [];
            let movieIndex = this.selectedFavList[movieid].push(item);
        }else{
            let movieIndex = this.selectedFavList[movieid].push(item);
        }
        
        
        fetch(url, {
            method: 'PUT', // or 'PUT'
            body: JSON.stringify(this.selectedFavList), // data can be `string` or {object}!
            headers:{
              'Content-Type': 'application/json'
            }
          }).then(res => res.json())
          .catch(error => console.error('Error:', error))
          .then(response => console.log('Success:', response));
    }

    getfavedList(){
        let url = "https://jsonblob.com/api/jsonBlob/2ed05992-8401-11e8-b682-59b3e06478e3";
        //let url = '/dist/json/favs.json';

        let getFavedList = new Promise((resolve, reject)=>{
            fetch(url).then((data) =>{
                return data.json();
            }).then(data =>{
                resolve(data);
            });
        });

        getFavedList.then((data) =>{
            this.selectedFavList = data;
            let movieid = document.getElementById("movieid").dataset.movieid;
            var favedList = data[movieid] || [];
            favedList.map((item) =>{
                document.getElementById("cat-"+item).classList.add("btn-success");
            });

        });
    }
}