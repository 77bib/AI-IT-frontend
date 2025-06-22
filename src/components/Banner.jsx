import React from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Banner = () => {
    const navigate = useNavigate();

    return (
        <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className='flex bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl shadow-xl overflow-hidden mx-4 md:mx-10 my-16 md:my-20'
        >
            {/* Left Side */}
            <div className='flex-1 py-8 sm:py-10 md:py-12 lg:py-16 px-6 sm:px-10 md:px-14 lg:px-16'>
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                >
                    <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight'>
                        Book Appointment
                    </h1>
                    <p className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-blue-100 mt-2 md:mt-4'>
                        With 100+ Trusted Doctors
                    </p>
                </motion.div>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => { navigate('/login'); window.scrollTo(0, 0) }}
                    className='bg-white text-blue-600 font-medium text-sm sm:text-base px-8 py-3 rounded-full mt-6 md:mt-8 shadow-md hover:shadow-lg transition-all duration-300'
                >
                    Create account
                </motion.button>
            </div>

            {/* Right Side - Image */}
            <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className='hidden md:block md:w-1/2 lg:w-[400px] relative'
            >
                <img 
                    className='w-full absolute bottom-0 right-0 max-w-md object-contain'
                    src={assets.appointment_img} 
                    alt="Doctor appointment" 
                    style={{ 
                        maxHeight: '330px',
                        objectFit: 'contain',
                        objectPosition: 'bottom'
                      }}
                />
            </motion.div>
            
        </motion.div>
    );
};

export default Banner;