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

if (localStorage.getItem("products")) {
  products = JSON.parse(localStorage.getItem("products"));
  console.log("hello");
  display(products);
  console.log("done");
}

// !search fun
search.addEventListener("input", function (e) {
  let term = search.value.toLowerCase();
  console.log(term);
  let searchProducts = products.filter((product) => {
    return product.Name.toLowerCase().includes(term);
  });
  display(searchProducts);
});

let imageUrl = "";

formFile.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (event) => {
    const imgObj = new Image();
    imgObj.onload = () => {
      const MAX_WIDTH = 500;
      const MAX_HEIGHT = 500;
      let width = imgObj.width;
      let height = imgObj.height;

      if (width > height) {
        if (width > MAX_WIDTH) {
          height = Math.round((height *= MAX_WIDTH / width));
          width = MAX_WIDTH;
        }
      } else {
        if (height > MAX_HEIGHT) {
          width = Math.round((width *= MAX_HEIGHT / height));
          height = MAX_HEIGHT;
        }
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(imgObj, 0, 0, width, height);

      const compressedDataUrl = canvas.toDataURL("image/png");

      imageUrl = compressedDataUrl;
      imgPreview.src = compressedDataUrl;
      imgPreviewHolder.classList.remove("d-none");
      labelHolder.classList.add("d-none");
    };
    imgObj.src = event.target.result;
  };
  reader.readAsDataURL(file);
});

function removeImg() {
  imageUrl = "";
  imgPreview.src = "";
  imgPreviewHolder.classList.add("d-none");
  labelHolder.classList.remove("d-none");
  formFile.value = "";
}

console.log(products);
//!display the products

function display(products) {
  var cartona = "";
  for (var i = 0; i < products.length; i++) {
    cartona += creatCol(products[i], i);
  }
  if (products.length === 0) {
    document.getElementById("my-products").innerHTML =
      `<div class="col-12 text-center text-muted my-5">
      <i class="fa-solid fa-box-open fa-3x mb-3"></i>
      <h4>No products found</h4>
      <p>Start adding some products to your inventory!</p>
    </div>`;
    return;
  }
  document.getElementById("my-products").innerHTML = cartona;
}

function creatCol(product, i) {
  return ` <div class="col-10 mx-auto col-sm-6 col-md-4 col-lg-3">
    <div class="card rounded-4 position-relative border-0 shadow-sm h-100 hover-elevate">
      <div class="imge-holder position-relative overflow-hidden" style="height: 230px; border-radius: 1rem 1rem 0 0;">
        <img src="${product.Image || "image.png"}" class="card-img w-100 h-100 object-fit-cover" alt="Product Image" onerror="this.src='image.png'">
          <span class="position-absolute z-3 badge rounded-pill bg-danger bg-opacity-75 py-2 px-3 m-2 top-0 start-0">
            ${product.Category || "Unknown"}
          </span>
          <!-- ? this is the CTA card -->
          <div class="p-3 buttons col-12 d-flex gap-2 position-absolute" style="bottom: -100px; transition: all 0.3s; background: linear-gradient(transparent, rgba(0,0,0,0.7));">
            <button type="submit" class="btn w-75 main-btn m-auto fw-medium p-2 shadow-sm rounded-3" onclick="update(${i})">Edit</button>
            <button type="reset" class="btn w-25 sec-btn m-auto fw-medium text-danger delete-border p-2 shadow-sm rounded-3" aria-label="Delete Product" onclick="RemoveProduct(${i})"><i class="fa-solid fa-trash-can"></i></button>
          </div>
      </div>
      <div class="card-body d-flex flex-column">
        <h5 class="card-title fw-bold text-dark text-truncate" title="${product.Name}">${product.Name}</h5>
        <p class="card-text text-secondary mb-4 flex-grow-1" style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">${product.Description}</p>
        <div class="d-flex p-3 rounded-4 bg-light justify-content-between mt-auto border">
          <div class="w-50 card-border pe-2">
            <span class="text-muted small me-auto d-block text-uppercase fw-semibold">Price</span>
            <span class="main-color h5 fw-bold me-auto d-block mb-0">$${product.Price}</span>
          </div>
          <div class="ps-2">
            <span class="text-muted small text-end d-block text-uppercase fw-semibold">Stock</span>
            <span class="text-dark h5 fw-bold text-end d-block mb-0">${product.Stock}</span>
          </div>
        </div>
      </div>
    </div>
  </div>`;
}

//!remove product for row function

function RemoveProduct(i) {
  if (confirm("Are you sure you want to delete this product?")) {
    products.splice(i, 1);
    localStorage.setItem("products", JSON.stringify(products));
    display(products);
  }
}

var editIndex = null;

function update(i) {
  editIndex = i;
  productName.value = products[i].Name;
  productDesc.value = products[i].Description;
  productPrice.value = products[i].Price;
  productCategory.value = products[i].Category;
  productStock.value = products[i].Stock;

  if (products[i].Image) {
    imageUrl = products[i].Image;
    imgPreview.src = imageUrl;
    imgPreviewHolder.classList.remove("d-none");
    labelHolder.classList.add("d-none");
  } else {
    removeImg();
  }

  ctaBtn.innerHTML = "Update Product";
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function addProduct() {
  if (!productName.value || !productPrice.value || !productCategory.value) {
    alert("Please fill in the required fields (Name, Price, Category).");
    return;
  }

  const product = {
    Name: productName.value,
    Description: productDesc.value,
    Price: productPrice.value,
    Category: productCategory.value,
    Stock: productStock.value,
    Image: imageUrl,
  };

  
  let oldProducts = JSON.stringify(products);
  let oldEditIndex = editIndex;

  if (editIndex !== null) {
    products[editIndex] = product;
    editIndex = null;
    ctaBtn.innerHTML = "Add Product";
  } else {
    products.push(product);
  }

  try {
    localStorage.setItem("products", JSON.stringify(products));
    display(products);
    clearInputs();
  } catch (error) {
    console.error("Storage Error: ", error);
    alert(
      "Local Storage is full! The image might be too large, or you have too many products. Please delete some old products or try a smaller image to free up space.",
    );

    products = JSON.parse(oldProducts);
    editIndex = oldEditIndex;

    if (editIndex !== null) {
      ctaBtn.innerHTML = "Update Product";
    } else {
      ctaBtn.innerHTML = "Add Product";
    }
  }
}

function clearInputs() {
  productName.value = "";
  productDesc.value = "";
  productPrice.value = "";
  productCategory.value = "";
  productStock.value = "";
  removeImg();
}
