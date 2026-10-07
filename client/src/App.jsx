import { useEffect, useState } from 'react';
import { api } from './api';

export default function App() {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    api.me().then(setUser).catch(() => setUser(null));
    api.getProducts().then(setProducts).catch(() => {});
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const { user } = await api.login(form);
      setUser(user);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = async () => {
    await api.logout();
    setUser(null);
  };

  if (!user) {
    return (
      <div style={{ padding: 40, fontFamily: 'sans-serif' }}>
        <h1>Вход</h1>
        <form onSubmit={handleLogin}>
          <input placeholder="email" value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })} /><br />
          <input type="password" placeholder="password" value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })} /><br />
          <button type="submit">Войти</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    );
  }

  return (
    <div style={{ padding: 40, fontFamily: 'sans-serif' }}>
      <h1>Привет, {user.name}!</h1>
      <p>{user.email} ({user.role})</p>
      <button onClick={handleLogout}>Выйти</button>
      <h2>Товары ({products.length})</h2>
      <ul>
        {products.map((p) => <li key={p.id}>{p.title} — {p.price}</li>)}
      </ul>
    </div>
  );
}