import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Account from './components/adminviews/Account';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import { RequireAuth } from './components/utilitis/Authcontextprovider';
import Landingpage from './components/Landingpage';
import User from './components/userviews/user';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Landingpage />} />

        <Route element={<RequireAuth allowedRoles={3} />}>
          <Route path="/account/*" element={<Account />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={2} />}>
          <Route path="/user/*" element={<User/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
