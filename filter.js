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
    price: 150,
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
    price: 100,
    category: "Casual",
  },
];

const categoriesContainer = document.querySelector(".categories");
const priceRangeContainer = document.querySelector(".price-range");
const productsContainer = document.querySelector(".products-page");
const priceSpan = document.querySelector(".price");

const searchBar = document.querySelector(".search-bar");
const priceRangeBar = document.querySelector(".price-range-bar");

let maxPrice = data[0].price;
let minPrice = data[0].price;
let currentCategory = "All";
const categories = ["All"];

data.forEach(item => {
    !categories.includes(item.category) && categories.push(item.category);

    if (item.price > maxPrice) {
        maxPrice = item.price;
    } else if (item.price < minPrice) {
        minPrice = item.price;
    }
})

priceRangeBar.max = maxPrice;
priceRangeBar.min = minPrice;
priceRangeBar.value = maxPrice;
priceSpan.textContent = `$${maxPrice}`;
let currentPrice = maxPrice;

categories.forEach(category => {
    const categorySpan = document.createElement("span");
    categorySpan.className = "category";
    categorySpan.textContent = category;

    categoriesContainer.append(categorySpan);
});

document.querySelectorAll(".category").forEach((categorySpan) => {
  categorySpan.addEventListener("click", () => {
    currentCategory = categorySpan.textContent;

    categorySpan.textContent === "All"
      ? displayProducts(data)
      : displayProducts(
          data.filter((item) => item.category === categorySpan.textContent)
        );
  });
});

searchBar.addEventListener("keyup", (e) => {
    const input = e.target.value.toLowerCase();     // 'keyup' event triggers whenever non-empty value
                                                    // is present in the search bar
    if (input) {
        displayProducts(data.filter(item => (
            item.name.toLowerCase().includes(input)
        )));
    } else {
        displayProducts(data);
    }
})

priceRangeBar.addEventListener("input", (e) => {
    const priceValue = Number(e.target.value);
    priceSpan.textContent = priceValue;
    currentPrice = priceValue;
    displayProducts(data.filter(item => item.price <= priceValue));
});

function displayProducts(filteredData) {
    if (currentCategory === "All"){
        productsContainer.innerHTML = filteredData
            .filter(item => item.price <= currentPrice)
            .map(item => (
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
    } else {
        productsContainer.innerHTML = filteredData
            .filter(item => item.price <= currentPrice && item.category === currentCategory)
            .map(item => (
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
}

displayProducts(data);