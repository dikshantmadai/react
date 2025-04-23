import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [errMsg, setErrMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const res = await axios.post("http://localhost:8800/auth/login", data);

      if (res.data?.user) {
        setErrMsg("");
        // Store user in localStorage or handle session as needed
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/");
      } else {
        setErrMsg(res.data?.message || "Login failed! Invalid email or password.");
      }
    } catch (error) {
      console.error(error);
      setErrMsg("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex h-screen w-full">
      {/* LEFT */}
      <div className="w-full lg:w-[55%] flex items-center justify-center bg-[#0c2d48] px-6">
        <div className="w-full max-w-md bg-[#cbd0dc] p-8 rounded-sm shadow-md">
          <h2 className="text-3xl font-extrabold text-center text-black">LOGIN</h2>
          <p className="text-center text-lg font-medium text-gray-700 mt-1">Welcome Back</p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 flex flex-col gap-5">
            {/* Email */}
            <input
              type="text"
              placeholder="Email"
              className="w-full p-3 rounded-lg border border-gray-300"
              {...register("email", { required: "Email Address is required" })}
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}

            {/* Password */}
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 rounded-lg border border-gray-300"
              {...register("password", { required: "Password is required!" })}
            />
            {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}

            {/* Error Message */}
            {errMsg && <p className="text-sm text-red-500">{errMsg}</p>}

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-[#0e2a47] text-white py-3 rounded-md"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="flex justify-center items-center mt-4">
            <p className="text-sm text-gray-700">
              New here?{" "}
              <a href="/signup" className="text-blue-600 font-semibold">
                Create Account
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT - IMAGE */}
      <div
        className="hidden lg:block w-[45%] h-full bg-cover bg-center"
        style={{ backgroundImage: `url(/assets/Login.png)` }}
      ></div>
    </div>
  );
}
