import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { format, parse } from 'date-fns';
import axios from 'axios';

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

  const headers = {
    certificateID: '87CB817F-4F93-42E3-BF86-C260B0A27966'
  };

  const userData = JSON.parse(localStorage.getItem("userData"));
const userID = userData.userResponse?.patientId

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

  const handleDateChange = (e) => {
    const date = e.target.value;
    // Convert from YYYY-MM-DD to DD-MM-YYYY format
    const [year, month, day] = date.split('-');
    const formattedDate = `${day}-${month}-${year}`;
    
    if (availableDates.includes(formattedDate)) {
      setSelectedDate(formattedDate);
      setSelectedSlot(null);
      setBookingSuccess(false);
    } else {
      setError('Selected date is not available');
    }
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
  
      // Helper to remove AM/PM and trim time
      const formatTime = (timeStr) => {
        return timeStr.replace(/AM|PM|\s/g, '');
      };
  
      const bookingData = {
        doctorId: selectedSlot.doctorId,
        doctorName: selectedSlot.doctorName,
        date: selectedSlot.date,
        slotId: selectedSlot.slotId,
        bookedBy: "Patient", // Changed from "Patient"
        patientPhno: patientDetails.patientPhno,
        patientId: userID,
        patientName: patientDetails.patientName,
        transactionDate: format(new Date(), 'dd-MM-yyyy'),
        slotIn: formatTime(selectedSlot.slotIn),   // e.g., "10:30"
        slotOut: formatTime(selectedSlot.slotOut), // e.g., "11:00"
        paymentMode: patientDetails.paymentMode,
        txnNo: "TXN" + Math.floor(100000000 + Math.random() * 900000000), // Format: TXN123456789
        slotType: selectedSlot.slotType // Should be like "Consultation"
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
  

  // Get min and max dates for the date picker
  const getMinMaxDates = () => {
    if (availableDates.length === 0) return { min: '', max: '' };
    
    const parsedDates = availableDates.map(date => {
      const [day, month, year] = date.split('-');
      return new Date(`${year}-${month}-${day}`);
    });
    
    const minDate = new Date(Math.min(...parsedDates));
    const maxDate = new Date(Math.max(...parsedDates));
    
    return {
      min: format(minDate, 'yyyy-MM-dd'),
      max: format(maxDate, 'yyyy-MM-dd')
    };
  };

  const { min, max } = getMinMaxDates();

  return (
    <div className="container mx-auto p-4 text-center">
    <h1 className="text-2xl font-bold mb-6">Book Appointment</h1>
  
    {loading && !selectedDate && <p className="text-blue-500 text-center">Loading available dates...</p>}
    {error && <p className="text-red-500">{error}</p>}
    {bookingSuccess && (
      <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 text-center">
        Appointment booked successfully!
      </div>
    )}
  
    {/* Show available date buttons after loading */}
    {!loading && availableDates.length > 0 && (
      <div>
        <h2 className="text-lg font-semibold mb-4">Select Available Date</h2>
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {availableDates.map((date) => (
            <button
              key={date}
              onClick={() => {
                setSelectedDate(date);
                setSelectedSlot(null);
                setBookingSuccess(false);
              }}
              className={`py-2 px-4 rounded-md border ${
                selectedDate === date ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800'
              } hover:bg-blue-100 transition`}
            >
              {date}
            </button>
          ))}
        </div>
      </div>
    )}
  
    {/* Show slots when a date is selected */}
    {selectedDate && (
      <>
        {loading ? (
          <p className="text-blue-500 text-center">Loading slots...</p>
        ) : (
          <div>
            <h2 className="text-lg font-semibold mb-4">
              Available Slots for {format(parse(selectedDate, 'dd-MM-yyyy', new Date()), 'MMMM dd, yyyy')}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center mb-6">
              {slots.map((slot) => (
                <button
                  key={slot.slotId}
                  onClick={() => handleSlotSelect(slot)}
                  className={`py-3 px-4 rounded-md text-sm font-medium transition ${
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
          </div>
        )}
      </>
    )}
  
    {/* Show patient form only when slot is selected */}
    {selectedSlot && (
      <div className="bg-gray-100 p-6 rounded-lg max-w-md mx-auto">
        <h3 className="font-semibold mb-4">Patient Details</h3>
        <div className="space-y-4 text-left">
          <div>
            <label className="block text-sm font-medium">Full Name</label>
            <input
              type="text"
              name="patientName"
              value={patientDetails.patientName}
              onChange={handleInputChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Phone Number</label>
            <input
              type="tel"
              name="patientPhno"
              value={patientDetails.patientPhno}
              onChange={handleInputChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Payment Mode</label>
            <select
              name="paymentMode"
              value={patientDetails.paymentMode}
              onChange={handleInputChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="Cash">Cash</option>
              <option value="Online">Online</option>
              <option value="Cash">Debit</option>
              <option value="Online">Credit</option>
            </select>
          </div>
        </div>
  
        <button
          onClick={handleBookAppointment}
          className="mt-6 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? 'Booking...' : 'Book Appointment'}
        </button>
      </div>
    )}
  </div>
  
  );
};

export default BookAppointment;