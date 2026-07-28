import { PawPrint, Mail, Lock, User } from "lucide-react";
import InputField from "./InputField";
import PrimaryButton from "./PrimaryButton";
import logo from "../assets/logo.jpg";


function AuthCardNew() {
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
            src={logo
            }
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

      <form className="mt-8 space-y-5">

        <InputField
          label="Name"
          placeholder="FirstName LastName"
          icon={<User size={18} />}
          type="email"
        />

        <InputField
          label="Email"
          placeholder="name@example.com"
          icon={<Mail size={18} />}
          type="email"
        />

        <InputField
          label="Password"
          placeholder="********"
          icon={<Lock size={18} />}
          type="password"
        />

        <PrimaryButton text="Register" />

      </form>

      <p className="text-center mt-8 text-gray-600">
        Already have an account?
        <span className="ml-2 text-orange-600 font-semibold cursor-pointer">
          Sign in
        </span>
      </p>

    </div>
  );
}

export default AuthCardNew;