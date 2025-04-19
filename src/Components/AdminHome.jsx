import React from 'react';
import { Container, Typography, Box, Button, Grid, Card, CardContent, CardMedia } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Importing images
import AddDoctor from "../images/icons8-medical-doctor-80.png";
import AddPharmacy from "../images/icons8-pharmacy-shop-50.png";
import AddDiagnostics from "../images/icons8-diagnostics-50.png";
import viewPatient from "../images/icons8-patient-50.png";
import manageProducts from "../images/icons8-manage-products-64.png";
import orders from "../images/icons8-bulk-orders-50.png";
import customers from "../images/icons8-customers-50.png";
import settings from "../images/icons8-settings-50.png";

const AdminHome = () => {
  const navigate = useNavigate();

  // Function to handle logout
  const handleLogout = () => {
    // Perform any logout logic (e.g., clearing tokens)
    navigate('/'); // Redirect to the homepage after logout
  };

  // Data for the cards with imported images
  const cardData = [
    { title: 'Add Doctor', image: AddDoctor, link: '/admin-home/AddDoctor' },
    { title: 'Add Pharmacy', image: AddPharmacy, link: '/admin-home/AddPharmacy' },
    { title: 'Add Diagnostics Center', image: AddDiagnostics, link: '/admin-home/AddDiagnosticsCenter' },
    { title: 'View Patient', image: viewPatient, link: '/admin-home/viewPatient' },
    { title: 'Add Patient', image: manageProducts, link: '/admin-home/Addpatient' },
    { title: 'Orders', image: orders, link: '/admin-home/Orders' },
    { title: 'View Doctor', image: customers, link: '/admin-home/doctorsList' },
    { title: 'Settings', image: settings, link: '/admin-home/Settings' },
  ];

  return (
    <Container maxWidth="lg" sx={{ marginTop: '2rem', marginBottom: '2rem'}}>
      {/* Admin Home Page Header */}
      <Box
        sx={{
          backgroundColor: '#e3f2fd',
          padding: '2rem',
          borderRadius: '8px',
          marginBottom: '2rem',
        }}
      >
        <Typography variant="h4" color="primary" gutterBottom>
          Welcome to Admin Dashboard
        </Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          Manage your system, users, and data here. You can navigate through different sections of the admin panel using the options below.
        </Typography>
      </Box>

      {/* Admin Cards Section */}
      <Grid container spacing={2}>
        {cardData.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ backgroundColor: '#42a5f5', color: 'white', textAlign: 'center' }}>
              <CardMedia
                component="img"
                height="140"
                image={card.image}
                alt={card.title}
                sx={{ objectFit: 'contain', padding: '1rem' }}
              />
              <CardContent>
                <Typography variant="h6" color="inherit" gutterBottom>
                  {card.title}
                </Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  fullWidth
                  onClick={() => navigate(card.link)} // Navigate dynamically based on card's link
                >
                  Go to {card.title}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default AdminHome;
