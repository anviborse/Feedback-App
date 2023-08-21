import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 

  const hUsername = (event) => {
    setUsername(event.target.value);
  };

  const hPassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!username || !password) {
      alert('Please enter both username and password.');
      return;
    }

    let data = { username, password };
    let urladd = 'http://localhost:9000/login';
    axios.post(urladd, data)
      .then((res) => {
        alert(res.data.msg);
        navigate('/admindata'); 
      })
      .catch((err) => {
        if (err.response) {
          alert(err.response.data.err);
        }
      });

    setUsername('');
    setPassword('');
  };
  return (
    <div className="login-container">
      <center>
        <form onSubmit={handleSubmit}>
          <h1>Admin Login</h1>
          <input className="text"
          type="text" value={username} onChange={hUsername} placeholder="Username" />
          <br />
          <br />
          <input className="text" type="password" value={password} onChange={hPassword} placeholder="Password" />
          <br />
          <br />
          <div>
            <button type="submit" id="button">
              Login
            </button>
          </div>
        </form>
      </center>
    </div>
  );
}