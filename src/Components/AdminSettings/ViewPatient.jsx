import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
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
import { Avatar } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate, Link } from "react-router-dom";
const ViewPatient = () => {
  const [patients, setpatients] = useState([]); // State to store the list of patients
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to handle errors
  const { id } = useParams();
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.post(
          "https://globalnewtrading.com:8443/HealthApp/api/getPatients",
          {}, // Request payload
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              certificateID: "87CB817F-4F93-42E3-BF86-C260B0A27966",
            },
          }
        );

        // Make sure to default to an empty array if data is undefined
        setpatients(response.data.data || []);
      } catch (err) {
        console.error("API error:", err);
        setError(err.response?.data?.message || "Failed to fetch patients");
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  // Conditional rendering based on loading or error state
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <Typography variant="h6" sx={{ textAlign: "center", mt: 4 }}>
        patients List
      </Typography>
      <Grid container justifyContent="center" spacing={2}>
        {patients.length > 0 ? (
          patients.map((doctor, index) => (
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
                <Avatar
                  sx={{
                    width: 120,
                    height: 120,
                    bgcolor: "#ccc",
                  }}
                >
                  <PersonIcon sx={{ fontSize: 60 }} />
                </Avatar>

                {/* Doctor Details */}
                <Box sx={{ flex: 1, mx: 2 }}>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", color: "#28a745", mb: 1 }}
                  >
                    {doctor.patientName || "patient. Name"}
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
                    {doctor.patientType || "N/A"}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 0.5 }}>
                    <strong>bloodGroup:</strong> {doctor.bloodGroup || "A+"}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 0.5 }}>
                    <strong>Speaks:</strong> {doctor.languages || "English"}
                  </Typography>
                </Box>

                {/* Doctor Hospital and Other Details */}
                <Box sx={{ textAlign: "left", flex: 1, mx: 2 }}>
                  <Typography variant="body2" sx={{ mb: 0.5 }}>
                    <strong>addressProof:</strong>{" "}
                    {doctor.addressProof || "LIG Global"}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 0.5 }}>
                    <strong>Location:</strong> `{doctor.country},{" "}
                    {doctor.state || "Dr. Name"}`
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 0.5 }}>
                    <strong>joined on:</strong> {doctor.dateOfRegistration}
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{
                      textTransform: "none",
                      backgroundColor: "#28a745",
                      "&:hover": { backgroundColor: "#218838" },
                    }}
                  >
                    Edit Patient
                  </Button>
                  <Link to={`/admin-home/patientsList/${doctor.patientId}`}>
                    <Button
                      variant="contained"
                      sx={{
                        textTransform: "none",
                        marginLeft: "10px",
                        backgroundColor: "#28a745",
                        "&:hover": { backgroundColor: "#218838" },
                      }}
                    >
                      view Patient
                    </Button>
                  </Link>
                </Box>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="h6" sx={{ textAlign: "center", mt: 4 }}>
            No patients available at the moment.
          </Typography>
        )}
      </Grid>
    </>
  );
};

export default ViewPatient;
