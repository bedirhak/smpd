import '../style/login.css';
import logo from '../assets/images/smpd-logo-white.png';
import logoImages from '../assets/images/smpd-login-image.png';
import { useState } from 'react';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


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
            <h3 className='smpd-enterance-heading'>Giriş</h3>
            <form>

              <h4 className='smpd-enterance-heading'>Kullanıcı Adı</h4>
              <input className='smpd-login-input' type={email} value={email} onChange={(event) => setEmail(event.target.value)} />
              <h4 className='smpd-enterance-heading'>Parola</h4>
              <input className='smpd-login-input' type='text' value={password} onChange={(event) => setPassword(event.target.value)} />
              <button className='smpd-login-button' type='submit'>Giriş Yap </button>
            </form>

          </div>
        </div>
      </div>

  )
}

export default Login;