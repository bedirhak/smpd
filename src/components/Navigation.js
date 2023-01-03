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
import { useEffect } from 'react';
import { useSelector } from 'react-redux';



const Navigation = () => {
    const {user} = useSelector(state => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        !user.email && navigate('/login');
    //eslint-disable-next-line
    },[]);

    const logoutUser = () => {
        logout();
        dispatch(handleLogout());
        navigate('/login');
    }

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
                    <li className='smpd-nav-link'><Link to='/homepage' > <IoIosHome  /> Anasayfa</Link></li>
                    <li className='smpd-nav-link'><Link to='/tedavilerim' > <TbReportAnalytics  /> Tedavilerim</Link></li>
                    <li className='smpd-nav-link'><Link to='/homepage' > <AiFillFolderOpen  /> Raporlar</Link></li>
                    <li className='smpd-nav-link'><Link to='/homepage' > <BsCalendarPlus  /> Tedavi Ekle</Link></li>
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