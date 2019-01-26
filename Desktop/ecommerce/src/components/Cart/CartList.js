import React from "react";
import CartItem from './CartItem';

export default function  CartList({value}){
    const {cart} = value;
    return (
       <div className = "container-fluid">
           {cart.map((current)=>{
             return  (
                    <CartItem key = {current.id} item = {current} value = {value} />
               )
           })}
     
       </div>
    )
}