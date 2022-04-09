import React from "react";
import Filter from "./components/Filter";
import Products from "./components/Products";
import data from "./data.json";
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: data.products,
      size: "",
      sort: "",
    };
  }

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
              <Products products={this.state.products}></Products>
            </div>
            <div className="sidebar">Cart Items</div>
          </div>
        </main>
        <footer>@Copyright, all rights reserved.!!</footer>
      </div>
    );
  }
}

export default App;
