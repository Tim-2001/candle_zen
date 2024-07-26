document.addEventListener('DOMContentLoaded', () => {
  const radioButtons = document.querySelectorAll('.radio-buttons input[type="radio"]');
  const slides = document.querySelectorAll('.slide');
 
  radioButtons.forEach(radio => {
    radio.addEventListener('change', () => {
      slides.forEach(slide => slide.classList.remove('active'));
      document.getElementById(radio.value).classList.add('active');
    });
  });
 
  if (radioButtons.length > 0) {
    radioButtons[0].dispatchEvent(new Event('change'));
  }
 });
 

function showAnswer() {
  var faqSelect = document.getElementById("faqs");
  var selectedValue = faqSelect.value;
  
  // Hide all answers
  var answers = document.getElementsByClassName("answer");
  for (var i = 0; i < answers.length; i++) {
      answers[i].style.display = "none";
  }
  
  // Show selected answer
  if (selectedValue) {
      var selectedAnswer = document.getElementById(selectedValue);
      if (selectedAnswer) {
          selectedAnswer.style.display = "block";
      }
  }
}
document.addEventListener('DOMContentLoaded', function() {
  // Add to Cart Functionality for index.html
  if (document.querySelector('.add-to-cart')) {
      const addToCartButtons = document.querySelectorAll('.add-to-cart');

      addToCartButtons.forEach(button => {
          button.addEventListener('click', function() {
              const productId = this.getAttribute('data-product-id');
              const productName = this.getAttribute('data-product-name');
              const productPrice = parseFloat(this.getAttribute('data-product-price'));
              const productImage = this.getAttribute('data-product-image');
              const product = { id: productId, name: productName, price: productPrice, image: productImage, quantity: 1 };

              let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

              const existingItemIndex = cartItems.findIndex(item => item.id === productId);

              if (existingItemIndex >= 0) {
                  cartItems[existingItemIndex].quantity += 1;
              } else {
                  cartItems.push(product);
              }

              localStorage.setItem('cartItems', JSON.stringify(cartItems));
              console.log('Product added to cart:', product);
              console.log('Updated cart items:', cartItems);
              alert('Product added to cart!');
          });
      });
  }

  // Load Cart Items for cart.html
  if (document.getElementById('cart-items')) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    console.log('Loaded cart items:', cartItems);

      const cartContainer = document.getElementById('cart-items');
      const cartTotal = document.getElementById('cart-total');

      // Function to render cart items
      function renderCartItems() {
          cartContainer.innerHTML = ''; // Clear existing items
            
          cartItems.forEach(item => {
              const itemElement = document.createElement('div');
              itemElement.classList.add('cart-item');
              itemElement.innerHTML = `
                  <div class="item-image">
                      <img src="${item.image}" alt="${item.name}">
                  </div>
                  <div class="item-details">
                      <p class="item-name">${item.name}</p>
                      <p class="item-price">$${item.price.toFixed(2)}</p>
                  </div>
                  <div class="item-quantity">
                      <button class="quantity-btn" data-id="${item.id}" data-action="decrease">-</button>
                      <span>${item.quantity}</span>
                      <button class="quantity-btn" data-id="${item.id}" data-action="increase">+</button>
                      <button class="delete-btn" data-id="${item.id}">Delete</button>
                  </div>
              `;
              cartContainer.appendChild(itemElement);

              // Add event listeners for quantity buttons
              const decreaseBtn = itemElement.querySelector('[data-action=decrease]');
              const increaseBtn = itemElement.querySelector('[data-action=increase]');
              const deleteBtn = itemElement.querySelector('.delete-btn');


              decreaseBtn.addEventListener('click', () => decreaseQuantity(item.id));
              increaseBtn.addEventListener('click', () => increaseQuantity(item.id));
              deleteBtn.addEventListener('click', () => deleteItem(item.id));
          });

          // Calculate and display total price
          const totalPrice = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
          cartTotal.textContent = `Total: $${totalPrice.toFixed(2)}`;
          console.log('Rendered cart items');
      }

      // Function to decrease quantity
      function decreaseQuantity(id) {
          const itemIndex = cartItems.findIndex(item => item.id === id);
          if (itemIndex >= 0 && cartItems[itemIndex].quantity > 1) {
              cartItems[itemIndex].quantity--;
              localStorage.setItem('cartItems', JSON.stringify(cartItems));
              renderCartItems();
          }
      }

      // Function to increase quantity
      function increaseQuantity(id) {
          const itemIndex = cartItems.findIndex(item => item.id === id);
          if (itemIndex >= 0) {
              cartItems[itemIndex].quantity++;
              localStorage.setItem('cartItems', JSON.stringify(cartItems));
              renderCartItems();
          }
      }

      function deleteItem(id) {
            cartItems = cartItems.filter(item => item.id !== id);
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            renderCartItems();
        }


      // Initial render
      renderCartItems();

      // Event listener for checkout button (replace with actual checkout logic)
      const checkoutBtn = document.getElementById('checkout-btn');
      checkoutBtn.addEventListener('click', function() {
          alert('Proceeding to checkout'); // Replace with your checkout process
      });
  }
});

$(document).ready(function() {
            // Delete item button click event
            $('#cart-items').on('click', '.delete-item-btn', function() {
                $(this).closest('.cart-item').remove();
                updateCartTotal();
            });

            // Clear cart button click event
            $('#clear-cart-btn').click(function() {
                $('#cart-items').empty(); // Remove visual items
                cartItems = []; // Update cartItems array
                localStorage.setItem('cartItems', JSON.stringify(cartItems)); // Update local storage
                updateCartTotal();
            });
            

            // Function to update cart total
            function updateCartTotal() {
                let total = 0;
                $('.cart-item').each(function() {
                    const priceStr = $(this).find('.item-price').text().replace('$', '');
                    const price = parseFloat(priceStr);
                    total += price;
                });
                $('#cart-total').text('Total: $' + total.toFixed(2));
            }
        });
