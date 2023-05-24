import { useState } from 'react';
import '../style/addTreatment.css';
import {db} from '../firebase';
import Modal from 'react-modal';


const AddTreatmentDetails = () => {

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalText, setModalText] = useState({});
    const [pillName, setPillName] = useState('');
    const pillNamesRef = db.collection("ready-pills");


    const checkIfDocumentExists = async (name) => {
      const querySnapshot = await pillNamesRef.where("Name", "==", name).get();
      return querySnapshot.empty;

    };

    const handleSubmit = () => {
    
      checkIfDocumentExists(pillName)
        .then((documentExists) => {
          if (documentExists) {
            if (pillName) {
              pillNamesRef.add({
                Name: pillName,
              }).then((docRef) => {
                setModalText({
                  heading: 'İlaç Başarıyla Eklendi',
                  text: '',
                })
                setModalIsOpen(true);
              }).catch((error) => {
                console.error('Belge eklenirken hata oluştu:', error);
              });
            } else {
              setModalText({
                heading: 'Hatalı İlaç İsmi',
                text: 'İlaç adı kısmını boş bırakmayınız ya da geçerli bir ilaç adı giriniz !',
              })
              setModalIsOpen(true);
            }
          } else {
            setModalText({
              heading: 'İlaç Zaten Listede Var',
              text: 'Girmiş olduğunuz ilaç listede mevcut !',
            })
            setModalIsOpen(true);
          }
        })
        .catch((error) => {
          console.log("Belgede hata oluştu." , error);
         
        });
   
    }


    const openModal = () => {
      setModalIsOpen(true);
    };
  
    const closeModal = () => {
      setModalIsOpen(false);
      //navigate('/patients');
    };


  return (
    <div className="smpd-clear-window">
      <h1 className='smpd-page-heading'> Listeye İlaç Ekle </h1>
      <div className='smpd-singup-right smpd-add-treatment-table'>

        <h4 className='smpd-enterance-heading'>İlaç Adı</h4>
        <input className='smpd-singup-input' type='text' value={pillName} onChange={(event) => setPillName(event.target.value)} />


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

export default AddTreatmentDetails;