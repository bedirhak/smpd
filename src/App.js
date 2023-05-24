import { Route, Routes } from 'react-router-dom';
import Login from './views/Login';
import HomePage from './views/HomePage';
import './style/normilize.css';
import Singup from './views/SingUp';
import { store } from './stores/index'
import { Provider } from 'react-redux'
import Header from './components/Header';
import Navigation from './components/Navigation';
import Patients from './views/Patients';
import AddTreatment from './views/AddTreatment';
import GetReport from './views/GetReport';
import TreatmentsDetail from './views/TreatmentsDetail';
import AddTreatmentDetails from './views/AddTreatmentDetails';


const App = () => {

  return (
    <Provider store={store} >
      <Header/>
      <Navigation/>

      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='*' element={<Login/>} />
        <Route path='/homepage' element={<HomePage/>} />
        <Route path='/treatments-detail' element={<TreatmentsDetail />} />
        <Route path='/add-treatment' element={<AddTreatment />} />
        <Route path='/add-treatment-details' element={<AddTreatmentDetails />} />
        <Route path='/get-report' element={<GetReport />} />
        <Route path='/patients' element={<Patients />} />
        <Route path='/login' element={<Login/>} />
        <Route path='/sing-up' element={<Singup/>} />
      </Routes>
    </Provider>
  )
}

export default App;