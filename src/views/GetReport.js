
import { useLocation } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import firebase from 'firebase/compat/app';
import '../style/getReport.css';
import {db, prescriptionsRef} from '../firebase';
import { Link } from 'react-router-dom';


const GetReport = (props) => {
  
    const [waitingTreatments, setWaitingTreatments] = useState([]);
    const location = useLocation();
    const [user, setUser] = useState(location.state);
    const [isWaitingTreatmentsSet, setIsWaitingTreatmentsSet ] = useState(false);

    useEffect(() => {
      console.log('user', location.state);
      console.log(isWaitingTreatmentsSet);

      (location.state.WaitingTreatmentList || []).forEach((documentId) => {
        db.collection('prescriptions').doc(documentId).get()
          .then((doc) => {
            if (doc.exists) {
              // Belge mevcutsa, belge verilerine erişebilirsiniz
              const data = doc.data();
              const newArray = [...waitingTreatments];

              // Yeni veriyi kopyaya ekle
              !(newArray.includes(data)) && newArray.push(data);
              setWaitingTreatments(newArray);

              } else {
              // Belge mevcut değilse
              console.log('Belge bulunamadı!');
            }
          })
          .catch((error) => {
            console.log('Belge çekme hatası:', error);
          });
          
      });
    }, []);

  return (
    <div className="smpd-clear-window">
      <h1 className='smpd-page-heading'>{user.Name } {user.Surname } Tedavileri </h1>
      
      <div className='smpd-treatments'>
        {(user.TreatmentList ||[]).length === 0 && <h4>Kullanıcıya ait kayıtlı tedavi bulunamamıştır. Sağlıklı günler :)</h4>}
        <div className='smpd-compleated-treatments'>
          {(user.CompletedPrescriptionList || []).length > 0 &&
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
                    <td className='smpd-table-buttons'><Link to= '/treatments-detail' state={ treatment }>Tedavi Detayı</Link></td>
                </tr>
              ))  
            }            
            </tbody>
          </table>
          </>
          }

          {(user.PrescriptionList || []).length > 0 &&
          <>
          <h4 className="smpd-treatments-type-heading">Aktif Tedaviler</h4>
          <table className="smpd-treatments-table">
            <thead>
              <th>İlaç Tipi</th>
              <th>İlaç Adı</th>
              <th>Şikayet</th>
              <th>Kullanılacak İlaç Adedi</th>
              <th>Tedavi Detayı</th>
            </thead>
            <tbody>
            {user && user.PrescriptionList.map((treatment, index) => (
                <tr key={index}>
                    <td>{treatment.DrugType}</td>
                    <td>{treatment.Name}</td>
                    <td>{treatment.Illness}</td>
                    <td>{treatment.TotalPill}</td>
                    <td className='smpd-table-buttons'><Link to= '/treatments-detail' state={ treatment }>Tedavi Detayı</Link></td>
                </tr>
              ))  
            }            
            </tbody>
          </table>
          </>
          } 

          {waitingTreatments.length > 0 &&
          <>
          <h4 className="smpd-treatments-type-heading">Onay Bekleyen Tedaviler</h4>
          <table className="smpd-treatments-table">
            <thead>
              <th>İlaç Tipi</th>
              <th>İlaç Adı</th>
              <th>Şikayet</th>
              <th>Kullanılacak İlaç Adedi</th>
              <th>Tedavi Detayı</th>
            </thead>
            <tbody>
            {waitingTreatments.map((treatment, index) => (
                <tr key={index}>
                    <td>{treatment.DrugType}</td>
                    <td>{treatment.Name}</td>
                    <td>{treatment.Illness}</td>
                    <td>{treatment.TotalPill}</td>
                    <td className='smpd-table-buttons'><Link to= '/treatments-detail' state={ treatment }>Tedavi Detayı</Link></td>
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