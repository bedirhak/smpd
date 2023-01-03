import '../style/login.css';
import logo from '../assets/images/smpd-logo-white.png';
import logoImages from '../assets/images/smpd-login-image.png';
import { useState } from 'react';
import { register } from '../firebase';


const Singup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = () => {
    register(email, password);
  }


  return (
      <div className="smpd-login">
        <div className='smpd-login-container'>

          <div className='smpd-login-left'>
            <div className='smpd-login-logo' >
              <img className='smpd-login-logo-img' src={logo} alt='Smpd Logo' />
            </div>
            <h1>SMPD</h1>
            <h2>Hoşgeldiniz</h2>
            <img className='smpd-login-image' src={logoImages} alt='Smpd Logo' />

          </div>

          <div className='smpd-login-right'>
            <h3 className='smpd-enterance-heading'>Kayıt Ol</h3>

              <h4 className='smpd-enterance-heading'>Kullanıcı Adı</h4>
              <input className='smpd-login-input' type={email} value={email} onChange={(event) => setEmail(event.target.value)} />
              <h4 className='smpd-enterance-heading'>Parola</h4>
              <input className='smpd-login-input' type='text' value={password} onChange={(event) => setPassword(event.target.value)} />
              <button className='smpd-login-button' onClick={handleSubmit} type='submit'>Kayıt Oluştur </button>

          </div>
        </div>
      </div>

  )
}

export default Singup;