const loginToken = localStorage.getItem("token-login")
const dataList = document.querySelector(".data-list")
const dataTemplate = document.querySelector(".data-template").content;

// let ipAddress = "192.168.5.180"
let ipAddress = "localhost" 

if (!loginToken) {
  window.location.reload();
  window.location.pathname = "login.html";
};


async function getProductMain() {
  const fragmentList = document.createDocumentFragment();
  dataList.innerHTML = "";
  try {
    const res = await fetch(`http://${ipAddress}:5000/product`, {
      headers: {
        Authorization: loginToken
      }
    })
    const data = await res.json();
    // console.log(data);
    data.forEach(element => {
      const clonedTemplate = dataTemplate.cloneNode(true)
      // console.log(element);

      clonedTemplate.querySelector(".data-title").textContent = element.product_name;
      clonedTemplate.querySelector(".data-img").src = `http://${ipAddress}:5000/${element.product_img}`;
      clonedTemplate.querySelector(".data-text").textContent = element.product_desc;
      clonedTemplate.querySelector(".data-price").textContent = element.product_price;
      clonedTemplate.querySelector(".buy").dataset.id = element.id;
      fragmentList.appendChild(clonedTemplate)
    });
    dataList.appendChild(fragmentList)

  } catch (error) {
    console.log(error);
  }
}

getProductMain();



function postOrder(id) {
  try {
    fetch(`http://${ipAddress}:5000/order`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: loginToken
    },
    body: JSON.stringify({
      procduct_id: id,
      })
  })
  } catch (error) {
    console.log(error);
  }
}

dataList.addEventListener("click", function (evt) {
  if (evt.target.matches(".buy")) {
    const id = evt.target.dataset.id
    console.log(id);
    postOrder(id)
  }
})

