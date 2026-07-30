import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, User } from "lucide-react";
import InputField from "./InputField";
import PrimaryButton from "./PrimaryButton";
import logo from "../assets/logo.jpg";
import useAuth from "../hooks/useAuth";
import { getApiErrorMessage } from "../api/apiError";

function AuthCardNew() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(formData) {
    setServerError("");
    setSubmitting(true);
    try {
      await registerUser(formData.name, formData.email, formData.password);
      navigate("/", { replace: true });
    } catch (err) {
      setServerError(
        getApiErrorMessage(err, "Could not create your account. Try a different email.")
      );
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
        Welcome To PetAdopt
      </h1>

      <p className="text-center text-gray-500 mt-2">
        Create a new Account
      </p>

      {serverError && (
        <p className="mt-6 text-center text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl py-3 px-4">
          {serverError}
        </p>
      )}

      <form className="mt-8 space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>

        <InputField
          label="Name"
          placeholder="FirstName LastName"
          icon={<User size={18} />}
          type="text"
          error={errors.name?.message}
          {...register("name", { required: "Name is required" })}
        />

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
          placeholder="At least 8 characters"
          icon={<Lock size={18} />}
          type="password"
          error={errors.password?.message}
          {...register("password", {
            required: "Password is required",
            minLength: { value: 8, message: "Password must be at least 8 characters" },
          })}
        />

        <PrimaryButton text="Register" loading={submitting} />

      </form>

      <p className="text-center mt-8 text-gray-600">
        Already have an account?
        <Link
          to="/login"
          className="ml-2 text-orange-600 font-semibold cursor-pointer hover:underline"
        >
          Sign in
        </Link>
      </p>

    </div>
  );
}

export default AuthCardNew;
