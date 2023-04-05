import '../style/singup.css';
import logo from '../assets/images/smpd-logo-white.png';
import logoImages from '../assets/images/smpd-login-image.png';
import { useState, useEffect } from 'react';
import {register} from '../firebase';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { doc, setDoc } from "firebase/firestore"; 
import {db} from '../firebase';

const Singup = () => {
  const navigate = useNavigate();
  const {user} = useSelector(state => state.auth);


  useEffect( () => {
    user && navigate('/homepage');

  //eslint-disable-next-line
  }, []); 


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [role, setRole] = useState('');
  const handleSubmit = () => {
    register(email, password,name, surname,role );


    setDoc(doc(db, "doctor-users", "new-doctor"), { // new-doctor kısmı id creator ile id dönecek şekilde yapılacak.
      Name: name,
      Surname: surname,
      Email: email,
      Password: password,
      Role: role
    });

    // doctorUserCollection.add({ 
    //   Email: email,
    //   Name: name,
    //   Password: password,
    //   Role: role,
    //   Surname: surname
    // })
    // .then((docRef) => {
    //   console.log("Document written with ID: ", docRef.id);
    // })
    // .catch((error) => {
    //   console.error("Error adding document: ", error);
    // });

    navigate('/login');
  }


  return (
      <div className="smpd-singup">
        <div className='smpd-singup-container'>
          <div className='smpd-singup-left'>
            <div className='smpd-singup-logo' >
              <img className='smpd-singup-logo-img' src={logo} alt='Smpd Logo' />
            </div>
            <h1>SMPD</h1>
            <h2>Hoşgeldiniz</h2>
            <img className='smpd-singup-image' src={logoImages} alt='Smpd Logo' />
          </div>

          <div className='smpd-singup-right'>
            <h3 className='smpd-enterance-heading'>Kayıt Ol</h3>
              <h4 className='smpd-enterance-heading'>Ad</h4>
              <input className='smpd-singup-input' type='text' value={name} onChange={(event) => setName(event.target.value)} />
              <h4 className='smpd-enterance-heading'>Soyad</h4>
              <input className='smpd-singup-input' type='text' value={surname} onChange={(event) => setSurname(event.target.value)} />
              <h4 className='smpd-enterance-heading'>Role</h4>
              <input className='smpd-singup-input' type='text' value={role} onChange={(event) => setRole(event.target.value)} />
              <h4 className='smpd-enterance-heading'>Kullanıcı Adı</h4>
              <input className='smpd-singup-input' type={email} value={email} onChange={(event) => setEmail(event.target.value)} />
              <h4 className='smpd-enterance-heading'>Parola</h4>
              <input className='smpd-singup-input' type='text' value={password} onChange={(event) => setPassword(event.target.value)} />
              <button className='smpd-singup-button' onClick={handleSubmit} type='submit'>Kayıt Oluştur </button>
          </div>
        </div>
      </div>
  )
}

export default Singup;