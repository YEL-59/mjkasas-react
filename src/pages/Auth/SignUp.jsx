import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import logo from '../../assets/images/logo.png'
import AuthbottomBg from '../../assets/images/authBottomBg.png'

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gray-50">
      {/* Logo top-left */}
      <div className="flex items-start justify-self-start">
        <img
          src={logo}
          alt="logo"
          className="w-[239.681px] h-[47px] flex-shrink-0 [aspect-ratio:239.68/47.00]"
        />
      </div>
      {/* Background Shape */}
      <div className="absolute bottom-0 left-0 right-0">
        <img
          src={AuthbottomBg}
          alt="bottom-bg"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-md  rounded-[12px] bg-[#FFF] [box-shadow:3px_-3px_4px_0_rgba(0,_0,_0,_0.25),_-3px_4px_4px_0_rgba(0,_0,_0,_0.25)] p-6 sm:p-10 md:p-12">
        {/* Title */}
        <h2 className="text-[#191919] text-center font-[Poppins] text-[22px] md:text-[26px] lg:text-[36px] not-italic font-bold leading-[normal] mb-6">
          Sign Up
        </h2>

        {/* Google Button */}
        <button className="w-full flex items-center justify-center rounded-[12px] border-[1px]  border-[#D9D9D9] py-2 mb-4 hover:bg-gray-100 overflow-hidden text-center text-[#191919] overflow-ellipsis font-[Poppins] text-[15px]  md:text-[16px] not-italic font-normal leading-[24px]">
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
          {/* Full Name */}
          <div>
            <label className="block text-[#000] font-[Poppins] text-[15px] md:text-[16px] not-italic font-medium leading-[24px] mb-1">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full px-4 py-2 rounded-[12px] border-[1px]  border-[#D9D9D9] focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-[#000] font-[Poppins] text-[15px] md:text-[16px] not-italic font-medium leading-[24px] mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full px-4 py-2 rounded-[12px] border-[1px]  border-[#D9D9D9] focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-[#000] font-[Poppins] text-[15px] md:text-[16px] not-italic font-medium leading-[24px] mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter password"
                className="w-full px-4 py-2 rounded-[12px] border-[1px]  border-[#D9D9D9] focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-[#000] font-[Poppins] text-[15px] md:text-[16px] not-italic font-medium leading-[24px] mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Retype password"
                className="w-full px-4 py-2 rounded-[12px] border-[1px]  border-[#D9D9D9] focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-900">
            Sign Up
          </button>
        </form>

        {/* Login Link */}
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <a href="#" className="text-orange-500 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
