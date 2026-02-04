import React, { useState, useEffect } from 'react';

export default function EmpForm({ initial = {}, onCancel, onSave }){
  const [form, setForm] = useState({ name: '', role: '', phone: '', ...initial });

  useEffect(()=> setForm({ name:'', role:'', phone:'', ...initial }), [initial]);

  const submit = e => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <form onSubmit={submit} style={{ border: '1px solid #ddd', padding: 8, marginBottom: 12, maxWidth: 480 }}>
      <div>
        <label>Name</label><br />
        <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required />
      </div>
      <div>
        <label>Role</label><br />
        <input value={form.role} onChange={e=>setForm({...form,role:e.target.value})} />
      </div>
      <div>
        <label>Phone</label><br />
        <input value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} />
      </div>
      <div style={{ marginTop: 8 }}>
        <button type="submit">Save</button>
        <button type="button" style={{ marginLeft: 8 }} onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}
