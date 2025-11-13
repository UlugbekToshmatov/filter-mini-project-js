const data = [
  {
    id: 1,
    name: "Invicta Men's Pro Diver",
    img: "https://m.media-amazon.com/images/I/71e04Q53xlL._AC_UY879_.jpg",
    price: 74,
    category: "Dress",
  },
  {
    id: 11,
    name: "Invicta Men's Pro Diver 2",
    img: "https://m.media-amazon.com/images/I/71e04Q53xlL._AC_UY879_.jpg",
    price: 74,
    category: "Dress",
  },
  {
    id: 2,
    name: "Timex Men's Expedition Scout ",
    img: "https://m.media-amazon.com/images/I/91WvnZ1g40L._AC_UY879_.jpg",
    price: 40,
    category: "Sport",
  },
  {
    id: 3,
    name: "Breitling Superocean Heritage",
    img: "https://m.media-amazon.com/images/I/61hGDiWBU8L._AC_UY879_.jpg",
    price: 200,
    category: "Luxury",
  },
  {
    id: 4,
    name: "Casio Classic Resin Strap ",
    img: "https://m.media-amazon.com/images/I/51Nk5SEBARL._AC_UY879_.jpg",
    price: 16,
    category: "Sport",
  },
  {
    id: 5,
    name: "Garmin Venu Smartwatch ",
    img: "https://m.media-amazon.com/images/I/51kyjYuOZhL._AC_SL1000_.jpg",
    price: 74,
    category: "Casual",
  },
];

const categoriesContainer = document.querySelector(".categories");
const priceRangeContainer = document.querySelector(".price-range");
const productsContainer = document.querySelector(".products-page");

const searchBar = document.querySelector(".search-bar");
const priceRangeBar = document.querySelector(".price-range-bar");

// Initialize categories
const categories = ["All", ...new Set(data.map(item => item.category))];
categories.forEach(category => {
    const categorySpan = document.createElement("span");
    categorySpan.className = "category";
    categorySpan.textContent = category;

    categoriesContainer.append(categorySpan);
});

// Define a reusable function to render received products
function displayProducts(filteredData) {
    productsContainer.innerHTML = filteredData.map(item => (
        `
            <div class="product">
                <img
                    src=${item.img}
                    alt=${item.name}
                >
                <span class="name">${item.name}</span>
                <span class="price">$${item.price}</span>
            </div>
        `
    )).join("");
}

// Listen to the category spans to show products by category
document.querySelectorAll(".category").forEach((categorySpan) => {
  categorySpan.addEventListener("click", () => {
    categorySpan.textContent === "All"
      ? displayProducts(data)
      : displayProducts(
          data.filter((item) => item.category === categorySpan.textContent)
        );
  });
});

// Listen to the searchBar and priceRangeBar inputs to show products
// by similar name and price
searchBar.addEventListener("keyup", (e) => {
    const input = e.target.value.toLowerCase();     // Event triggers whenever non-empty value is present
    
    if (input) {
        displayProducts(data.filter(item => (
            item.name.toLowerCase().includes(input)
        )));
    } else {
        displayProducts(data);
    }
})

displayProducts(data);