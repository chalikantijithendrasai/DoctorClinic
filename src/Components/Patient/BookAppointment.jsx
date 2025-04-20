import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { format, isSameDay } from 'date-fns';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import {
  Container,
  Typography,
  Paper,
  Grid,
  Button,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  Box,
  styled,
  Divider,      // <-- Add this
  Select        // <-- And this
} from '@mui/material';

import { CalendarToday, Schedule, Person, Phone, Payment } from '@mui/icons-material';

// Styled component
const AvailabilityDot = styled('span')(({ theme }) => ({
  height: 6,
  width: 6,
  backgroundColor: theme.palette.success.main,
  borderRadius: '50%',
  display: 'inline-block',
  position: 'absolute',
  bottom: 4,
  left: '50%',
  transform: 'translateX(-50%)',
}));

const BookAppointment = () => {
  const { id: doctorId } = useParams();
  const [availableDates, setAvailableDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [patientDetails, setPatientDetails] = useState({
    patientName: '',
    patientPhno: '',
    paymentMode: 'Cash'
  });
  const [calendarDate, setCalendarDate] = useState(new Date());

  const headers = {
    certificateID: '87CB817F-4F93-42E3-BF86-C260B0A27966'
  };

  const userData = JSON.parse(localStorage.getItem("userData"));
  const userID = userData?.userResponse?.patientId;

  useEffect(() => {
    const fetchAvailableDates = async () => {
      try {
        setLoading(true);
        const response = await axios.post(
          `https://globalnewtrading.com:8443/HealthApp/api/getDoctorSchedules?doctorId=${doctorId}`,
          {},
          { headers }
        );

        if (response.data.status === 'success') {
          setAvailableDates(response.data.data.map(item => item.date));
        }
      } catch (err) {
        setError('Failed to fetch available dates');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAvailableDates();
  }, [doctorId]);

  useEffect(() => {
    if (selectedDate) {
      const fetchSlots = async () => {
        try {
          setLoading(true);
          const response = await axios.post(
            `https://globalnewtrading.com:8443/HealthApp/api/getDoctorSlotsbyDate?doctorId=${doctorId}&date=${selectedDate}`,
            {},
            { headers }
          );

          if (response.data.status === 'success') {
            setSlots(response.data.data);
          }
        } catch (err) {
          setError('Failed to fetch available slots');
          console.error(err);
        } finally {
          setLoading(false);
        }
      };

      fetchSlots();
    }
  }, [selectedDate, doctorId]);

  const handleCalendarChange = (date) => {
    setCalendarDate(date);
    const formattedDate = format(date, 'dd-MM-yyyy');
    if (availableDates.includes(formattedDate)) {
      setSelectedDate(formattedDate);
      setSelectedSlot(null);
      setBookingSuccess(false);
    }
  };

  const handleDateButtonClick = (date) => {
    setSelectedDate(date);
    setSelectedSlot(null);
    setBookingSuccess(false);
    const [day, month, year] = date.split('-');
    setCalendarDate(new Date(`${year}-${month}-${day}`));
  };

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPatientDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBookAppointment = async () => {
    if (!selectedSlot || !patientDetails.patientName || !patientDetails.patientPhno) {
      setError('Please fill all required fields and select a slot');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const formatTime = (timeStr) => {
        if (timeStr.includes('AM') || timeStr.includes('PM')) return timeStr;
        const [hours, minutes] = timeStr.split(':');
        const hourNum = parseInt(hours, 10);
        const period = hourNum >= 12 ? 'PM' : 'AM';
        const hour12 = hourNum % 12 || 12;
        return `${hour12}:${minutes} ${period}`;
      };

      const bookingData = {
        doctorId: selectedSlot.doctorId,
        doctorName: `DR. ${selectedSlot.doctorName.replace(/^DR\.?\s*/i, '')}`,
        date: selectedSlot.date,
        slotId: selectedSlot.slotId,
        bookedBy: "Admin",
        patientPhno: patientDetails.patientPhno,
        patientId: userID,
        patientName: patientDetails.patientName,
        transactionDate: format(new Date(), 'dd-MM-yyyy'),
        slotIn: formatTime(selectedSlot.slotIn),
        slotOut: formatTime(selectedSlot.slotOut),
        paymentMode: patientDetails.paymentMode === 'Debit' ? 'Debit Card' : patientDetails.paymentMode,
        slotType: selectedSlot.slotType === 'Online' ? 'Consultation' : selectedSlot.slotType
      };

      const response = await axios.post(
        `https://globalnewtrading.com:8443/HealthApp/api/bookDoctorSlot?doctorId=${selectedSlot.doctorId}`,
        bookingData,
        { headers }
      );

      if (response.data.status === 'success') {
        setBookingSuccess(true);
      } else {
        setError(response.data.message || 'Booking failed');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Booking failed');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const availableDateObjects = availableDates.map(date => {
    const [day, month, year] = date.split('-');
    return new Date(`${year}-${month}-${day}`);
  }).filter(Boolean);

  const DayContents = ({ date }) => {
    const isAvailable = availableDateObjects.some(d => isSameDay(d, date));
    return (
      <div style={{ position: 'relative' }}>
        {date.getDate()}
        {isAvailable && <AvailabilityDot />}
      </div>
    );
  };

  const getMinMaxDates = () => {
    if (!availableDateObjects.length) return { min: null, max: null };
    return {
      min: new Date(Math.min(...availableDateObjects.map(d => d.getTime()))),
      max: new Date(Math.max(...availableDateObjects.map(d => d.getTime())))
    };
  };

  const { min, max } = getMinMaxDates();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', mb: 4 }}>
        Book Appointment
      </Typography>

      {error && (
        <Paper elevation={0} sx={{ backgroundColor: 'error.light', p: 2, mb: 3 }}>
          <Typography color="error" align="center">{error}</Typography>
        </Paper>
      )}

      {bookingSuccess && (
        <Paper elevation={0} sx={{ backgroundColor: 'success.light', p: 2, mb: 3 }}>
          <Typography color="success.dark" align="center">
            Appointment booked successfully!
          </Typography>
        </Paper>
      )}

      <Grid container spacing={4}>
        {/* Calendar Section */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Box display="flex" alignItems="center" mb={2}>
              <CalendarToday color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6">Select Date</Typography>
            </Box>

            {loading && !selectedDate ? (
              <Box display="flex" justifyContent="center" my={4}>
                <CircularProgress />
              </Box>
            ) : (
              <DatePicker
                selected={calendarDate}
                onChange={handleCalendarChange}
                minDate={min}
                maxDate={max}
                inline
                filterDate={date =>
                  availableDateObjects.some(d => isSameDay(d, date))
                }
                renderDayContents={(day, date) => <DayContents date={date} />}
              />
            )}
          </Paper>
        </Grid>

        {/* Appointment Details Section */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Select Slot
            </Typography>
            <Box mb={2}>
              {slots.map(slot => (
                <Button
                  key={slot.slotId}
                  variant={selectedSlot?.slotId === slot.slotId ? 'contained' : 'outlined'}
                  color="primary"
                  sx={{ m: 1 }}
                  onClick={() => handleSlotSelect(slot)}
                >
                  {slot.slotIn} - {slot.slotOut}
                </Button>
              ))}
            </Box>

            <Divider sx={{ my: 2 }} />

            <TextField
              fullWidth
              name="patientName"
              label="Patient Name"
              value={patientDetails.patientName}
              onChange={handleInputChange}
              margin="normal"
            />
            <TextField
              fullWidth
              name="patientPhno"
              label="Phone Number"
              value={patientDetails.patientPhno}
              onChange={handleInputChange}
              margin="normal"
            />

            <FormControl fullWidth margin="normal">
              <InputLabel>Payment Mode</InputLabel>
              <Select
                name="paymentMode"
                value={patientDetails.paymentMode}
                onChange={handleInputChange}
                label="Payment Mode"
              >
                <MenuItem value="Cash">Cash</MenuItem>
                <MenuItem value="Debit">Debit Card</MenuItem>
                <MenuItem value="UPI">UPI</MenuItem>
              </Select>
            </FormControl>

            <Button
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3 }}
              onClick={handleBookAppointment}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Book Appointment'}
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default BookAppointment;
