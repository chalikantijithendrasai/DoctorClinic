import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const PatientAppointmentList = () => {
  const location = useLocation();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const patientPhno = location.state?.phno;

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!patientPhno) {
        setError("No phone number provided.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.post(
          `https://globalnewtrading.com:8443/HealthApp/api/patientApointments?patientPhno=${patientPhno}`,
          {},
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              certificateID: "87CB817F-4F93-42E3-BF86-C260B0A27966",
            },
            validateStatus: (status) => true,
          }
        );

        if (response.status === 404) {
          setError(response.data.message || "No appointments found.");
        } else {
          setAppointments(response.data.appointments || []);
        }

      } catch (err) {
        setError("Something went wrong while fetching appointments.");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [patientPhno]);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>🩺 Patient Appointments</h2>

      {loading && <p style={styles.loading}>Loading appointments...</p>}

      {!loading && error && <p style={styles.error}>{error}</p>}

      {!loading && !error && appointments.length === 0 && (
        <p style={styles.noData}>No appointments found.</p>
      )}

      {!loading && appointments.length > 0 && (
        <div style={styles.cardContainer}>
          {appointments.map((appointment, index) => (
            <div key={index} style={styles.card}>
              <h4 style={styles.cardTitle}>👨‍⚕️ {appointment.doctorName}</h4>
              <p><strong>Date:</strong> {appointment.date}</p>
              <p><strong>Time:</strong> {appointment.time}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f4f7fa',
    minHeight: '100vh',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '1.5rem',
    color: '#2a2a72',
  },
  loading: {
    textAlign: 'center',
    fontSize: '18px',
    color: '#555',
  },
  error: {
    textAlign: 'center',
    color: 'red',
    fontWeight: 'bold',
    fontSize: '16px',
  },
  noData: {
    textAlign: 'center',
    color: '#666',
    fontSize: '16px',
  },
  cardContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '1rem',
  },
  card: {
    backgroundColor: '#fff',
    padding: '1rem',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    transition: 'transform 0.3s ease',
  },
  cardTitle: {
    marginBottom: '0.5rem',
    color: '#1f3c88',
  },
};

export default PatientAppointmentList;
