import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import logo from '../../assets/images/logo.png';
import AuthbottomBg from '../../assets/images/authBottomBg.png';
import { Link } from 'react-router';

const ForgotPassword = () => {
  const [showPassword, setShowPassword] = useState(false);

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

      {/* Main Content (flex-grow so it takes remaining space) */}
      <div className="flex flex-1 items-center justify-center pt-4">
        {/* Card */}
        <div className="relative z-10 w-full max-w-md rounded-[12px] bg-[#FFF] [box-shadow:3px_-3px_4px_0_rgba(0,_0,_0,_0.25),_-3px_4px_4px_0_rgba(0,_0,_0,_0.25)] p-6 sm:p-10 md:p-12">
          {/* Title */}
          <h2 className="text-[#191919] text-center font-[Poppins] text-[22px] md:text-[26px] lg:text-[36px] font-bold mb-6">
            Welcome back!
          </h2>

          {/* Google Button */}
          <button className="w-full flex items-center justify-center rounded-[12px] border border-[#D9D9D9] py-2 mb-4 hover:bg-gray-100 text-[#191919] font-[Poppins] text-[15px] md:text-[16px]">
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              alt="Google"
              className="w-5 h-5 mr-2"
            />
            Continue with Google
          </button>

          {/* Divider */}
          <div className="flex items-center mb-4">
            <div className="flex-grow h-px bg-gray-300" />
            <span className="px-2 text-sm text-gray-400">or</span>
            <div className="flex-grow h-px bg-gray-300" />
          </div>

          {/* Form */}
          <form className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-[#000] font-[Poppins] text-[15px] md:text-[16px] font-medium mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full px-4 py-2 rounded-[10px] border-[1px]  border-[#CFCFCF] focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            {/* Submit */}
            <button className="w-full mt-10 bg-black text-[#FFF] font-[Poppins] text-[15px] md:text-[16px] not-italic font-semibold leading-[24px] py-2 rounded-md hover:bg-gray-900 cursor-pointer">
              Continue
            </button>
          </form>

          {/* Login Link */}
          <p className="mt-4 ">
            <Link
              to="/sign-in"
              className="text-[#121212] font-[Poppins] text-[15px] md:text-[16px] not-italic font-semibold leading-[normal] [text-decoration-line:underline] [text-decoration-style:solid] [text-decoration-skip-ink:none] [text-underline-offset:auto] [text-underline-position:from-font] hover:underline"
            >
              Back to login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
