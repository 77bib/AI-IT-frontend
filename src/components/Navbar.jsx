import React, { useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const { token, userData, setToken, setUserData } = useContext(AppContext);

  // Animation variants
  const navItem = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
    hover: { scale: 1.05, color: '#3B82F6' }
  };

  const mobileMenu = {
    hidden: { x: '100%', opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 30 }
    },
    exit: { x: '100%', opacity: 0 }
  };

  const handleLogout = () => {
    try {
      // حذف التوكن من localStorage
      localStorage.removeItem('token');
      
      // تصفير حالة التطبيق
      setToken(null);
      setUserData(null);
      
      // رسالة نجاح
      toast.success('Logged out successfully');
      
      // التوجيه إلى صفحة تسجيل الدخول
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Error logging out');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 bg-white shadow-md"
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <motion.div 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/')}
          className="cursor-pointer"
        >
          <Link to="/" className="flex items-center">
            <svg 
              className="h-10 w-10 text-blue-600"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 2H5a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z" />
              <path d="M12 6v12" />
              <path d="M8 9h8" />
              <path d="M8 15h8" />
            </svg>
            <span className="ml-2 text-xl font-bold text-blue-600">Medical Lab</span>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <motion.ul 
          className="hidden md:flex items-center gap-8 font-medium"
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.1 }}
        >
          {['/', '/doctors', '/about', '/contact'].map((path, index) => {
            const labels = ['HOME', 'APPOINTMENT', 'ABOUT', 'CONTACT'];
            return (
              <motion.li 
                key={index}
                variants={navItem}
                whileHover="hover"
                className="relative"
              >
                <NavLink 
                  to={path} 
                  className={({ isActive }) => 
                    `py-2 px-1 ${isActive ? 'text-blue-600 font-semibold' : 'text-gray-700 hover:text-blue-500'}`
                  }
                >
                  {labels[index]}
                  <motion.div 
                    className="absolute bottom-0 left-0 h-0.5 bg-blue-600"
                    initial={{ width: 0 }}
                    animate={{ width: '0%' }}
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.3 }}
                  />
                </NavLink>
              </motion.li>
            );
          })}
        </motion.ul>

        {/* User Actions */}
        <div className="flex items-center gap-4">
          {token && userData ? (
            <div className="relative group">
              <div className="flex items-center gap-2 cursor-pointer">
                {/* Premium Badge */}
                {userData?.isPremium && (
                  <div className="absolute -top-1 -right-1 z-10">
                    <div className="bg-yellow-400 rounded-full p-1 shadow-lg">
                      <svg 
                        className="w-3 h-3 text-white" 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                  </div>
                )}
                
                {/* User Avatar */}
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-blue-500 bg-gray-100 flex items-center justify-center">
                  {userData?.image ? (
                    <img
                      src={userData.image}
                      alt="User"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <svg 
                      className="w-6 h-6 text-gray-500" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2" 
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
                      />
                    </svg>
                  )}
                </div>
              </div>

              {/* Dropdown Menu - تم تحسين الثبات */}
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300">
                <Link 
                  to="/my-profile" 
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  My Profile
                </Link>
                <Link 
                  to="/my-appointments" 
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  My Appointments
                </Link>
                {userData?.isPremium && (
                  <Link 
                    to="/upload-analysis" 
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <span>Upload Analysis</span>
                    <svg 
                      className="w-4 h-4 ml-2 text-yellow-400" 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </Link>
                )}
                <div 
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                >
                  Logout
                </div>
              </div>
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Navbar;