import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { saveAs } from 'file-saver';
import TreatmentReport from '../components/TreatmentReport';
import { pdf } from '@react-pdf/renderer';

const TreatmentsDetail = ({patient}) => {
  const location = useLocation();
  const [startTime, setStartTime] = useState();


  useEffect(() => {
      // Convert seconds and nanoseconds to milliseconds
      const milliseconds = location.state.treatment.StartDate.seconds * 1000 + Math.floor(location.state.treatment.StartDate.nanoseconds / 1000000);
    
      // Create a new Date object using the milliseconds
      const date = new Date(milliseconds);
      const monthNames = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık' ];
      const monthIndex = date.getMonth(); // Ay bilgisini alır
      const monthName = monthNames[monthIndex];
      const year = date.getFullYear(); // Yıl bilgisini alır
      const day = date.getDate(); // Ayın gününü alır

      setStartTime(`${day} ${monthName} ${year}`);
  }, []);

  const handleDownloadPdf = async () => {
    const pdfBlob = await pdf(<TreatmentReport details={location.state.treatment} treatmentType={location.state.treatmentType} patient={location.state.patient}  />).toBlob();
    const url = URL.createObjectURL(pdfBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'example.pdf';
    link.click();
  };

  return (
    <div className="smpd-clear-window">
        <h1 className='smpd-page-heading'>Tedavi Detayı</h1>
        <TreatmentReport details={location.state.treatment} treatmentType={location.state.treatmentType} patient={location.state.patient} />
        <button style={{display: 'block'}} onClick={handleDownloadPdf()}>PDF'i İndir</button>
    </div>
  )
}

export default TreatmentsDetail;