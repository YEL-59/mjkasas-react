import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import logo from "../../assets/images/logo.png";
import AuthbottomBg from "../../assets/images/authBottomBg.png";
import { Link } from "react-router-dom";
import { useSignIn } from "@/hooks/auth.hook";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState("manager");

  const { form, mutate, isPending } = useSignIn();

  const onSubmit = (data) => {
    mutate({ ...data, role: selectedRole });
  };

  return (
    <div className="relative min-h-screen bg-gray-50 flex flex-col">
      {/* Background */}
      <div className="absolute bottom-0 left-0 right-0 max-h-[556px]">
        <img
          src={AuthbottomBg}
          alt="bottom-bg"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Logo */}
      <div className="p-8">
        <img
          src={logo}
          alt="logo"
          className="mx-auto sm:mx-1 w-[209.681px] h-[40px] sm:w-[239.681px] sm:h-[47px] flex-shrink-0"
        />
      </div>

      {/* Card */}
      <div className="flex flex-1 items-center justify-center pt-4 px-3">
        <div className="relative z-10 w-full max-w-md rounded-[12px] bg-white shadow-md p-6 sm:p-10 md:p-12">
          <h2 className="text-[#191919] text-center font-[Poppins] text-[26px] font-bold mb-6">
            Welcome back!
          </h2>

          {/* Google Button */}
          <button
            type="button"
            className="w-full flex items-center justify-center rounded-[12px] border border-[#D9D9D9] py-2 mb-4 hover:bg-gray-100 text-[#191919] font-[Poppins]"
          >
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
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Role Selection */}
            <div>
              <label className="block text-[#000] font-medium mb-1">
                Select Role
              </label>
              <div className="flex space-x-2">
                {["manager", "technician"].map((role) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => setSelectedRole(role)}
                    className={`flex-1 py-2 px-4 rounded-[10px] border transition-colors ${selectedRole === role
                      ? "border-orange-400 bg-orange-50 text-orange-600"
                      : "border-gray-300 text-gray-800 hover:bg-gray-50"
                      }`}
                  >
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-[#000] font-medium mb-1">
                Email Address
              </label>
              <input
                type="email"
                {...form.register("email")}
                placeholder="Enter your email address"
                className="w-full px-4 py-2 rounded-[10px] border border-[#CFCFCF] focus:outline-none focus:ring-2 focus:ring-orange-400"
                required
              />
              {form.formState.errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-[#000] font-medium mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...form.register("password")}
                  placeholder="Enter password"
                  className="w-full px-4 py-2 rounded-[10px] border border-[#CFCFCF] focus:outline-none focus:ring-2 focus:ring-orange-400"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {form.formState.errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {form.formState.errors.password.message}
                </p>
              )}
              <Link
                to="/forgot-password"
                className="text-[#FF4842] text-sm flex justify-end mt-2"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isPending}
              className={`w-full mt-10 ${isPending ? "bg-gray-400" : "bg-black hover:bg-gray-900"
                } text-white font-semibold py-2 rounded-md`}
            >
              {isPending ? "Logging in..." : "Log in"}
            </button>
          </form>

          {/* Signup Link */}
          <p className="mt-4 text-[#121212] text-center text-[15px]">
            Don't have an account?{" "}
            <Link
              to="/sign-up"
              className="font-semibold underline hover:text-orange-600"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;



// ✅ Benefits of this approach:

// SignIn component only deals with UI.

// useSignIn handles API, context, toast, redirect.

// No need for local login calls in the component.

// Cleaner, more maintainable code.
