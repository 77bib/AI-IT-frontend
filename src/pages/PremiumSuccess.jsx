import React, { useEffect, useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AppContext } from "../context/AppContext";
import axios from 'axios';
import { toast } from 'react-toastify';

const PremiumSuccess = () => {
  const { token, backendUrl, loadUserProfileData } = useContext(AppContext);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    if (sessionId) {
      handleSuccess(sessionId);
    } else {
      toast.error('معرف الجلسة غير صحيح');
      navigate('/premium');
    }
  }, []);

  const handleSuccess = async (sessionId) => {
    try {
      await axios.post(
        `${backendUrl}/api/premium/payment-success`,
        { session_id: sessionId },
        { 
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      // تحديث بيانات المستخدم بعد نجاح الدفع
      await loadUserProfileData();
      toast.success("تم تفعيل العضوية بنجاح!");
      setTimeout(() => {
        navigate('/upload-analysis');
      }, 1500);
    } catch (error) {
      console.error('Error:', error);
      toast.error('حدث خطأ أثناء تفعيل العضوية');
      navigate('/premium');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
        <h2 className="mt-4 text-xl font-semibold text-gray-700">جاري تفعيل العضوية...</h2>
        <p className="mt-2 text-sm text-gray-500">يرجى الانتظار قليلاً</p>
      </div>
    </div>
  );
};

export default PremiumSuccess; 