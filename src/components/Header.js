import '../style/header.css';
import {SlCalender} from 'react-icons/sl';
import {AiOutlineClockCircle} from 'react-icons/ai';
import {HiUserCircle} from 'react-icons/hi';
import { useSelector } from 'react-redux';



const Header = () => {

  const current = new Date();
  const date = `${current.getDate()}.${current.getMonth()+1}.${current.getFullYear()}`;
  const clock = `${current.getHours()}.${current.getMinutes()}`;
  const {user} = useSelector(state => state.auth);

  return (
      <header className='smpd-header'>
        <div className='smpd-header-time'>
          <p><SlCalender className='smpd-header-icon' /> <span> {date} </span> </p>
          <p><AiOutlineClockCircle className='smpd-header-icon' />  <span> {clock} </span> </p>
        </div>

        <div className='smpd-header-user'>
          <div className='smpd-header-user-info'>
            <h6 className='smpd-header-user-name'>{user ? user.displayName : 'default@gmail.com' }</h6>
            <h6 className='smpd-header-user-role'> {user ? user.photoURL : 'default@gmail.com' }</h6>
          </div>
          <div className='smpd-header-user-image'>
            <HiUserCircle className='smpd-header-user-icon' />
          </div>
        </div>
                    
      </header>
  )
}

export default Header;