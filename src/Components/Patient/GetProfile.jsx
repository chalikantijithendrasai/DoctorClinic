import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

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
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
  
  if (error) return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative max-w-md mx-auto mt-8" role="alert">
      <strong className="font-bold">Error: </strong>
      <span className="block sm:inline">{error}</span>
    </div>
  );
  
  if (!profile) return (
    <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative max-w-md mx-auto mt-8" role="alert">
      No patient profile data found
    </div>
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
    <div className="container mx-auto p-4 max-w-6xl">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-700 p-6 text-white">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Patient Profile</h1>
              <p className="mt-1">{profile.patientName}</p>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`px-4 py-2 rounded font-medium ${isEditing ? 'bg-white text-blue-600 hover:bg-gray-100' : 'bg-blue-600 text-white hover:bg-blue-700'} transition-colors`}
            >
              {isEditing ? 'Cancel Editing' : 'Edit Profile'}
            </button>
          </div>
        </div>

        {/* Profile Content */}
        <div className="p-6">
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {/* Personal Information Card */}
              <div className="bg-gray-50 p-5 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                  Personal Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Patient Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="patientName"
                        value={formData.patientName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    ) : (
                      <p className="text-gray-900 bg-gray-100 p-2 rounded">{profile.patientName}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    ) : (
                      <p className="text-gray-900 bg-gray-100 p-2 rounded">{profile.email}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date of Birth
                    </label>
                    {isEditing ? (
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    ) : (
                      <p className="text-gray-900 bg-gray-100 p-2 rounded">{formatDisplayDate(profile.dateOfBirth)}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Primary Phone
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        name="primaryPhone"
                        value={formData.primaryPhone}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    ) : (
                      <p className="text-gray-900 bg-gray-100 p-2 rounded">{profile.primaryPhone}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Secondary Phone
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        name="secondaryPhone"
                        value={formData.secondaryPhone}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    ) : (
                      <p className="text-gray-900 bg-gray-100 p-2 rounded">{profile.secondaryPhone || '-'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Gender
                    </label>
                    {isEditing ? (
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        required
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    ) : (
                      <p className="text-gray-900 bg-gray-100 p-2 rounded">{profile.gender || '-'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Blood Group
                    </label>
                    {isEditing ? (
                      <select
                        name="bloodGroup"
                        value={formData.bloodGroup}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select Blood Group</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                      </select>
                    ) : (
                      <p className="text-gray-900 bg-gray-100 p-2 rounded">{profile.bloodGroup || '-'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Marital Status
                    </label>
                    {isEditing ? (
                      <select
                        name="maritalStatus"
                        value={formData.maritalStatus}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select Marital Status</option>
                        <option value="Single">Single</option>
                        <option value="Married">Married</option>
                        <option value="Divorced">Divorced</option>
                        <option value="Widowed">Widowed</option>
                      </select>
                    ) : (
                      <p className="text-gray-900 bg-gray-100 p-2 rounded">{profile.maritalStatus || '-'}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Address Information Card */}
              <div className="bg-gray-50 p-5 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                  Address Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address Line 1
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="addressLine1"
                        value={formData.addressLine1}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    ) : (
                      <p className="text-gray-900 bg-gray-100 p-2 rounded">{profile.addressLine1 || '-'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address Line 2
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="addressLine2"
                        value={formData.addressLine2}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    ) : (
                      <p className="text-gray-900 bg-gray-100 p-2 rounded">{profile.addressLine2 || '-'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City/Town
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="cityOrTown"
                        value={formData.cityOrTown}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    ) : (
                      <p className="text-gray-900 bg-gray-100 p-2 rounded">{profile.cityOrTown || '-'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      District
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="district"
                        value={formData.district}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    ) : (
                      <p className="text-gray-900 bg-gray-100 p-2 rounded">{profile.district || '-'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      State
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    ) : (
                      <p className="text-gray-900 bg-gray-100 p-2 rounded">{profile.state || '-'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Country
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    ) : (
                      <p className="text-gray-900 bg-gray-100 p-2 rounded">{profile.country || '-'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Pincode
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    ) : (
                      <p className="text-gray-900 bg-gray-100 p-2 rounded">{profile.pincode || '-'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Landmark
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="landmark"
                        value={formData.landmark}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    ) : (
                      <p className="text-gray-900 bg-gray-100 p-2 rounded">{profile.landmark || '-'}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Emergency & Insurance Information Card */}
              <div className="bg-gray-50 p-5 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                  Emergency & Insurance Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Emergency Contact
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        name="emergencyContact"
                        value={formData.emergencyContact}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    ) : (
                      <p className="text-gray-900 bg-gray-100 p-2 rounded">{profile.emergencyContact || '-'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Emergency Contact Relation
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="emergencyContactRelation"
                        value={formData.emergencyContactRelation}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    ) : (
                      <p className="text-gray-900 bg-gray-100 p-2 rounded">{profile.emergencyContactRelation || '-'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Insurance Policy Issued By
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="insurancePolicyIssuedBy"
                        value={formData.insurancePolicyIssuedBy}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    ) : (
                      <p className="text-gray-900 bg-gray-100 p-2 rounded">{profile.insurancePolicyIssuedBy || '-'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Insurance Policy No
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="insurancePolicyNo"
                        value={formData.insurancePolicyNo}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    ) : (
                      <p className="text-gray-900 bg-gray-100 p-2 rounded">{profile.insurancePolicyNo || '-'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Insurance Validity
                    </label>
                    {isEditing ? (
                      <input
                        type="date"
                        name="insuranceValidity"
                        value={formData.insuranceValidity}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    ) : (
                      <p className="text-gray-900 bg-gray-100 p-2 rounded">{formatDisplayDate(profile.insuranceValidity)}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Representative & Documents Information Card */}
              <div className="bg-gray-50 p-5 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                  Representative & Documents
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Representative
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="representative"
                        value={formData.representative}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    ) : (
                      <p className="text-gray-900 bg-gray-100 p-2 rounded">{profile.representative || '-'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Representative Type
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="representativeType"
                        value={formData.representativeType}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    ) : (
                      <p className="text-gray-900 bg-gray-100 p-2 rounded">{profile.representativeType || '-'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ID Proof Type
                    </label>
                    {isEditing ? (
                      <select
                        name="idProof"
                        value={formData.idProof}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select ID Proof</option>
                        <option value="Passport">Passport</option>
                        <option value="Driver License">Driver License</option>
                        <option value="Aadhar Card">Aadhar Card</option>
                        <option value="PAN Card">PAN Card</option>
                        <option value="Voter ID">Voter ID</option>
                      </select>
                    ) : (
                      <p className="text-gray-900 bg-gray-100 p-2 rounded">{profile.idProof || '-'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ID Proof Location
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="idProofLoc"
                        value={formData.idProofLoc}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    ) : (
                      <p className="text-gray-900 bg-gray-100 p-2 rounded">{profile.idProofLoc || '-'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address Proof Type
                    </label>
                    {isEditing ? (
                      <select
                        name="addressProof"
                        value={formData.addressProof}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select Address Proof</option>
                        <option value="Utility Bill">Utility Bill</option>
                        <option value="Bank Statement">Bank Statement</option>
                        <option value="Rental Agreement">Rental Agreement</option>
                        <option value="Aadhar Card">Aadhar Card</option>
                      </select>
                    ) : (
                      <p className="text-gray-900 bg-gray-100 p-2 rounded">{profile.addressProof || '-'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address Proof Location
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="addressProofLoc"
                        value={formData.addressProofLoc}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    ) : (
                      <p className="text-gray-900 bg-gray-100 p-2 rounded">{profile.addressProofLoc || '-'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Profile Picture Location
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="profilePicLoc"
                        value={formData.profilePicLoc}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    ) : (
                      <p className="text-gray-900 bg-gray-100 p-2 rounded">{profile.profilePicLoc || '-'}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {isEditing && (
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Saving...
                    </>
                  ) : 'Save Changes'}
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;