export default class errormsg {
    /*
    * @errorText - is text to be displayed on the page
    * when ever thie methods has called, error mesage will be displayed against the page
    */
    showErrorMessage(errorText){
        document.getElementById("errortext").innerHTML = errorText;
        document.getElementById("errortext").classList.remove("hide");
        this.hideErrorMessage();
    }

    /*
    * Error message will be hidden adter 4 sec of showing the error message.
    * */
    hideErrorMessage(){
        setTimeout(() =>{
            document.getElementById("errortext").classList.add("hide")
        },4000)
    }

}