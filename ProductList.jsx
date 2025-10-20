import React, { useEffect, useState } from 'react'
import { collection, query, getDocs } from 'firebase/firestore'
import { db } from '../firebase'

export default function ProductList({onAdd}){
  const [products,setProducts]=useState([])
  useEffect(()=>{
    async function load(){
      const q = query(collection(db,'products'))
      const snap = await getDocs(q)
      setProducts(snap.docs.map(d=>({id:d.id,...d.data()})))
    }
    load()
  },[])
  return (
    <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))',gap:12}}>
      {products.map(p=>(
        <div key={p.id} className='card'>
          <h4>{p.name}</h4>
          <p>₹{p.price}</p>
          <p style={{fontSize:13,color:'#555'}}>{p.description}</p>
          <button onClick={()=>onAdd(p)}>Add</button>
        </div>
      ))}
    </div>
  )
}
