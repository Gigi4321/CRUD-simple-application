

// !this is variables that assing inputs html[all elements]
var productName = document.getElementById("productName");
var productDesc = document.getElementById("productDesc");
var productPrice = document.getElementById("productPrice");
var productCategory = document.getElementById("productCategorys");
var productStock = document.getElementById("productStock");

//! producta array that i will put object (any product) on it
var products = [];

//!add product function
function addProduct() {
  var product = {
    Name: productName.value,
    Description: productDesc.value,
    Price: productPrice.value,
    Category: productCategory.value,
    Stock: productStock.value,
  };

  products.push(product);
  display();
  deleteProduct();
}
//!make inputs clear after add products
function deleteProduct() {
  productName.value = null;
  productDesc.value = null;
  productPrice.value = null;
  productCategory.value = null;
  productStock.value = null;
}
console.log(products);
//!display the products

function display() {
  var cartona = "";

  for (var i = 0; i < products.length; i++) {
    cartona += `
         <div class="col-10 mx-auto col-sm-6 col-md-4 col-lg-3">
                <div class="card rounded-4 position-relative">

                    <div class="imge-holder position-relative overflow-hidden">

                        <img src="./my.jpeg" class="card-img rounded-4" height="230">
                        <span class="position-absolute  z-3 badge rounded-pill bg-danger bg-opacity-75 py-2 px-3">
                            ${products[i].Category}
                        </span>
                        <!-- ? this is the CTA card -->
                        <div class=" p-3 buttons col-12 d-flex gap-2 position-absolute top-100">
                            <button type="submit" class="btn w-75 main-btn  m-auto fw-medium p-1 " onclick="update(${i})">Edit</button>
                            <button type="reset" class="btn w-25 sec-btn m-auto fw-medium  main-color delete-border p-1" onclick="RemoveProduct(${i})"><i
                                    class="fa-solid fa-trash-can"></i></button>
                        </div>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">${products[i].Name}</h5>
                        <p class="card-text text-body-secondary">${products[i].Description}</p>
                        <div class="d-flex p-3 rounded-4 bg-body-secondary justify-content-between">
                            <div class="w-50 card-border">
                                <span class="text-muted h6 me-auto d-block">price</span>
                                <span class="main-color fs-6 fw-medium me-auto d-block">$${products[i].Price}</span>
                            </div>
                            <div>
                                <span class="text-muted h6 text-end d-block">stock</span>
                                <span class="main-color fs-6 fw-medium text-end  d-block ">${products[i].Stock}</span>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        `;
  }

  document.getElementById("my-products").innerHTML = cartona;
}

//!remove product for row function

function RemoveProduct(i) {
  products.splice(i, 1);
  display();
}


var editIndex = null;

function update(i) {
  editIndex = i;
  productName.value = products[i].Name;
  productDesc.value = products[i].Description;
  productPrice.value = products[i].Price;
  productCategory.value = products[i].Category;
  productStock.value = products[i].Stock;
}

function addProduct() {
  var product = {
    Name: productName.value,
    Description: productDesc.value,
    Price: productPrice.value,
    Category: productCategory.value,
    Stock: productStock.value,
  };

  if (editIndex !== null) {

    products[editIndex] = product;
    editIndex = null;
  } else {
   
    products.push(product);
  }

  display();
  clearInputs();
}

function clearInputs() {
  productName.value = "";
  productDesc.value = "";
  productPrice.value = "";
  productCategory.value = "";
  productStock.value = "";
}


