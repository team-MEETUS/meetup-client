import { Outlet } from 'react-router-dom';

import './App.scss';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';

function App() {
  return (
    <>
      <Header />
      <div className="outlet-wrapper">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default App;
