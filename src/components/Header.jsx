import React from 'react';
import { motion } from 'framer-motion';
import { assets } from '../assets/assets';

const Header = () => {
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const imageAnimation = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={container}
      className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl mx-4 md:mx-8 lg:mx-16 my-6 shadow-xl"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[-50px] left-[-50px] w-32 h-32 rounded-full bg-blue-500 opacity-20"></div>
        <div className="absolute bottom-[-80px] right-[-80px] w-64 h-64 rounded-full bg-blue-400 opacity-10"></div>
      </div>

      <div className="flex flex-col md:flex-row items-center px-6 md:px-12 lg:px-20 py-10 md:py-16">
        {/* Header Left */}
        <motion.div 
          variants={container}
          className="md:w-1/2 lg:w-2/5 flex flex-col items-start justify-center gap-4 md:gap-6 z-10"
        >
          <motion.h1 
            variants={item}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl text-white font-bold leading-tight"
          >
            Book Appointment <br /> 
            <span className="text-blue-200">With Trusted Doctors</span>
          </motion.h1>

          <motion.div 
            variants={item}
            className="flex flex-col sm:flex-row items-center gap-4 text-blue-100 text-base sm:text-lg"
          >
            <motion.img 
              initial={{ rotate: -10 }}
              animate={{ rotate: 0 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="w-24 sm:w-32 drop-shadow-lg"
              src={assets.group_profiles} 
              alt="Trusted profiles" 
            />
            <p className="max-w-md">
              Simply browse through our extensive list of trusted doctors, 
              <br className="hidden sm:block" /> 
              schedule your appointment hassle-free.
            </p>
          </motion.div>

          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            variants={item}
            href="#speciality" 
            className="mt-2 flex items-center gap-3 bg-white px-6 py-3 sm:px-8 sm:py-4 rounded-full text-blue-600 font-medium text-base sm:text-lg shadow-lg hover:shadow-xl transition-all"
          >
            Book appointment 
            <motion.img 
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-4" 
              src={assets.arrow_icon} 
              alt="Arrow" 
            />
          </motion.a>
        </motion.div>

        {/* Header Right - Image Section */}
        <motion.div 
          variants={imageAnimation}
          className="md:w-1/2 lg:w-3/5 relative mt-8 md:mt-0 flex justify-center"
        >
          <motion.img 
            whileHover={{ scale: 1.02 }}
            className="w-full max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto h-auto rounded-xl shadow-2xl border-4 border-white/10"
            src={assets.header_img} 
            alt="Doctor illustration" 
            style={{ 
              maxHeight: '600px',
              objectFit: 'contain',
              objectPosition: 'bottom'
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Header;
