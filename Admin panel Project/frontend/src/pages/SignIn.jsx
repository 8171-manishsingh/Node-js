import React, { useState } from 'react';
import api from '../utils/api';

export default function SignIn(){
  const [form,setForm] = useState({ email:'', password:'' });
  const [error,setError] = useState('');

  const handle = async e => {
    e.preventDefault();
    setError('');
    try{
      const res = await api.signin(form);
      // navigate to verify
      window.location.hash = `#/verify?email=${encodeURIComponent(form.email)}`;
    }catch(err){
      setError(err.message||'Failed');
    }
  };

  return (
    <div>
      <h3>Sign In</h3>
      <form onSubmit={handle} style={{ maxWidth: 360 }}>
        <div>
          <label>Email</label><br />
          <input type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required />
        </div>
        <div>
          <label>Password</label><br />
          <input type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} required />
        </div>
        <div style={{ marginTop: 8 }}>
          <button type="submit">Sign In</button>
          <button type="button" style={{ marginLeft: 8 }} onClick={()=>window.location.hash='#/signup'}>Sign Up</button>
        </div>
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </form>
    </div>
  );
}
