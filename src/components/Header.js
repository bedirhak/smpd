import '../style/header.css';
import {SlCalender} from 'react-icons/sl';
import {AiOutlineClockCircle} from 'react-icons/ai';
import {HiUserCircle} from 'react-icons/hi';
import { useSelector } from 'react-redux';

import { useEffect, useState } from 'react';
import {db} from '../firebase';

const Header = () => {
  const current = new Date();
  const date = `${current.getDate()}.${current.getMonth()+1}.${current.getFullYear()}`;
  const clock = `${String(current.getHours()).padStart(2, '0')}.${String(current.getMinutes()).padStart(2, '0')}`;
  const {user} = useSelector(state => state.auth);
  const doctorCollectionRef = db.collection("doctor-users");
  const [doctor, setDoctor] = useState({});

  useEffect(() => {
    user &&
    doctorCollectionRef
        .where("Email", "==", user.email).get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            handleDoctorSet(doc.id)
          })
        });
  });



  const handleDoctorSet = (doctorId) => {

    db.collection('doctor-users').doc(doctorId).get()
          .then((doc) => {
            if (doc.exists) {
              const data = doc.data();
              setDoctor(data);
              } else {
              // Belge mevcut değilse
              console.log('Belge bulunamadı!');
            }
          })
          .catch((error) => {
            console.log('Belge çekme hatası:', error);
          });
  };
  


  return (
    <>
    { user &&
      <header className='smpd-header'>
        <div className='smpd-header-time'>
          <p><SlCalender className='smpd-header-icon' /> <span> {date} </span> </p>
          <p><AiOutlineClockCircle className='smpd-header-icon' />  <span> {clock} </span> </p>
        </div>

        <div className='smpd-header-user'>
          <div className='smpd-header-user-info'>
            <h6 className='smpd-header-user-name'>{doctor.Email ? doctor.Email : 'default@gmail.com'}</h6>
            <h6 className='smpd-header-user-role'> {doctor.Role}</h6>
          </div>
          <div className='smpd-header-user-image'>
            <HiUserCircle className='smpd-header-user-icon' />
          </div>
        </div>
      </header>
    }
    </>
  )
}

export default Header;