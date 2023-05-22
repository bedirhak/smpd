import logo from '../assets/images/smpd-logo.png';
import '../style/navigation.css';
import { Link } from 'react-router-dom';
import {BsBoxArrowInLeft, BsCalendarPlus} from 'react-icons/bs';
import {IoIosHome} from 'react-icons/io';
import {AiFillFolderOpen} from 'react-icons/ai';
import {TbReportAnalytics} from 'react-icons/tb';
import { logout } from '../firebase';
import { logout as handleLogout } from '../stores/auth';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {db} from '../firebase';


const Navigation = () => {
    const {user} = useSelector(state => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const doctorCollectionRef = db.collection("doctor-users");

    const logoutUser = () => {
        logout();
        dispatch(handleLogout());
        navigate('/login');
    }

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
        <div className='smpd-nav-container'>
            <div className='smpd-nav-top'>
                <div className='smpd-nav-logo'>
                    <img src={logo} alt='Smpd Logo' />
                </div>
                <h1 className='smpd-logo-heading'>SMPD</h1>
                <div className='smpd-close-nav'>
                    <BsBoxArrowInLeft className='smpd-nav-close-icon' />
                </div>
            </div>
            <nav className='smpd-nav'>
                <ul>
                    {doctor.Role === 'doktor' && 
                    <>
                        <li className='smpd-nav-link'><Link to='/homepage' > <IoIosHome  /> Anasayfa</Link></li>
                        <li className='smpd-nav-link'><Link to='/patients' > <TbReportAnalytics  /> Hastalarım </Link></li>
                    </>}
                    {doctor.Role === 'admin' && <li className='smpd-nav-link'><Link to='/sing-up' > <BsCalendarPlus  /> Doktor Ekle </Link></li>}
                </ul>
            </nav>

            <div className='smpd-logout'>
                <button onClick={logoutUser}>Logout</button>
            </div>
        </div>
    }
    </>
  );
}

export default Navigation;