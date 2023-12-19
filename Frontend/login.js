import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [nim, setNim] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3001/login', { nim, password });
      const { token } = response.data;
      console.log('Login berhasil, token:', token);
      // Simpan token di sini (misalnya di state atau localStorage)
    } catch (error) {
      console.error('Login gagal:', error.response.data.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <div>
        <label>NIM:</label>
        <input type="text" value={nim} onChange={(e) => setNim(e.target.value)} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
