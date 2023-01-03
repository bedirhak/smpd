import { Route, Routes } from 'react-router-dom';
import Login from './views/Login';
import HomePage from './views/HomePage';
import './style/normilize.css';
import Singup from './views/SingUp';

const App = () => {
  return (
    <>
      

      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/sing-up' element={<Singup/>} />
      </Routes>
    </>
  )
}

export default App;