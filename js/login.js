const elLoginForm = document.querySelector(".login-form")
const elEmail = document.querySelector(".login-email")
const elPassword = document.querySelector(".login-password")
const elBtn = document.querySelector(".opena");



// let ipAddress = "192.168.5.180"
let ipAddress = "localhost" 

async function updateLogin() {
    const loginEmailvalue = elEmail.value;
    const passwordLoginvalue = elPassword.value;

    try {
        const formData = new FormData();
        formData.append("email", loginEmailvalue);
        formData.append("password", passwordLoginvalue);

        

        const response = await fetch(`http://${ipAddress}:5000/user/login`, {
            method: "POST",
            body: formData

        })
        const data = await response.json();

        if (data.token) {
            window.localStorage.setItem("token-login", data.token);
            window.location.pathname = ("index.html");
        }
    } catch (error) {
        console.log(error);
    }
}


elLoginForm.addEventListener("submit", function (evt) {
    evt.preventDefault();
    updateLogin();
})

elBtn.addEventListener("mousedown", function(){
    if(elPassword.type == "password"){
        elPassword.type = "text";
    } 
});
elBtn.addEventListener("mouseup", function(){
    if(elPassword.type == "text"){
        elPassword.type = "password";
    } 
});