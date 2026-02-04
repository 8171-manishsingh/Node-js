import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import EmpForm from './EmpForm';

export default function EmpList(){
  const [emps, setEmps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  async function load(){
    setLoading(true);
    const list = await api.getEmployees();
    setEmps(list);
    setLoading(false);
  }

  useEffect(()=>{ load(); }, []);

  const handleAdd = async (data) => {
    await api.addEmployee(data);
    setShowForm(false);
    load();
  };

  const handleUpdate = async (data) => {
    await api.updateEmployee(editing.id, data);
    setEditing(null);
    load();
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete employee?')) return;
    await api.deleteEmployee(id);
    load();
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3>Employees</h3>
        <div>
          <button onClick={()=>{ setShowForm(s=>!s); setEditing(null); }}>Add Employee</button>
          <button style={{ marginLeft: 8 }} onClick={()=>{ localStorage.removeItem('mock_token'); window.location.hash='#/signin'; }}>Sign Out</button>
        </div>
      </div>

      {showForm && !editing && (
        <EmpForm onCancel={()=>setShowForm(false)} onSave={handleAdd} />
      )}

      {editing && (
        <EmpForm initial={editing} onCancel={()=>setEditing(null)} onSave={handleUpdate} />
      )}

      {loading ? <div>Loading...</div> : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ borderBottom: '1px solid #ddd', textAlign: 'left' }}>Name</th>
              <th style={{ borderBottom: '1px solid #ddd', textAlign: 'left' }}>Role</th>
              <th style={{ borderBottom: '1px solid #ddd', textAlign: 'left' }}>Phone</th>
              <th style={{ borderBottom: '1px solid #ddd' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {emps.map(e=> (
              <tr key={e.id}>
                <td style={{ padding: 6 }}>{e.name}</td>
                <td style={{ padding: 6 }}>{e.role}</td>
                <td style={{ padding: 6 }}>{e.phone}</td>
                <td style={{ padding: 6 }}>
                  <button onClick={()=>{ setEditing(e); setShowForm(false); }}>Edit</button>
                  <button style={{ marginLeft: 8 }} onClick={()=>handleDelete(e.id)}>Delete</button>
                </td>
              </tr>
            ))}
            {emps.length===0 && (
              <tr><td colSpan={4} style={{ padding: 8 }}>No employees yet</td></tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
