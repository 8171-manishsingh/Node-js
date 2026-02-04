import React, { useState } from 'react';
import api from '../utils/api';

function parseEmailFromHash() {
  const h = window.location.hash || '';
  const q = h.split('?')[1] || '';
  const params = new URLSearchParams(q);
  return params.get('email') || '';
}

export default function VerifyOTP(){
  const email = parseEmailFromHash();
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

  const handle = async e => {
    e?.preventDefault?.();
    setError('');
    try{
      await api.verifyOtp({ email, otp });
      window.location.hash = '#/employees';
    }catch(err){
      setError(err.message || 'Invalid OTP');
    }
  };

  return (
    <div>
      <h3>Verify OTP</h3>
      <div>Email: <b>{email}</b></div>
      <form onSubmit={handle} style={{ maxWidth: 360 }}>
        <div>
          <label>OTP</label><br />
          <input value={otp} onChange={e=>setOtp(e.target.value)} required />
        </div>
        <div style={{ marginTop: 8 }}>
          <button type="submit">Verify</button>
        </div>
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </form>
    </div>
  );
}
