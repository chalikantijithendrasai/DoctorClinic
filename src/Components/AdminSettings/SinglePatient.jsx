import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Avatar,
  Chip,
  Grid,
} from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
import PersonIcon from "@mui/icons-material/Person";
const SinglePatient = () => {
  const [patients, setpatients] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams(); // Destructure id from useParams

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.post(
          `https://globalnewtrading.com:8443/HealthApp/api/getPatientById?patientId=${id}`,
          {}, // empty body for POST
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              certificateID: "87CB817F-4F93-42E3-BF86-C260B0A27966",
            },
          }
        );
  
        setpatients(response.data.data || []);
      } catch (err) {
        console.error("Failed to fetch patient:", err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchPatients();
  }, [id]); // include `id` as a dependency if it's dynamic
   // Ensure that the effect runs again if the id changes

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (!patients) {
    return <Typography>No patient data found</Typography>;
  }

  return (
    <Grid
      item
      xs={12}
      sm={10}
      md={8}
      sx={{ marginTop: "20px", marginBottom: "20px" }}
    >
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
            alt={patients.patientName}
           sx={{
              width: 100,
              height: 100,
              margin: "auto",
              marginBottom: 2,
            }}
          > <PersonIcon sx={{ fontSize: 60 }} /></Avatar>
          <Typography variant="h6">{patients.patientName}</Typography>
          <Typography variant="subtitle2">{patients.patientType}</Typography>
        </Box>
        <CardContent>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ marginBottom: 1 }}
          >
            <strong>bloodGroup:</strong> {patients.bloodGroup}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ marginBottom: 1 }}
          >
            <strong>dateOfBirth:</strong>
            {patients.dateOfBirth}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ marginBottom: 1 }}
          >
            <strong>joiningDate:</strong> {patients.dateOfRegistration}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ marginBottom: 1 }}
          >
            <strong>Gender:</strong> {patients.gender}
          </Typography>
          <Box sx={{ marginBottom: 2 }}>
            <strong>dependentFor:</strong>
            <Grid container spacing={1} sx={{ marginTop: 1 }}>
              <Grid>
                <Chip label={patients.dependentFor} color="primary" />
              </Grid>
            </Grid>
          </Box>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ marginBottom: 1 }}
          >
            <strong>addressProof:</strong> {patients.addressProof}
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
              <strong>Phone:</strong> {patients.emergencyContact}
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: 1 }}>
              <strong>Email:</strong> {patients.email}
            </Typography>
            <Typography variant="body2">
              <strong>Address:</strong> `{patients.country},{" "}
              {patients.state || "Dr. Name"}`
            </Typography>
            <Typography variant="body2">
              <strong>secondaryPhone:</strong> `{patients.secondaryPhone},{" "}
              {patients.state || "Dr. Name"}`
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default SinglePatient;
