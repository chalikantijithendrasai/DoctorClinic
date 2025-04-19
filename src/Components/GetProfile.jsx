// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// const GetProfile = () => {
//   const { id, name } = useParams();
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState({});

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         setLoading(true);
//         let url = '';
        
//         if (name === 'DOCTOR') {
//           url = `https://globalnewtrading.com:8443/HealthApp/api/getDoctorById?doctorId=${id}`;
//         } else {
//           url = `https://globalnewtrading.com:8443/HealthApp/api/getPatientById?patientId=${id}`;
//         }

//         const response = await axios.post(url, {}, {
//           headers: {
//             Accept: "application/json",
//             "Content-Type": "application/json",
//             certificateID: "87CB817F-4F93-42E3-BF86-C260B0A27966",
//           },
//         });

//         setProfile(response.data.data);
//         setFormData(response.data.data);
//       } catch (err) {
//         setError(err.message);
//         console.error("Failed to fetch profile:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, [id, name]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleArrayChange = (field, index, value) => {
//     setFormData(prev => {
//       const newArray = [...prev[field]];
//       newArray[index] = value;
//       return {
//         ...prev,
//         [field]: newArray
//       };
//     });
//   };

//   const addArrayItem = (field) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: [...(prev[field] || []), '']
//     }));
//   };

//   const removeArrayItem = (field, index) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: prev[field].filter((_, i) => i !== index)
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       setLoading(true);
//       let url = '';
      
//       if (name === 'DOCTOR') {
//         url = `https://globalnewtrading.com:8443/HealthApp/api/updateDoctor`;
//       } else {
//         url = `https://globalnewtrading.com:8443/HealthApp/api/updatePatient`;
//       }

//       const response = await axios.post(url, formData, {
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//           certificateID: "87CB817F-4F93-42E3-BF86-C260B0A27966",
//         },
//       });

//       setProfile(response.data.data);
//       setIsEditing(false);
//       alert('Profile updated successfully!');
//     } catch (err) {
//       setError(err.message);
//       console.error("Failed to update profile:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) return (
//     <div className="flex justify-center items-center h-screen">
//       <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//     </div>
//   );
  
//   if (error) return (
//     <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative max-w-md mx-auto mt-8" role="alert">
//       <strong className="font-bold">Error: </strong>
//       <span className="block sm:inline">{error}</span>
//     </div>
//   );
  
//   if (!profile) return (
//     <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative max-w-md mx-auto mt-8" role="alert">
//       No profile data found
//     </div>
//   );

//   return (
//     <div className="container mx-auto p-4 max-w-6xl">
//       <div className="bg-white rounded-lg shadow-lg overflow-hidden">
//         {/* Profile Header */}
//         <div className="bg-gradient-to-r from-blue-500 to-blue-700 p-6 text-white">
//           <div className="flex justify-between items-center">
//             <div>
//               <h1 className="text-2xl font-bold">
//                 {name === 'DOCTOR' ? 'Doctor' : 'Patient'} Profile
//               </h1>
//               {name === 'DOCTOR' ? (
//                 <p className="mt-1">{profile.doctorFirstName} {profile.doctorLastName}</p>
//               ) : (
//                 <p className="mt-1">{profile.patientName}</p>
//               )}
//             </div>
//             <button
//               onClick={() => setIsEditing(!isEditing)}
//               className={`px-4 py-2 rounded font-medium ${isEditing ? 'bg-white text-blue-600 hover:bg-gray-100' : 'bg-blue-600 text-white hover:bg-blue-700'} transition-colors`}
//             >
//               {isEditing ? 'Cancel Editing' : 'Edit Profile'}
//             </button>
//           </div>
//         </div>

//         {/* Profile Content */}
//         <div className="p-6">
//           <form onSubmit={handleSubmit}>
//             {name === 'DOCTOR' ? (
//               <div className="space-y-6">
//                 {/* Personal Information Card */}
//                 <div className="bg-gray-50 p-5 rounded-lg shadow-sm">
//                   <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
//                     Personal Information
//                   </h2>
//                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         First Name
//                       </label>
//                       {isEditing ? (
//                         <input
//                           type="text"
//                           name="doctorFirstName"
//                           value={formData.doctorFirstName || ''}
//                           onChange={handleInputChange}
//                           className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                         />
//                       ) : (
//                         <p className="text-gray-900 bg-gray-100 p-2 rounded">{profile.doctorFirstName}</p>
//                       )}
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Middle Name
//                       </label>
//                       {isEditing ? (
//                         <input
//                           type="text"
//                           name="doctorMiddleName"
//                           value={formData.doctorMiddleName || ''}
//                           onChange={handleInputChange}
//                           className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                         />
//                       ) : (
//                         <p className="text-gray-900 bg-gray-100 p-2 rounded">{profile.doctorMiddleName || '-'}</p>
//                       )}
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Last Name
//                       </label>
//                       {isEditing ? (
//                         <input
//                           type="text"
//                           name="doctorLastName"
//                           value={formData.doctorLastName || ''}
//                           onChange={handleInputChange}
//                           className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                         />
//                       ) : (
//                         <p className="text-gray-900 bg-gray-100 p-2 rounded">{profile.doctorLastName}</p>
//                       )}
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Qualification
//                       </label>
//                       {isEditing ? (
//                         <input
//                           type="text"
//                           name="doctorQualification"
//                           value={formData.doctorQualification || ''}
//                           onChange={handleInputChange}
//                           className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                         />
//                       ) : (
//                         <p className="text-gray-900 bg-gray-100 p-2 rounded">{profile.doctorQualification}</p>
//                       )}
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Email
//                       </label>
//                       {isEditing ? (
//                         <input
//                           type="email"
//                           name="email"
//                           value={formData.email || ''}
//                           onChange={handleInputChange}
//                           className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                         />
//                       ) : (
//                         <p className="text-gray-900 bg-gray-100 p-2 rounded">{profile.email}</p>
//                       )}
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Primary Phone
//                       </label>
//                       {isEditing ? (
//                         <input
//                           type="text"
//                           name="primaryPhone"
//                           value={formData.primaryPhone || ''}
//                           onChange={handleInputChange}
//                           className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                         />
//                       ) : (
//                         <p className="text-gray-900 bg-gray-100 p-2 rounded">{profile.primaryPhone}</p>
//                       )}
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Gender
//                       </label>
//                       {isEditing ? (
//                         <select
//                           name="gender"
//                           value={formData.gender || ''}
//                           onChange={handleInputChange}
//                           className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                         >
//                           <option value="Male">Male</option>
//                           <option value="Female">Female</option>
//                           <option value="Other">Other</option>
//                         </select>
//                       ) : (
//                         <p className="text-gray-900 bg-gray-100 p-2 rounded">{profile.gender}</p>
//                       )}
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Doctor Fee
//                       </label>
//                       {isEditing ? (
//                         <input
//                           type="text"
//                           name="doctorFee"
//                           value={formData.doctorFee || ''}
//                           onChange={handleInputChange}
//                           className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                         />
//                       ) : (
//                         <p className="text-gray-900 bg-gray-100 p-2 rounded">{profile.doctorFee}</p>
//                       )}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Languages Card */}
//                 <div className="bg-gray-50 p-5 rounded-lg shadow-sm">
//                   <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
//                     Languages
//                   </h2>
//                   {isEditing ? (
//                     <div className="space-y-3">
//                       {formData.languages?.map((language, index) => (
//                         <div key={index} className="flex items-center space-x-2">
//                           <input
//                             type="text"
//                             value={language}
//                             onChange={(e) => handleArrayChange('languages', index, e.target.value)}
//                             className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                           />
//                           <button
//                             type="button"
//                             onClick={() => removeArrayItem('languages', index)}
//                             className="px-3 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
//                           >
//                             Remove
//                           </button>
//                         </div>
//                       ))}
//                       <button
//                         type="button"
//                         onClick={() => addArrayItem('languages')}
//                         className="mt-2 px-3 py-1 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors"
//                       >
//                         + Add Language
//                       </button>
//                     </div>
//                   ) : (
//                     <div className="flex flex-wrap gap-2">
//                       {profile.languages?.length > 0 ? (
//                         profile.languages.map((language, index) => (
//                           <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
//                             {language}
//                           </span>
//                         ))
//                       ) : (
//                         <p className="text-gray-500">No languages specified</p>
//                       )}
//                     </div>
//                   )}
//                 </div>

//                 {/* About Yourself Card */}
//                 <div className="bg-gray-50 p-5 rounded-lg shadow-sm">
//                   <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
//                     About Yourself
//                   </h2>
//                   {isEditing ? (
//                     <textarea
//                       name="aboutSelf"
//                       value={formData.aboutSelf || ''}
//                       onChange={handleInputChange}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                       rows="4"
//                     />
//                   ) : (
//                     <p className="text-gray-700 whitespace-pre-line bg-gray-100 p-3 rounded">
//                       {profile.aboutSelf || 'No information provided'}
//                     </p>
//                   )}
//                 </div>
//               </div>
//             ) : (
//               <div className="space-y-6">
//                 {/* Patient Information Card */}
//                 <div className="bg-gray-50 p-5 rounded-lg shadow-sm">
//                   <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
//                     Personal Information
//                   </h2>
//                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Patient Name
//                       </label>
//                       {isEditing ? (
//                         <input
//                           type="text"
//                           name="patientName"
//                           value={formData.patientName || ''}
//                           onChange={handleInputChange}
//                           className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                         />
//                       ) : (
//                         <p className="text-gray-900 bg-gray-100 p-2 rounded">{profile.patientName}</p>
//                       )}
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Email
//                       </label>
//                       {isEditing ? (
//                         <input
//                           type="email"
//                           name="email"
//                           value={formData.email || ''}
//                           onChange={handleInputChange}
//                           className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                         />
//                       ) : (
//                         <p className="text-gray-900 bg-gray-100 p-2 rounded">{profile.email}</p>
//                       )}
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Date of Birth
//                       </label>
//                       {isEditing ? (
//                         <input
//                           type="date"
//                           name="dateOfBirth"
//                           value={formData.dateOfBirth || ''}
//                           onChange={handleInputChange}
//                           className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                         />
//                       ) : (
//                         <p className="text-gray-900 bg-gray-100 p-2 rounded">{profile.dateOfBirth || '-'}</p>
//                       )}
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Primary Phone
//                       </label>
//                       {isEditing ? (
//                         <input
//                           type="text"
//                           name="primaryPhone"
//                           value={formData.primaryPhone || ''}
//                           onChange={handleInputChange}
//                           className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                         />
//                       ) : (
//                         <p className="text-gray-900 bg-gray-100 p-2 rounded">{profile.primaryPhone}</p>
//                       )}
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Secondary Phone
//                       </label>
//                       {isEditing ? (
//                         <input
//                           type="text"
//                           name="secondaryPhone"
//                           value={formData.secondaryPhone || ''}
//                           onChange={handleInputChange}
//                           className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                         />
//                       ) : (
//                         <p className="text-gray-900 bg-gray-100 p-2 rounded">{profile.secondaryPhone || '-'}</p>
//                       )}
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Gender
//                       </label>
//                       {isEditing ? (
//                         <select
//                           name="gender"
//                           value={formData.gender || ''}
//                           onChange={handleInputChange}
//                           className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                         >
//                           <option value="male">Male</option>
//                           <option value="female">Female</option>
//                           <option value="other">Other</option>
//                         </select>
//                       ) : (
//                         <p className="text-gray-900 bg-gray-100 p-2 rounded">{profile.gender}</p>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {isEditing && (
//               <div className="mt-6 flex justify-end space-x-3">
//                 <button
//                   type="button"
//                   onClick={() => setIsEditing(false)}
//                   className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//                   disabled={loading}
//                 >
//                   {loading ? (
//                     <>
//                       <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                       </svg>
//                       Saving...
//                     </>
//                   ) : 'Save Changes'}
//                 </button>
//               </div>
//             )}
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default GetProfile;