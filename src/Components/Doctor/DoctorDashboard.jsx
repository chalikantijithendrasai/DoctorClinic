import React, { useState, useEffect, useRef } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Grid,
  Paper,
  BottomNavigation,
  BottomNavigationAction,
  Avatar,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AssignmentIcon from "@mui/icons-material/Assignment";
import GroupIcon from "@mui/icons-material/Group";
import { useParams } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";
import InfoIcon from "@mui/icons-material/Info";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import BloodtypeIcon from "@mui/icons-material/Bloodtype";
import PeopleIcon from "@mui/icons-material/People";
import HomeIcon from "@mui/icons-material/Home";
import BarChartIcon from "@mui/icons-material/BarChart";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const actionButtons = [
  { icon: <CalendarTodayIcon />, label: "View Appointments" },
  { icon: <AssignmentIcon />, label: "Add/Cancel Sessions" },
  { icon: <GroupIcon />, label: "Get Patient Details" },
  { icon: <PersonIcon />, label: "Edit Doctor" },
  { icon: <EventAvailableIcon />, label: "Schedule Appointment" },
];

const healthCompanions = [
  { icon: <LocalPharmacyIcon />, label: "Add Pharmacy" },
  { icon: <LocalPharmacyIcon />, label: "Edit Pharmacy" },
  { icon: <InfoIcon />, label: "Pharmacy Details" },
  { icon: <MedicalServicesIcon />, label: "Add Diagnostic Center" },
  { icon: <MedicalServicesIcon />, label: "Edit Diagnostic Center" },
  { icon: <BloodtypeIcon />, label: "Add Blood bank" },
  { icon: <BloodtypeIcon />, label: "View Blood bank" },
  { icon: <PeopleIcon />, label: "Add Donor" },
  { icon: <PeopleIcon />, label: "View Donor" },
  { icon: <PeopleIcon />, label: "Add Recipients" },
  { icon: <PeopleIcon />, label: "View Recipients" },
];

const DoctorDashboard = () => {
  const [value, setValue] = React.useState(0);
  const [doctors, setDoctors] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const sliderRef = useRef(null);
const navigate = useNavigate()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `https://globalnewtrading.com:8443/HealthApp/api/getDoctorById?doctorId=${id}`,
          {},
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              certificateID: "87CB817F-4F93-42E3-BF86-C260B0A27966",
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
  }, [id]);

  // Custom arrow components
  const NextArrow = (props) => {
    const { onClick } = props;
    return (
      <Button
        onClick={onClick}
        sx={{
          position: "absolute",
          right: "-30px",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 1,
          minWidth: "30px",
          width: "30px",
          height: "30px",
          borderRadius: "50%",
          backgroundColor: "rgba(0,0,0,0.5)",
          color: "white",
          "&:hover": {
            backgroundColor: "rgba(0,0,0,0.7)",
          },
        }}
      >
        <ArrowForwardIosIcon fontSize="small" />
      </Button>
    );
  };

  const PrevArrow = (props) => {
    const { onClick } = props;
    return (
      <Button
        onClick={onClick}
        sx={{
          position: "absolute",
          left: "-30px",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 1,
          minWidth: "30px",
          width: "30px",
          height: "30px",
          borderRadius: "50%",
          backgroundColor: "rgba(0,0,0,0.5)",
          color: "white",
          "&:hover": {
            backgroundColor: "rgba(0,0,0,0.7)",
          },
        }}
      >
        <ArrowBackIosIcon fontSize="small" />
      </Button>
    );
  };

  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 5000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Welcome Message */}
      <Box sx={{ textAlign: "center", p: 3 }}>
        <Typography variant="h4" fontWeight="bold" color="primary">
          Hii DR. {doctors?.doctorFirstName} {doctors?.doctorMiddleName}{" "}
          {doctors?.doctorLastName}
        </Typography>
        <Typography variant="body2">
          Empowering Your Practice, Together We Provide Exceptional Care.
        </Typography>
      </Box>

      {/* Main Actions */}
      <Grid container spacing={2} justifyContent="center" sx={{ p: 2 }}>
  {actionButtons.map((item, index) => (
    <Grid
      item
      xs={4}
      sm={2.4}
      key={index}
      onClick={() => {
        if (item.label?.includes("Schedule Appointment")) {
          navigate(`/addschedule/${doctors.doctorId}/${doctors.doctorFirstName}`,{ state: { doctorFee: doctors.doctorFee } });
        }
        else if(item.label?.includes("View Appointments")) {
            navigate(`/viewappointment/${doctors.doctorId}`);
          }
      }}
    >
      <Paper sx={{ p: 2, textAlign: "center", cursor: "pointer" }}>
        <Avatar sx={{ mx: "auto", mb: 1 }}>{item.icon}</Avatar>
        <Typography variant="body2">{item.label}</Typography>
      </Paper>
    </Grid>
  ))}
</Grid>


      {/* Health Companion Slider */}
      <Box sx={{ px: 4, py: 1, mb: 4, position: "relative" }}>
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          Health Companion
        </Typography>
        <Slider ref={sliderRef} {...sliderSettings}>
          {healthCompanions.map((item, index) => (
            <Box key={index} sx={{ px: 1 }}>
              <Paper
                sx={{
                  p: 2,
                  textAlign: "center",
                  height: "150px",
                  transition: "transform 0.3s",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: 3,
                  },
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: "#a5d6a7",
                    mx: "auto",
                    mb: 1,
                    color: "primary.main",
                  }}
                >
                  {item.icon}
                </Avatar>
                <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>
                  {item.label}
                </Typography>
              </Paper>
            </Box>
          ))}
        </Slider>
      </Box>

      {/* Logo / Banner */}
      <Box sx={{ textAlign: "center", p: 4 }}>
        <img
          src="https://digitalclinicbucket.s3.ap-south-1.amazonaws.com/digitalclinic.jpeg"
          alt="UMOR MEDICAL PRACTICE"
          style={{ maxWidth: "100%", height: "500px" }}
        />
      </Box>
    </Box>
  );
};

export default DoctorDashboard;
