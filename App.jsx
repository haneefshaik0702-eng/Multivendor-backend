import React, { useState } from 'react'
import ProductList from './components/ProductList'
import CartSidebar from './components/CartSidebar'

export default function App(){
  const [cart, setCart] = useState([])
  function add(p){
    setCart(prev=>{
      const found = prev.find(x=>x.id===p.id)
      if(found) return prev.map(x=>x.id===p.id?{...x,qty:x.qty+1}:x)
      return [...prev,{...p,qty:1}]
    })
  }
  return (
    <div className='container'>
      <h1>Grocery / Pharmacy MVP</h1>
      <div style={{display:'grid',gridTemplateColumns:'1fr 320px',gap:16}}>
        <div><ProductList onAdd={add}/></div>
        <div><CartSidebar cart={cart} setCart={setCart}/></div>
      </div>
    </div>
  )
}
