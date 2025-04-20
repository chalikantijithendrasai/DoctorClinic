import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Modal,
  TextField,
  Stack,
  Avatar,
  Menu,
  MenuItem,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Link,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const [adminOpen, setAdminOpen] = useState(false);
  const [doctorOpen, setDoctorOpen] = useState(false);
  const [patientOpen, setPatientOpen] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeForm, setActiveForm] = useState("login"); // 'login', 'register', 'forgot', 'otp'
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("male");
  const [dob, setDob] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [country, setCountry] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const authenticated = localStorage.getItem("isAuthenticated") === "true";
    setIsLoggedIn(authenticated);
  }, []);

  const userData = JSON.parse(localStorage.getItem("userData"));
const registeredAs = userData?.registeredAs?.toLowerCase()

  const handleAdminOpen = () => setAdminOpen(true);
  const handleDoctorOpen = () => setDoctorOpen(true);
  const handleDoctorClose = () => setDoctorOpen(false);
  const handleAdminClose = () => setAdminOpen(false);
  const handleHome = () => {
    navigate("/");
  };
  const handlePatientOpen = () => setPatientOpen(true);
  const handlePatientClose = () => {
    setPatientOpen(false);
    setActiveForm("login"); // Reset to login form when closing
  };

  const handleSignIn = async () => {
    const loginData = {
      mobileno: mobileNumber,
      password: password,
    };
    setLoading(true);
    try {
      const response = await axios.post(
        "https://globalnewtrading.com:8443/HealthApp/api/login",
        loginData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            certificateID: "87CB817F-4F93-42E3-BF86-C260B0A27966",
          },
        }
      );

      if (response.data.status === "Login Successful") {
        setIsLoggedIn(true);
        localStorage.setItem("isAuthenticated", "true");
        navigate("/admin-home");
        setLoading(false);
        handleAdminClose();
      } else {
        throw new Error(response.data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert(
        error.response?.data?.message ||
          error.message ||
          "Login failed. Please try again."
      );
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.setItem("isAuthenticated", "false"); // 👈 update localStorage
    localStorage.clear();
    setAnchorEl(null);
    navigate("/");
  };

  const handleDashboard = () => {
    const userData = JSON.parse(localStorage.getItem("userData"));

    if (!userData) return;

    const registeredAs = userData.registeredAs?.toLowerCase();
    const userResponse = userData.userResponse;

    if (registeredAs === "patient") {
      const patientId = userResponse?.patientId;
      if (patientId) {
        navigate(`/Patientdashboard/${patientId}`);
      }
    } else if (registeredAs === "doctor") {
      const doctorId = userResponse?.doctorId;
      if (doctorId) {
        navigate(`/doctordashboard/${doctorId}`);
      }
    } else if (registeredAs === "admin") {
      navigate("/admin-home");
    } else {
      // fallback in case role is missing or unknown
      console.warn("Unknown role or user ID not found");
    }
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogin = async () => {
    setLoading(true);

    try {
      const response = await axios.post(
        "https://globalnewtrading.com:8443/HealthApp/api/login",
        {
          mobileno: mobileNumber, // mapped correctly
          password: password, // mapped correctly
          // or "doctor", depending on user
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            certificateID: "87CB817F-4F93-42E3-BF86-C260B0A27966",
          },
        }
      );
      console.log("res", response);
      const registered = response.data.registeredAs;
      const userData = response.data;
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userData", JSON.stringify(userData));
      setIsLoggedIn(true);
      handlePatientClose();
      handleDoctorClose();
      if (registered === "DOCTOR") {
        const doctorId = response.data.userResponse.doctorId;
        navigate(`/doctordashboard/${doctorId}`);
      } else {
        const patientId = response.data.userResponse.patientId;
        navigate(`/Patientdashboard/${patientId}`);
      }
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    setLoading(true);

    try {
      const response = await axios.post(
        "https://globalnewtrading.com:8443/HealthApp/api/userregistration",
        {
          userName: name, // mapped from "name"
          gender,
          dob,
          countryCode,
          phNo: mobileNumber, // mapped to "phNo"
          email,
          pwd: password, // mapped to "pwd"
          refCode: referralCode, // mapped to "refCode"
          country,
          registeredAs: "patient", // example: use "doctor" or "patient" based on role
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            certificateID: "87CB817F-4F93-42E3-BF86-C260B0A27966",
          },
        }
      );

      setActiveForm("login");
    } catch (error) {
      console.error("Registration failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://your-api-endpoint.com/forgot-password",
        {
          mobileNumber,
        }
      );
      setActiveForm("otp");
      startTimer(120); // 2 minutes timer
    } catch (error) {
      console.error("Failed to send OTP:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpVerification = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://your-api-endpoint.com/verify-otp",
        {
          mobileNumber,
          otp,
        }
      );
      // Handle successful verification (e.g., allow password reset)
    } catch (error) {
      console.error("OTP verification failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleProfile = async () => {
    const userData = JSON.parse(localStorage.getItem("userData"));

    const isPatient = userData.registeredAs?.toLowerCase() === "patient";
    const userID = isPatient
      ? userData.userResponse?.patientId
      : userData.userResponse?.doctorId;

    if (isPatient) {
      navigate(`/profile/patient/${userID}`);
    } else {
      navigate(`/profile/doctor/${userID}`);
    }
  };

  const handleAppointment = async () => {
    const userData = JSON.parse(localStorage.getItem("userData"));

    const isPatient = userData.registeredAs?.toLowerCase() === "patient";
    const userID = isPatient
      ? userData.userResponse?.patientId
      : userData.userResponse?.doctorId;

    if (isPatient) {
      navigate(`/patientAppointments`);
    } else {
      navigate(`/viewappointment/${userID}`);
    }
  };

  const startTimer = (seconds) => {
    setTimer(seconds);
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) clearInterval(interval);
        return prev - 1;
      });
    }, 1000);
  };

  const renderPatientForm = () => {
    switch (activeForm) {
      case "login":
        return (
          <Box sx={{ p: 3, maxWidth: 1000, margin: "auto" }}>
            <Typography variant="h5" gutterBottom textAlign="center">
              Digital Clinic
            </Typography>
            <Stack spacing={2}>
              <TextField
                label="Enter Phone Number"
                type="tel"
                fullWidth
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
              />
              <TextField
                label="Enter Password"
                type="password"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Link
                component="button"
                variant="body2"
                onClick={() => setActiveForm("forgot")}
                sx={{ textAlign: "right" }}
              >
                Forgot Password?
              </Link>
              <Button
                variant="contained"
                fullWidth
                onClick={handleLogin}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : "Login"}
              </Button>
              <Typography textAlign="center">
                Don't have an account?{" "}
                <Link
                  component="button"
                  onClick={() => setActiveForm("register")}
                >
                  Register
                </Link>
              </Typography>
            </Stack>
          </Box>
        );

      case "register":
        return (
          <Box sx={{ p: 3, maxWidth: 600, margin: "auto" }}>
            <Typography variant="h5" gutterBottom textAlign="center">
              Register
            </Typography>
            <Stack spacing={2}>
              <TextField
                label="Enter User Name"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup
                row
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Others"
                />
              </RadioGroup>
              <TextField
                label="Select Date of Birth"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
              <TextField
                label="Enter Country Code If Exists +91"
                fullWidth
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
              />
              <TextField
                label="Enter Mobile Number"
                type="tel"
                fullWidth
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
              />
              <TextField
                label="Enter Email"
                type="email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                label="Enter Password"
                type="password"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <TextField
                label="Enter Referral Code If Exists"
                fullWidth
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value)}
              />
              <TextField
                label="Enter Your Country"
                fullWidth
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
              <Button
                variant="contained"
                fullWidth
                onClick={handleRegister}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : "Register"}
              </Button>
              <Typography textAlign="center">
                Already have an account?{" "}
                <Link component="button" onClick={() => setActiveForm("login")}>
                  Login
                </Link>
              </Typography>
            </Stack>
          </Box>
        );

      case "forgot":
        return (
          <Box sx={{ p: 3, maxWidth: 400, margin: "auto" }}>
            <Typography variant="h5" gutterBottom textAlign="center">
              Forgot Password
            </Typography>
            <Typography paragraph>
              Enter your registered mobile number to change your account
              password
            </Typography>
            <Stack spacing={2}>
              <TextField
                label="Enter Mobile Number"
                type="tel"
                fullWidth
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
              />
              <Button
                variant="contained"
                fullWidth
                onClick={handleForgotPassword}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : "Validate"}
              </Button>
              <Typography textAlign="center">
                Remember your password?{" "}
                <Link component="button" onClick={() => setActiveForm("login")}>
                  Login
                </Link>
              </Typography>
            </Stack>
          </Box>
        );

      case "otp":
        return (
          <Box sx={{ p: 3, maxWidth: 400, margin: "auto" }}>
            <Typography variant="h5" gutterBottom textAlign="center">
              OTP Verification
            </Typography>
            <Typography paragraph>
              A one-time password (OTP) sent to your registered mobile number{" "}
              {mobileNumber}
            </Typography>
            <Typography color="error" paragraph>
              Code Expires in {timer} seconds
            </Typography>
            <Stack spacing={2}>
              <TextField
                label="Enter OTP"
                fullWidth
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <Button
                variant="contained"
                fullWidth
                onClick={handleOtpVerification}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : "Verify"}
              </Button>
              <Typography textAlign="center">
                Didn't receive OTP?{" "}
                <Link component="button" onClick={handleForgotPassword}>
                  Resend
                </Link>
              </Typography>
            </Stack>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLmQQhbnlya9S_bVhJIIqW_D-NbR-ppHR962mE5iXv8SFmlJIgoVlTpSI&s"
              alt="DIGITAL CLINIC"
              style={{ height: "40px", marginRight: "10px" }}
            />
            <Typography variant="h6" component="div">
              DIGITAL CLINIC
            </Typography>
          </Box>

          <Box display="flex" alignItems="center">
            {isLoggedIn ? (
              <>
                <Button color="inherit" onClick={handleDashboard}>
                  Dashboard
                </Button>
                <Avatar
                  sx={{ cursor: "pointer", ml: 2 }}
                  onClick={handleMenuClick}
                >
                  A
                </Avatar>
              </>
            ) : (
              <>
                <Button color="inherit" onClick={handleHome}>
                  Home
                </Button>
                <Button color="inherit" onClick={handleDoctorOpen}>
                  For Doctors
                </Button>
                <Button color="inherit" onClick={handlePatientOpen}>
                  Patient Login
                </Button>
                <Button color="inherit" onClick={handleAdminOpen}>
                  Admin
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Admin Login Modal */}
      <Modal open={adminOpen} onClose={handleAdminClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 300,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: "8px",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Admin Login
          </Typography>
          <Stack spacing={2}>
            <TextField
              label="Mobile Number"
              type="tel"
              fullWidth
              variant="outlined"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              variant="contained"
              fullWidth
              onClick={handleSignIn}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Login"}
            </Button>
          </Stack>
        </Box>
      </Modal>
      <Modal open={doctorOpen} onClose={handleDoctorClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 300,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: "8px",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Doctor Login
          </Typography>
          <Stack spacing={2}>
            <TextField
              label="Mobile Number"
              type="tel"
              fullWidth
              variant="outlined"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              variant="contained"
              fullWidth
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Login"}
            </Button>
          </Stack>
        </Box>
      </Modal>

      {/* Patient Login Modal */}
      <Modal open={patientOpen} onClose={handlePatientClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 300,
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: "8px",
            overflow: "auto",
            maxHeight: "90vh",
          }}
        >
          {renderPatientForm()}
        </Box>
      </Modal>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {/* Common to both */}
        <MenuItem onClick={handleProfile}>My Profile</MenuItem>
        <MenuItem onClick={handleAppointment}>Appointments</MenuItem>

        {/* For Patient */}
        {registeredAs === "patient" && (
          <>
            <MenuItem onClick={handleLogout}>Add Dependents</MenuItem>
            <MenuItem onClick={handleLogout}>Pharmacy Orders</MenuItem>
            <MenuItem onClick={handleLogout}>
              Diagnostics Orders
            </MenuItem>
          </>
        )}

        {/* For Doctor */}
        {registeredAs === "doctor" && (
          <>
            <MenuItem onClick={handleLogout}>
              Update Consultation Fee
            </MenuItem>
            <MenuItem onClick={handleLogout}>My Revenue</MenuItem>
          </>
        )}

        {/* Common to both */}
        <MenuItem onClick={handleLogout}>Update Password</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
        <MenuItem onClick={handleLogout}>Contact Us</MenuItem>
      </Menu>
    </>
  );
};

export default Header;
