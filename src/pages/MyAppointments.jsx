import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";
import { motion, AnimatePresence } from "framer-motion";

const MyAppointments = () => {
  const { backendUrl, token } = useContext(AppContext);
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [payment, setPayment] = useState("");
  const [loading, setLoading] = useState(true);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_");
    return (
      dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    );
  };

  const getUserAppointments = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(backendUrl + "/api/user/appointments", {
        headers: { token },
      });
      setAppointments(data.appointments.reverse());
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/cancel-appointment",
        { appointmentId },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Appointment Payment",
      description: "Appointment Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const { data } = await axios.post(
            backendUrl + "/api/user/verifyRazorpay",
            response,
            { headers: { token } }
          );
          if (data.success) {
            navigate("/my-appointments");
            getUserAppointments();
          }
        } catch (error) {
          console.log(error);
          toast.error(error.message);
        }
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const appointmentRazorpay = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/payment-razorpay",
        { appointmentId },
        { headers: { token } }
      );
      if (data.success) {
        initPay(data.order);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const appointmentStripe = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/payment-stripe",
        { appointmentId },
        { headers: { token } }
      );
      if (data.success) {
        const { session_url } = data;
        window.location.replace(session_url);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto px-4 py-8"
    >
      <motion.h1
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        className="text-2xl md:text-3xl font-bold text-blue-800 mb-6 pb-2 border-b border-blue-100"
      >
        My Appointments
      </motion.h1>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : appointments.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className="text-gray-500 text-lg">No appointments found</p>
        </motion.div>
      ) : (
        <AnimatePresence>
          {appointments.map((item, index) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              exit={{ opacity: 0 }}
              className="bg-white rounded-xl shadow-md overflow-hidden mb-6 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="md:flex">
                <div className="md:w-1/4 p-4 flex justify-center">
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    className="w-full h-48 md:h-full object-cover rounded-lg bg-blue-50"
                    src={item.docData.image}
                    alt="Doctor"
                  />
                </div>

                <div className="md:w-2/4 p-6">
                  <h2 className="text-xl font-bold text-blue-900">
                    {item.docData.name}
                  </h2>
                  <p className="text-blue-600 font-medium">
                    {item.docData.speciality}
                  </p>

                  <div className="mt-4">
                    <h3 className="text-sm font-semibold text-blue-800">
                      Address:
                    </h3>
                    <p className="text-gray-600">
                      {item.docData.address.line1}
                    </p>
                    <p className="text-gray-600">
                      {item.docData.address.line2}
                    </p>
                  </div>

                  <div className="mt-4">
                    <h3 className="text-sm font-semibold text-blue-800">
                      Date & Time:
                    </h3>
                    <p className="text-gray-700">
                      {slotDateFormat(item.slotDate)} | {item.slotTime}
                    </p>
                  </div>
                </div>

                <div className="md:w-1/4 p-6 flex flex-col justify-center space-y-3">
                  {!item.cancelled &&
                    !item.payment &&
                    !item.isCompleted &&
                    payment !== item._id && (
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setPayment(item._id)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Pay Online
                      </motion.button>
                    )}

                  {!item.cancelled &&
                    !item.payment &&
                    !item.isCompleted &&
                    payment === item._id && (
                      <div className="space-y-3">
                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => appointmentStripe(item._id)}
                          className="w-full px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center"
                        >
                          <img
                            className="h-6"
                            src={assets.stripe_logo}
                            alt="Stripe"
                          />
                        </motion.button>
                      </div>
                    )}

                  {!item.cancelled && item.payment && !item.isCompleted && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-3"
                    >
                      <div className="px-4 py-2 bg-green-100 text-green-800 rounded-lg text-center">
                        Paid
                      </div>
                      {item.scanImage && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="mt-3"
                        >
                          <h3 className="text-sm font-semibold text-blue-800 mb-2">
                            Uploaded Scan:
                          </h3>
                          <a
                            href={item.scanImage}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-center"
                          >
                            View Scan
                          </a>
                        </motion.div>
                      )}
                    </motion.div>
                  )}

                  {item.isCompleted && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-3"
                    >
                      {item.scanImage && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          <a
                            href={item.scanImage}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-center"
                          >
                            View File
                          </a>
                        </motion.div>
                      )}
                      <div className="px-4 py-2 border border-green-500 text-green-500 rounded-lg text-center">
                        Completed
                      </div>
                    </motion.div>
                  )}

                  {!item.cancelled && !item.isCompleted && (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => cancelAppointment(item._id)}
                      className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                    >
                      Cancel Appointment
                    </motion.button>
                  )}

                  {item.cancelled && !item.isCompleted && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="px-4 py-2 border border-red-500 text-red-500 rounded-lg text-center"
                    >
                      Cancelled
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      )}
    </motion.div>
  );
};

export default MyAppointments;
