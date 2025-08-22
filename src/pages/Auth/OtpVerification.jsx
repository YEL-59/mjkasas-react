import React from 'react';
import logo from '../../assets/images/logo.png';
import AuthbottomBg from '../../assets/images/authBottomBg.png';
import OtpInput from '@/components/Auth/OtpInput';

const OtpVerification = () => {
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
            <span className="font-semibold">Albert*****@gmail.com</span>
          </p>

          {/* OTP Inputs */}
          <OtpInput length={6} onChange={(otp) => console.log('OTP:', otp)} />

          {/* Continue Button */}
          <button className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-900 mt-8 cursor-pointer"> 
            Continue
          </button>

          {/* Resend Code */}
          <p className="mt-4 text-center text-sm text-gray-600">
            Don’t receive the code?{' '}
            <button className="text-orange-500 font-medium hover:underline cursor-pointer">
              Click to resend code
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;
