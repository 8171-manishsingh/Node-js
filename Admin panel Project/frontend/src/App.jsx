import React, { useState, useEffect } from 'react';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import VerifyOTP from './pages/VerifyOTP';
import EmpList from './components/EmpList';

function Router() {
  const [route, setRoute] = useState(window.location.hash || '#/signin');
  useEffect(() => {
    const onHash = () => setRoute(window.location.hash || '#/signin');
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  if (route.startsWith('#/signup')) return <SignUp />;
  if (route.startsWith('#/verify')) return <VerifyOTP />;
  if (route.startsWith('#/employees')) return <EmpList />;
  return <SignIn />;
}

export default function App() {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: 20 }}>
      <h2>Admin Panel (Mock)</h2>
      <Router />
    </div>
  );
}
