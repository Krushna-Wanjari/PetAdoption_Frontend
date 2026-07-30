import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import InputField from "./InputField";
import PrimaryButton from "./PrimaryButton";
import logo from "../assets/logo.jpg";
import useAuth from "../hooks/useAuth";
import { getApiErrorMessage } from "../api/apiError";

function AuthCard() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [serverError, setServerError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // If ProtectedRoute sent us here, bounce back to where the user was headed.
  const redirectTo = location.state?.from?.pathname || "/";

  async function onSubmit(formData) {
    setServerError("");
    setSubmitting(true);
    try {
      await login(formData.email, formData.password);
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setServerError(getApiErrorMessage(err, "Invalid email or password."));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      className="
      w-full
      max-w-md
      bg-white
      rounded-3xl
      shadow-xl
      p-10
      transition-all
      duration-300
      hover:-translate-y-2
      hover:shadow-2xl
      "
    >
      <div className="flex justify-center">
        <img
          src={logo}
          alt="PetAdopt Logo"
          className="w-12 h-12 rounded-xl object-cover"
        />
      </div>

      <h1 className="text-4xl font-bold text-center mt-6">
        Welcome back
      </h1>

      <p className="text-center text-gray-500 mt-2">
        Log in to manage your adoption requests
      </p>

      {serverError && (
        <p className="mt-6 text-center text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl py-3 px-4">
          {serverError}
        </p>
      )}

      <form className="mt-8 space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>

        <InputField
          label="Email"
          placeholder="name@example.com"
          icon={<Mail size={18} />}
          type="email"
          error={errors.email?.message}
          {...register("email", {
            required: "Email is required",
            pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email" },
          })}
        />

        <InputField
          label="Password"
          placeholder="********"
          icon={<Lock size={18} />}
          type="password"
          error={errors.password?.message}
          {...register("password", { required: "Password is required" })}
        />

        <div className="flex justify-end">
          <button
            type="button"
            className="text-orange-500 hover:underline text-sm"
          >
            Forgot password?
          </button>
        </div>

        <PrimaryButton text="Log In" loading={submitting} />

      </form>

      <p className="text-center mt-8 text-gray-600">
        Don't have an account?
        <Link
          to="/register"
          className="ml-2 text-orange-600 font-semibold cursor-pointer hover:underline"
        >
          Sign up
        </Link>
      </p>

    </div>
  );
}

export default AuthCard;
