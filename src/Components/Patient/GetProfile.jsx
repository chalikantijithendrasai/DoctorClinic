import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  CircularProgress,
  Alert,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Divider
} from '@mui/material';

const PatientProfile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    addressLine1: '',
    addressLine2: '',
    addressProof: '',
    addressProofLoc: '',
    bloodGroup: '',
    cityOrTown: '',
    country: '',
    dateOfBirth: '',
    dateOfRegistration: '',
    dependentFor: '',
    district: '',
    email: '',
    emergencyContact: '',
    emergencyContactRelation: '',
    gender: '',
    idProof: '',
    idProofLoc: '',
    insurancePolicyIssuedBy: '',
    insurancePolicyNo: '',
    insuranceValidity: '',
    landmark: '',
    maritalStatus: '',
    patientName: '',
    patientType: '',
    pincode: '',
    primaryPhone: '',
    profilePicLoc: '',
    representative: '',
    representativeType: '',
    secondaryPhone: '',
    state: ''
  });

  // Helper function to safely format date for input field
  const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    
    try {
      // Handle different date formats that might come from the API
      let date;
      
      // If it's already in ISO format (YYYY-MM-DD)
      if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
        return dateString;
      }
      
      // If it's a timestamp or other format
      date = new Date(dateString);
      
      // Check if the date is valid
      if (isNaN(date.getTime())) {
        return '';
      }
      
      return date.toISOString().split('T')[0];
    } catch (e) {
      console.error("Error formatting date:", e);
      return '';
    }
  };

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const url = `https://globalnewtrading.com:8443/HealthApp/api/getPatientById?patientId=${id}`;

      const response = await axios.post(url, {}, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          certificateID: "87CB817F-4F93-42E3-BF86-C260B0A27966",
        },
      });

      const patientData = response.data.data;
      setProfile(patientData);
      
      // Map the API response to our formData structure with proper date handling
      setFormData({
        addressLine1: patientData.addressLine1 || '',
        addressLine2: patientData.addressLine2 || '',
        addressProof: patientData.addressProof || '',
        addressProofLoc: patientData.addressProofLoc || '',
        bloodGroup: patientData.bloodGroup || '',
        cityOrTown: patientData.cityOrTown || '',
        country: patientData.country || '',
        dateOfBirth: formatDateForInput(patientData.dateOfBirth),
        dateOfRegistration: patientData.dateOfRegistration || '',
        dependentFor: patientData.dependentFor || '',
        district: patientData.district || '',
        email: patientData.email || '',
        emergencyContact: patientData.emergencyContact || '',
        emergencyContactRelation: patientData.emergencyContactRelation || '',
        gender: patientData.gender || '',
        idProof: patientData.idProof || '',
        idProofLoc: patientData.idProofLoc || '',
        insurancePolicyIssuedBy: patientData.insurancePolicyIssuedBy || '',
        insurancePolicyNo: patientData.insurancePolicyNo || '',
        insuranceValidity: formatDateForInput(patientData.insuranceValidity),
        landmark: patientData.landmark || '',
        maritalStatus: patientData.maritalStatus || '',
        patientName: patientData.patientName || '',
        patientType: patientData.patientType || '',
        pincode: patientData.pincode || '',
        primaryPhone: patientData.primaryPhone || '',
        profilePicLoc: patientData.profilePicLoc || '',
        representative: patientData.representative || '',
        representativeType: patientData.representativeType || '',
        secondaryPhone: patientData.secondaryPhone || '',
        state: patientData.state || ''
      });
    } catch (err) {
      setError(err.message);
      console.error("Failed to fetch patient profile:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const url = `https://globalnewtrading.com:8443/HealthApp/api/updatePatient?patientId=${id}`;

      // Prepare the data to match your desired request body format
      const requestData = {
        ...formData,
        // Convert empty strings to null for the API
        addressLine1: formData.addressLine1 || "",
        addressLine2: formData.addressLine2 || "",
        addressProof: formData.addressProof || "",
        addressProofLoc: formData.addressProofLoc || "",
        bloodGroup: formData.bloodGroup || "",
        cityOrTown: formData.cityOrTown || "",
        country: formData.country || "",
        dependentFor: formData.dependentFor || "",
        district: formData.district || "",
        emergencyContact: formData.emergencyContact || "",
        emergencyContactRelation: formData.emergencyContactRelation || "",
        idProof: formData.idProof || "",
        idProofLoc: formData.idProofLoc || "",
        insurancePolicyIssuedBy: formData.insurancePolicyIssuedBy || "",
        insurancePolicyNo: formData.insurancePolicyNo || "",
        insuranceValidity: formData.insuranceValidity || "",
        landmark: formData.landmark || "",
        maritalStatus: formData.maritalStatus || "",
        patientType: formData.patientType || "",
        pincode: formData.pincode || "",
        profilePicLoc: formData.profilePicLoc || "",
        representative: formData.representative || "",
        representativeType: formData.representativeType || "",
        state: formData.state || ""
      };

      const response = await axios.post(url, requestData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          certificateID: "87CB817F-4F93-42E3-BF86-C260B0A27966",
        },
      });

      setProfile(response.data.data);
      fetchProfile()
      setIsEditing(false);
      alert('Patient profile updated successfully!');
    } catch (err) {
      setError(err.message);
      console.error("Failed to update patient profile:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <CircularProgress />
    </Box>
  );
  
  if (error) return (
    <Box p={2}>
      <Alert severity="error">{error}</Alert>
    </Box>
  );
  
  if (!profile) return (
    <Box p={2}>
      <Alert severity="warning">No patient profile data found</Alert>
    </Box>
  );

  // Helper function to display dates in a readable format
  const formatDisplayDate = (dateString) => {
    if (!dateString) return '-';
    try {
      const date = new Date(dateString);
      return isNaN(date.getTime()) ? dateString : date.toLocaleDateString();
    } catch (e) {
      return dateString;
    }
  };

  return (
    <Box p={3}>
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Box>
            <Typography variant="h5" component="h1" gutterBottom>
              Patient Profile
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {profile.patientName}
            </Typography>
          </Box>
          <Button
            variant={isEditing ? "outlined" : "contained"}
            color="primary"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? 'Cancel Editing' : 'Edit Profile'}
          </Button>
        </Box>

        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Personal Information */}
            <Paper elevation={1} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Personal Information
              </Typography>
              <Divider sx={{ mb: 3 }} />
              <Grid container spacing={3}>
                {/* Name and Email Row */}
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Patient Name"
                    name="patientName"
                    value={formData.patientName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    required
                    InputProps={{
                      sx: {
                        color: 'black',
                        '&::placeholder': {
                          color: 'black',
                          opacity: 1,
                        },
                      },
                    }}
                    sx={{
                      '& .MuiInputBase-input': {
                        color: 'black',
                      },
                      '& .MuiInputLabel-root': {
                        color: 'text.secondary',
                      },
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: 'rgba(0, 0, 0, 0.23)',
                        },
                        '&:hover fieldset': {
                          borderColor: 'rgba(0, 0, 0, 0.87)',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: 'primary.main',
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    required
                    sx={{
                      '& .MuiInputBase-input': {
                        color: 'text.primary',
                      },
                      '& .MuiInputLabel-root': {
                        color: 'text.secondary',
                      },
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: 'rgba(0, 0, 0, 0.23)',
                        },
                        '&:hover fieldset': {
                          borderColor: 'rgba(0, 0, 0, 0.87)',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: 'primary.main',
                        },
                      },
                    }}
                  />
                </Grid>

                {/* Date of Birth and Phone Numbers Row */}
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Date of Birth"
                    name="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    InputLabelProps={{ shrink: true }}
                    sx={{
                      '& .MuiInputBase-input': {
                        color: 'text.primary',
                      },
                      '& .MuiInputLabel-root': {
                        color: 'text.secondary',
                      },
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: 'rgba(0, 0, 0, 0.23)',
                        },
                        '&:hover fieldset': {
                          borderColor: 'rgba(0, 0, 0, 0.87)',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: 'primary.main',
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Primary Phone"
                    name="primaryPhone"
                    value={formData.primaryPhone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Secondary Phone"
                    name="secondaryPhone"
                    value={formData.secondaryPhone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </Grid>

                {/* Gender, Blood Group, and Marital Status Row */}
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth disabled={!isEditing}>
                    <InputLabel sx={{ color: 'text.secondary' }}>Gender</InputLabel>
                    <Select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      label="Gender"
                      required
                      sx={{
                        '& .MuiSelect-select': {
                          color: 'black',
                        },
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'rgba(0, 0, 0, 0.23)',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'rgba(0, 0, 0, 0.87)',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'primary.main',
                        },
                      }}
                    >
                      <MenuItem value="">Select Gender</MenuItem>
                      <MenuItem value="male">Male</MenuItem>
                      <MenuItem value="female">Female</MenuItem>
                      <MenuItem value="other">Other</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth disabled={!isEditing}>
                    <InputLabel sx={{ color: 'text.secondary' }}>Blood Group</InputLabel>
                    <Select
                      name="bloodGroup"
                      value={formData.bloodGroup}
                      onChange={handleInputChange}
                      label="Blood Group"
                      sx={{
                        '& .MuiSelect-select': {
                          color: 'black',
                        },
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'rgba(0, 0, 0, 0.23)',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'rgba(0, 0, 0, 0.87)',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'primary.main',
                        },
                      }}
                    >
                      <MenuItem value="">Select Blood Group</MenuItem>
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
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth disabled={!isEditing}>
                    <InputLabel sx={{ color: 'text.secondary' }}>Marital Status</InputLabel>
                    <Select
                      name="maritalStatus"
                      value={formData.maritalStatus}
                      onChange={handleInputChange}
                      label="Marital Status"
                      sx={{
                        '& .MuiSelect-select': {
                          color: 'black',
                        },
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'rgba(0, 0, 0, 0.23)',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'rgba(0, 0, 0, 0.87)',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'primary.main',
                        },
                      }}
                    >
                      <MenuItem value="">Select Marital Status</MenuItem>
                      <MenuItem value="Single">Single</MenuItem>
                      <MenuItem value="Married">Married</MenuItem>
                      <MenuItem value="Divorced">Divorced</MenuItem>
                      <MenuItem value="Widowed">Widowed</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Paper>

            {/* Address Information */}
            <Paper elevation={1} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Address Information
              </Typography>
              <Divider sx={{ mb: 3 }} />
              <Grid container spacing={3}>
                {/* Address Lines Row */}
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Address Line 1"
                    name="addressLine1"
                    value={formData.addressLine1}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Address Line 2"
                    name="addressLine2"
                    value={formData.addressLine2}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </Grid>

                {/* City, District, State Row */}
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="City/Town"
                    name="cityOrTown"
                    value={formData.cityOrTown}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="District"
                    name="district"
                    value={formData.district}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="State"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </Grid>

                {/* Country, Pincode, Landmark Row */}
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Pincode"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Landmark"
                    name="landmark"
                    value={formData.landmark}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </Grid>
              </Grid>
            </Paper>

            {/* Emergency & Insurance Information */}
            <Paper elevation={1} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Emergency & Insurance Information
              </Typography>
              <Divider sx={{ mb: 3 }} />
              <Grid container spacing={3}>
                {/* Emergency Contact Row */}
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Emergency Contact"
                    name="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Emergency Contact Relation"
                    name="emergencyContactRelation"
                    value={formData.emergencyContactRelation}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </Grid>

                {/* Insurance Information Row */}
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Insurance Policy Issued By"
                    name="insurancePolicyIssuedBy"
                    value={formData.insurancePolicyIssuedBy}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Insurance Policy No"
                    name="insurancePolicyNo"
                    value={formData.insurancePolicyNo}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Insurance Validity"
                    name="insuranceValidity"
                    type="date"
                    value={formData.insuranceValidity}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
              </Grid>
            </Paper>

            {/* Representative & Documents Information */}
            <Paper elevation={1} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Representative & Documents
              </Typography>
              <Divider sx={{ mb: 3 }} />
              <Grid container spacing={3}>
                {/* Representative Information Row */}
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Representative"
                    name="representative"
                    value={formData.representative}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Representative Type"
                    name="representativeType"
                    value={formData.representativeType}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </Grid>

                {/* ID Proof Information Row */}
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth disabled={!isEditing}>
                    <InputLabel sx={{ color: 'text.secondary' }}>ID Proof Type</InputLabel>
                    <Select
                      name="idProof"
                      value={formData.idProof}
                      onChange={handleInputChange}
                      label="ID Proof Type"
                      sx={{
                        '& .MuiSelect-select': {
                          color: 'black',
                        },
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'rgba(0, 0, 0, 0.23)',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'rgba(0, 0, 0, 0.87)',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'primary.main',
                        },
                      }}
                    >
                      <MenuItem value="">Select ID Proof</MenuItem>
                      <MenuItem value="Passport">Passport</MenuItem>
                      <MenuItem value="Driver License">Driver License</MenuItem>
                      <MenuItem value="Aadhar Card">Aadhar Card</MenuItem>
                      <MenuItem value="PAN Card">PAN Card</MenuItem>
                      <MenuItem value="Voter ID">Voter ID</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="ID Proof Location"
                    name="idProofLoc"
                    value={formData.idProofLoc}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </Grid>

                {/* Address Proof Information Row */}
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth disabled={!isEditing}>
                    <InputLabel sx={{ color: 'text.secondary' }}>Address Proof Type</InputLabel>
                    <Select
                      name="addressProof"
                      value={formData.addressProof}
                      onChange={handleInputChange}
                      label="Address Proof Type"
                      sx={{
                        '& .MuiSelect-select': {
                          color: 'black',
                        },
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'rgba(0, 0, 0, 0.23)',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'rgba(0, 0, 0, 0.87)',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'primary.main',
                        },
                      }}
                    >
                      <MenuItem value="">Select Address Proof</MenuItem>
                      <MenuItem value="Utility Bill">Utility Bill</MenuItem>
                      <MenuItem value="Bank Statement">Bank Statement</MenuItem>
                      <MenuItem value="Rental Agreement">Rental Agreement</MenuItem>
                      <MenuItem value="Aadhar Card">Aadhar Card</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Address Proof Location"
                    name="addressProofLoc"
                    value={formData.addressProofLoc}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </Grid>

                {/* Profile Picture Location */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Profile Picture Location"
                    name="profilePicLoc"
                    value={formData.profilePicLoc}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </Grid>
              </Grid>
            </Paper>

            {isEditing && (
              <Box display="flex" justifyContent="flex-end" gap={2} mt={3}>
                <Button
                  variant="outlined"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={loading}
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </Button>
              </Box>
            )}
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default PatientProfile;