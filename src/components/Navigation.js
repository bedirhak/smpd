import logo from '../assets/images/smpd-logo.png';
import '../style/navigation.css';
import { Link } from 'react-router-dom';
import {BsBoxArrowInLeft, BsCalendarPlus} from 'react-icons/bs';
import {IoIosHome} from 'react-icons/io';
import {AiFillFolderOpen} from 'react-icons/ai';
import {TbReportAnalytics} from 'react-icons/tb';

const Navigation = () => {
  return (
    <>
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
                    <li className='smpd-nav-link'><Link to='/homepage' > <TbReportAnalytics  /> Reçeteler</Link></li>
                    <li className='smpd-nav-link'><Link to='/homepage' > <AiFillFolderOpen  /> Raporlar</Link></li>
                    <li className='smpd-nav-link'><Link to='/homepage' > <BsCalendarPlus  /> Tedavi Ekle</Link></li>
                </ul>
            </nav>
        </div>
    </>


  );
}

export default Navigation;