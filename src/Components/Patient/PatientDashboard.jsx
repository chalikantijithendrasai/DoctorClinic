import React from "react";
import { Box, Typography, Grid, Avatar, Paper, Container } from "@mui/material";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import EventNoteIcon from "@mui/icons-material/EventNote";
import MedicationIcon from "@mui/icons-material/Medication";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import DescriptionIcon from "@mui/icons-material/Description";
import BiotechIcon from "@mui/icons-material/Biotech"; // Replacement for Diagnostics
import GroupIcon from "@mui/icons-material/Group";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { Phone } from "@mui/icons-material";
const features = [
  {
    icon: <MedicalServicesIcon fontSize="large" />,
    label: "Book a Doctor\nAppointment",
  },
  {
    icon: <MedicationIcon fontSize="large" />,
    label: "Buy medicines\n& Essentials",
  },
  { icon: <VaccinesIcon fontSize="large" />, label: "Book Lab Tests" },
  { icon: <DescriptionIcon fontSize="large" />, label: "View Health\nRecords" },
  { icon: <EventNoteIcon fontSize="large" />, label: "View Appointments" },
];

const healthCompanions = [
  { icon: <DescriptionIcon fontSize="large" />, label: "Prescriptions" },
  { icon: <GroupIcon fontSize="large" />, label: "Add Dependents" },
  { icon: <ShoppingBagIcon fontSize="large" />, label: "My Orders" },
  { icon: <BiotechIcon fontSize="large" />, label: "Diagnostics Reports" },
  { icon: <GroupIcon fontSize="large" />, label: "Dependents" },]

const PatientDashboard = () => {
  const [patients, setpatients] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

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
  }, [id]);
  return (
    <Container maxWidth="lg" sx={{ mt: 2, pb: 10 }}>
      {/* Header */}
      <Box sx={{ textAlign: "center", mb: 3 }}>
        <Typography variant="h4" fontWeight="bold" color="primary">
          Hii {patients?.patientName}
        </Typography>
        <Typography variant="subtitle1">
          Always Caring About Your Health, We Are Here To Help You
        </Typography>
      </Box>

      {/* Features */}
      <Grid container spacing={3} justifyContent="center" alignItems="stretch">
  {features.map((feature, index) => (
    <Grid item xs={4} sm={3} md={2} key={index} sx={{ display: 'flex' }}>
      <Paper
        elevation={3}
        sx={{
          p: 2,
          textAlign: 'center',
          borderRadius: 2,
          cursor:"pointer",
          flex: 1,              // Make Paper fill the height of Grid item
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center', // Optional: Center vertically
        }}
        onClick={() => {
          if (feature.label.includes("Book a Doctor")) {
            navigate("/bookingdoctor");
          } else if (feature.label.includes("View Appointments")) {
            const userData = JSON.parse(localStorage.getItem("userData"));
            const phone = userData?.userResponse?.mobileno;
    
            navigate("/patientAppointments", { state: { phno: phone } });
          }
        }}
      >
        <Avatar sx={{ bgcolor: 'primary.main', mx: 'auto', mb: 1 }}>
          {feature.icon}
        </Avatar>
        <Typography variant="body2" whiteSpace="pre-line">
          {feature.label}
        </Typography>
      </Paper>
    </Grid>
  ))}
</Grid>


      {/* Health Companion Section */}
      <Box mt={5}>
        <Typography variant="h6" fontWeight="bold" mb={2}>
          Health Companion
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {healthCompanions.map((item, index) => (
            <Grid item xs={4} sm={3} md={2} key={index}>
              <Paper
                elevation={2}
                sx={{ p: 2, textAlign: "center", borderRadius: 2 }}
              >
                <Avatar sx={{ bgcolor: "secondary.main", mx: "auto", mb: 1 }}>
                  {item.icon}
                </Avatar>
                <Typography variant="body2" align="center">
                  {item.label}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Footer Logo */}
      <Box mt={6} display="flex" justifyContent="center">
        <img
          src="	https://digitalclinicbucket.s3.ap-south-1.amazonaws.com/digitalclinic.jpeg"
          alt="Umor Medical Practice"
          style={{ maxWidth: "100%", height: "500px" }}
        />
      </Box>
    </Container>
  );
};

export default PatientDashboard;
