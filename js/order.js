
// let ipAddress = "192.168.5.180"
let ipAddress = "localhost" 

const loginToken = localStorage.getItem("token-login")

fetch(`http://${ipAddress}:5000/order`, {
method: "GET",
headers:{
Authorization: loginToken
}
})
.then(res => res.json())
.then(data => console.log(data))






