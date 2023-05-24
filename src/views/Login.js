import '../style/login.css';
import logo from '../assets/images/smpd-logo-white.png';
import logoImages from '../assets/images/smpd-login-image.png';
import { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import {FaUserPlus} from 'react-icons/fa';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../stores/auth';
import { useSelector } from 'react-redux';
import Modal from 'react-modal';



const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.auth) ;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalText, setModalText] = useState({});

  useEffect( () => {

    user && navigate('/homepage');
    //eslint-disable-next-line 
  }, []); 


  const handleLogin = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const userr = userCredential.user;
        dispatch(login(userr));
        navigate('/homepage');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error.message);
        if (error.message == 'Firebase: Error (auth/wrong-password).') {
          setModalText({
            heading: 'Hatalı Parola Girdiniz!',
            text: '',
          })
          setModalIsOpen(true);
        } else if (error.message == 'Firebase: Error (auth/user-not-found).') {
          setModalText({
            heading: 'Kullanıcı Bulunamadı !',
            text: '',
          })
          setModalIsOpen(true);
        }  else if (error.message.includes('(auth/too-many-requests)')) {
          setModalText({
            heading: 'Fazla Hatalı Giriş Denemesi !',
            text: 'Hesabınızda siz ya da başkası tarafından çok fazla kez hatalı giriş denemesi gerçekleştirildi. Hesabınızı geçici süreli olarak beklemeye aldık. Biraz bekledikten sonra tekrardan giriş yapabilirsiniz. Sağlıklı Günler :)',
          })
          setModalIsOpen(true);
        }
      });
  }

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };


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

            <h4 className='smpd-enterance-heading'>E - Mail</h4>
            <input className='smpd-login-input' type={email} value={email} onChange={(event) => setEmail(event.target.value)} />
            <h4 className='smpd-enterance-heading'>Parola</h4>
            <input className='smpd-login-input' type='password' value={password} onChange={(event) => setPassword(event.target.value)} />
            <button onClick={handleLogin} className='smpd-login-button' type='submit'>Giriş Yap </button>

            {/* <div className='smpd-login-help'>
              <div className='smpd-login-question-mark'>?</div>
              <p>Giriş Yapamıyor Musunus ?</p>
            </div> */}

            {/* <div className='smpd-login-help'>
              <Link to='/sing-up' > <FaUserPlus /> Kayıt Ol</Link>
            </div> */}

          </div>
        </div>
        <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <h2 className='smpd-modal-heading'>{modalText.heading}</h2>
        <p>{modalText.text}</p>
        <button className='smpd-modal-button' onClick={closeModal}>Kapat</button>
      </Modal>
      </div>

  )
}

export default Login;