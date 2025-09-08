const getById = (id) => {
  return document.getElementById(id)
};
const getCard = (cards) => {
  return cards
};
let allCard =[];
const categoriesContainer = getById("categoriesContainer")
const cardsContainer = getById("cardsContainer")
const cartContainer = getById("cartContainer")
const totalPrice = getById("totalPrice");
const modalBox = getById("modalBox");
const detailsModal = getById("detailsModal");

let cartArr = [];

const showCardLoading = (istrue) => {
  if (istrue === true) {
    cardsContainer.innerHTML = `
    <div class="flex w-full mx-auto justify-center items-center  lg:col-span-3">
    <span class="loading w-20 h-20 loading-spinner text-secondary"></span>
    </div>
    `
  }
};


const loadCatgories = async () => {
  try {
   const res = await fetch("https://openapi.programming-hero.com/api/categories");
  const data = await res.json();
  displayCategories(data.categories);
 } catch (error) {
  console.log(error);
 }
};

const displayCategories = (categories) => {
  categories.forEach(category => {
    categoriesContainer.innerHTML += `
    <button id="${category.id}" onclick="loadCards(${category.id})" class="category-btn m-1 sm:m-0 sm:w-full btn bg-[#F0FDF4] sm:border-none text-start font-medium rounded hover:text-white hover:bg-[#15803D] text-[#1F2937] px-[10px] py-2 text-base sm:justify-start">${category.category_name}</button>`
  });
};

     

categoriesContainer.addEventListener("click", (e) => {
  const allBtn = e.target.parentNode.children;
  for (const btn  of allBtn) {
    if (btn.className.includes("bg-[#15803D]") && btn.className.includes("text-white") && btn.className.includes("active")) {
      btn.classList.remove("bg-[#15803D]", "text-white", "active");
      btn.classList.add("bg-[#F0FDF4]","text-[#1F2937]")
    }
  }
  e.target.classList.remove("bg-[#F0FDF4]","text-[#1F2937]")
  e.target.classList.add("bg-[#15803D]", "text-white", "active")
})


const loadAllPlansCards = async () => {
  showCardLoading(true)
  try {
   const res = await fetch("https://openapi.programming-hero.com/api/plants");
   const data = await res.json();
   
    displayCards(data.plants);
    allCard = getCard(data.plants);
 } catch (error) {
  console.log(error);
 }
};

const loadCards = async (id) => {
  showCardLoading(true)
  try {
   const res = await fetch(`https://openapi.programming-hero.com/api/category/${id}`);
   const data = await res.json();
  displayCards(data.plants);
 } catch (error) {
  console.log(error);
 }
};

const loadDetails =async (id) => {
  
  try {
   const res = await fetch(`https://openapi.programming-hero.com/api/plant/${id}`);
    const data = await res.json();
    
  displayDetails(data.plants);
 } catch (error) {
  console.log(error);
 }
};

const displayDetails = (details) => {
  modalBox.innerHTML = ''
  const div = document.createElement("div");

  div.innerHTML = `
  <h2 class="text-2xl font-semibold my-3">${details.name}</h2>
  <div class="flex justify-between mb-2">
  <div class=" outline-none px-4 py-1 text-[#15803D] rounded-full bg-[#DCFCE7]">
  ${details.category}
  </div>
  <div class=" outline-none px-4 py-1 text-[#15803D] rounded-full bg-[#DCFCE7]">
  ৳ ${details.price}
  </div>
  </div>
  <img class="w-full h-40 sm:h-56 md:h-72 lg:h-96 object-cover rounded-lg" src="${details.image}" alt="" />
  <p class=" my-3">${details.description}</p>

  <button  class="AddToCart bg-[#15803D] w-full hover:bg-yellow-400 hover:text-gray-600 text-white rounded-full py-2 px-5 font-medium">Add to Cart</button>
  
  `

  const card = allCard.find(c=>c.id===details.id)

  div.querySelector(".AddToCart").addEventListener("click", () => addToCart(card));


  modalBox.append(div)
  detailsModal.showModal()
  
};


const increaseQuentity = (cart) => {
 
  let findedCart = (cartArr.find(cartItem => cartItem.id === cart.id));
  if (findedCart) {
    findedCart.quantity += 1;
  }
  displayCart(cartArr)
};


const decreaseQuentity = (cart) => {
  let findedCart = (cartArr.find(cartItem => cartItem.id === cart.id));
  if (findedCart && findedCart.quantity > 1) {
    findedCart.quantity -= 1;
  }
  displayCart(cartArr)
  
};

const displayCart = (cartArr) => {
  cartContainer.innerHTML = '';
  if (cartArr.length === 0) {
      cartContainer.innerHTML = `<p class="sm:text-2xl sm:py-6 bg-[#51bb78] text-[#ffffff]  text-center border rounded-xl sm:my-12">No items in your cart
              yet. Add some trees!</p>`
    return
    }
  cartArr.forEach(cart => {
    
    const div = document.createElement("div")
    div.innerHTML = `<div class="flex bg-white px-1 py-3 rounded-lg  justify-between">
      <div>
      <div class="max-w-16 max-h-20 sm:hidden lg:block  overflow-hidden rounded-md">
      <img class="w-full h-full object-cover " src="${cart.image}" alt="" />
      </div>

            <div class="flex sm:flex-col lg:flex-row items-center gap-2 mt-2">
  <button  class="decrease  hover:bg-yellow-400 bg-gray-300   rounded-full">➖</button>
  <span class="quantity">${cart.quantity}</span>
  <button  class="increase  hover:bg-yellow-400 bg-gray-300   rounded-full">➕</button>
</div>

      </div>
      
      <div class="flex flex-col justify-between ">
      <button onclick="removeFromCart(${cart.id})" class="hover:cursor-pointer text-right">❌</button>
      <h3 class="text-right font-semibold">${cart.name}</h3>
      <p class="text-right">৳ <span>${cart.price}</span></p>
      </div>
    </div>`
    div.querySelector(".decrease").addEventListener("click", () => {
      decreaseQuentity(cart) 
    })
    div.querySelector(".increase").addEventListener("click", () => {
      increaseQuentity(cart)
    })

    cartContainer.append(div);
     updateCartPrice(cartArr)
  })
  
  showCardLoading(false)
};

const updateCartPrice = (cartArr) => {
   const price = cartArr.reduce((acc, cur) => {
     return acc + (cur.price * cur.quantity )
    }, 0);
    const totalPrice = getById("totalPrice");
    totalPrice.textContent = price;
};



const addToCart = (card) => {

  if (cartArr.find(cart => cart.id === card.id)) {
    alert("This tree has already added to the cart. You can increse the quantity.");
    return
  }
  const cartObj = {
    id:card.id,
    name: card.name,
    price: card.price,
    image: card.image,
    quantity:1
    
  }
  
  cartArr.push(cartObj);
  displayCart(cartArr)
};

const removeFromCart = (id) => {
  cartArr = cartArr.filter(cart => cart.id !== id);
  displayCart(cartArr);
  updateCartPrice(cartArr)

};

const displayCards = (cardsData) => {
  cardsContainer.innerHTML = '';
  cardsData.forEach((card) => {

    const div = document.createElement("div");
    div.classList.add("h-auto")

    div.innerHTML += `
    <div id="${card.id}" class="card   bg-base-100  shadow-sm h-full">
            <figure class="h-44 w-full overflow-hidden">
              <img class="h-full w-full object-cover " src="${card.image}" alt="${card.name}" />
            </figure>
            <div class="card-body p-3"> 
              <h2  class="card-title treeName cursor-pointer">
                ${card.name}
              </h2>
              <p>
                ${card.description}
              </p>
              
              <div class="card-actions justify-between">
                <div class=" outline-none px-4 py-1 text-[#15803D] rounded-full bg-[#DCFCE7]">
                ${card.category}</div>
                <div class="">৳<span>${card.price}</span></div>
              </div>
              <button  class="AddToCart bg-[#15803D] hover:bg-yellow-400 hover:text-gray-600 text-white rounded-full py-2 px-5 font-medium">Add to Cart</button>
            </div>
          </div>
    `
    div.querySelector(".AddToCart").addEventListener("click", () => addToCart(card));
    
    div.querySelector(".treeName").addEventListener("click", () => {
      loadDetails(card.id)
      
    });

    cardsContainer.appendChild(div)
  })
  showCardLoading(false)
};


loadCatgories();
displayCart(cartArr);
loadAllPlansCards();