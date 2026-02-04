const STORAGE_KEYS = {
  USERS: 'mock_users',
  OTP: 'mock_otp',
  EMPLOYEES: 'mock_employees'
};

function read(key) {
  try { return JSON.parse(localStorage.getItem(key) || 'null'); } catch { return null; }
}
function write(key, v) { localStorage.setItem(key, JSON.stringify(v)); }

export async function signup({ name, email, password }) {
  const users = read(STORAGE_KEYS.USERS) || [];
  if (users.find(u => u.email === email)) throw new Error('User exists');
  users.push({ name, email, password });
  write(STORAGE_KEYS.USERS, users);
  // generate OTP and save
  const otp = String(Math.floor(100000 + Math.random() * 900000));
  write(STORAGE_KEYS.OTP, { email, otp });
  return { email, otp };
}

export async function signin({ email, password }) {
  const users = read(STORAGE_KEYS.USERS) || [];
  const u = users.find(x => x.email === email && x.password === password);
  if (!u) throw new Error('Invalid credentials');
  // generate OTP for signin
  const otp = String(Math.floor(100000 + Math.random() * 900000));
  write(STORAGE_KEYS.OTP, { email, otp });
  return { email, otp };
}

export async function verifyOtp({ email, otp }) {
  const record = read(STORAGE_KEYS.OTP);
  if (!record || record.email !== email || record.otp !== otp) throw new Error('Invalid OTP');
  // simple token
  const token = btoa(email + ':' + Date.now());
  localStorage.setItem('mock_token', token);
  return { token };
}

export async function getEmployees() {
  return read(STORAGE_KEYS.EMPLOYEES) || [];
}

export async function addEmployee(emp) {
  const list = read(STORAGE_KEYS.EMPLOYEES) || [];
  const id = Date.now();
  list.push({ ...emp, id });
  write(STORAGE_KEYS.EMPLOYEES, list);
  return { id };
}

export async function updateEmployee(id, data) {
  const list = read(STORAGE_KEYS.EMPLOYEES) || [];
  const idx = list.findIndex(e => e.id === id);
  if (idx === -1) throw new Error('Not found');
  list[idx] = { ...list[idx], ...data };
  write(STORAGE_KEYS.EMPLOYEES, list);
  return list[idx];
}

export async function deleteEmployee(id) {
  let list = read(STORAGE_KEYS.EMPLOYEES) || [];
  list = list.filter(e => e.id !== id);
  write(STORAGE_KEYS.EMPLOYEES, list);
  return true;
}

export default { signup, signin, verifyOtp, getEmployees, addEmployee, updateEmployee, deleteEmployee };
