import React, { Component } from "react";
import {storeProducts, detailProduct} from './data';

const ProductContext = React.createContext();
class ProductProvider extends Component {
    state = {
        products:[],
        detail: detailProduct,
        cart: [],
        modalOpen: false,
        modalProduct: detailProduct,
        cartSubtotal: 0,
        cartTax: 0,
        cartTotal: 0,

    }
    componentDidMount(){
        this.setProducts();
    }
    getItem = (id)=>{
        const product = this.state.products.find((current)=>{return current.id === id });
        return product;
    }
    handleDetail = (id)=>{
        const product = this.getItem(id);
        this.setState(()=>{
           return {detail:product} 
        })
    }
    addToCart = (id)=>{
       let tempProducts = [...this.state.products];
       const index = tempProducts.indexOf(this.getItem(id));
       const product = tempProducts[index];
       product.inCart = true;
       product.count = 1;
       const price = product.price;
       product.total = price;
        this.setState(()=>{
            return {
                products: tempProducts,
                cart: [...this.state.cart, product]
            }
        }, ()=>{
            this.addTotals();
            
        })
    }
    openModal = (id) =>{
        const product = this.getItem(id);
        this.setState(()=>{
            return {
                modalProduct:product,
                modalOpen:true
            }
        })
    }
    closeModal = (id)=>{
        this.setState(()=>{
            return {modalOpen: false}
        })
    }
    increment = (id)=>{
        let tempCart = [...this.state.cart];
        const selectedProduct = tempCart.find((current)=>{
            return current.id === id;
        })
        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];

        product.count = product.count + 1;
        product.total = product.count * product.price;

        this.setState(()=>{
            return {
                cart: [...tempCart]
            }
        }, ()=>{
            this.addTotals();
        })
    }
    decrement = (id)=>{
        let tempCart = [...this.state.cart];
        const selectedProduct = tempCart.find((current)=>{
                return current.id === id;
        })
        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];

        product.count = product.count - 1;
        if (product.count === 0 ){
               return this.removeItem(id);
        }else{
            product.total = product.count * product.price;
        }
        this.setState(()=>{
            return {
                cart: [...tempCart]
            }
        }, ()=>{
            this.addTotals();
        })
    }
    removeItem = (id)=>{
        console.log(`hey i got fired`);
        let tempProducts = [...this.state.products];
        let tempCart = [...this.state.cart];

        tempCart = tempCart.filter((current)=>{
            return current.id !== id;
        });
        const index = tempProducts.indexOf(this.getItem(id));
        let removeProduct = tempProducts[index];
        removeProduct.inCart = false;
        removeProduct.count = 0;
        removeProduct.total = 0;
        this.setState(()=>{
            return {
                cart: [...tempCart],
                products: [...tempProducts]
            }
        })
    }
    clearCart = (id)=>{
        this.setState(()=>{
            return {cart:[]}
        }, ()=>{
            this.setProducts();
            this.addTotals();
        })
    }
    addTotals = ()=>{
        let subTotal = 0;
        this.state.cart.map((current)=>{
            return subTotal += current.total;
        })
        const tempTax = subTotal *0.1;
        const tax = parseFloat(tempTax.toFixed(2));
        const total = subTotal + tax;
        this.setState(()=>{
            return {
                cartSubtotal : subTotal,
                cartTax: tax,
                cartTotal: total
            }
        })
         
    }
    setProducts = ()=>{
        let tempProducts = [];
        storeProducts.forEach((item)=>{
        const singleItem = {...item};
        tempProducts = [...tempProducts, singleItem]
        });
        this.setState(()=>{
            return { products: tempProducts };
        });
    }
    render() {
      return (
       
        <ProductContext.Provider value = {{
            ...this.state,
            handleDetail:this.handleDetail,
            addToCart:this.addToCart,
            openModal: this.openModal,
            closeModal:this.closeModal,
            increment: this.increment,
            decrement: this.decrement,
            removeItem: this.removeItem,
            clearCart: this.clearCart
        }}>
            {this.props.children}
        </ProductContext.Provider>
      )
    }
  }

  const ProductConsumer = ProductContext.Consumer;

  export {ProductProvider, ProductConsumer};
  