
import { useLocation } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import firebase from 'firebase/compat/app';
import '../style/getReport.css';
import {db, prescriptionsRef} from '../firebase';
import { Link } from 'react-router-dom';


const GetReport = (props) => {
  
    const [waitingTreatments, setWaitingTreatments] = useState([]);
    const location = useLocation();
    const usersCollection = db.collection("users");
    const [userId, setUserId] = useState();
    const [user, setUser] = useState(location.state);

    useEffect(() => {
      console.log('user', location.state);
      const waitingPrescriptions = 

        usersCollection
        .where("Mail", "==", location.state.Mail).get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            console.log(doc.id)
            setUserId(doc.id);
          })
        });

    });


  return (
    <div className="smpd-clear-window">
      <h1 className='smpd-page-heading'>{user.Name } {user.Surname } Tedavi Raporu </h1>
      
      <div className='smpd-treatments'>
        <div className='smpd-compleated-treatments'>
          {user.CompletedPrescriptionList.length > 0 &&
          <>
          <h4 className="smpd-treatments-type-heading">Tamamlanan Tedaviler</h4>
          <table className="smpd-treatments-table">
            <thead>
              <th>İlaç Tipi</th>
              <th>İlaç Adı</th>
              <th>Şikayet</th>
              <th>Kullanılan İlaç Adedi</th>
              <th>Tedavi Detayı</th>
            </thead>
            <tbody>
            {user && user.CompletedPrescriptionList.map((treatment, index) => (
                <tr key={index}>
                    <td>{treatment.DrugType}</td>
                    <td>{treatment.Name}</td>
                    <td>{treatment.Illness}</td>
                    <td>{treatment.TotalPill}</td>
                    <td className='smpd-table-buttons'><Link to= '/get-report' state={ treatment }>Tedavi Detayı</Link></td>
                </tr>
              ))  
            }            
            </tbody>
          </table>
          </>
          }

          {user.PrescriptionList.length > 0 &&
          <>
          <h4 className="smpd-treatments-type-heading">Aktif Tedaviler</h4>
          <table className="smpd-treatments-table">
            <thead>
              <th>İlaç Tipi</th>
              <th>İlaç Adı</th>
              <th>Şikayet</th>
              <th>Kullanılan İlaç Adedi</th>
              <th>Tedavi Detayı</th>
            </thead>
            <tbody>
            {user && user.PrescriptionList.map((treatment, index) => (
                <tr key={index}>
                    <td>{treatment.DrugType}</td>
                    <td>{treatment.Name}</td>
                    <td>{treatment.Illness}</td>
                    <td>{treatment.TotalPill}</td>
                    <td className='smpd-table-buttons'><Link to= '/get-report' state={ treatment }>Tedavi Detayı</Link></td>
                </tr>
              ))  
            }            
            </tbody>
          </table>
          </>
          } 

          {user.WaitingTreatmentList.length > 0 &&
          <>
          <h4 className="smpd-treatments-type-heading">Onay Bekleyen Tedaviler</h4>
          <table className="smpd-treatments-table">
            <thead>
              <th>İlaç Tipi</th>
              <th>İlaç Adı</th>
              <th>Şikayet</th>
              <th>Kullanılan İlaç Adedi</th>
              <th>Tedavi Detayı</th>
            </thead>
            <tbody>
            {user && user.WaitingTreatmentList.map((treatment, index) => (
                <tr key={index}>
                    <td>{treatment.DrugType}</td>
                    <td>{treatment.Name}</td>
                    <td>{treatment.Illness}</td>
                    <td>{treatment.TotalPill}</td>
                    <td className='smpd-table-buttons'><Link to= '/get-report' state={ treatment }>Rapor Al</Link></td>
                </tr>
              ))  
            }            
            </tbody>
          </table>
        </>
        }
        </div>
      </div>

    </div>
  )
}

export default GetReport;