import '../style/singup.css';
import logo from '../assets/images/smpd-logo-white.png';
import logoImages from '../assets/images/smpd-login-image.png';
import { useState, useEffect, useId } from 'react';
import {register} from '../firebase';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { doc, setDoc } from "firebase/firestore"; 
import {db, doctorCollectionRef} from '../firebase';
// import { v4 as uuidv4 } from 'uuid';




const Singup = () => {
  const navigate = useNavigate();
  //const {user} = useSelector(state => state.auth);
  // const usersCollection = db.collection("users");

  useEffect( () => {
    //user && navigate('/homepage');
    


  //eslint-disable-next-line
  }, []); 



  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [role, setRole] = useState('');
  const handleSubmit = () => {
    register(email, password,name, surname,role );

   doctorCollectionRef.add({
      Name: name,
      Surname: surname,
      Email: email,
      Password: password,
      Role: 'doktor'
    })
    .then((docRef) => {
      console.log('Yeni belge eklendi. Belge kimliği:', docRef.id);
    })
    .catch((error) => {
      console.error('Belge eklenirken hata oluştu:', error);
    });

/*
    setDoc(doc(db, "doctor-users", uuidv4()), { // new-doctor kısmı id creator ile id dönecek şekilde yapılacak.
      Name: name,
      Surname: surname,
      Email: email,
      Password: password,
      Role: role
    });
*/
    alert('Doktor Başarıyla Eklendi :)')
    //navigate('/login');
  }


  return (
      <div className="smpd-singup">
        <div className='smpd-singup-container'>
          <div className='smpd-singup-left'>
            <div className='smpd-singup-logo' >
              <img className='smpd-singup-logo-img' src={logo} alt='Smpd Logo' />
            </div>
            <h1>SMPD</h1>
            {/* <h2>Hoşgeldiniz</h2> */}
            <img className='smpd-singup-image' src={logoImages} alt='Smpd Logo' />
          </div>

          <div className='smpd-singup-right'>
            <h3 className='smpd-enterance-heading'>Doktor Ekle</h3>
              <h4 className='smpd-enterance-heading'>Ad</h4>
              <input className='smpd-singup-input' type='text' value={name} onChange={(event) => setName(event.target.value)} />
              <h4 className='smpd-enterance-heading'>Soyad</h4>
              <input className='smpd-singup-input' type='text' value={surname} onChange={(event) => setSurname(event.target.value)} />
              <h4 className='smpd-enterance-heading'>Role</h4>
              <input className='smpd-singup-input' type='text' placeholder='Doktor' disabled value={role} onChange={(event) => setRole(event.target.value)} />
              <h4 className='smpd-enterance-heading'>Email</h4>
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