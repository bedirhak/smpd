import '../style/login.css';
import logo from '../assets/images/smpd-logo-white.png';
import logoImages from '../assets/images/smpd-login-image.png';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {FaUserPlus} from 'react-icons/fa';
import { singin } from '../firebase';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    singin(email,password);
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
            <h3 className='smpd-enterance-heading'>Giriş</h3>

            <h4 className='smpd-enterance-heading'>Kullanıcı Adı</h4>
            <input className='smpd-login-input' type={email} value={email} onChange={(event) => setEmail(event.target.value)} />
            <h4 className='smpd-enterance-heading'>Parola</h4>
            <input className='smpd-login-input' type='text' value={password} onChange={(event) => setPassword(event.target.value)} />
            <button onClick={handleSubmit} className='smpd-login-button' type='submit'>Giriş Yap </button>

            <div className='smpd-login-help'>
              <div className='smpd-login-question-mark'>?</div>
              <p>Giriş Yapamıyor Musunus ?</p>
            </div>

            <div className='smpd-login-help'>
              <Link to='/sing-up' > <FaUserPlus /> Kayıt Ol</Link>
            </div>

          </div>
        </div>
      </div>

  )
}

export default Login;