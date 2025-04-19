import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const DoctorAppointmentList = () => {
  const location = useLocation();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const patientPhno = location.state?.phno;
  const {id} = useParams()
  useEffect(() => {
    const fetchAppointments = async () => {
      if (!id) {
        setError("No doctor id.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.post(
          `https://globalnewtrading.com:8443/HealthApp/api/doctorApointments?doctorId=${id}`,
          {}, // empty body
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              certificateID: "87CB817F-4F93-42E3-BF86-C260B0A27966",
            },
            validateStatus: (status) => true, // <-- allows custom handling of 404
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
    <div>
      <h3>Appointments</h3>

      {loading && <p>Loading appointments...</p>}

      {!loading && error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && appointments.length === 0 && (
        <p>No appointments found.</p>
      )}

      {!loading && appointments.length > 0 && (
        <ul>
          {appointments.map((appointment, index) => (
            <li key={index}>
              <strong>Doctor:</strong> {appointment.doctorName} <br />
              <strong>Date:</strong> {appointment.date} <br />
              <strong>Time:</strong> {appointment.time} <br />
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DoctorAppointmentList;
