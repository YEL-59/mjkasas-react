import React from 'react';
import logo from '../../assets/images/logo.png';
import AuthbottomBg from '../../assets/images/authBottomBg.png';
import { Link } from 'react-router-dom';
import { useForgotPassword } from '@/hooks/auth.hook';

const ForgotPassword = () => {
  const { form, mutate, isPending } = useForgotPassword();

  const onSubmit = (data) => {
    mutate(data);
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

      {/* Main Content (flex-grow so it takes remaining space) */}
      <div className="flex flex-1 items-center justify-center pt-4 px-3">
        {/* Card */}
        <div className="relative z-10 w-full max-w-md rounded-[12px] bg-[#FFF] [box-shadow:3px_-3px_4px_0_rgba(0,_0,_0,_0.25),_-3px_4px_4px_0_rgba(0,_0,_0,_0.25)] p-6 sm:p-10 md:p-12">
          {/* Title */}
          <h2 className="text-[#191919] text-center font-[Poppins] text-[22px] md:text-[26px] lg:text-[36px] font-bold mb-2">
            Welcome back!
          </h2>

          {/* Subtitle */}
          <p className="text-[#858D9D] text-[14px] md:text-[15px] mb-6 text-center">
            No worries, we will send you reset instructions
          </p>

          {/* Form */}
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-[#000] font-[Poppins] text-[15px] md:text-[16px] font-medium mb-1">
                Email Address
              </label>
              <input
                type="email"
                {...form.register("email")}
                placeholder="Enter your email address"
                className="w-full px-4 py-2 rounded-[10px] border-[1px]  border-[#CFCFCF] focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              {form.formState.errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isPending}
              className={`w-full mt-10 ${isPending ? "bg-gray-400" : "bg-black hover:bg-gray-900"} text-[#FFF] font-[Poppins] text-[15px] md:text-[16px] not-italic font-semibold leading-[24px] py-2 rounded-md cursor-pointer`}
            >
              {isPending ? "Sending..." : "Continue"}
            </button>
          </form>

          {/* Login Link */}
          <p className="mt-4 text-center">
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
