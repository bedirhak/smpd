import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { saveAs } from 'file-saver';
import TreatmentReport from '../components/TreatmentReport';
import { pdf } from '@react-pdf/renderer';
import '../style/treatmentReport.css';
import useDateCalc from '../hooks/useDateCalc';

const TreatmentsDetail = ({patient}) => {
  const location = useLocation();
  const startTime = useDateCalc(location.state.treatment.StartDate.seconds, location.state.treatment.StartDate.nanoseconds);

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
        <div className='smpd-pdf-report'>
          <TreatmentReport details={location.state.treatment} treatmentType={location.state.treatmentType} patient={location.state.patient} />
        </div>
        {/* <button style={{display: 'block'}} onClick={handleDownloadPdf}>PDF'i İndir</button> */}
    </div>
  )
}

export default TreatmentsDetail;