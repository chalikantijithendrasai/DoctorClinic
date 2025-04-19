import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Grid,
  CircularProgress,
} from "@mui/material";
import { useNavigate,Link } from "react-router-dom";
import axios from "axios";

const ListDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,setError] = useState(null);
  const navigate = useNavigate
  useEffect(() => {
    // Fetch the doctor's list when the component loads
    const fetchDoctors = async () => {
      try {
        const response = await axios.post(
          "https://globalnewtrading.com:8443/HealthApp/api/getAllDoctors",
          {}, // Empty request body if needed, or remove if not required
          {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              certificateID: '87CB817F-4F93-42E3-BF86-C260B0A27966'
            }
          }
        );
        console.log("res",response);
        
        // Update state with fetched data
        setDoctors(response.data.data || []); 
        setLoading(false);
      } catch (error) {
        console.error("Error fetching doctor's list:", error);
        // Optionally set error state
        setError("Failed to fetch doctors. Please try again later.");
        setLoading(false);
      }
    };
  
    fetchDoctors();
  }, []);


  const handleViewDoctor = (id) => {
    navigate(`/admin-home/doctorsList/${id}`);
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      {" "}
      <Typography variant="h6" sx={{ textAlign: "center", mt: 4 }}>
        Doctors List
      </Typography>
      <Grid container justifyContent="center" spacing={2}>
        {doctors.length > 0 ? (
          doctors.map((doctor, index) => (
            <Grid item xs={12} sm={10} md={8} key={index}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  justifyContent: "space-between",
                  alignItems: "center",
                  p: 2,
                  mb: 2,
                  mt: 5,
                  boxShadow: 2,
                  borderRadius: 2,
                  backgroundColor: "#f9f9f9",
                }}
              >
                {/* Doctor Image */}
                <CardMedia
                  component="img"
                  sx={{
                    width: 120,
                    height: 120,
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                  image="https://virtualsteth.com/assets/images/doctor_male.jpg" // Path to the static image
                  alt="Doctor"
                />

                {/* Doctor Details */}
                <Box sx={{ flex: 1, mx: 2 }}>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", color: "#28a745", mb: 1 }}
                  >
                    {doctor.doctorFirstName.concat(doctor.doctorLastName) ||
                      "Dr. Name"}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      display: "inline-block",
                      backgroundColor: "#28a745",
                      color: "#fff",
                      borderRadius: 1,
                      px: 1.5,
                      py: 0.5,
                      mb: 1,
                      mt: 5,
                      fontSize: "0.85rem",
                    }}
                  >
                    {doctor.experience || "N/A"} Yrs Exp
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 0.5 }}>
                    <strong>Specialization:</strong>{" "}
                    {doctor.speciality || "General Medicine"}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 0.5 }}>
                    <strong>Speaks:</strong> {doctor.languages || "English"}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 0.5 }}>
                    <strong>Available:</strong>{" "}
                    {doctor.availability || "Mon, Tue, Wed, Thu, Fri, Sat, Sun"}
                  </Typography>
                </Box>

                {/* Doctor Hospital and Other Details */}
                <Box sx={{ textAlign: "left", flex: 1, mx: 2 }}>
                  <Typography variant="body2" sx={{ mb: 0.5 }}>
                    <strong>Hospital:</strong> {doctor.hospital || "LIG Global"}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 0.5 }}>
                    <strong>Location:</strong> `{doctor.country},{" "}
                    {doctor.state || "Dr. Name"}`
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 0.5 }}>
                    <strong>joined on:</strong> {doctor.dateOfRegistration}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Charges:</strong>{" "}
                    {doctor.doctorFee !== undefined
                      ? `$${doctor.doctorFee}`
                      : "$0"}
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{
                      textTransform: "none",
                      backgroundColor: "#28a745",
                      "&:hover": { backgroundColor: "#218838" },
                    }}
                  >
                    Edit Doctor
                  </Button>
                  <Link to={`/admin-home/doctorsList/${doctor.doctorId}`}>
                  <Button
                    variant="contained"
                    sx={{
                      textTransform: "none",
                      marginLeft: "10px",
                      backgroundColor: "#28a745",
                      "&:hover": { backgroundColor: "#218838" },
                    }}
                  >
                    view Doctor
                  </Button>
                  </Link>
                </Box>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="h6" sx={{ textAlign: "center", mt: 4 }}>
            No doctors available at the moment.
          </Typography>
        )}
      </Grid>
    </>
  );
};

export default ListDoctors;
