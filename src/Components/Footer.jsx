import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#1976d2',
        color: '#fff',
        textAlign: 'center',
        padding: '1rem',
      }}
    >
      <Typography variant="h6">Application</Typography>
      <Typography variant="body2">
        Download DIGITAL CLINIC App Now! DIGITAL CLINIC mobile app makes it easy for you to take care of your health - using VirtualSteth you can quickly find doctors around you, view doctors details, and book instant appointments.
      </Typography>
      <Typography variant="body2" sx={{ marginTop: '1rem' }}>
        Experienced doctors & specialists, Online video consultation, Ask medical questions, Health assessment tools, Electronic health records.
      </Typography>
    </Box>
  );
};

export default Footer;
