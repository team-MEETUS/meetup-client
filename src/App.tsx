import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import './App.css';

const router = createBrowserRouter([{ path: '/', element: <div>Home</div> }]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
