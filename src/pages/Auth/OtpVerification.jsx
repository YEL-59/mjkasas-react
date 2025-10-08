import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import AuthbottomBg from '../../assets/images/authBottomBg.png';
import OtpInput from '@/components/Auth/OtpInput';
import { useOtpVerification, useResendOtp } from '@/hooks/auth.hook';

const OtpVerification = () => {
  const location = useLocation();
  const email = location.state?.email || "";
  const [otp, setOtp] = useState("");
  const [countdown, setCountdown] = useState(20); // 2 minutes = 120 seconds
  const [canResend, setCanResend] = useState(false);

  const { form, mutate, isPending } = useOtpVerification(email);
  const { mutate: resendOtp, isPending: isResending } = useResendOtp(email);

  const onSubmit = (data) => {
    mutate({ ...data, otp });
  };

  const handleOtpChange = (otpValue) => {
    setOtp(otpValue);
    form.setValue("otp", otpValue);
  };

  // Countdown timer effect
  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  // Handle resend OTP
  const handleResendOtp = () => {
    resendOtp({ email, operation: "email" });
    setCountdown(120); // Reset countdown
    setCanResend(false);
  };

  // Format countdown display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Mask email for display (show first 3 chars + **** + domain)
  const maskEmail = (email) => {
    if (!email) return "";
    const [username, domain] = email.split("@");
    const maskedUsername = username.length > 3
      ? username.substring(0, 3) + "****"
      : username.substring(0, 1) + "****";
    return `${maskedUsername}@${domain}`;
  };

  return (
    <div className="relative min-h-screen bg-gray-50 flex flex-col">
      {/* Background Shape */}
      <div className="absolute bottom-0 left-0 right-0 max-h-[556px]">
        <img
          src={AuthbottomBg}
          alt="bottom-bg"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Logo (fixed top-left) */}
      <div className="p-8">
        <img
          src={logo}
          alt="logo"
          className="mx-auto sm:mx-1 w-[209.681px] h-[40px] sm:w-[239.681px] sm:h-[47px] flex-shrink-0"
        />
      </div>

      {/* Main Content */}
      <div className="flex flex-1 items-center justify-center pt-4 px-3">
        {/* Card */}
        <div className="relative z-10 w-full max-w-md rounded-[12px] bg-[#FFF] [box-shadow:3px_-3px_4px_0_rgba(0,_0,_0,_0.25),_-3px_4px_4px_0_rgba(0,_0,_0,_0.25)] p-6 sm:p-10 md:p-12">
          {/* Title */}
          <h2 className="text-[#191919] text-center font-[Poppins] text-[22px] md:text-[26px] lg:text-[30px] font-bold mb-3">
            OTP Verification
          </h2>
          <p className="text-center text-[#555] text-[14px] md:text-[15px] mb-6 md:mb-10">
            Enter the verification code we sent you on <br />
            <span className="font-semibold">{maskEmail(email)}</span>
          </p>

          {/* OTP Inputs */}
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <OtpInput length={6} onChange={handleOtpChange} />

            {/* Error Message */}
            {form.formState.errors.otp && (
              <p className="text-red-500 text-sm mt-2 text-center">
                {form.formState.errors.otp.message}
              </p>
            )}

            {/* Continue Button */}
            <button
              type="submit"
              disabled={isPending || otp.length !== 6}
              className={`w-full mt-8 py-2 rounded-md cursor-pointer ${isPending || otp.length !== 6
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-black hover:bg-gray-900"
                } text-white`}
            >
              {isPending ? "Verifying..." : "Continue"}
            </button>
          </form>

          {/* Resend Code */}
          <p className="mt-4 text-center text-sm text-gray-600">
            Don't receive the code?{' '}
            {canResend ? (
              <button
                onClick={handleResendOtp}
                disabled={isResending}
                className="text-orange-500 font-medium hover:underline cursor-pointer disabled:opacity-50"
              >
                {isResending ? "Sending..." : "Click to resend code"}
              </button>
            ) : (
              <span className="text-gray-500">
                Resend code in {formatTime(countdown)}
              </span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;
