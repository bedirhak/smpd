import React, {useState, useEffect} from 'react';
import { Document, Page, Text, View } from '@react-pdf/renderer';

const styles = {
    body: {
        padding: '20px',
        display: 'inline-block',
    },
  container: {
    display: 'block',
    flexDirection: 'row',
    color: '#60c1ca',
    marginBottom: 25,
    borderBottom: '2px dashed #60c1ca',
    paddingBottom: 15
  },
  text: {
    fontSize: '1.25rem',
    marginRight: 10,
    marginBottom: 25,
    display: 'inline-block'
  },
  infoTextLeft: {
    color: '#60c1ca',
    marginRight: '50px',
    width: '150px'
  },
  infoTextRight: {
    color: 'black',
    textTransform: 'capitalize'
  },
  infoTextMail: {
    color: 'black',
  },
  info: {
    display: 'flex',
    flexDirection: 'row'
  },
  infoContainer: {
    display: 'block',
    width: '100vw'
  }
};

const TreatmentReport = ({ details, treatmentType, patient }) => {
  console.log('Treatment Details:', details);
  console.log('Patient:', patient);
  console.log('treatmentType:', treatmentType);

  const [birthdate, setBirthdate] = useState();

  useEffect(() => {
    // Convert seconds and nanoseconds to milliseconds
    const milliseconds = patient.BirthDate.seconds * 1000 + Math.floor(patient.BirthDate.nanoseconds / 1000000);
  
    // Create a new Date object using the milliseconds
    const date = new Date(milliseconds);
    const monthNames = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık' ];
    const monthIndex = date.getMonth(); // Ay bilgisini alır
    const monthName = monthNames[monthIndex];
    const year = date.getFullYear(); // Yıl bilgisini alır
    const day = date.getDate(); // Ayın gününü alır

    setBirthdate(`${day} ${monthName} ${year}`);
}, []);

  return (
    <Document>
      <Page style={styles.body}>
          <View style={styles.container}>
            <Text style={styles.text}>Hasta Bilgileri</Text>
            <View style={styles.infoContainer}>
                <View style={styles.info}>
                    <Text style={styles.infoTextLeft}>Ad: </Text>
                    <Text style={styles.infoTextRight}> {patient.Name}</Text>
                </View>
            </View>
            <View style={styles.infoContainer}>
                <View style={styles.info}>
                    <Text style={styles.infoTextLeft}>Soyad: </Text>
                    <Text style={styles.infoTextRight}> {patient.Surname}</Text>
                </View>
            </View>
            <View style={styles.infoContainer}>
                <View style={styles.info}>
                    <Text style={styles.infoTextLeft}>Doğum Tarihi: </Text>
                    <Text style={styles.infoTextRight}> {birthdate}</Text>
                </View>
            </View>
            <View style={styles.infoContainer}>
                <View style={styles.info}>
                    <Text style={styles.infoTextLeft}>Mail: </Text>
                    <Text style={styles.infoTextMail}> {patient.Mail}</Text>
                </View>
            </View>
            <View style={styles.infoContainer}>
                <View style={styles.info}>
                    <Text style={styles.infoTextLeft}>Telefon Numarası: </Text>
                    <Text style={styles.infoTextRight}> 0{patient.PhoneNumber}</Text>
                </View>
            </View>
            <View style={styles.infoContainer}>
                <View style={styles.info}>
                    <Text style={styles.infoTextLeft}>Cinsiyet: </Text>
                    <Text style={styles.infoTextRight}> {patient.Gender}</Text>
                </View>
            </View>
            <View style={styles.infoContainer}>
                <View style={styles.info}>
                    <Text style={styles.infoTextLeft}>Toplam Tedavi Sayısı: </Text>
                    <Text style={styles.infoTextRight}> {patient.TreatmentList.length}</Text>
                </View>
            </View>
            <View style={styles.infoContainer}>
                <View style={styles.info}>
                    <Text style={styles.infoTextLeft}>Tamamlanan Tedavi Sayısı: </Text>
                    <Text style={styles.infoTextRight}> {(patient.CompletedPrescriptionList || []).length}</Text>
                </View>
            </View>
            
            

        </View>

        <View style={styles.container}>
            <Text style={styles.text}>Tedavi Bilgileri</Text>
            <View style={styles.infoContainer}>
                <View style={styles.info}>
                    <Text style={styles.infoTextLeft}>Tedavi Durumu: </Text>
                    <Text style={styles.infoTextMail}> {treatmentType}</Text>
                </View>
            </View>
            <View style={styles.infoContainer}>
                <View style={styles.info}>
                    <Text style={styles.infoTextLeft}>İlaç Tipi: </Text>
                    <Text style={styles.infoTextRight}> {details.DrugType}</Text>
                </View>
            </View>
            <View style={styles.infoContainer}>
                <View style={styles.info}>
                    <Text style={styles.infoTextLeft}>Rahatsızlık: </Text>
                    <Text style={styles.infoTextRight}> {details.Illness}</Text>
                </View>
            </View>
            <View style={styles.infoContainer}>
                <View style={styles.info}>
                    <Text style={styles.infoTextLeft}>İlaç Adı: </Text>
                    <Text style={styles.infoTextRight}> {details.Name}</Text>
                </View>
            </View>
            <View style={styles.infoContainer}>
                <View style={styles.info}>
                    <Text style={styles.infoTextLeft}>Toplam İlaç Adedi: </Text>
                    <Text style={styles.infoTextMail}> {details.TotalPill}</Text>
                </View>
            </View>
            <View style={styles.infoContainer}>
                <View style={styles.info}>
                    <Text style={styles.infoTextLeft}>Kullanılan İlaç Adedi: </Text>
                    <Text style={styles.infoTextMail}> {details.TotalPill}</Text>
                </View>
            </View>
           
        </View>
      </Page>
    </Document>
  );
};

export default TreatmentReport;
