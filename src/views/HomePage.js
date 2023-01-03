import React from 'react'
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import { useSelector } from 'react-redux';
import '../style/homepage.css';



const HomePage = () => {

  const {user} = useSelector(state => state.auth);

  return (
    <>
      <Header/>
      <Navigation/>
      <div className='smpdp-loged-in'>
        <h1 className='smpd-homepage-h1'>Hoşgeldin {user.displayName} </h1>

      </div>
    </>
  )
}

export default HomePage;