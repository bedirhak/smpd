import '../style/treatments.css';
import { RiDeleteBinLine } from 'react-icons/ri';

const Treatments = () => {

  
  return (
    <div className="smpd-clear-window">
        <h1 className='smpd-page-heading'>Treatments</h1>
        <div className="smpd-page-center">
          <table className="smpd-treatments-table">
            <thead>
              <th>Choose</th>
              <th>Tarih</th>
              <th>Hastane Adı</th>
              <th>Doktor Adı</th>
              <th>Randevu Detayı</th>
              <th>Delete</th>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input type='checkbox' />
                </td> 
                <td>29/11/2022</td>
                <td>Ankara Bilkent Şehir Hastanesi</td>
                <td>Neşe Şahin Özçelik</td>
                <td>Randevu Detayı</td>
                <td><RiDeleteBinLine /></td>
              </tr>
              <tr>
                <td>                  
                  <input type='checkbox' />
                </td>
                <td>05/12/2022</td>
                <td>Ankara 29 Mayıs Devlet Hastanesi</td>
                <td>Mustafa Akgül</td>
                <td>Randevu Detayı</td>
                <td><RiDeleteBinLine /></td>
              </tr>
              <tr>
                <td>                  
                  <input type='checkbox' />
                </td>
                <td>17/12/2022</td>
                <td>Ankara Ulucanlar Göz Eğitim ve Araştırma Hastanesi</td>
                <td>Serkan Genç</td>
                <td>Randevu Detayı</td>
                <td><RiDeleteBinLine /></td>
              </tr>
            </tbody>
          </table>
        </div>
    </div>
  )
}

export default Treatments;