import React, { useState } from 'react';
import {
  Typography,
  Grid,
  Paper,
  Button,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  RadioGroup,
  Radio,
  TextField,
  Divider
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format, addDays, isBefore, isAfter, eachDayOfInterval } from 'date-fns';
import axios from 'axios';
import { useParams,useLocation  } from 'react-router-dom';
const AddSchedule = () => {
  const today = new Date();
  const [startDate, setStartDate] = useState(today);
  const location = useLocation();
  const doctorFee = location.state?.doctorFee;
   const { id,name } = useParams();
  const [endDate, setEndDate] = useState(addDays(today, 7));
  const [selectedWeekdays, setSelectedWeekdays] = useState([
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'
  ]);
  const [slotDuration, setSlotDuration] = useState('30');
  const [consultationType, setConsultationType] = useState('Online');
  const [sessionStartTime, setSessionStartTime] = useState('09:00');
  const [sessionEndTime, setSessionEndTime] = useState('17:00');
  console.log("name",name,id,doctorFee);
  
  const weekdays = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 
    'Thursday', 'Friday', 'Saturday'
  ];

  const handleWeekdayToggle = (weekday) => {
    setSelectedWeekdays(prev => 
      prev.includes(weekday) 
        ? prev.filter(day => day !== weekday)
        : [...prev, weekday]
    );
  };

  const handleStartDateChange = (date) => {
    if (isAfter(date, endDate)) {
      setEndDate(addDays(date, 7));
    }
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    if (isBefore(date, startDate)) {
      alert('End date cannot be before start date');
      return;
    }
    setEndDate(date);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Convert selected dates to 'dd-MM-yyyy'
    const selectedDates = eachDayOfInterval({ start: startDate, end: endDate })
      .filter((date) => selectedWeekdays.includes(weekdays[date.getDay()]))
      .map((date) => format(date, "dd-MM-yyyy"));
  
    const formattedSessionIn = format(new Date(`1970-01-01T${sessionStartTime}`), "hh:mm a");
    const formattedSessionOut = format(new Date(`1970-01-01T${sessionEndTime}`), "hh:mm a");
  
    const requestBody = {
      doctorId: id,
      doctorName: name.startsWith("DR.") ? name : `DR. ${name}`,
      date: selectedDates,
      availability: "Available",
      sessionId: "S001", // You may generate or customize this if needed
      sessionIn: formattedSessionIn,
      sessionOut: formattedSessionOut,
      slotDuration: parseFloat(slotDuration),
      fee: parseFloat(doctorFee),
      dateOfUpdate: format(new Date(), "dd-MM-yyyy"),
      sessionType: consultationType,
    };
  
    try {
      const response = await axios.post(
        "https://globalnewtrading.com:8443/HealthApp/api/saveDoctorSchedule",
        requestBody,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            certificateID: "87CB817F-4F93-42E3-BF86-C260B0A27966",
          },
        }
      );
      console.log("Schedule saved successfully:", response.data);
      alert("Schedule saved successfully!");
    } catch (error) {
      console.error("Error saving schedule:", error);
      alert("Failed to save schedule.");
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 800, margin: 'auto' }}>
      <Typography variant="h5" gutterBottom>
        Add Schedule
      </Typography>
      
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {/* Date Range Selection */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Select Date Range
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <DatePicker
                    label="Start Date"
                    value={startDate}
                    onChange={handleStartDateChange}
                    minDate={today}
                    renderInput={(params) => <TextField {...params} fullWidth />}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <DatePicker
                    label="End Date"
                    value={endDate}
                    onChange={handleEndDateChange}
                    minDate={startDate}
                    renderInput={(params) => <TextField {...params} fullWidth />}
                  />
                </Grid>
              </Grid>
            </LocalizationProvider>
          </Grid>

          {/* Weekday Selection */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Select Weekdays
            </Typography>
            <FormControl component="fieldset">
              <FormLabel component="legend">Available Days</FormLabel>
              <FormGroup row>
                {weekdays.map((day) => (
                  <Grid item xs={4} key={day}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={selectedWeekdays.includes(day)}
                          onChange={() => handleWeekdayToggle(day)}
                          name={day}
                        />
                      }
                      label={day}
                    />
                  </Grid>
                ))}
              </FormGroup>
            </FormControl>
          </Grid>

          <Divider sx={{ my: 2, width: '100%' }} />

          {/* Session Times */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Session Times
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Start Time"
                  type="time"
                  value={sessionStartTime}
                  onChange={(e) => setSessionStartTime(e.target.value)}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ step: 300 }} // 5 min
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="End Time"
                  type="time"
                  value={sessionEndTime}
                  onChange={(e) => setSessionEndTime(e.target.value)}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ step: 300 }} // 5 min
                />
              </Grid>
            </Grid>
          </Grid>

          {/* Slot Duration */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Select Slot Duration
            </Typography>
            <RadioGroup
              row
              value={slotDuration}
              onChange={(e) => setSlotDuration(e.target.value)}
            >
              <FormControlLabel value="15" control={<Radio />} label="15 min" />
              <FormControlLabel value="30" control={<Radio />} label="30 min" />
              <FormControlLabel value="60" control={<Radio />} label="60 min" />
            </RadioGroup>
          </Grid>

          {/* Consultation Type */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Consultation Type
            </Typography>
            <RadioGroup
              row
              value={consultationType}
              onChange={(e) => setConsultationType(e.target.value)}
            >
              <FormControlLabel value="Online" control={<Radio />} label="Online" />
              <FormControlLabel value="Walkin" control={<Radio />} label="Walk-in" />
            </RadioGroup>
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Save Schedule
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default AddSchedule;