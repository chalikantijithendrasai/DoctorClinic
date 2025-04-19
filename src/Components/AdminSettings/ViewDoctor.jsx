import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Box, Button, Avatar, Chip, Grid } from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from "axios";

const ViewDoctor = () => {
  const [doctors, setDoctors] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();  // Destructure id from useParams

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `https://globalnewtrading.com:8443/HealthApp/api/getDoctorById?doctorId=${id}`,
          {}, // POST body (empty in this case)
          {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              certificateID: '87CB817F-4F93-42E3-BF86-C260B0A27966',
            },
          }
        );
  
        setDoctors(response.data.data || {});
        setLoading(false);
      } catch (error) {
        console.error("Error fetching doctor's details:", error);
        setError(
          error.response?.data?.message || "Failed to fetch doctor details"
        );
        setLoading(false);
      }
    };
  
    fetchData();
  }, [id]);  // Ensure that the effect runs again if the id changes

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (!doctors) {
    return <Typography>No doctor data found</Typography>;
  }

  return (
     <Grid item xs={12} sm={10} md={8} sx={{marginTop:"20px",marginBottom:"20px"}}>
    <Card
      sx={{
        maxWidth: 600,
        margin: "auto",
        borderRadius: 4,
        boxShadow: 3,
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#1976d2",
          padding: 2,
          textAlign: "center",
          color: "white",
        }}
      >
        <Avatar
          alt={doctors.name}
          src="https://virtualsteth.com/assets/images/doctor_male.jpg" // Replace with actual avatar URL
          sx={{
            width: 100,
            height: 100,
            margin: "auto",
            marginBottom: 2,
          }}
        />
        <Typography variant="h6">{doctors.doctorFirstName}{doctors.doctorLastName}</Typography>
        <Typography variant="subtitle2">{doctors.speciality}</Typography>
      </Box>
      <CardContent>
        <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 1 }}>
          <strong>Qualifications:</strong> {doctors.doctorQualification}
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 1 }}>
          <strong>Experience:</strong> 6 years
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 1 }}>
          <strong>Languages:</strong> {doctors.languages?.join(", ")}
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 1 }}>
          <strong>Gender:</strong> {doctors.gender}
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 1 }}>
          <strong>Fee:</strong> {doctors.doctorFee}
        </Typography>
        <Box sx={{ marginBottom: 2 }}>
          <strong>Specialties:</strong>
          <Grid container spacing={1} sx={{ marginTop: 1 }}>
              <Grid>
                <Chip label={doctors.speciality} color="primary" />
              </Grid>
          </Grid>
        </Box>
        <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 1 }}>
          <strong>Hospital:</strong> {doctors.hospital}
        </Typography>
        <Box
          sx={{
            marginTop: 2,
            padding: 2,
            backgroundColor: "#f5f5f5",
            borderRadius: 2,
          }}
        >
          <Typography variant="body2" sx={{ marginBottom: 1 }}>
            <strong>Phone:</strong> {doctors.emergencyContact}
          </Typography>
          <Typography variant="body2" sx={{ marginBottom: 1 }}>
            <strong>Email:</strong> {doctors.email}
          </Typography>
          <Typography variant="body2">
            <strong>Address:</strong> `{doctors.country},{" "}
            {doctors.state || "Dr. Name"}`
          </Typography>
        </Box>
      </CardContent>
    </Card>
    </Grid>
  );
};

export default ViewDoctor;
