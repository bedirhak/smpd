
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { doc, setDoc } from "firebase/firestore";
import {db, prescriptionsRef} from '../firebase';

const AddTreatment = (props) => {
    const location = useLocation();

    console.log(location.state);
  
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [role, setRole] = useState('');
    const handleSubmit = () => {
  
      prescriptionsRef.add({
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
    <div className="smpd-clear-window">
      <h1 className='smpd-page-heading'>{location.state.Name } {location.state.Surname } İçin Tedavi Ekliyorsunuz </h1>


    </div>
  )
}

export default AddTreatment;