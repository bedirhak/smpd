
import { useLocation } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import firebase from 'firebase/compat/app';
import '../style/addTreatment.css';

import { doc, setDoc } from "firebase/firestore";
import {db, prescriptionsRef} from '../firebase';

const GetReport = (props) => {
    const usagePeriodRef = useRef();
    const [drugType, setDrugType] = useState('');
    const [illness, setIllness] = useState('');
    const [pillName, setPillName] = useState('');
    const [startDate, setStartDate] = useState();
    const [startTime, setStartTime] = useState();
    const [totalPill, setTotalPill] = useState('');
    const [usagePediodHour, setUsagePeriodHour] = useState();
    const [medicationHours, setMedicationHours] = useState([]);
    const location = useLocation();
    const usersCollection = db.collection("users");
    const [userId, setUserId] = useState();
    const [user, setUser] = useState(location.state);

    useEffect(() => {
      console.log('user', location.state);

        usersCollection
        .where("Mail", "==", location.state.Mail).get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            console.log(doc.id)
            setUserId(doc.id);
          })
        });

    });

    const setUsagePeriodType = (usagePeriod) => {
      setUsagePeriodHour(usagePeriod);
      const selectElement = document.getElementById("smpd-medication-hours");
      selectElement.selectedIndex = 0;
      setMedicationHours([]);

    }

    const setMedicationHoursType = (usageHours) => {
      const medicationHoursStringArray = usageHours.split(',');
      const medicationHoursIntArray = medicationHoursStringArray.map((str) => {
        return parseInt(str, 10);
      });
      setUsagePeriodHour(null);
      setMedicationHours(medicationHoursIntArray);
    }

    const updateTime = (event) => {
      const timeArray = event.target.value.split(":");
      const selectedTime = timeArray[0] + ":00";

      setStartTime(Number.parseInt(timeArray[0]));
      event.target.value = selectedTime;
    }

    const handleSubmit = () => {

    const dateObject = new Date(startDate);
    console.log(startTime)
    dateObject.setHours(startTime);
    console.log('usage period hour', typeof usagePediodHour)

      prescriptionsRef.add({
        DrugType: drugType,
        Illness: illness,
        MedicationHours: medicationHours,
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
      const userRef = db.collection("users").doc(userId);
      const waitingTreatmentList = user.WaitingTreatmentList;
      waitingTreatmentList.push(prescriptionId);


      userRef.update({
        WaitingTreatmentList: waitingTreatmentList,
        NewTreatment: true,
        MedicationHours: medicationHours
      })
    }


  return (
    <div className="smpd-clear-window">
      <h1 className='smpd-page-heading'>{user.Name } {user.Surname } Tedavi Raporu </h1>
      
    </div>
  )
}

export default GetReport;