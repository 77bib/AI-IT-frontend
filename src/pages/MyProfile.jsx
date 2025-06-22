import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";

const MyProfile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [premiumStatus, setPremiumStatus] = useState(null);
  const { token, backendUrl, userData, setUserData, loadUserProfileData } =
    useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      getPremiumStatus();
    }
  }, [token]);

  const getPremiumStatus = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/premium/status", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPremiumStatus(response.data);
    } catch (error) {
      console.error("Error fetching premium status:", error);
    }
  };

  const updateUserProfileData = async () => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("address", JSON.stringify(userData.address));
      formData.append("gender", userData.gender);
      formData.append("dob", userData.dob);
      image && formData.append("image", image);

      const { data } = await axios.post(
        backendUrl + "/api/user/update-profile",
        formData,
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePremiumClick = () => {
    if (premiumStatus?.isPremium) {
      navigate('/upload-analysis');
    } else {
      navigate('/premium');
    }
  };

  if (!userData) return null;

  return (
    <div className="max-w-2xl mx-auto p-6 animate-fade-in">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white">
          <div className="flex items-center space-x-6">
            {isEdit ? (
              <label htmlFor="image" className="cursor-pointer group relative">
                <div className="relative">
                  <img
                    className="w-24 h-24 rounded-full border-4 border-white/80 object-cover group-hover:opacity-80 transition-opacity duration-200"
                    src={image ? URL.createObjectURL(image) : userData.image}
                    alt="Profile"
                  />
                  {!image && (
                    <div className="absolute inset-0 bg-black/30 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <img
                        className="w-8 h-8"
                        src={assets.upload_icon}
                        alt="Upload"
                      />
                    </div>
                  )}
                </div>
                <input
                  onChange={(e) => setImage(e.target.files[0])}
                  type="file"
                  id="image"
                  className="hidden"
                  accept="image/*"
                />
              </label>
            ) : (
              <div className="relative group">
                <img
                  className="w-24 h-24 rounded-full border-4 border-white/80 object-cover"
                  src={userData.image}
                  alt="Profile"
                />
              </div>
            )}

            <div className="flex-1">
              {isEdit ? (
                <input
                  className="bg-white/20 text-2xl font-bold w-full p-2 rounded focus:outline-none focus:ring-2 focus:ring-white transition-all duration-200"
                  type="text"
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  value={userData.name}
                />
              ) : (
                <h1 className="text-2xl font-bold">{userData.name}</h1>
              )}
              <p className="text-blue-100">{userData.email}</p>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="p-6 space-y-6">
          {/* Contact Information */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-blue-700 border-b border-blue-100 pb-2">
              Contact Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Email
                </label>
                <div className="text-gray-700 p-2 bg-gray-50 rounded">
                  {userData.email}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Phone
                </label>
                {isEdit ? (
                  <input
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                    type="text"
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
                    }
                    value={userData.phone}
                  />
                ) : (
                  <div className="text-gray-700 p-2 bg-gray-50 rounded">
                    {userData.phone}
                  </div>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Address
                </label>
                {isEdit ? (
                  <div className="space-y-2">
                    <input
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                      type="text"
                      onChange={(e) =>
                        setUserData((prev) => ({
                          ...prev,
                          address: { ...prev.address, line1: e.target.value },
                        }))
                      }
                      value={userData.address.line1}
                      placeholder="Address line 1"
                    />
                    <input
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                      type="text"
                      onChange={(e) =>
                        setUserData((prev) => ({
                          ...prev,
                          address: { ...prev.address, line2: e.target.value },
                        }))
                      }
                      value={userData.address.line2}
                      placeholder="Address line 2"
                    />
                  </div>
                ) : (
                  <div className="text-gray-700 p-2 bg-gray-50 rounded">
                    {userData.address.line1}
                    <br />
                    {userData.address.line2}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Basic Information */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-blue-700 border-b border-blue-100 pb-2">
              Basic Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Gender
                </label>
                {isEdit ? (
                  <select
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        gender: e.target.value,
                      }))
                    }
                    value={userData.gender}
                  >
                    <option value="Not Selected">Not Selected</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                ) : (
                  <div className="text-gray-700 p-2 bg-gray-50 rounded">
                    {userData.gender}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Birthday
                </label>
                {isEdit ? (
                  <input
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                    type="date"
                    onChange={(e) =>
                      setUserData((prev) => ({ ...prev, dob: e.target.value }))
                    }
                    value={userData.dob}
                  />
                ) : (
                  <div className="text-gray-700 p-2 bg-gray-50 rounded">
                    {userData.dob}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Premium Status Section */}
          <div className="p-6 border-t border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-blue-700">
                Premium Status
              </h2>
              <div 
                onClick={() => userData?.isPremium && navigate('/upload-analysis')}
                className={`inline-flex items-center px-4 py-2 rounded-lg 
                  ${userData?.isPremium 
                    ? 'bg-green-100 text-green-800 cursor-pointer hover:bg-green-200' 
                    : 'bg-gray-100 text-gray-800'
                  } transition duration-200`}
              >
                <span className="mr-2">Premium Status:</span>
                <span className={`font-semibold ${userData?.isPremium ? 'text-green-600' : 'text-gray-600'}`}>
                  {userData?.isPremium ? 'Active' : 'Inactive'}
                </span>
                {userData?.isPremium && (
                  <svg 
                    className="w-4 h-4 ml-2" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M14 5l7 7m0 0l-7 7m7-7H3" 
                    />
                  </svg>
                )}
              </div>
            </div>

            {!userData?.isPremium && (
              <button
                onClick={() => navigate('/premium')}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
              >
                Upgrade to Premium
              </button>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end pt-4">
            {isEdit ? (
              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    setIsEdit(false);
                    setImage(false);
                  }}
                  className="px-6 py-2 border border-gray-300 rounded-full text-gray-600 hover:bg-gray-100 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={updateUserProfileData}
                  disabled={isLoading}
                  className={`px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-200 flex items-center ${
                    isLoading ? "opacity-75" : ""
                  }`}
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsEdit(true)}
                className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-200 hover:scale-105 transform"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
