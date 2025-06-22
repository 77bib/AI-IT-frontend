import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useSearchParams } from "react-router-dom";

const PremiumService = () => {
  const { token, backendUrl } = useContext(AppContext);
  const [premiumCode, setPremiumCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentError, setPaymentError] = useState(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!token) {
      toast.error("الرجاء تسجيل الدخول أولاً");
      navigate("/login");
    }
  }, [token]);

  useEffect(() => {
    const sessionId = searchParams.get("session_id");
    if (sessionId) {
      handlePaymentSuccess(sessionId);
    }
  }, [searchParams]);

  const handleCodeSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        backendUrl + "/api/premium/validate-code",
        { code: premiumCode },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(response.data.message);
      navigate("/my-profile");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error applying premium code"
      );
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async (plan) => {
    if (!token) {
      toast.error("الرجاء تسجيل الدخول أولاً");
      navigate("/login");
      return;
    }

    setPaymentLoading(true);
    setPaymentError(null);

    // تعريف المبالغ للخطط
    const planDetails = {
      "1month": { amount: 9.99, name: "شهر واحد" },
      "3months": { amount: 24.99, name: "ثلاثة أشهر" },
      "1year": { amount: 89.99, name: "سنة كاملة" }
    };

    try {
      console.log('Sending payment request for plan:', plan);
      
      const paymentData = {
        amount: planDetails[plan].amount,
        planType: plan,
        planName: planDetails[plan].name
      };

      console.log('Payment data:', paymentData);

      const response = await axios.post(
        `${backendUrl}/api/premium/create-payment`,
        paymentData,
        { 
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      console.log('Server response:', response.data);

      if (response.data.url) {
        window.location.href = response.data.url;
      } else {
        throw new Error('لم يتم استلام رابط الدفع');
      }

    } catch (error) {
      console.error('Payment Error:', error);
      const errorMessage = error.response?.data?.message || "حدث خطأ في إنشاء جلسة الدفع";
      setPaymentError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setPaymentLoading(false);
    }
  };

  const handlePaymentSuccess = async (sessionId) => {
    if (!token || !sessionId) {
      toast.error("Invalid session");
      return;
    }

    try {
      const response = await axios.post(
        `${backendUrl}/api/premium/payment-success`,
        { session_id: sessionId },
        { 
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      toast.success("Payment successful! Redirecting to upload analysis...");
      
      // Redirect to upload analysis page
      setTimeout(() => {
        navigate("/upload-analysis");
      }, 1500);
    } catch (error) {
      console.error('Payment success error:', error);
      toast.error(
        error.response?.data?.message || 
        "Error processing payment confirmation"
      );
    }
  };

  const handleError = (error) => {
    console.error('Payment Error Details:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });

    let errorMessage = "حدث خطأ في عملية الدفع";

    if (error.response) {
      errorMessage = error.response.data?.message || "خطأ في الاتصال بالخادم";
    } else if (error.request) {
      errorMessage = "لا يمكن الاتصال بالخادم";
    } else {
      errorMessage = error.message;
    }

    setPaymentError(errorMessage);
    toast.error(errorMessage);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold text-blue-800 mb-6">
          Premium Service
        </h2>

        <div className="space-y-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">
              Become a Premium Member
            </h3>
            <p className="text-blue-700">
              Enjoy exclusive benefits with our premium membership:
            </p>
            <ul className="list-disc list-inside text-blue-700 mt-2">
              <li>Priority appointment scheduling</li>
              <li>Extended consultation time</li>
              <li>Access to premium doctors</li>
              <li>24/7 support</li>
            </ul>
          </div>

          <div className="border-t pt-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">
              Enter Premium Code
            </h4>
            <form onSubmit={handleCodeSubmit} className="flex gap-4">
              <input
                type="text"
                value={premiumCode}
                onChange={(e) => setPremiumCode(e.target.value)}
                placeholder="Enter your premium code"
                className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {loading ? "Applying..." : "Apply Code"}
              </button>
            </form>
            <p className="mt-2 text-sm text-gray-500">
              Try our static code:{" "}
              <span className="font-mono">PREMIUM2024</span>
            </p>
          </div>

          <div className="border-t pt-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">
              Purchase Premium
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { id: "1month", title: "شهر واحد", price: "$9.99" },
                { id: "3months", title: "ثلاثة أشهر", price: "$24.99" },
                { id: "1year", title: "سنة كاملة", price: "$89.99" }
              ].map((plan) => (
                <div key={plan.id} className="border rounded-lg p-4 text-center">
                  <h5 className="font-semibold text-lg">{plan.title}</h5>
                  <p className="text-2xl font-bold text-blue-600">{plan.price}</p>
                  <button
                    onClick={() => handlePayment(plan.id)}
                    disabled={paymentLoading}
                    className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 w-full"
                  >
                    {paymentLoading ? "جاري المعالجة..." : "شراء"}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {paymentError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4">
              <strong className="font-bold">خطأ!</strong>
              <span className="block sm:inline"> {paymentError}</span>
            </div>
          )}
        </div>
      </div>

      {isProcessing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg">
            <p className="text-lg font-semibold">جاري معالجة الطلب...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PremiumService;
