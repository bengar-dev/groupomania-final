import React from 'react';
import { Routes, Route } from 'react-router-dom'

import Signin from './pages/signin';
import Error from './pages/404'

function App() {
  return (
    <div className="bg-zinc-100 min-h-screen">
      <Routes>
        <Route path='/' element={<Signin />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
