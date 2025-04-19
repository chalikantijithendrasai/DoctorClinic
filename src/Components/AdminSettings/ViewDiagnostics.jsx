
import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Box, Button, Avatar, Chip, Grid } from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from "axios";

const ViewDiagnostics = () => {
  const [doctors, setDoctors] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();  // Destructure id from useParams

  useEffect(() => {
    // Simulate fetching data from an API
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `/healthapp/v1/getDiagnostic?id=${id}&entityName=DigitalHealth` // Ensure correct URL
        );
        setDoctors(response?.data?.data || {}); // Update state with fetched data
        console.log("doctorsss",response?.data?.data);
        
      } catch (error) {
        console.error("Error fetching doctor's list:", error);
      } finally {
        setLoading(false); // Stop loading in both success and error cases
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
          alt={doctors?.diagnosticCenterName}
          src="https://virtualsteth.com/assets/images/doctor_male.jpg" // Replace with actual avatar URL
          sx={{
            width: 100,
            height: 100,
            margin: "auto",
            marginBottom: 2,
          }}
        />
         <Typography variant="h6" color="textSecondary" sx={{ marginBottom: 1 }}>
          <strong>Name:</strong> {doctors.diagnosticCenterName}
        </Typography>
      </Box>
      <CardContent>
        <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 1 }}>
          <strong>gstNo:</strong> {doctors.gstNo}
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 1 }}>
          <strong>Experience:</strong> 6 years
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 1 }}>
          <strong>Registration:</strong> {doctors.dateOfDiagnosticCenterRegistration}
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 1 }}>
          <strong>pincode:</strong> {doctors.pincode}
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
            <strong>Phone:</strong> {doctors.diagnosticCenterPrimaryPhone}
          </Typography>
          <Typography variant="body2" sx={{ marginBottom: 1 }}>
            <strong>Email:</strong> {doctors.diagnosticCenterEmail}
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

export default ViewDiagnostics;
