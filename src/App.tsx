import { Outlet } from 'react-router-dom';

import './App.scss';
import Header from '@/components/header/Header';

function App() {
  return (
    <>
      <Header />
      <div className="outlet-wrapper">
        <Outlet />
      </div>
    </>
  );
}

export default App;
