import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './Pages/Shared/Header/Header';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login/Login';
import Resister from './Pages/Login/Resister/Resister';
import Dashboard from './Pages/Dashboard/Dashboard';
import useAuth from './hooks/useAuth';
import NotFound from './Pages/NotFound/NotFound';

function App() {
  const { login } = useAuth();

  return (
    <div className="App">

      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<Home />} />
          </Route>

          {
            login && <Route path="/dashboard" element={<Dashboard />} />
          }
          <Route path="/login" element={<Login />} />
          <Route path="/resister" element={<Resister />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
