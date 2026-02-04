import React, { useState } from 'react';
import api from '../utils/api';

export default function SignUp() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [sentOtp, setSentOtp] = useState(null);

  const handle = async e => {
    e.preventDefault();
    setError('');
    try {
      const res = await api.signup(form);
      setSentOtp(res.otp);
      // navigate to verify with email
      window.location.hash = `#/verify?email=${encodeURIComponent(form.email)}`;
    } catch (err) {
      setError(err.message || 'Failed');
    }
  };

  return (
    <div>
      <h3>Sign Up</h3>
      <form onSubmit={handle} style={{ maxWidth: 360 }}>
        <div>
          <label>Name</label>
          <br />
          <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required />
        </div>
        <div>
          <label>Email</label>
          <br />
          <input type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required />
        </div>
        <div>
          <label>Password</label>
          <br />
          <input type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} required />
        </div>
        <div style={{ marginTop: 8 }}>
          <button type="submit">Sign Up</button>
          <button type="button" style={{ marginLeft: 8 }} onClick={()=>window.location.hash='#/signin'}>Go to Sign In</button>
        </div>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        {sentOtp && <div>OTP sent (for demo): {sentOtp}</div>}
      </form>
    </div>
  );
}
