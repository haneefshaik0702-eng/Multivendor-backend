import React, {useState, useEffect} from 'react'
import { collection, addDoc, query, getDocs } from 'firebase/firestore'
import { db } from '../firebase'
import { getAuth } from 'firebase/auth'

export default function AdminPanel(){
  const [name,setName]=useState('')
  const [price,setPrice]=useState('')
  const [desc,setDesc]=useState('')
  const [products,setProducts]=useState([])
  const [orders,setOrders]=useState([])

  useEffect(()=>{ loadProducts(); loadOrders(); },[])

  async function loadProducts(){
    const q = query(collection(db,'products'))
    const snap = await getDocs(q)
    setProducts(snap.docs.map(d=>({id:d.id,...d.data()})))
  }
  async function loadOrders(){
    const q = query(collection(db,'orders'))
    const snap = await getDocs(q)
    setOrders(snap.docs.map(d=>({id:d.id,...d.data()})))
  }
  async function addProduct(e){
    e.preventDefault()
    const auth = getAuth()
    const user = auth.currentUser
    if(!user) return alert('Please login as admin.')
    await addDoc(collection(db,'products'),{name,price:parseFloat(price),description:desc,createdAt:new Date().toISOString()})
    setName('');setPrice('');setDesc('')
    loadProducts()
  }
  return (
    <div className='container'>
      <h2>Admin Panel</h2>
      <div style={{display:'flex',gap:16}}>
        <div style={{flex:1}}>
          <div className='card'>
            <h3>Add product</h3>
            <form onSubmit={addProduct}>
              <div><input placeholder='Name' value={name} onChange={e=>setName(e.target.value)} /></div>
              <div><input placeholder='Price' value={price} onChange={e=>setPrice(e.target.value)} /></div>
              <div><textarea placeholder='Description' value={desc} onChange={e=>setDesc(e.target.value)} /></div>
              <div><button type='submit'>Add</button></div>
            </form>
          </div>
        </div>
        <div style={{width:420}}>
          <div className='card'>
            <h3>Products</h3>
            {products.map(p=> <div key={p.id}><strong>{p.name}</strong> — ₹{p.price}</div>)}
          </div>
          <div style={{height:12}} />
          <div className='card'>
            <h3>Orders</h3>
            {orders.map(o=> <div key={o.id}>{o.id} — ₹{o.total} — {o.status}</div>)}
          </div>
        </div>
      </div>
    </div>
  )
}
