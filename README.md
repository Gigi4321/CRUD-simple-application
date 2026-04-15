# Productify - Simple Product Management CRUD App

A feature-rich frontend CRUD application that allows business owners to manage their products easily entirely within the browser.  
Users can add products using input fields (name, description, price, stock quantity, and category), seamlessly upload and attach images, auto-compress data, search through lists, edit existing products, or delete them.

---

## 🌍 Live Demo
👉 https://gigi4321.github.io/CRUD-simple-application/

---

## ✨ Features

- **Full CRUD System**: Create, Read, Update, and Delete products on the fly.
- **Image Support with Auto-Compression**: Upload custom images for products. To ensure your browser's local memory isn't quickly maxed out, the application automatically down-scales and compresses uploaded images using an HTML5 Canvas behind the scenes!
- **Live Search Filtering**: Search for specific products instantly through the dynamic text search bar.
- **Persistent Data**: Saves your inventory layout automatically inside your browser's `localStorage` so it remains active even if you refresh or close the tab!
- **Error & Edge-Case Handling**: Displays clean empty-states and handles memory quota limits elegantly.
- **Responsive Product Cards**: View products easily on Desktop or Mobile structured beautifully utilizing Bootstrap 5 layouts.

---

## 🛠 Technologies Used

- Figma (Design)
- HTML5 & CSS3
- Bootstrap 5 for fast, response Grid systems
- Vanilla JavaScript (No Frameworks)

---

## 🚀 How to Run the Project

### Quick Start
1. Download or clone the project from Github.
2. Navigate to the project folder.
3. Open `index.html` in your browser. (No node modules or backend required!).

---

## 📋 How to Use

1. **Add Form**: Fill in all product fields in the top card, and click the image upload box to set an image. 
2. **Submit**: Click **Add Product** to generate a new product card onto your inventory.
3. **Filter**: Use the Search Bar to query specific product names.
4. **Edit**: Click **Edit** on any product card to pre-fill the data back into the top form. Re-upload or edit values, and click **Update Product**.
5. **Delete**: Click **X** on any product card to trigger a confirmation and remove the product.

---

## 👩‍💻 Author

**Engy Osman**  
UI/UX & Frontend Developer

---

## 🌱 Future Improvements

- Connect to a real Node.js backend or Firebase database.
- Expand sorting criteria (sort by price/stock).
- Add Pagination parameters for massive product lists.
- Introduce dark-mode UI support.
