import { useLocation } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import firebase from 'firebase/compat/app';
import '../style/addTreatment.css';
import { useNavigate } from 'react-router-dom';
import {db, prescriptionsRef} from '../firebase';
import Modal from 'react-modal';


const AddTreatment = () => {
    const navigate = useNavigate();

    const usagePeriodRef = useRef();
    const pillNameRef = useRef();
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
    const pillNamesRef = db.collection("ready-pills");
    const [userId, setUserId] = useState();
    const [user, setUser] = useState(location.state);
    const [pillList, setPillList] = useState([]);
    const [modalText, setModalText] = useState({});


    useEffect(() => {
        usersCollection
        .where("Mail", "==", location.state.Mail).get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            setUserId(doc.id);
          })
        });

        pillNamesRef.get()
        .then(function(querySnapshot) {
          const dataList = [];
          querySnapshot.forEach(function(doc) {
            // Her belge için verilere erişebilirsiniz
            dataList.push(doc.data());
          });
          setPillList(dataList);
        })
        .catch(function(error) {
          console.log("Verileri alma işlemi başarısız: ", error);
        });
    });

    const setUsagePeriodType = (usagePeriod) => {
      setUsagePeriodHour(Number.parseInt(usagePeriod));
      const selectElement = document.getElementById("smpd-medication-hours");
      selectElement.selectedIndex = 0;
      setMedicationHours(null);
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
      if (drugType === '' || illness === '' || pillName === '' || totalPill === '') {
        setModalText({
          heading: 'Verileri Doğru girdiğinize emin olun !',
          text: 'Hatalı ya da eksin veri girdiniz !',
        })
        setModalIsOpen(true);
      } else {
        

        const dateObject = new Date(startDate);
        dateObject.setHours(startTime);

        prescriptionsRef.add({
          DrugType: drugType,
          Illness: illness,
          MedicationHours: medicationHours,
          Name: pillName,
          StartDate: firebase.firestore.Timestamp.fromDate(dateObject),
          TotalPill: totalPill,
          UsagePeriod: [],
          UsagePeriodHour: usagePediodHour
        }).then((docRef) => {
          updateUser(docRef.id);
        }).catch((error) => {
          console.error('Belge eklenirken hata oluştu:', error);
        });
      }


    }

    const updateUser = (prescriptionId) => {
      usersCollection
        .where("Mail", "==", location.state.Mail).get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            setUser(doc.data());

            const userRef = db.collection("users").doc(userId);
            const waitingTreatmentList = doc.data().WaitingTreatmentList;
            waitingTreatmentList.push(prescriptionId);
            console.log('Waiting Treatment: ',waitingTreatmentList);

            userRef.update({
              WaitingTreatmentList: waitingTreatmentList,
              NewTreatment: true,
            }).then(() => {
              setModalText({
                heading: 'Tedavi Başarıyla Eklendi !',
                text: '',
              })
              setModalIsOpen(true);
            });

          })
        });

      

    }

    const setNameOfPill = (pillNameInput) => {
      setPillName(pillNameInput)
      const selectElement = document.getElementById("smpd-pill-name");
      selectElement.selectedIndex = 0;
    }

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
      setModalIsOpen(true);
    };
  
    const closeModal = () => {
      setModalIsOpen(false);
      navigate('/patients');

    };


  return (
    <div className="smpd-clear-window">
      <h1 className='smpd-page-heading'>{user.Name } {user.Surname } İçin Tedavi Ekliyorsunuz </h1>
      <div className='smpd-singup-right smpd-add-treatment-table'>
        <h4 className='smpd-enterance-heading'>İlaç Tipi</h4>
        <input className='smpd-singup-input' type='text' value={drugType} onChange={(event) => setDrugType(event.target.value)} />

        <h4 className='smpd-enterance-heading'>Hastalık</h4>
        <input className='smpd-singup-input' type='text' value={illness} onChange={(event) => setIllness(event.target.value)} />

        <h4 className='smpd-enterance-heading'>İlaç Adı (Kullanım Tiplerinden Birini Seçiniz)</h4>
        <div className='smpd-pill-period-container'>
          <div className='smpd-pill-period'>
          <h4 className='smpd-enterance-heading'>İlaç Adı</h4>
          <input ref={pillNameRef} className='smpd-singup-input' type='text' value={pillName} onChange={(event) => setNameOfPill(event.target.value)} />
          </div>
          <div className='smpd-pill-period'>
            <h4 className='smpd-pill-period-heading'>Kullanım Sıklığı Ne Olmalı ?</h4>
            <select className="smpd-pill-period-selections" id="smpd-pill-name" onChange={(event) => setPillName(event.target.value)} >
              <option selected disabled hidden>Bir İlaç Adı Seçiniz</option>
              {pillList.map((data, index) => (
                <option  key={index} value={data.Name} >{data.Name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className='smpd-start-date-and-time'>
          <div className='smpd-start-date'>
            <h4 className='smpd-enterance-heading'>Başlama Tarihi</h4>
            <input className='smpd-singup-input' type='date' value={startDate} onChange={(event) => setStartDate(event.target.value)} />
          </div>
          <div className='smpd-start-time'>
            <h4 className='smpd-enterance-heading'>Başlama Saati</h4>
            <input className='smpd-singup-input' step="3600" type='time' onChange={(event) => {updateTime(event)}}  />
          </div>
        </div>

        <h4 className='smpd-enterance-heading'>İlaç Adedi</h4>
        <input className='smpd-singup-input' type='number' value={totalPill} onChange={(event) => setTotalPill(Number.parseInt(event.target.value))} />

        <h4 className='smpd-enterance-heading'>Kullanım Periyodu (Kullanım Tiplerinden Birini Seçiniz)</h4>
        <div className='smpd-pill-period-container'>
          <div className='smpd-pill-period'>
            <h4 className='smpd-pill-period-heading'>Kaç Saatte Bir Kullanılmalı ?</h4>
            <input ref={usagePeriodRef} className='smpd-singup-input' id='smpd-usage-period' type='number' value={usagePediodHour} onChange={(event) => setUsagePeriodType(Number.parseInt(event.target.value))} />
          </div>
          <div className='smpd-pill-period'>
            <h4 className='smpd-pill-period-heading'>Kullanım Sıklığı Ne Olmalı ?</h4>
            <select className="smpd-pill-period-selections" id="smpd-medication-hours" onChange={(event) => setMedicationHoursType(event.target.value)} >
              <option selected disabled hidden>Kullanım Sıklığı Seçiniz</option>
              <option value="8,18">Sabah-Akşam</option>
              <option value="12">Günde 1 Kez</option>
              <option value="8,12,18">Sabah-Öğlen-Akşam</option>
            </select>
          </div>
        </div>

        <button className='smpd-singup-button' onClick={handleSubmit} type='submit'>Tedavi Ekle </button>
      </div>


      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <h2 className='smpd-modal-heading'>{modalText.heading}</h2>
        <p>{modalText.text}</p>
        <button className='smpd-modal-button' onClick={closeModal}>Kapat</button>
      </Modal>
    </div>
  )
}

export default AddTreatment;