import { useState } from "react";
import {
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  X,
  CheckCircle,
} from "lucide-react";

import "./App.css";

const products = [
  {
    id: 1,
    name: "Crispy Chicken",
    description: "Chicken, cheese, lettuce, tomatoes, and special sauce.",
    price: 10.15,
    image: "/images/crispy-chicken.jpg",
  },
  {
    id: 2,
    name: "Ultimate Bacon",
    description: "Beef patty, bacon, cheese, onion, and mustard.",
    price: 9.30,
    image: "/images/ultimate-bacon.jpg",
  },
  {
    id: 3,
    name: "Black Sheep",
    description: "Juicy beef, cheese, lettuce, tomato, and special sauce.",
    price: 10.15,
    image: "/images/black-sheep.jpg",
  },
  {
    id: 4,
    name: "Vegan Burger",
    description: "Plant-based patty, lettuce, tomato, and vegan sauce.",
    price: 9.25,
    image: "/images/vegan-burger.jpg",
  },
];

function App() {
  const [cart, setCart] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  // Add a burger to the cart
  const addToCart = (product) => {
    setOrderConfirmed(false);

    setCart((currentCart) => {
      const existingItem = currentCart.find(
        (item) => item.id === product.id
      );

      if (existingItem) {
        return currentCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentCart, { ...product, quantity: 1 }];
    });
  };

  // Increase or decrease quantity
  const changeQuantity = (id, amount) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + amount }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Remove a burger
  const removeItem = (id) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== id)
    );
  };

  // Total number of burgers
  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Calculate total price
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Confirm order
  const confirmOrder = () => {
    setCart([]);
    setOrderConfirmed(true);
  };

  const money = (amount) => `$${amount.toFixed(2)}`;

  return (
    <div className="app">
      {/* NAVIGATION BAR */}
      <header className="navbar">
        <a href="#home" className="logo">
          🍔 <span>TASTY<br />BURGER</span>
        </a>

        <nav>
          <a href="#about">ABOUT</a>
          <a href="#menu">OUR MENU</a>
          <a href="#menu">SHOP</a>
          <a href="#contact">CONTACT</a>

          <button
            className="cart-icon"
            onClick={() => {
              setShowModal(true);
              setOrderConfirmed(false);
            }}
            aria-label="Open order details"
          >
            <ShoppingCart size={20} />
            <span className="badge">{cartCount}</span>
          </button>
        </nav>
      </header>

      {/* HERO SECTION */}
      <section className="hero" id="home">
        <h1>OUR CRAZY BURGERS</h1>

        <p id="about">
          Get ready for a wild ride of flavor! Our crazy burgers are
          loaded with juicy patties, bold toppings, and irresistible
          sauces, all stacked on a perfectly toasted bun.
        </p>
      </section>

      {/* BURGER MENU */}
      <section className="menu" id="menu">
        <h2>Our Menu</h2>

        <div className="product-grid">
          {products.map((product) => (
            <div className="product-card" key={product.id}>
              <img
                src={product.image}
                alt={product.name}
                className="burger-image"
              />

              <div className="product-info">
                <div className="stars">★★★★★</div>

                <h3>{product.name}</h3>

                <p>{product.description}</p>

                <div className="product-bottom">
                  <strong>{money(product.price)}</strong>

                  <button
                    className="add-button"
                    onClick={() => addToCart(product)}
                  >
                    <Plus size={16} />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ORDER DETAILS */}
      <section className="order-section">
        <div className="order-heading">
          <div>
            <h2>Order Details</h2>
            <p>Review your selected burgers below.</p>
          </div>

          <span className="item-count">
            {cartCount} item(s)
          </span>
        </div>

        {cart.length === 0 ? (
          <p className="empty-cart">
            Your cart is empty. Click Add to Cart to select a burger.
          </p>
        ) : (
          <>
            {cart.map((item) => (
              <div className="order-item" key={item.id}>
                <img src={item.image} alt={item.name} />

                <div className="order-name">
                  <h3>{item.name}</h3>
                  <p>{money(item.price)} each</p>
                </div>

                <div className="quantity-controls">
                  <button
                    onClick={() => changeQuantity(item.id, -1)}
                    aria-label={`Decrease ${item.name}`}
                  >
                    <Minus size={14} />
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() => changeQuantity(item.id, 1)}
                    aria-label={`Increase ${item.name}`}
                  >
                    <Plus size={14} />
                  </button>
                </div>

                <strong className="item-price">
                  {money(item.price * item.quantity)}
                </strong>

                <button
                  className="remove-button"
                  onClick={() => removeItem(item.id)}
                  aria-label={`Remove ${item.name}`}
                >
                  <Trash2 size={17} />
                </button>
              </div>
            ))}

            <div className="total">
              <span>Total Price</span>
              <strong>{money(totalPrice)}</strong>
            </div>

            <button
              className="checkout-button"
              onClick={() => {
                setShowModal(true);
                setOrderConfirmed(false);
              }}
            >
              Review Order
            </button>
          </>
        )}
      </section>

      {/* ORDER MODAL */}
      {showModal && (
        <div
          className="modal-overlay"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setShowModal(false);
            }
          }}
        >
          <div className="modal">
            <button
              className="close-button"
              onClick={() => setShowModal(false)}
              aria-label="Close modal"
            >
              <X size={22} />
            </button>

            {orderConfirmed ? (
              <div className="success-message">
                <CheckCircle size={55} />

                <h2>Order Confirmed!</h2>

                <p>
                  Thank you for ordering from Tasty Burger Shop!
                </p>

                <button
                  className="checkout-button"
                  onClick={() => {
                    setShowModal(false);
                    setOrderConfirmed(false);
                  }}
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <>
                <h2>Order Details</h2>

                <p className="modal-subtitle">
                  Please review your order before confirming.
                </p>

                {cart.length === 0 ? (
                  <div className="empty-modal">
                    <p>Your cart is empty.</p>

                    <button
                      className="checkout-button"
                      onClick={() => setShowModal(false)}
                    >
                      Back to Menu
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="modal-items">
                      {cart.map((item) => (
                        <div className="modal-item" key={item.id}>
                          <img src={item.image} alt={item.name} />

                          <div>
                            <h3>{item.name}</h3>
                            <p>Quantity: {item.quantity}</p>
                          </div>

                          <strong>
                            {money(item.price * item.quantity)}
                          </strong>
                        </div>
                      ))}
                    </div>

                    <div className="modal-total">
                      <span>Total</span>
                      <strong>{money(totalPrice)}</strong>
                    </div>

                    <p className="demo-note">
                      Demo only. No real payment will be collected.
                    </p>

                    <button
                      className="checkout-button"
                      onClick={confirmOrder}
                    >
                      Confirm Order
                    </button>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer id="contact">
        <p>🍔 Tasty Burger Shop</p>
        <p>Fresh burgers, happy people.</p>
      </footer>
    </div>
  );
}

export default App;