import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [errMsg, setErrMsg] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const res = await axios.post("http://localhost:8800/auth/signup", data);
      const response = res.data;

      if (response?.status === "failed") {
        setErrMsg(response);
      } else {
        setErrMsg(response);
        setTimeout(() => {
          navigate("/login");
        }, 5000);
      }
    } catch (error) {
      console.error(error);
      setErrMsg({ status: "failed", message: "Something went wrong. Please try again." });
    }
    setIsSubmitting(false);
  };

  return (
    <div className="flex h-screen w-full">
      {/* LEFT - FORM */}
      <div className="w-full lg:w-[55%] flex items-center justify-center bg-[#0c2d48] px-6">
        <div className="w-full max-w-lg bg-[#cbd0dc] p-8 rounded-sm shadow-md">
          <h2 className="text-3xl font-extrabold text-center text-black">SIGN UP</h2>
          <p className="text-center text-base font-medium text-gray-700 mb-6">Get Started Now</p>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            {/* First & Last Name */}
            <div className="flex flex-col lg:flex-row gap-2">
              <div className="w-full">
                <label className="block text-sm font-medium">First Name</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 p-2 rounded"
                  placeholder="First Name"
                  {...register("firstName", { required: "First Name is required!" })}
                />
                {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
              </div>
              <div className="w-full">
                <label className="block text-sm font-medium">Last Name</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 p-2 rounded"
                  placeholder="Last Name"
                  {...register("lastName", { required: "Last Name is required!" })}
                />
                {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium">Email Address</label>
              <input
                type="email"
                className="w-full border border-gray-300 p-2 rounded"
                placeholder="email@example.com"
                {...register("email", { required: "Email Address is required" })}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            {/* Passwords */}
            <div className="flex flex-col lg:flex-row gap-2">
              <div className="w-full">
                <label className="block text-sm font-medium">Password</label>
                <input
                  type="password"
                  className="w-full border border-gray-300 p-2 rounded"
                  placeholder="Password"
                  {...register("password", { required: "Password is required!" })}
                />
                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
              </div>
              <div className="w-full">
                <label className="block text-sm font-medium">Confirm Password</label>
                <input
                  type="password"
                  className="w-full border border-gray-300 p-2 rounded"
                  placeholder="Confirm Password"
                  {...register("cPassword", {
                    validate: (value) => {
                      const { password } = getValues();
                      if (value !== password) {
                        return "Passwords do not match";
                      }
                    },
                  })}
                />
              </div>
            </div>

            {/* Error / Success Message */}
            {errMsg?.message && (
              <span
                className={`text-sm ${
                  errMsg.status === "failed" ? "text-red-500" : "text-green-500"
                }`}
              >
                {errMsg.message}
              </span>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#0e2a47] text-white py-3 rounded-md"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <p className="text-gray-600 text-sm text-center mt-6">
            Already have an account?
            <Link to="/login" className="text-[#065ad8] font-medium underline ml-1">
              Login
            </Link>
          </p>
        </div>
      </div>

      {/* RIGHT - IMAGE */}
      <div
        className="hidden lg:block w-[45%] h-full bg-cover bg-center"
        style={{ backgroundImage: `url(/assets/signup.png)` }}
      ></div>
    </div>
  );
};

export default Register;
