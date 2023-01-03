import { useSelector } from 'react-redux';
import '../style/homepage.css';



const HomePage = () => {

  const {user} = useSelector(state => state.auth);

  return (
    <div className='smpd-clear-window'>
      <h1 className='smpd-page-heading'>Hoşgeldin {user.displayName} </h1>

    </div>
  )
}

export default HomePage;