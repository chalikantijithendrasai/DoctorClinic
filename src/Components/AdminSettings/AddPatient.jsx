import React, { useState } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button,
  Grid,
  Paper,
  Divider,
  Box
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useNavigate } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const AddPatient = () => {
    const naviate = useNavigate()
  const [formData, setFormData] = useState({
    profilePicLoc: '',
    patientName: '',
    primaryPhone: '',
    secondaryPhone: '',
    dateOfBirth: null,
    gender: 'Male',
    email: '',
    bloodGroup: '',
    maritalStatus: '',
    addressLine1: '',
    addressLine2: '',
    landmark: '',
    cityOrTown: '',
    pincode: '',
    district: '',
    state: '',
    country: '',
    idProof: '',
    idProofLoc: '',
    addressProof: '',
    addressProofLoc: '',
    emergencyContact: '',
    emergencyContactRelation: '',
    representative: '',
    representativeType: '',
    patientType: 'Adult',
    dependentFor: '',
    dateOfRegistration: null,
    insurancePolicyNo: '',
    insuranceValidity: null,
    insurancePolicyIssuedBy: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateChange = (name, date) => {
    setFormData(prev => ({
      ...prev,
      [name]: date
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Format dates to DD-MM-YYYY before sending
      const payload = {
        ...formData,
        dateOfBirth: formData.dateOfBirth ? formatDate(formData.dateOfBirth) : '',
        dateOfRegistration: formData.dateOfRegistration ? formatDate(formData.dateOfRegistration) : '',
        insuranceValidity: formData.insuranceValidity ? formatDate(formData.insuranceValidity) : ''
      };

      const response = await axios.post(
        'https://globalnewtrading.com:8443/HealthApp/api/savePatient',
        payload,
        {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                certificateID: "87CB817F-4F93-42E3-BF86-C260B0A27966",
              },
        }
      );
      if (response.data.message === "Successfully saved patient details") {
        naviate("/admin-home/doctorsList");
        // Optionally show success message
        alert("Patient added successfully!");
      } else {
        throw new Error(response.data.message || "Failed to save doctor details");
      }
    } catch (error) {
      console.error('Error adding patient:', error);
      alert('Failed to add patient');
    }
  };

  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Add New Patient
        </Typography>
        
        <Paper elevation={3} sx={{ p: 3 }}>
          <form onSubmit={handleSubmit}>
            {/* Personal Information Section */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                Personal Information
              </Typography>
              <Divider sx={{ mb: 3 }} />
              
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Profile Picture URL"
                    name="profilePicLoc"
                    value={formData.profilePicLoc}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    required
                    label="Patient Name"
                    name="patientName"
                    value={formData.patientName}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    required
                    label="Primary Phone"
                    name="primaryPhone"
                    value={formData.primaryPhone}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Secondary Phone"
                    name="secondaryPhone"
                    value={formData.secondaryPhone}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <DatePicker
                    label="Date of Birth"
                    value={formData.dateOfBirth}
                    onChange={(date) => handleDateChange('dateOfBirth', date)}
                    renderInput={(params) => <TextField fullWidth {...params} />}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Gender</InputLabel>
                    <Select
                      name="gender"
                      value={formData.gender}
                      label="Gender"
                      onChange={handleChange}
                    >
                      <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Female">Female</MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Blood Group</InputLabel>
                    <Select
                      name="bloodGroup"
                      value={formData.bloodGroup}
                      label="Blood Group"
                      onChange={handleChange}
                    >
                      <MenuItem value="A+">A+</MenuItem>
                      <MenuItem value="A-">A-</MenuItem>
                      <MenuItem value="B+">B+</MenuItem>
                      <MenuItem value="B-">B-</MenuItem>
                      <MenuItem value="AB+">AB+</MenuItem>
                      <MenuItem value="AB-">AB-</MenuItem>
                      <MenuItem value="O+">O+</MenuItem>
                      <MenuItem value="O-">O-</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Marital Status</InputLabel>
                    <Select
                      name="maritalStatus"
                      value={formData.maritalStatus}
                      label="Marital Status"
                      onChange={handleChange}
                    >
                      <MenuItem value="Single">Single</MenuItem>
                      <MenuItem value="Married">Married</MenuItem>
                      <MenuItem value="Divorced">Divorced</MenuItem>
                      <MenuItem value="Widowed">Widowed</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Box>

            {/* Address Information Section */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                Address Information
              </Typography>
              <Divider sx={{ mb: 3 }} />
              
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Address Line 1"
                    name="addressLine1"
                    value={formData.addressLine1}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Address Line 2"
                    name="addressLine2"
                    value={formData.addressLine2}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Landmark"
                    name="landmark"
                    value={formData.landmark}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="City/Town"
                    name="cityOrTown"
                    value={formData.cityOrTown}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Pincode"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="District"
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="State"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            </Box>

            {/* Document Information Section */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                Document Information
              </Typography>
              <Divider sx={{ mb: 3 }} />
              
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>ID Proof Type</InputLabel>
                    <Select
                      name="idProof"
                      value={formData.idProof}
                      label="ID Proof Type"
                      onChange={handleChange}
                    >
                      <MenuItem value="Passport">Passport</MenuItem>
                      <MenuItem value="Driver License">Driver License</MenuItem>
                      <MenuItem value="Aadhaar Card">Aadhaar Card</MenuItem>
                      <MenuItem value="PAN Card">PAN Card</MenuItem>
                      <MenuItem value="Voter ID">Voter ID</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="ID Proof URL"
                    name="idProofLoc"
                    value={formData.idProofLoc}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Address Proof Type</InputLabel>
                    <Select
                      name="addressProof"
                      value={formData.addressProof}
                      label="Address Proof Type"
                      onChange={handleChange}
                    >
                      <MenuItem value="Utility Bill">Utility Bill</MenuItem>
                      <MenuItem value="Bank Statement">Bank Statement</MenuItem>
                      <MenuItem value="Rental Agreement">Rental Agreement</MenuItem>
                      <MenuItem value="Aadhaar Card">Aadhaar Card</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Address Proof URL"
                    name="addressProofLoc"
                    value={formData.addressProofLoc}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            </Box>

            {/* Emergency Contact Section */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                Emergency Contact
              </Typography>
              <Divider sx={{ mb: 3 }} />
              
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Emergency Contact Name"
                    name="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Relation"
                    name="emergencyContactRelation"
                    value={formData.emergencyContactRelation}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            </Box>

            {/* Representative Section */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                Representative Information
              </Typography>
              <Divider sx={{ mb: 3 }} />
              
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Representative Name"
                    name="representative"
                    value={formData.representative}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Representative Type"
                    name="representativeType"
                    value={formData.representativeType}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Patient Type</InputLabel>
                    <Select
                      name="patientType"
                      value={formData.patientType}
                      label="Patient Type"
                      onChange={handleChange}
                    >
                      <MenuItem value="Adult">Adult</MenuItem>
                      <MenuItem value="Child">Child</MenuItem>
                      <MenuItem value="Senior Citizen">Senior Citizen</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Dependent For (Patient ID)"
                    name="dependentFor"
                    value={formData.dependentFor}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            </Box>

            {/* Insurance Information Section */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                Insurance Information
              </Typography>
              <Divider sx={{ mb: 3 }} />
              
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <DatePicker
                    label="Date of Registration"
                    value={formData.dateOfRegistration}
                    onChange={(date) => handleDateChange('dateOfRegistration', date)}
                    renderInput={(params) => <TextField fullWidth {...params} />}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Insurance Policy Number"
                    name="insurancePolicyNo"
                    value={formData.insurancePolicyNo}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <DatePicker
                    label="Insurance Validity"
                    value={formData.insuranceValidity}
                    onChange={(date) => handleDateChange('insuranceValidity', date)}
                    renderInput={(params) => <TextField fullWidth {...params} />}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Insurance Issued By"
                    name="insurancePolicyIssuedBy"
                    value={formData.insurancePolicyIssuedBy}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                sx={{ px: 6 }}
              >
                Save Patient
              </Button>
            </Box>
          </form>
        </Paper>
      </Container>
    </LocalizationProvider>
  );
};

export default AddPatient;