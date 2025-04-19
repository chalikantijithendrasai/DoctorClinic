import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, TextField, FormControl, InputLabel, Select, MenuItem, Button, Grid } from '@mui/material';
import axios from 'axios';

const AddDoctor = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    doctorFirstName: "",
    doctorMiddleName: "",
    doctorLastName: "",
    doctorQualification: "",
    email: "",
    emergencyContactRelation: "Brother",
    emergencyContact: "9876543210",
    languages: [],
    state: "",
    country: "",
    mandal: "",
    village: "",
    pincode: "",
    secondaryPhone: "",
    aboutSelf: "",
    idProof: "Passport",
    representative: "Jane Doe",
    addressProof: "Utility Bill",
    dateOfBirth: "",
    accolades: [],
    speciality: "",
    designation: "",
    primaryPhone: "",
    idProofLoc: "https://example.com/id-proof.png",
    practicionerRegistrationNumber: "PRN123456",
    gender: "",
    entityName: "DigitalHealth",
    doctorFee: "500",
    addressLine2: "",
    addressLine1: "",
    district: "Los Angeles",
    profilePic: "https://example.com/profile-pic.png",
    addressProofLoc: "https://example.com/address-proof.png",
    registrationImage: "https://example.com/registration.png",
    dateOfRegistration: "",
    representativeType: "legal",
    hospital: "",
    password: ""
}
  );

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked ? [...prevData[name], value] : prevData[name].filter((item) => item !== value),
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Construct the request body to match the API
    const requestBody = {
      doctorFirstName: formData.firstName,
      doctorMiddleName: formData.middleName,
      doctorLastName: formData.lastName,
      email: formData.email,
      gender: formData.gender,
      primaryPhone: formData.primaryPhone,
      secondaryPhone: formData.secondaryPhone,
      doctorQualification: formData.doctorQualification,
      designation: formData.designation,
      speciality: formData.speciality,
      languages: formData.languages,
      aboutSelf: formData.aboutSelf,
      state: formData.state,
      country: formData.country,
      password: formData.password,
      mandal: formData.mandal,
      village: formData.village,
      pincode: formData.pincode,
      dateOfBirth: formData.dateOfBirth,
      accolades: formData.accolades.split(',').map(item => item.trim()), // Trim whitespace from each item
      addressLine1: formData.addressLine1,
      addressLine2: formData.addressLine2,
      hospital: formData.hospital,
      dateOfRegistration: formData.dateOfRegistration,
      addressProof: formData.addressProof || '',  // Handle null or empty fields
      addressProofLoc: formData.addressProofLoc || '',
      practicionerRegistrationNumber: "PRN123456",
      profilePic: "https://example.com/profile-pic.png",
      registrationImage: formData.registrationImage || '',
      idProof: formData.idProof || '',
      idProofLoc: formData.idProofLoc || '',
      representative: "Jane Doe",
      emergencyContactRelation: "Brother",
      representativeType: "legal",
      emergencyContact: "9876543210",
      entityName: "DigitalHealth",
      doctorFee: "150 USD",
      district: formData.district || '',  // Handle null or empty fields
    };
  
    try {
      // Make the API call
      const response = await axios.post(
        'https://globalnewtrading.com:8443/HealthApp/api/saveDoctor', 
        requestBody,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            certificateID: '87CB817F-4F93-42E3-BF86-C260B0A27966'
          }
        }
      );
  
      if (response.data.message === "Successfully saved doctor details") {
        navigate("/admin-home/doctorsList");
        // Optionally show success message
        alert("Doctor added successfully!");
      } else {
        throw new Error(response.data.message || "Failed to save doctor details");
      }
    } catch (error) {
      console.error('Error adding doctor:', error);
      // Show user-friendly error message
      alert(
        error.response?.data?.message || 
        error.message || 
        "Failed to add doctor. Please try again."
      );
    }
  };
  

  return (
    <Container maxWidth="sm" sx={{ marginTop: '2rem', marginBottom: "2rem" }}>
      <Typography variant="h4" gutterBottom>
        Add Doctor
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {/* Form fields */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Middle Name"
              name="middleName"
              value={formData.middleName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Gender</InputLabel>
              <Select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Primary Phone"
              name="primaryPhone"
              value={formData.primaryPhone}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Secondary Phone"
              name="secondaryPhone"
              value={formData.secondaryPhone}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Designation"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Qualification"
              name="doctorQualification"
              value={formData.doctorQualification}
              onChange={handleChange}
            />
            </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Speciality"
              name="speciality"
              value={formData.speciality}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Languages</InputLabel>
              <Select
                multiple
                name="languages"
                value={formData.languages}
                onChange={handleChange}
                renderValue={(selected) => selected.join(', ')}
              >
                <MenuItem value="English">English</MenuItem>
                <MenuItem value="Spanish">Spanish</MenuItem>
                <MenuItem value="French">French</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="About Self"
              name="aboutSelf"
              value={formData.aboutSelf}
              onChange={handleChange}
              multiline
              rows={4}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="State"
              name="state"
              value={formData.state}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Country"
              name="country"
              value={formData.country}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Mandal"
              name="mandal"
              value={formData.mandal}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Village"
              name="village"
              value={formData.village}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Pincode"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Date of Birth"
              name="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Accolades"
              name="accolades"
              value={formData.accolades}
              onChange={handleChange}
              multiline
              rows={4}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address Line 1"
              name="addressLine1"
              value={formData.addressLine1}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address Line 2"
              name="addressLine2"
              value={formData.addressLine2}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Hospital"
              name="hospital"
              value={formData.hospital}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Date of Registration"
              name="dateOfRegistration"
              type="date"
              value={formData.dateOfRegistration}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
          <TextField
              fullWidth
              label="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default AddDoctor;
