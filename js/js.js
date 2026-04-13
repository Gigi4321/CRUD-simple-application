

// !this is variables that assing inputs html[all elements]
var productName = document.getElementById("productName");
var productDesc = document.getElementById("productDesc");
var productPrice = document.getElementById("productPrice");
var productCategory = document.getElementById("productCategorys");
var productStock = document.getElementById("productStock");
var ctaBtn = document.getElementById("ctaBtn");
var search = document.getElementById("search");
var formFile = document.getElementById("formFile");
var img = document.getElementById("img");
var imgPreviewHolder = document.getElementById("imgPreviewHolder");
var imgPreview = document.getElementById("imgPreview");
var labelHolder = document.querySelector(".label-holder");


//! producta array that i will put object (any product) on it
var products = [];

if (localStorage.getItem('products')) {
  products = JSON.parse(localStorage.getItem('products'))
  console.log("hello")
  display(products)
  console.log('done')
}


// !search fun
search.addEventListener('input', function (e) {
  let term = search.value.toLowerCase();
  console.log(term)
  let searchProducts = products.filter(product => {
    return product.Name.toLowerCase().includes(term);
  })
  display(searchProducts)
})

let imageUrl=''

formFile.addEventListener('change',(e)=>{
  const file=e.target.files[0];
  reader =new FileReader()
  reader.onload=(event)=>{
    imageUrl=reader.result;
    imgPreview.src=reader.result;
    imgPreviewHolder.classList.remove('d-none')
    labelHolder.classList.add('d-none')
    
    
  }
  reader.readAsDataURL(file)
})
function removeImg(){
  imageUrl='';
  imgPreview.src='';
  imgPreviewHolder.classList.add('d-none')
  labelHolder.classList.remove('d-none')

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

function display(products) {
  var cartona = "";
  for (var i = 0; i < products.length; i++) {
    cartona +=creatCol(products[i],i)
  }
  document.getElementById("my-products").innerHTML = cartona;
}


function creatCol(product,i) {
 return ` <div class="col-10 mx-auto col-sm-6 col-md-4 col-lg-3">
    <div class="card rounded-4 position-relative">

      <div class="imge-holder position-relative overflow-hidden">

        <img src="${products[i].Image}" class="card-img rounded-4" height="230">
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
  </div>`
}

//!remove product for row function

function RemoveProduct(i) {
  products.splice(i, 1);
  localStorage.setItem('products', JSON.stringify(products))
  display(products);
}


var editIndex = null;

function update(i) {
  editIndex = i;
  productName.value = products[i].Name;
  productDesc.value = products[i].Description;
  productPrice.value = products[i].Price;
  productCategory.value = products[i].Category;
  productStock.value = products[i].Stock;
  ctaBtn.innerHTML = 'Update'
}

function addProduct() {

    const product = {
      Name: productName.value,
      Description: productDesc.value,
      Price: productPrice.value,
      Category: productCategory.value,
      Stock: productStock.value,
      Image:imageUrl
    };

    if (editIndex !== null) {
      products[editIndex] = product;
      editIndex = null;
      ctaBtn.innerHTML = 'Add This Product';
    } else {
      products.push(product);
    }

    localStorage.setItem('products', JSON.stringify(products));
    display(products);
    clearInputs();
  };

function addProduct() {
  const file = formFile.files[0];

  const reader = new FileReader();

  reader.onload = function (e) {

    const product = {
      Name: productName.value,
      Description: productDesc.value,
      Price: productPrice.value,
      Category: productCategory.value,
      Stock: productStock.value,
      Image: e.target.result
    };

    if (editIndex !== null) {
      products[editIndex] = product;
      editIndex = null;
      ctaBtn.innerHTML = 'Add This Product';
    } else {
      products.push(product);
    }

    localStorage.setItem('products', JSON.stringify(products));
    display(products);
    clearInputs();
  };

  reader.readAsDataURL(file);
}

function clearInputs() {
  productName.value = "";
  productDesc.value = "";
  productPrice.value = "";
  productCategory.value = "";
  productStock.value = "";
}

