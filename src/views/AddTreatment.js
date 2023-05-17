
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';

import { doc, setDoc } from "firebase/firestore";
import {db, prescriptionsRef} from '../firebase';

const AddTreatment = (props) => {
    const location = useLocation();
    const usersCollection = db.collection("users");
    const [userId, setUserId] = useState();
    const [user, setUser] = useState(location.state);

    useEffect(() => {
        usersCollection
        .where("PhoneNumber", "==", location.state.PhoneNumber).get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => setUserId(doc.id));
        });
    });
  
    const [drugType, setDrugType] = useState('');
    const [illness, setIllness] = useState('');
    const [pillName, setPillName] = useState('');
    const [startDate, setStartDate] = useState();
    const [totalPill, setTotalPill] = useState('');
    const [usagePediodHour, setUsagePeriodHour] = useState('');
    const handleSubmit = () => {
  

        // alert('tedavi eklendi');

    const dateObject = new Date(startDate);

      prescriptionsRef.add({
        DrugType: drugType,
        Illness: illness,
        MadicationHouts: [],
        Name: pillName,
        StartDate: firebase.firestore.Timestamp.fromDate(dateObject),
        TotalPill: totalPill,
        UsagePeriod: [],
        UsagePeriodHour: usagePediodHour
      })
      .then((docRef) => {
        console.log('Yeni belge eklendi. Belge kimliği:', docRef.id);
        updateUser(docRef.id);
      })
      .catch((error) => {
        console.error('Belge eklenirken hata oluştu:', error);
      });
    }

    const updateUser = (prescriptionId) => {
        console.log(prescriptionId);
        const updatedUser = user;

        updatedUser.NewTreatment = true;
        updatedUser.TreatmentList.push(prescriptionId);

        console.log('updated useri', updatedUser);

      setDoc(doc(db, "users", 'EGV46oqdWke6zSqhcNZW'), updatedUser);


    }


  return (
    <div className="smpd-clear-window">
      <h1 className='smpd-page-heading'>{user.Name } {user.Surname } İçin Tedavi Ekliyorsunuz </h1>
      <div className='smpd-singup-right smpd-add-treatment-table'>
            {/* <h3 className='smpd-enterance-heading'>Kayıt Ol</h3> */}
              <h4 className='smpd-enterance-heading'>Drug Type</h4>
              <input className='smpd-singup-input' type='text' value={drugType} onChange={(event) => setDrugType(event.target.value)} />
              <h4 className='smpd-enterance-heading'>Ilness</h4>
              <input className='smpd-singup-input' type='text' value={illness} onChange={(event) => setIllness(event.target.value)} />
              <h4 className='smpd-enterance-heading'>Pill Name</h4>
              <input className='smpd-singup-input' type='text' value={pillName} onChange={(event) => setPillName(event.target.value)} />
              <h4 className='smpd-enterance-heading'>Start Date</h4>
              <input className='smpd-singup-input' type='date' value={startDate} onChange={(event) => setStartDate(event.target.value)} />
              <h4 className='smpd-enterance-heading'>Total Pill</h4>
              <input className='smpd-singup-input' type='number' value={totalPill} onChange={(event) => setTotalPill(event.target.value)} />
              <h4 className='smpd-enterance-heading'>Usage Period Hour</h4>
              <input className='smpd-singup-input' type='number' value={usagePediodHour} onChange={(event) => setUsagePeriodHour(event.target.value)} />
              <button className='smpd-singup-button' onClick={handleSubmit} type='submit'>Tedavi Ekle </button>
          </div>

    </div>
  )
}

export default AddTreatment;