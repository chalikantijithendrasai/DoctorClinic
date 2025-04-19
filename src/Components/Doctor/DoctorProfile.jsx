import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Chip,
  Divider,
  CircularProgress,
  Alert,
  Avatar,
  Grid,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextareaAutosize
} from '@mui/material';
import {
  Edit as EditIcon,
  Cancel as CancelIcon,
  Save as SaveIcon,
  Add as AddIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';

const DoctorProfile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const url = `https://globalnewtrading.com:8443/HealthApp/api/getDoctorById?doctorId=${id}`;

      const response = await axios.post(url, {}, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          certificateID: "87CB817F-4F93-42E3-BF86-C260B0A27966",
        },
      });

      setProfile(response.data.data);
      setFormData(response.data.data);
    } catch (err) {
      setError(err.message);
      console.error("Failed to fetch doctor profile:", err);
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

  const handleArrayChange = (field, index, value) => {
    setFormData(prev => {
      const newArray = [...prev[field]];
      newArray[index] = value;
      return {
        ...prev,
        [field]: newArray
      };
    });
  };

  const addArrayItem = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...(prev[field] || []), '']
    }));
  };

  const removeArrayItem = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const userData = JSON.parse(localStorage.getItem("userData"));
      const userPh = userData.userResponse?.mobileno;
      const url = `https://globalnewtrading.com:8443/HealthApp/api/updateDoctor?primaryPhone=${userPh}`;

      const response = await axios.post(url, formData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          certificateID: "87CB817F-4F93-42E3-BF86-C260B0A27966",
        },
      });

      setProfile(response.data.data);
      fetchProfile()
      setIsEditing(false);
      alert('Doctor profile updated successfully!');
    } catch (err) {
      setError(err.message);
      console.error("Failed to update doctor profile:", err);
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
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Alert severity="error">
        <Typography variant="h6">Error</Typography>
        {error}
      </Alert>
    </Container>
  );
  
  if (!profile) return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Alert severity="warning">
        No doctor profile data found
      </Alert>
    </Container>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ overflow: 'hidden' }}>
        {/* Profile Header */}
        <Box 
          sx={{ 
            background: 'linear-gradient(135deg, #1976d2 0%, #0d47a1 100%)',
            p: 4,
            color: 'white'
          }}
        >
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="h4" component="h1" fontWeight="bold">
                Doctor Profile
              </Typography>
              <Typography variant="subtitle1" sx={{ mt: 1 }}>
                {profile.doctorFirstName} {profile.doctorLastName}
              </Typography>
            </Box>
            <Button
              onClick={() => setIsEditing(!isEditing)}
              variant="contained"
              color={isEditing ? 'inherit' : 'primary'}
              startIcon={isEditing ? <CancelIcon /> : <EditIcon />}
              sx={{
                backgroundColor: isEditing ? 'white' : '',
                color: isEditing ? 'primary.main' : 'white',
                '&:hover': {
                  backgroundColor: isEditing ? '#f5f5f5' : '',
                }
              }}
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </Button>
          </Box>
        </Box>

        {/* Profile Content */}
        <Box p={4}>
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {/* Personal Information Card */}
              <Card>
                <CardHeader 
                  title="Personal Information" 
                  titleTypographyProps={{ variant: 'h6', fontWeight: 'bold' }}
                  sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
                />
                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                      {isEditing ? (
                        <TextField
                          fullWidth
                          label="First Name"
                          name="doctorFirstName"
                          value={formData.doctorFirstName || ''}
                          onChange={handleInputChange}
                          variant="outlined"
                        />
                      ) : (
                        <Box>
                          <Typography variant="subtitle2" color="textSecondary">
                            First Name
                          </Typography>
                          <Typography variant="body1">
                            {profile.doctorFirstName}
                          </Typography>
                        </Box>
                      )}
                    </Grid>
                    <Grid item xs={12} md={4}>
                      {isEditing ? (
                        <TextField
                          fullWidth
                          label="Middle Name"
                          name="doctorMiddleName"
                          value={formData.doctorMiddleName || ''}
                          onChange={handleInputChange}
                          variant="outlined"
                        />
                      ) : (
                        <Box>
                          <Typography variant="subtitle2" color="textSecondary">
                            Middle Name
                          </Typography>
                          <Typography variant="body1">
                            {profile.doctorMiddleName || '-'}
                          </Typography>
                        </Box>
                      )}
                    </Grid>
                    <Grid item xs={12} md={4}>
                      {isEditing ? (
                        <TextField
                          fullWidth
                          label="Last Name"
                          name="doctorLastName"
                          value={formData.doctorLastName || ''}
                          onChange={handleInputChange}
                          variant="outlined"
                        />
                      ) : (
                        <Box>
                          <Typography variant="subtitle2" color="textSecondary">
                            Last Name
                          </Typography>
                          <Typography variant="body1">
                            {profile.doctorLastName}
                          </Typography>
                        </Box>
                      )}
                    </Grid>
                    <Grid item xs={12} md={4}>
                      {isEditing ? (
                        <TextField
                          fullWidth
                          label="Qualification"
                          name="doctorQualification"
                          value={formData.doctorQualification || ''}
                          onChange={handleInputChange}
                          variant="outlined"
                        />
                      ) : (
                        <Box>
                          <Typography variant="subtitle2" color="textSecondary">
                            Qualification
                          </Typography>
                          <Typography variant="body1">
                            {profile.doctorQualification}
                          </Typography>
                        </Box>
                      )}
                    </Grid>
                    <Grid item xs={12} md={4}>
                      {isEditing ? (
                        <TextField
                          fullWidth
                          label="Email"
                          name="email"
                          value={formData.email || ''}
                          onChange={handleInputChange}
                          variant="outlined"
                        />
                      ) : (
                        <Box>
                          <Typography variant="subtitle2" color="textSecondary">
                            Email
                          </Typography>
                          <Typography variant="body1">
                            {profile.email}
                          </Typography>
                        </Box>
                      )}
                    </Grid>
                    <Grid item xs={12} md={4}>
                      {isEditing ? (
                        <TextField
                          fullWidth
                          label="Primary Phone"
                          name="primaryPhone"
                          value={formData.primaryPhone || ''}
                          onChange={handleInputChange}
                          variant="outlined"
                        />
                      ) : (
                        <Box>
                          <Typography variant="subtitle2" color="textSecondary">
                            Primary Phone
                          </Typography>
                          <Typography variant="body1">
                            {profile.primaryPhone}
                          </Typography>
                        </Box>
                      )}
                    </Grid>
                    <Grid item xs={12} md={4}>
                      {isEditing ? (
                        <FormControl fullWidth>
                          <InputLabel>Gender</InputLabel>
                          <Select
                            label="Gender"
                            name="gender"
                            value={formData.gender || ''}
                            onChange={handleInputChange}
                          >
                            <MenuItem value="Male">Male</MenuItem>
                            <MenuItem value="Female">Female</MenuItem>
                            <MenuItem value="Other">Other</MenuItem>
                          </Select>
                        </FormControl>
                      ) : (
                        <Box>
                          <Typography variant="subtitle2" color="textSecondary">
                            Gender
                          </Typography>
                          <Typography variant="body1">
                            {profile.gender}
                          </Typography>
                        </Box>
                      )}
                    </Grid>
                    <Grid item xs={12} md={4}>
                      {isEditing ? (
                        <TextField
                          fullWidth
                          label="Doctor Fee"
                          name="doctorFee"
                          value={formData.doctorFee || ''}
                          onChange={handleInputChange}
                          variant="outlined"
                        />
                      ) : (
                        <Box>
                          <Typography variant="subtitle2" color="textSecondary">
                            Doctor Fee
                          </Typography>
                          <Typography variant="body1">
                            {profile.doctorFee}
                          </Typography>
                        </Box>
                      )}
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>

              {/* Languages Card */}
              <Card>
                <CardHeader 
                  title="Languages" 
                  titleTypographyProps={{ variant: 'h6', fontWeight: 'bold' }}
                  sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
                />
                <CardContent>
                  {isEditing ? (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      {formData.languages?.map((language, index) => (
                        <Box key={index} display="flex" alignItems="center" gap={2}>
                          <TextField
                            fullWidth
                            value={language}
                            onChange={(e) => handleArrayChange('languages', index, e.target.value)}
                            variant="outlined"
                          />
                          <IconButton
                            onClick={() => removeArrayItem('languages', index)}
                            color="error"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      ))}
                      <Button
                        startIcon={<AddIcon />}
                        onClick={() => addArrayItem('languages')}
                        variant="outlined"
                        color="primary"
                        sx={{ alignSelf: 'flex-start' }}
                      >
                        Add Language
                      </Button>
                    </Box>
                  ) : (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {profile.languages?.length > 0 ? (
                        profile.languages.map((language, index) => (
                          <Chip 
                            key={index} 
                            label={language} 
                            color="primary"
                            variant="outlined"
                          />
                        ))
                      ) : (
                        <Typography color="textSecondary">
                          No languages specified
                        </Typography>
                      )}
                    </Box>
                  )}
                </CardContent>
              </Card>

              {/* About Yourself Card */}
              <Card>
                <CardHeader 
                  title="About Yourself" 
                  titleTypographyProps={{ variant: 'h6', fontWeight: 'bold' }}
                  sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
                />
                <CardContent>
                  {isEditing ? (
                    <TextField
                      fullWidth
                      multiline
                      rows={4}
                      name="aboutSelf"
                      value={formData.aboutSelf || ''}
                      onChange={handleInputChange}
                      variant="outlined"
                    />
                  ) : (
                    <Typography 
                      variant="body1" 
                      color="textPrimary"
                      sx={{ whiteSpace: 'pre-line' }}
                    >
                      {profile.aboutSelf || 'No information provided'}
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Box>

            {isEditing && (
              <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <Button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  variant="outlined"
                  color="primary"
                  startIcon={<CancelIcon />}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
                  disabled={loading}
                >
                  Save Changes
                </Button>
              </Box>
            )}
          </form>
        </Box>
      </Paper>
    </Container>
  );
};

export default DoctorProfile;