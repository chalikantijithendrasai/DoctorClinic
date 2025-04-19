import React, { useState } from 'react';
import { TextField, Button, Grid, MenuItem, Typography, Box } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const AddDiagnostics = () => {
    const navigate = useNavigate()
  const [formData, setFormData] = useState({
    diagnosticCenterName: "",
    gstNo: "",
    licenceNo: "",
    licenceValidity: "",
    licencePath: "/licenses/lic123.pdf",
    labAssistantName: "",
    labAssistantPhno: "",
    labAssistantGender: "",
    labAssistantDateofbirth: "",
    representative: "",
    representativeType: "",
    diagnosticCenterPrimaryPhone: "",
    diagnosticCenterSecondaryphone: "",
    diagnosticCenterEmail: "",
    addressLine1: "",
    addressLine2: "",
    village: "",
    mandal: "",
    district: "",
    state: "",
    country: "",
    pincode: "",
    labAssistantIdProof: "Passport",
    labAssistantIdProofLoc: "/documents/id/passport_johndoe.pdf",
    labAssistantAddressProof: "Utility Bill",
    labAssistantAddressProofLoc: "/documents/address/utility_bill_johndoe.pdf",
    diagnosticProfilepicLoc: "/images/diagnostic_profilepic.jpg",
    hospitalEntityname: "DigitalHealth",
    diagnosticEntityname: "DigitalHealth",
    dateOfDiagnosticCenterRegistration: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/healthapp/v1/saveDiagnostic", formData);
      console.log("API Response:", response.data);
      if(response.data.message === "Successfully saved the diagnostic details"){
        navigate(`/admin-home/ViewDiagnosticList/${response.data.data.id}`);
      }
      
      setFormData({}); // Reset form if needed
    } catch (err) {
      console.error("API Error:", err);
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Add Diagnostics
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {/* Diagnostic Center Details */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Diagnostic Center Name"
              name="diagnosticCenterName"
              value={formData.diagnosticCenterName}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Diagnostic Mobile Number"
              name="diagnosticCenterPrimaryPhone"
              value={formData.diagnosticCenterPrimaryPhone}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Diagnostic Center Secondaryphone"
              name="diagnosticCenterSecondaryphone"
              value={formData.diagnosticCenterSecondaryphone}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Diagnostic Center Email"
              name="diagnosticCenterEmail"
              value={formData.diagnosticCenterEmail}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="GST Number"
              name="gstNo"
              value={formData.gstNo}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Licence Number"
              name="licenceNo"
              value={formData.licenceNo}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Licence Validity"
              name="licenceValidity"
              type="date"
              value={formData.licenceValidity}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>

          {/* Lab Assistant Details */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Lab Assistant Name"
              name="labAssistantName"
              value={formData.labAssistantName}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Lab Assistant Phone"
              name="labAssistantPhno"
              value={formData.labAssistantPhno}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="Lab Assistant Gender"
              name="labAssistantGender"
              value={formData.labAssistantGender}
              onChange={handleChange}
              fullWidth
              required
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Lab Assistant DOB"
              name="labAssistantDateofbirth"
              type="date"
              value={formData.labAssistantDateofbirth}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>

          {/* Representative Details */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Representative Name"
              name="representative"
              value={formData.representative}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Representative Type"
              name="representativeType"
              value={formData.representativeType}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>

          {/* Address Details */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Address Line 1"
              name="addressLine1"
              value={formData.addressLine1}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Address Line 2"
              name="addressLine2"
              value={formData.addressLine2}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Village"
              name="village"
              value={formData.village}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Mandal"
              name="mandal"
              value={formData.mandal}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="District"
              name="district"
              value={formData.district}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="State"
              name="state"
              value={formData.state}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Pincode"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Date Of Registration"
              name="dateOfDiagnosticCenterRegistration"
              type="date"
              value={formData.dateOfDiagnosticCenterRegistration}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>
          

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit" fullWidth>
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default AddDiagnostics;
