import React, {useState} from 'react'
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { db } from '../firebase'
import { doc, setDoc } from 'firebase/firestore'

export default function Login(){
  const [email,setEmail]=useState('')
  const [pass,setPass]=useState('')
  const [isNew,setIsNew]=useState(false)
  async function submit(e){
    e.preventDefault()
    const auth = getAuth()
    if(isNew){
      const cred = await createUserWithEmailAndPassword(auth,email,pass)
      // create user profile in firestore
      await setDoc(doc(db,'users',cred.user.uid),{email,role:'customer'})
      alert('Account created')
    }else{
      await signInWithEmailAndPassword(auth,email,pass)
      alert('Signed in')
    }
  }
  return (
    <div className='container'>
      <div className='card' style={{maxWidth:420}}>
        <h3>{isNew?'Sign up':'Sign in'}</h3>
        <form onSubmit={submit}>
          <div><input placeholder='Email' value={email} onChange={e=>setEmail(e.target.value)} /></div>
          <div><input placeholder='Password' type='password' value={pass} onChange={e=>setPass(e.target.value)} /></div>
          <div style={{marginTop:8}}>
            <button type='submit'>{isNew?'Create account':'Sign in'}</button>
            <button type='button' onClick={()=>setIsNew(v=>!v)} style={{marginLeft:8}}>{isNew?'Have account? Sign in':'New? Create account'}</button>
          </div>
        </form>
      </div>
    </div>
  )
}
