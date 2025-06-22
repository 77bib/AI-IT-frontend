import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import RelatedDoctors from '../components/RelatedDoctors'
import axios from 'axios'
import { toast } from 'react-toastify'
import { motion, AnimatePresence } from 'framer-motion'

const Appointment = () => {
    const { docId } = useParams()
    const { doctors, currencySymbol, backendUrl, token, getDoctosData } = useContext(AppContext)
    const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

    const [docInfo, setDocInfo] = useState(null)
    const [docSlots, setDocSlots] = useState([])
    const [slotIndex, setSlotIndex] = useState(0)
    const [slotTime, setSlotTime] = useState('')
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()

    const fetchDocInfo = async () => {
        const docInfo = doctors.find((doc) => doc._id === docId)
        setDocInfo(docInfo)
        setLoading(false)
    }

    const getAvailableSolts = async () => {
        if (!docInfo) return
        
        setDocSlots([])
        let today = new Date()
        let slots = []

        for (let i = 0; i < 7; i++) {
            let currentDate = new Date(today)
            currentDate.setDate(today.getDate() + i)
            
            let endTime = new Date()
            endTime.setDate(today.getDate() + i)
            endTime.setHours(21, 0, 0, 0)

            if (today.getDate() === currentDate.getDate()) {
                currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
                currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
            } else {
                currentDate.setHours(10)
                currentDate.setMinutes(0)
            }

            let timeSlots = []

            while (currentDate < endTime) {
                let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                let day = currentDate.getDate()
                let month = currentDate.getMonth() + 1
                let year = currentDate.getFullYear()

                const slotDate = day + "_" + month + "_" + year
                const isSlotAvailable = !(docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(formattedTime))

                if (isSlotAvailable) {
                    timeSlots.push({
                        datetime: new Date(currentDate),
                        time: formattedTime
                    })
                }

                currentDate.setMinutes(currentDate.getMinutes() + 30)
            }

            slots.push(timeSlots)
        }

        setDocSlots(slots)
    }

    const bookAppointment = async () => {
        if (!token) {
            toast.warning('Please login to book an appointment')
            return navigate('/login')
        }

        if (!slotTime) {
            toast.warning('Please select a time slot')
            return
        }

        try {
            const date = docSlots[slotIndex][0].datetime
            const day = date.getDate()
            const month = date.getMonth() + 1
            const year = date.getFullYear()
            const slotDate = `${day}_${month}_${year}`

            const { data } = await axios.post(
                backendUrl + '/api/user/book-appointment', 
                { docId, slotDate, slotTime }, 
                { headers: { token } }
            )

            if (data.success) {
                toast.success(data.message)
                getDoctosData()
                navigate('/my-appointments')
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.error(error)
            toast.error(error.response?.data?.message || error.message)
        }
    }

    useEffect(() => {
        if (doctors.length > 0) {
            fetchDocInfo()
        }
    }, [doctors, docId])

    useEffect(() => {
        if (docInfo) {
            getAvailableSolts()
        }
    }, [docInfo])

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        )
    }

    if (!docInfo) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500 text-lg">Doctor not found</p>
            </div>
        )
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-6xl mx-auto px-4 py-8"
        >
            {/* Doctor Details */}
            <div className="flex flex-col lg:flex-row gap-8">
                <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="w-full lg:w-1/3"
                >
                    <div className="relative">
                        <img 
                            className="w-full h-64 lg:h-80 object-cover rounded-xl shadow-lg bg-blue-50"
                            src={docInfo.image} 
                            alt={docInfo.name} 
                        />
                        <div className="absolute -bottom-4 left-4 bg-white px-3 py-1 rounded-full shadow-md flex items-center">
                            <span className="text-blue-600 font-medium">{docInfo.experience} years</span>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="w-full lg:w-2/3 bg-white rounded-xl shadow-lg p-6 border border-blue-100"
                >
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl md:text-3xl font-bold text-blue-900 flex items-center gap-2">
                            {docInfo.name}
                            <img className="w-5 h-5" src={assets.verified_icon} alt="Verified" />
                        </h1>
                        <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                            {currencySymbol}{docInfo.fees}
                        </div>
                    </div>

                    <p className="text-blue-600 font-medium mt-1">
                        {docInfo.degree} - {docInfo.speciality}
                    </p>

                    <div className="mt-6">
                        <h3 className="text-lg font-semibold text-blue-800 flex items-center gap-1">
                            About
                            <img className="w-4 h-4" src={assets.info_icon} alt="Info" />
                        </h3>
                        <p className="text-gray-600 mt-2 leading-relaxed">
                            {docInfo.about}
                        </p>
                    </div>
                </motion.div>
            </div>

            {/* Booking Slots */}
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-12"
            >
                <h2 className="text-xl font-bold text-blue-900 mb-6">Available Time Slots</h2>

                {/* Date Selection */}
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                    {docSlots.map((item, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                                setSlotIndex(index)
                                setSlotTime('')
                            }}
                            className={`flex-shrink-0 w-16 h-16 rounded-full flex flex-col items-center justify-center cursor-pointer transition-colors ${
                                slotIndex === index 
                                    ? 'bg-blue-600 text-white shadow-md' 
                                    : 'bg-white border border-blue-200 text-blue-800 hover:bg-blue-50'
                            }`}
                        >
                            <span className="text-sm font-medium">
                                {item[0] && daysOfWeek[item[0].datetime.getDay()]}
                            </span>
                            <span className="text-sm">
                                {item[0] && item[0].datetime.getDate()}
                            </span>
                        </motion.div>
                    ))}
                </div>

                {/* Time Slot Selection */}
                <div className="mt-6">
                    <h3 className="text-lg font-medium text-blue-800 mb-3">
                        Select Time
                    </h3>
                    <div className="flex flex-wrap gap-3">
                        {docSlots[slotIndex]?.map((item, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setSlotTime(item.time)}
                                className={`px-4 py-2 rounded-full cursor-pointer transition-colors ${
                                    item.time === slotTime
                                        ? 'bg-blue-600 text-white shadow-md'
                                        : 'bg-white border border-blue-200 text-blue-800 hover:bg-blue-50'
                                }`}
                            >
                                {item.time.toLowerCase()}
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Book Button */}
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={bookAppointment}
                    disabled={!slotTime}
                    className={`mt-8 w-full md:w-auto px-8 py-3 rounded-lg text-white font-medium shadow-md transition-all ${
                        slotTime 
                            ? 'bg-blue-600 hover:bg-blue-700' 
                            : 'bg-gray-400 cursor-not-allowed'
                    }`}
                >
                    Book Appointment
                </motion.button>
            </motion.div>

            {/* Related Doctors */}
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-16"
            >
                <RelatedDoctors speciality={docInfo.speciality} docId={docId} />
            </motion.div>
        </motion.div>
    )
}

export default Appointment