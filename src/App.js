import { Route, Routes } from 'react-router-dom';
import Login from './views/Login';
import HomePage from './views/HomePage';
import './style/normilize.css';

const App = () => {
  return (
    <>
      

      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/login' element={<Login/>} />
      </Routes>
    </>
  )
}

export default App;