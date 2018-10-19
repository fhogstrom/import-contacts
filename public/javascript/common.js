var Common = {
   
    closeOverlay: function () {
    const overlay = document.getElementById("overlay").style.display = "none";
    }

};
/* 
This is front end validatior that just gets triggered if fields are empty when trying to fetch data,
whoever is looking at this code is probably wondering what the f*** is the setTimeOut in the else statement doing?
Timing issue with clearing forms.


*/
  window.onload = function () {
      document.querySelector("#submit-btn").addEventListener("click", function (event) {
        const clearLogin = document.getElementsByClassName("login-container");
         const inputs = document.getElementsByClassName("validate");

         for (let i = 0; i < inputs.length; i++) {
             const values = inputs[i].value;
           
             if (values[i] === undefined) {
                 inputs[i].style.border = "1px solid red";
                 event.preventDefault();
             } else {
                const displayLoader = document.getElementById("overlay").style.display = "block";
                setTimeout(() => {
                    clearLogin[0].reset(); 
                }, 1000);
             }
         }}, false);
  };


    




