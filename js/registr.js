const elForm = document.querySelector(".form");
const nameInput = document.querySelector(".name-input");
const emailInput = document.querySelector(".email-input");
const numberInput = document.querySelector(".numberinput");
const passwordInput = document.querySelector(".pasword-input");
const elBtn = document.querySelector(".open");

// let ipAddress = "192.168.5.180"
let ipAddress = "localhost" 

async function update() {
    const userNamevalue = nameInput.value.trim();
    const emailvalue = emailInput.value.trim();
    const numbervalue = numberInput.value;
    const passwordvalue = passwordInput.value;
    


    try {
        const formData = new FormData();
        formData.append("user_name", userNamevalue)
        formData.append("email", emailvalue)
        formData.append("phone", numbervalue)
        formData.append("password", passwordvalue)

        const response = await fetch(`http://${ipAddress}:5000/user/register`, {
        method: "POST",
        body: formData,
    })
    const data = await response.json();
    
    if (data.token) {
        window.localStorage.setItem("token-registr", data.token);
        window.location.pathname = ("index.html")
    }
    
} catch (err) {
    console.log(err);
}
}


elForm.addEventListener("submit", function (evt) {
    evt.preventDefault();
    update();
})

elBtn.addEventListener("mousedown", function(){
    if(passwordInput.type == "password"){
        passwordInput.type = "text";
    } 
});

elBtn.addEventListener("mouseup", function(){
    if(passwordInput.type == "text"){
        passwordInput.type = "password";
    } 
});