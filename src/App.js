import React from "react";
import Cart from "./components/Cart";
import Filter from "./components/Filter";
import Products from "./components/Products";
import data from "./data.json";
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: data.products,
      cartItems: [],
      size: "",
      sort: "",
    };
  }

  removeFromCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    this.setState({
      cartItems: cartItems.filter((item) => item._id !== product._id),
    });
  };

  addToCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    let alreadyInCart = false;
    cartItems.forEach((item) => {
      if (item._id === product._id) {
        item.count++;
        alreadyInCart = true;
      }
    });
    if (!alreadyInCart) {
      cartItems.push({ ...product, count: 1 });
    }
    this.setState({
      cartItems,
    });
  };

  sortProducts = (event) => {
    console.log(event.target.value);
    this.setState({
      sort: event.target.value,
      products: this.state.products
        .slice()
        .sort((a, b) =>
          event.target.value === "lowest"
            ? a.price > b.price
              ? 1
              : -1
            : event.target.value === "highest"
            ? a.price < b.price
              ? 1
              : -1
            : a.price > b.price
            ? 1
            : -1
        ),
    });
  };

  filterProducts = (event) => {
    console.log(event.target.value);
    if (event.target.value === "ALL") {
      this.setState({
        size: event.target.value,
        products: data.products,
      });
    } else {
      this.setState({
        size: event.target.value,
        products: data.products.filter(
          (product) => product.availableSizes.indexOf(event.target.value) >= 0
        ),
      });
    }
  };

  render() {
    return (
      <div className="grid-container">
        <header className="App-header">
          {/* <img src={process.env.PUBLIC_URL + "/images/logo.jpg"}></img> */}
          <a href="/">Shopify</a>
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Filter
                count={this.state.products.length}
                size={this.state.size}
                sort={this.state.sort}
                filterProducts={this.filterProducts}
                sortProducts={this.sortProducts}
              ></Filter>
              <Products
                products={this.state.products}
                addToCart={this.addToCart}
              ></Products>
            </div>
            <div className="sidebar">
              <Cart
                cartItems={this.state.cartItems}
                removeFromCart={this.removeFromCart}
              />
            </div>
          </div>
        </main>
        <footer>@Copyright, all rights reserved.!!</footer>
      </div>
    );
  }
}

export default App;
