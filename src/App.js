import React from 'react';
import Header from './components/Header';
import './scss/app.scss';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import { Route, Routes } from 'react-router-dom';
import Cart from './pages/Cart';

function App() {
  // https://640dd7041a18a5db8380ebec.mockapi.io/items
  const [searchVal, setSearchVal] = React.useState('');

  return (
    <div className="App">
      <div className="wrapper">
        <Header value={searchVal} setSearchVal={setSearchVal} />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home searchValue={searchVal} />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
