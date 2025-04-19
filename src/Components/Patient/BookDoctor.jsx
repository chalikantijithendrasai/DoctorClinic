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
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const BookDoctor = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [specializationFilter, setSpecializationFilter] = useState("");
  const [feeSort, setFeeSort] = useState("");

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.post(
          "https://globalnewtrading.com:8443/HealthApp/api/getAllDoctors",
          {},
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              certificateID: "87CB817F-4F93-42E3-BF86-C260B0A27966",
            },
          }
        );
        const doctorsData = response.data.data || [];
        setDoctors(doctorsData);
        setFilteredDoctors(doctorsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching doctor's list:", error);
        setError("Failed to fetch doctors. Please try again later.");
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  // 🧠 Filter logic
  useEffect(() => {
    let filtered = [...doctors];

    // Search
    if (searchTerm) {
      filtered = filtered.filter((doctor) =>
        `${doctor.doctorFirstName} ${doctor.doctorLastName}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
    }

    // Gender
    if (genderFilter) {
      filtered = filtered.filter(
        (doctor) =>
          doctor.gender?.toLowerCase() === genderFilter.toLowerCase()
      );
    }

    // Specialization
    if (specializationFilter) {
      filtered = filtered.filter(
        (doctor) =>
          doctor.speciality?.toLowerCase() ===
          specializationFilter.toLowerCase()
      );
    }

    // Fee sorting
    if (feeSort === "lowToHigh") {
      filtered.sort((a, b) => (a.doctorFee || 0) - (b.doctorFee || 0));
    } else if (feeSort === "highToLow") {
      filtered.sort((a, b) => (b.doctorFee || 0) - (a.doctorFee || 0));
    }

    setFilteredDoctors(filtered);
  }, [searchTerm, genderFilter, specializationFilter, feeSort, doctors]);

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
      <Typography variant="h6" sx={{ textAlign: "center", mt: 4 }}>
        Doctors List
      </Typography>

      {/* 🔍 Search and Filters */}
      <Grid container spacing={2} justifyContent="center" sx={{ p: 2 }}>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            label="Search by Name"
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <FormControl fullWidth>
            <InputLabel>Gender</InputLabel>
            <Select
              value={genderFilter}
              onChange={(e) => setGenderFilter(e.target.value)}
              label="Gender"
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth>
            <InputLabel>Specialization</InputLabel>
            <Select
              value={specializationFilter}
              onChange={(e) => setSpecializationFilter(e.target.value)}
              label="Specialization"
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="dentist">Dentist</MenuItem>
              <MenuItem value="cardiologist">Cardiologist</MenuItem>
              <MenuItem value="dermatologist">Dermatologist</MenuItem>
              <MenuItem value="orthopedic">Orthopedic</MenuItem>
              <MenuItem value="pediatrician">Pediatrician</MenuItem>
              <MenuItem value="consultant">Consultant</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <FormControl fullWidth>
            <InputLabel>Sort Fee</InputLabel>
            <Select
              value={feeSort}
              onChange={(e) => setFeeSort(e.target.value)}
              label="Sort Fee"
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="lowToHigh">Low to High</MenuItem>
              <MenuItem value="highToLow">High to Low</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/* 🧾 Doctors List */}
      <Grid container justifyContent="center" spacing={2}>
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doctor, index) => (
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
                <CardMedia
                  component="img"
                  sx={{
                    width: 120,
                    height: 120,
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                  image="https://virtualsteth.com/assets/images/doctor_male.jpg"
                  alt="Doctor"
                />
                <Box sx={{ flex: 1, mx: 2 }}>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", color: "#28a745", mb: 1 }}
                  >
                    {`${doctor.doctorFirstName} ${doctor.doctorLastName}` ||
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
                  <Typography variant="body2">
                    <strong>Qualification:</strong>{" "}
                    {doctor.doctorQualification || "General Medicine"}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Speaks:</strong> {doctor.languages || "English"}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Available:</strong>{" "}
                    {doctor.availability ||
                      "Mon, Tue, Wed, Thu, Fri, Sat, Sun"}
                  </Typography>
                </Box>

                <Box sx={{ textAlign: "left", flex: 1, mx: 2 }}>
                  <Typography variant="body2">
                    <strong>Hospital:</strong> {doctor.hospital || "LIG Global"}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Location:</strong> {doctor.country},{" "}
                    {doctor.state || ""}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Joined on:</strong> {doctor.dateOfRegistration}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Consultaton Fee:</strong>{" "}
                    {doctor.doctorFee !== undefined
                      ? `$${doctor.doctorFee}`
                      : "$0"}
                  </Typography>
                  <Link to={`/bookappointment/${doctor.doctorId}`}>
                  <Button
                    variant="contained"
                    sx={{
                      textTransform: "none",
                      backgroundColor: "#28a745",
                      "&:hover": { backgroundColor: "#218838" },
                    }}
                  >
                    Book Appointment
                  </Button>
                  </Link>
                  <Link to={`/doctorsList/${doctor.doctorId}`}>
                    <Button
                      variant="contained"
                      sx={{
                        textTransform: "none",
                        marginLeft: "10px",
                        backgroundColor: "#28a745",
                        "&:hover": { backgroundColor: "#218838" },
                      }}
                    >
                      View Doctor
                    </Button>
                  </Link>
                </Box>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="h6" sx={{ textAlign: "center", mt: 4 }}>
            No doctors available based on current filters.
          </Typography>
        )}
      </Grid>
    </>
  );
};

export default BookDoctor;
