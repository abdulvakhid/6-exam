const elForm = document.querySelector(".form");
const producTitle = elForm.querySelector(".title");
const productDesc = elForm.querySelector(".description");
const producImg = elForm.querySelector(".img");
const producPrice = elForm.querySelector(".price");
const producBtn = elForm.querySelector(".submit");
const producSave = elForm.querySelector(".save");
const elTemplate = document.querySelector(".template").content;
const loginToken = localStorage.getItem("token-login");
const elList = document.querySelector(".list")
// let ipAddress = "192.168.5.180"
let ipAddress = "localhost" 




// post
async function postProduct() {
    elList.innerHTML = "";
    try {
        const formData = new FormData();
        formData.append("product_name", producTitle.value);
        formData.append("product_desc", productDesc.value);
        formData.append("product_img", producImg.files[0]);
        formData.append("product_price", producPrice.value);

        fetch(`http://${ipAddress}:5000/product`, {
            method: "POST",
            headers: {
                Authorization: loginToken
            },
            body: formData,
        })

    } catch (error) {
        console.log(error);
    }
}

// get 
async function getProduct() {
    const fragmentList = document.createDocumentFragment();
    elList.innerHTML = "";
    try {
        const res = await fetch(`http://${ipAddress}:5000/product`, {
            headers: {
                Authorization: loginToken
            }
        })
        const data = await res.json();
        // console.log(data);
        data.forEach(element => {
            const clonedTemplate = elTemplate.cloneNode(true)
            // console.log(element);

            clonedTemplate.querySelector(".title").textContent = element.product_name;
            clonedTemplate.querySelector(".img").src = `http://${ipAddress}:5000/${element.product_img}`;
            clonedTemplate.querySelector(".text").textContent = element.product_desc;
            clonedTemplate.querySelector(".price").textContent = element.product_price;
            clonedTemplate.querySelector(".edit").dataset.id = element.id;
            clonedTemplate.querySelector(".delete").dataset.id = element.id;

            fragmentList.appendChild(clonedTemplate)
        });
        elList.appendChild(fragmentList)


    } catch (error) {
        console.log(error);
    }
}

getProduct()

producBtn.addEventListener("click", function (evt) {
    evt.preventDefault();

    postProduct()
    window.location.pathname = "./admin.html"
    getProduct()
    window.location.reload()
})





// delete 
async function deleteProduct(id) {
    elList.innerHTML = "";
    try {
        fetch(`http://${ipAddress}:5000/product/` + id, {
            method: "DELETE",
            headers: {
                Authorization: loginToken
            }
        })
    } catch (error) {
        console.log(error);
    }
}

elList.addEventListener("click", function (evt) {
    if (evt.target.matches(".delete")) {
        const id = evt.target.dataset.id;
        console.log(id);
        deleteProduct(id)
        getProduct()
    }
})






// edit  
function editProduct(id) {
    try {
        let dataForma = new FormData()

        dataForma.append("product_name", producTitle.value)
        dataForma.append("product_desc", productDesc.value)
        dataForma.append("product_img", producImg.files[0])
        dataForma.append("product_price", producPrice.value)

        fetch(`http://${ipAddress}:5000/product/` + id, {
            method: "PUT",
            headers: {
                Authorization: loginToken
            },
            body: dataForma
        })

    } catch (error) {
        console.log(error);
    }

}

elList.addEventListener("click", (evt) => {
    if (evt.target.matches(".edit")) {
        const id = evt.target.dataset.id;
        producSave.dataset.id = id;

        let parent = evt.target.parentElement.parentElement;
console.log(parent);
        let title = parent.childNodes[1].textContent;
        let img = parent.childNodes[3].src;
        let text = parent.childNodes[5].textContent;
        let price = parent.childNodes[7].childNodes[1].textContent;
       console.log(img);
        producTitle.value = title;
        productDesc.value = text;
        producImg.src = img;
        producPrice.value = price;
        producTitle.focus()

        console.log(id);
       
        producBtn.classList.add("d-none")
        producSave.classList.remove("d-none")

    }
})



producSave.addEventListener("click", function (evt) {

    let id = evt.target.dataset.id
    editProduct(id)

    producBtn.classList.remove("d-none")
    producSave.classList.add("d-none")


})