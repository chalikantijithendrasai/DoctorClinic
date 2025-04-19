import React from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
} from "@mui/material";
import doct1 from "../images/01.png"
import doct3 from "../images/03.png"

const cardData = [
  {
    title: "CARDIOLOGIST",
    img: "https://virtualsteth-prod.s3.amazonaws.com/vs/Icons/I_12-01-2020_034.png",
  },
  {
    title: "General Physician",
    img: "https://virtualsteth-prod.s3.amazonaws.com/vs/Icons/I_09-14-2021_PHYSICIAN.png",
  },
  {
    title: "AYURVEDA",
    img: "https://virtualsteth-prod.s3.amazonaws.com/vs/Icons/I_12-29-2020_Fever.png",
  },
  {
    title: "Fever",
    img: "https://virtualsteth-prod.s3.amazonaws.com/vs/Icons/I_12-01-2020_094.png",
  },
  {
    title: "Allergies",
    img: "https://virtualsteth-prod.s3.amazonaws.com/vs/Icons/I_12-01-2020_074.png",
  },
  {
    title: "Diabetes",
    img: "https://virtualsteth-prod.s3.amazonaws.com/vs/Icons/I_12-01-2020_035.png",
  },
  {
    title: "Anemia",
    img: "https://virtualsteth-prod.s3.amazonaws.com/vs/Icons/I_12-28-2020_padetracian.png",
  },
  {
    title: "Pediatrician",
    img: "https://virtualsteth-prod.s3.amazonaws.com/vs/Icons/I_12-28-2020_padetracian.png",
  },
  {
    title: "General Medicine",
    img: "https://virtualsteth-prod.s3.amazonaws.com/vs/Icons/I_12-01-2020_080.png",
  },
];

const HomePage = () => {
  return (
    <Container maxWidth="lg" sx={{ marginTop: "2rem" }}>
      {/* Banner Section */}
      <Box
        sx={{
          backgroundColor: "#e3f2fd",
          padding: "2rem",
          borderRadius: "8px",
          marginBottom: "2rem",
        }}
      >
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={12} md={4}>
            <img
              src="https://virtualsteth.com/assets/images/doc-1.png"
              alt="Doctor 1"
              style={{
                width: "100%",
                maxWidth: "300px",
                display: "block",
                margin: "0 auto",
              }}
            />
          </Grid>
          <Grid item xs={12} md={4} textAlign="center">
            <Typography variant="h4" color="primary" gutterBottom>
              Connect with your doctor, anytime, anywhere
            </Typography>
            <Typography variant="body1" color="textSecondary" gutterBottom>
              Consult Online Doctors Now
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Consult with your doctor over a private video/audio call from the
              convenience of your home.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <img
              src={doct1}
              alt="Doctor 2"
              style={{
                width: "100%",
                maxWidth: "300px",
                display: "block",
                margin: "0 auto",
              }}
            />
          </Grid>
        </Grid>
      </Box>

         {/* What We Do Section */}
         <Typography variant="h4" gutterBottom>
        What we do?
      </Typography>
      <Typography variant="body1" gutterBottom>
        We Provide Best Services For Patients:
      </Typography>
      <ul>
        <li>
          <Typography variant="body1">
            <strong>Meet doctors online:</strong> Anywhere, anytime. The best
            modern healthcare at your fingertips. Avoid queues and book
            instantly!
          </Typography>
        </li>
        <li>
          <Typography variant="body1">
            <strong>World’s best doctors:</strong> Available online. DIGITAL
            CLINIC reduces your waiting time and lets you connect with your
            doctor quickly.
          </Typography>
        </li>
        <li>
          <Typography variant="body1">
            <strong>Instant online booking:</strong> Search nearby doctors and
            book appointments instantly based on your location.
          </Typography>
        </li>
      </ul>
      <Button variant="contained" color="primary" sx={{ marginTop: "1rem" }}>
        Book Doctor Appointment Now
      </Button>

      {/* Card Section */}
      <Box sx={{ marginTop: "2rem" }}>
        <Typography variant="h4" gutterBottom>
          Our Services
        </Typography>
        <Grid container spacing={3}>
          {cardData.map((card, index) => (
            <Grid item xs={6} sm={4} md={2.4} key={index}>
              <Card
                sx={{
                  textAlign: "center",
                  padding: "1rem",
                  borderRadius: "8px",
                  boxShadow: 3,
                }}
              >
                <Box
                  sx={{
                    backgroundColor: "#e3f2fd", // Background color for the container
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "1rem", // Optional padding around the image
                    borderRadius: "8px", // Optional border radius for rounded corners
                  }}
                >
                  <CardMedia
                    component="img"
                    height="100"
                    image={card.img}
                    alt={card.title}
                    sx={{ objectFit: "contain" }} // Ensures the image fits nicely within the container
                  />
                </Box>

                <CardContent>
                  <Typography variant="body1" color="textPrimary">
                    {card.title}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Typography
  variant="subtitle2"
  color="textSecondary"
  display="flex"
  paddingTop="10px"
  justifyContent="center"
  alignItems="center"
  gutterBottom
  sx={{ fontSize: "0.9rem", fontWeight: "bold" }}
>
  We made it simple
</Typography>
<Typography
  variant="h5"
  color="primary"
  display="flex"
  justifyContent="center"
  alignItems="center"
  gutterBottom
  sx={{ fontWeight: "bold" }}
>
  Discover the online appointment!
</Typography>
<Typography
  variant="body1"
  color="textSecondary"
  display="flex"
  justifyContent="center"
  alignItems="center"
  sx={{ color: "gray" }}
>
  Virtual Steth gives you a live private connection to your doctor from anywhere in the world.
</Typography>


      {/* Welcome Section */}
      <Box
  sx={{
    backgroundColor: "#f9f9f9",
    padding: "2rem",
    borderRadius: "8px",
    marginBottom: "2rem",
  }}
>
  <Grid container alignItems="center" spacing={2}>
    {/* Left Text Section */}
    <Grid item xs={12} md={8}>
      <Typography variant="h3" color="primary" gutterBottom>
        Welcome To DIGITAL CLINIC
      </Typography>
      <Typography variant="body1" color="textSecondary" gutterBottom>
        Online doctor consultation in Hyderabad. Connect with your personal
        doctors—both primary care and specialists over HD video, voice, or text
        chats from anywhere & anytime.
      </Typography>
      <Typography variant="body1" color="textSecondary">
        <strong>Meet doctor online anywhere anytime:</strong> The best modern
        healthcare at your fingertips. Avoid queues. Book instantly now!
      </Typography>
      <Typography variant="body1" color="textSecondary">
        <strong>World’s best doctors available online:</strong> Virtual Steth
        reduces your waiting time in queues and lets you connect with your
        doctor quickly.
      </Typography>
      <Typography variant="body1" color="textSecondary">
        <strong>Instant online book appointment:</strong> Search nearby doctors
        and book appointments online instantly based on your location.
      </Typography>
    </Grid>

    {/* Right Image Section */}
    <Grid item xs={12} md={4}>
      <img
        src={doct3}
        alt="Doctor"
        style={{
          width: "100%",
          maxWidth: "300px",
          borderRadius: "8px",
          display: "block",
          margin: "0 auto",
        }}
      />
    </Grid>
  </Grid>
</Box>


   
    </Container>
  );
};

export default HomePage;
