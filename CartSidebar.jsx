import React from 'react'
import { getAuth } from 'firebase/auth'
import { functions } from '../firebase'
import { httpsCallable } from 'firebase/functions'

export default function CartSidebar({cart,setCart}){
  const total = cart.reduce((s,i)=>s+i.price*i.qty,0)
  async function placeOrder(){
    const auth = getAuth()
    const user = auth.currentUser
    if(!user){
      alert('Please login first (top-right).')
      return
    }
    const createOrder = httpsCallable(functions,'createOrder')
    try{
      const res = await createOrder({items:cart, total})
      alert('Order placed — order id: '+res.data.id)
      setCart([])
    }catch(e){
      console.error(e)
      alert('Failed to place order: '+e.message)
    }
  }
  return (
    <div className='card'>
      <h3>Cart</h3>
      {cart.length===0 && <div>Empty</div>}
      {cart.map(i=>(<div key={i.id}>{i.name} x {i.qty}</div>))}
      <hr />
      <div>Total: ₹{total}</div>
      <button disabled={cart.length===0} onClick={placeOrder}>Place Order</button>
    </div>
  )
}
