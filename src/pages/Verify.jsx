import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle } from 'lucide-react';

const Verify = () => {
    const [searchParams] = useSearchParams()
    const success = searchParams.get("success")
    const appointmentId = searchParams.get("appointmentId")
    const { backendUrl, token } = useContext(AppContext)
    const navigate = useNavigate()
    const [verificationStatus, setVerificationStatus] = useState('verifying')

    // Function to verify stripe payment
    const verifyStripe = async () => {
        try {
            const { data } = await axios.post(
                backendUrl + "/api/user/verifyStripe", 
                { success, appointmentId }, 
                { headers: { token } }
            )

            if (data.success) {
                setVerificationStatus('success')
                toast.success(data.message)
            } else {
                setVerificationStatus('error')
                toast.error(data.message)
            }

            // Navigate after showing status for a moment
            setTimeout(() => navigate("/my-appointments"), 2000)

        } catch (error) {
            setVerificationStatus('error')
            toast.error(error.message)
            console.error(error)
            setTimeout(() => navigate("/my-appointments"), 2000)
        }
    }

    useEffect(() => {
        if (token && appointmentId && success) {
            verifyStripe()
        } else {
            navigate("/my-appointments")
        }
    }, [token])

    return (
        <div className='min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4'>
            <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl shadow-xl p-8 max-w-md w-full text-center"
            >
                {verificationStatus === 'verifying' ? (
                    <motion.div
                        animate={{ 
                            rotate: 360,
                            transition: { 
                                repeat: Infinity, 
                                duration: 1, 
                                ease: "linear" 
                            }
                        }}
                        className="flex flex-col items-center"
                    >
                        <div className="w-20 h-20 border-4 border-blue-100 border-t-blue-600 rounded-full mb-6"></div>
                        <h2 className="text-2xl font-bold text-blue-800 mb-2">Verifying Payment</h2>
                        <p className="text-blue-600">Please wait while we process your payment</p>
                    </motion.div>
                ) : verificationStatus === 'success' ? (
                    <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 500 }}
                        className="flex flex-col items-center"
                    >
                        <CheckCircle className="w-16 h-16 text-green-500 mb-4" strokeWidth={1.5} />
                        <h2 className="text-2xl font-bold text-blue-800 mb-2">Payment Successful!</h2>
                        <p className="text-blue-600 mb-6">Your appointment has been confirmed</p>
                        <motion.div
                            animate={{ 
                                scale: [1, 1.05, 1],
                                transition: { repeat: Infinity, duration: 2 }
                            }}
                            className="w-full h-2 bg-blue-100 rounded-full overflow-hidden"
                        >
                            <div className="h-full bg-blue-500 rounded-full"></div>
                        </motion.div>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 500 }}
                        className="flex flex-col items-center"
                    >
                        <XCircle className="w-16 h-16 text-red-500 mb-4" strokeWidth={1.5} />
                        <h2 className="text-2xl font-bold text-blue-800 mb-2">Payment Failed</h2>
                        <p className="text-blue-600 mb-6">We couldn't verify your payment</p>
                        <button 
                            onClick={() => navigate("/my-appointments")}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Back to Appointments
                        </button>
                    </motion.div>
                )}
            </motion.div>
        </div>
    )
}

export default Verify