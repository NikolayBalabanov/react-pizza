import './scss/app.scss';
import Home from './pages/Home';
import { Route, Routes } from 'react-router-dom';
// import NotFound from './pages/NotFound';
// import Cart from './pages/Cart';
// import Pizza from './pages/Pizza';
import MainLayout from './layouts/MainLayout';
import { lazy, Suspense } from 'react';

const Cart = lazy(() => import('./pages/Cart'));
const Pizza = lazy(() => import('./pages/Pizza'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route
          path="cart"
          element={
            <Suspense fallback={<div>ЗАГРУЗИЩЕ</div>}>
              <Cart />
            </Suspense>
          }
        />
        <Route
          path="pizza/:id"
          element={
            <Suspense fallback={<div>ЗАГРУЗИЩЕ</div>}>
              <Pizza />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<div>ЗАГРУЗИЩЕ</div>}>
              <NotFound />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}
export default App;
