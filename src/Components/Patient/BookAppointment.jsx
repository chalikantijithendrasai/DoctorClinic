import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { format, parse, isSameDay, addDays } from 'date-fns';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

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
  const userID = userData.userResponse?.patientId;

  // Fetch available dates for the doctor
  useEffect(() => {
    const fetchAvailableDates = async () => {
      try {
        setLoading(true);
        const response = await axios.post(
          `https://globalnewtrading.com:8443/HealthApp/api/getDoctorSchedules?doctorId=${doctorId}`,
          {},
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              certificateID: "87CB817F-4F93-42E3-BF86-C260B0A27966",
            },
          }
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

  // Fetch slots when date is selected
  useEffect(() => {
    if (selectedDate) {
      const fetchSlots = async () => {
        try {
          setLoading(true);
          const response = await axios.post(
            `https://globalnewtrading.com:8443/HealthApp/api/getDoctorSlotsbyDate?doctorId=${doctorId}&date=${selectedDate}`,
            {},
            {
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                  certificateID: "87CB817F-4F93-42E3-BF86-C260B0A27966",
                },
              }
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
    
    // Parse the selected date and update calendar view
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
  
      // Format time to include AM/PM
      const formatTime = (timeStr) => {
        // If time is already in AM/PM format, return as is
        if (timeStr.includes('AM') || timeStr.includes('PM')) {
          return timeStr;
        }
        
        // Convert 24-hour format to 12-hour format with AM/PM
        const [hours, minutes] = timeStr.split(':');
        const hourNum = parseInt(hours, 10);
        const period = hourNum >= 12 ? 'PM' : 'AM';
        const hour12 = hourNum % 12 || 12;
        return `${hour12}:${minutes} ${period}`;
      };
  
      const bookingData = {
        doctorId: selectedSlot.doctorId,
        doctorName: `DR. ${selectedSlot.doctorName.split('DR. ').join('')}`, // Ensure "DR." prefix
        date: selectedSlot.date,
        slotId: selectedSlot.slotId,
        bookedBy: "Admin", // You can change this to "Admin" if needed
        patientPhno: patientDetails.patientPhno,
        patientId: userID,
        patientName: patientDetails.patientName,
        transactionDate: format(new Date(), 'dd-MM-yyyy'),
        slotIn: formatTime(selectedSlot.slotIn),
        slotOut: formatTime(selectedSlot.slotOut),
        paymentMode: patientDetails.paymentMode === 'Debit' ? 'Debit Card' : patientDetails.paymentMode, // Update payment mode format
        slotType: selectedSlot.slotType === 'Online' ? 'Consultation' : selectedSlot.slotType // Update slotType if needed
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

  // Convert available dates to Date objects for calendar highlighting
  const availableDateObjects = availableDates.map(date => {
    if (!date) return null;
    const [day, month, year] = date.split('-');
    return new Date(`${year}-${month}-${day}`);
  }).filter(date => date !== null);

  // Custom day component with proper null checks
  const DayContents = ({ date }) => {
    if (!date) return <div></div>;
    
    const isAvailable = availableDateObjects.some(d => isSameDay(d, date));
    return (
      <div className="relative">
        {date.getDate()}
        {isAvailable && <div className="availability-dot"></div>}
      </div>
    );
  };

  // Get min and max dates with null checks
  const getMinMaxDates = () => {
    if (availableDates.length === 0 || availableDateObjects.length === 0) {
      return { min: null, max: null };
    }
    
    const minDate = new Date(Math.min(...availableDateObjects.map(d => d.getTime())));
    const maxDate = new Date(Math.max(...availableDateObjects.map(d => d.getTime())));
    
    return {
      min: minDate,
      max: maxDate
    };
  };

  const { min, max } = getMinMaxDates();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Book Appointment</h1>
    
      {loading && !selectedDate && <p className="text-blue-500 text-center">Loading available dates...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}
      {bookingSuccess && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 text-center">
          Appointment booked successfully!
        </div>
      )}
    
      <div className="flex flex-col md:flex-row gap-8">
        {/* Calendar Section */}
        <div className="md:w-1/2">
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Select Date</h2>
            <DatePicker
        selected={calendarDate}
        onChange={handleCalendarChange}
        minDate={min}
        maxDate={max}
        inline
        filterDate={date => {
          if (!date) return false;
          return availableDateObjects.some(d => isSameDay(d, date));
        }}
        renderDayContents={DayContents}
        calendarClassName="border-0"
        dayClassName={date => {
          if (!date) return '';
          return availableDateObjects.some(d => isSameDay(d, date)) 
            ? 'bg-green-50 hover:bg-green-100' 
            : 'text-gray-400 cursor-not-allowed';
        }}
      />
            <style>{`
              .react-datepicker__day--selected, 
              .react-datepicker__day--keyboard-selected {
                background-color: #3b82f6;
                color: white;
              }
              .react-datepicker__day--selected:hover {
                background-color: #2563eb;
              }
              .availability-dot {
                height: 6px;
                width: 6px;
                background-color: #10b981;
                border-radius: 50%;
                display: inline-block;
                position: absolute;
                bottom: 2px;
                left: 50%;
                transform: translateX(-50%);
              }
            `}</style>
          </div>
        </div>
        
        {/* Available Dates and Slots Section */}
        <div className="md:w-1/2">
          {/* Show available date buttons after loading */}
          {!loading && availableDates.length > 0 && (
            <div className="bg-white p-4 rounded-lg shadow mb-6">
              <h2 className="text-lg font-semibold mb-4">Available Dates</h2>
              <div className="flex flex-wrap gap-2">
                {availableDates.map((date) => (
                  <button
                    key={date}
                    onClick={() => handleDateButtonClick(date)}
                    className={`py-2 px-3 rounded-md text-sm border ${
                      selectedDate === date 
                        ? 'bg-blue-500 text-white border-blue-500' 
                        : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-50'
                    } transition`}
                  >
                    {date}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Show slots when a date is selected */}
          {selectedDate && (
            <div className="bg-white p-4 rounded-lg shadow">
              {loading ? (
                <p className="text-blue-500 text-center">Loading slots...</p>
              ) : (
                <>
                  <h2 className="text-lg font-semibold mb-4">
                    Available Slots for {format(parse(selectedDate, 'dd-MM-yyyy', new Date()), 'MMMM dd, yyyy')}
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                    {slots.map((slot) => (
                      <button
                        key={slot.slotId}
                        onClick={() => handleSlotSelect(slot)}
                        className={`py-2 px-3 rounded-md text-sm font-medium transition ${
                          selectedSlot?.slotId === slot.slotId
                            ? 'bg-blue-500 text-white'
                            : slot.bookingStatus === 'open'
                            ? 'bg-green-100 text-green-800 hover:bg-green-200'
                            : 'bg-red-100 text-red-800 cursor-not-allowed'
                        }`}
                        disabled={slot.bookingStatus !== 'open'}
                      >
                        {slot.slotIn} - {slot.slotOut}
                        <div className="text-xs mt-1">{slot.consultFee ? `₹${slot.consultFee}` : 'Free'}</div>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
          
          {/* Show patient form only when slot is selected */}
          {selectedSlot && (
            <div className="bg-gray-50 p-6 rounded-lg mt-6">
              <h3 className="font-semibold mb-4 text-center">Patient Details</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Full Name</label>
                  <input
                    type="text"
                    name="patientName"
                    value={patientDetails.patientName}
                    onChange={handleInputChange}
                    className="w-full border rounded px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Phone Number</label>
                  <input
                    type="tel"
                    name="patientPhno"
                    value={patientDetails.patientPhno}
                    onChange={handleInputChange}
                    className="w-full border rounded px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Payment Mode</label>
                  <select
                    name="paymentMode"
                    value={patientDetails.paymentMode}
                    onChange={handleInputChange}
                    className="w-full border rounded px-3 py-2"
                  >
                    <option value="Cash">Cash</option>
                    <option value="Online">Online</option>
                    <option value="Debit">Debit Card</option>
                    <option value="Credit">Credit Card</option>
                  </select>
                </div>
              </div>
            
              <button
                onClick={handleBookAppointment}
                className="mt-6 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:bg-blue-300"
                disabled={loading}
              >
                {loading ? 'Booking...' : 'Book Appointment'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;