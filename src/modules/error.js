
export default class errormsg {

    showErrorMessage(errorText){
        document.getElementById("errortext").innerHTML = errorText;
        document.getElementById("errortext").classList.remove("hide");
        this.hideErrorMessage();
    }

    hideErrorMessage(){
        setTimeout(() =>{
            document.getElementById("errortext").classList.add("hide")
        },4000)
    }

}