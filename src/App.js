import { Route, Routes } from 'react-router-dom';
import Login from './views/Login';
import HomePage from './views/HomePage';
import './style/normilize.css';
import Singup from './views/SingUp';
import { store } from './stores/index'
import { Provider } from 'react-redux'


const App = () => {

  return (
    <Provider store={store} >
      <Routes>
        <Route path='/homepage' element={<HomePage/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/sing-up' element={<Singup/>} />
      </Routes>
    </Provider>
  )
}

export default App;