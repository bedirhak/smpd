import '../style/treatments.css';
import { useEffect, useState } from 'react';
import { RiDeleteBinLine } from 'react-icons/ri';
import { db } from '../firebase';
import { Link } from 'react-router-dom';
import '../style/patient.css';




const Patients = () => {
  const usersCollection = db.collection("users");
  const [patients, setPatients] = useState([]);

  
  useEffect( () => {
    //user && navigate('/homepage');
    
    
    usersCollection
      .where("Role", "==", 'patient')
      .get()
      .then((querySnapshot) => {
        console.log(querySnapshot);
        querySnapshot.forEach((doc) => {
          console.log(doc.data());
        });

        const myArray = querySnapshot.docs.map((doc) => doc.data());
        setPatients(myArray);
        console.log(patients);

      });

  //eslint-disable-next-line
  }, []); 

  
  return (
    <div className="smpd-clear-window">
        <h1 className='smpd-page-heading'>Treatments</h1>
        <div className="smpd-page-center">
          <table className="smpd-treatments-table">
            <thead>
              <th>isim</th>
              <th>Soyisim</th>
              <th>Mail</th>
              <th>Tedavi Ekle</th>
              <th>Rapor Al</th>
            </thead>
            <tbody>
            {patients &&
              patients.map((patient) => (
                <tr key={patient.Mail}>
                    <td>{patient.Name}</td>
                    <td>{patient.Surname}</td>
                    <td>{patient.Mail}</td>
                    <td className='smpd-table-buttons'><Link to= '/add-treatment' state={ patient }>Tedavi Ekle</Link></td>
                    <td className='smpd-table-buttons'><Link to= '/get-report' state={ patient }>Rapor Al</Link></td>
                    {console.log('Patient: ',patient)}
                </tr>
              ))  
            }            
            </tbody>
          </table>
        </div>
    </div>


  )
}

export default Patients;