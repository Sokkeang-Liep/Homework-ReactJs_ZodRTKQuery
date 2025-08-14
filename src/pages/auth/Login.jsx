import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useLoginMutation } from "../../features/auth/authSlide";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router";
import { FaRegEyeSlash } from "react-icons/fa";
import { PiEye } from "react-icons/pi";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";
import { useLoginWithGoogle } from "../../components/social-auth/GoogleAuthComponent";
import { useLoginWithGitHub } from "../../components/social-auth/GithubAuthComponent";

export default function Login() {
  const [login, { isLoading }] = useLoginMutation();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const navigate = useNavigate();

  const schema = z.object({
    email: z.string().nonempty("Email is required").email("Invalid email"),
    password: z.string().nonempty("Password is required"),
  });

  const { googleLogin, googleLogout } = useLoginWithGoogle();
  const { gitHubLogin, gitHubLogout } = useLoginWithGitHub();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      let result = await login(data).unwrap();

      if (result) {
        navigate("/");
      }
    } catch (error) {
      toast.error(error?.data?.message);
      console.log("ERROR: ", error?.data?.message);
    } finally {
      reset();
    }
  };

  const inputClass =
    "bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5";

  return (
    <div className="bg-teal-500 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-6 rounded-2xl shadow-lg"
        >
          <h1 className="text-3xl font-bold mb-6 text-center text-teal-600">
            Login
          </h1>

          {/* Email Input */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Username or email
            </label>
            <input
              {...register("email")}
              type="text"
              id="email"
              className={inputClass}
              placeholder="Enter username or email"
            />
            {errors.email && (
              <span className="text-red-600 text-sm mt-1">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Password Input */}
          <div className="mb-4 relative">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="relative">
              <input
                {...register("password")}
                type={isShowPassword ? "text" : "password"}
                id="password"
                className={inputClass}
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setIsShowPassword(!isShowPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 mt-2 text-gray-500"
              >
                {isShowPassword ? <PiEye size={20} /> : <FaRegEyeSlash size={20} />}
              </button>
            </div>
            {errors.password && (
              <span className="text-red-600 text-sm mt-1">
                {errors.password.message}
              </span>
            )}
          </div>

          {/* Remember Me and Forgot Password */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 rounded focus:ring-teal-500"
              />
              <label
                htmlFor="remember"
                className="ml-2 text-sm font-medium text-gray-700"
              >
                Remember me
              </label>
            </div>
            <a
              href="#"
              className="text-sm text-teal-600 hover:underline"
            >
              Forgot Password?
            </a>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-600 text-white font-semibold py-2.5 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 mt-4 disabled:opacity-50 transition-colors duration-200"
          >
            {isLoading ? "Loading..." : "Sign In"}
          </button>

          {/* Social Authentication */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 mb-4">or</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={googleLogin}
                className="w-full sm:w-auto bg-red-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-red-700 flex items-center justify-center transition-colors duration-200 border border-red-700"
              >
                <FaGoogle className="mr-2" /> Google
              </button>
              <button
                onClick={() => {}}
                className="w-full sm:w-auto bg-blue-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-700 flex items-center justify-center transition-colors duration-200 border border-blue-700"
              >
                <FaFacebook className="mr-2" /> Facebook
              </button>
              <button
                onClick={gitHubLogin}
                className="w-full sm:w-auto bg-gray-800 text-white font-medium py-2 px-4 rounded-lg hover:bg-gray-900 flex items-center justify-center transition-colors duration-200 border border-gray-900"
              >
                <FaGithub className="mr-2" /> GitHub
              </button>
            </div>
            <p className="text-sm text-teal-600 mt-4">
              Why Create an Account?
            </p>
            <p className="text-sm text-gray-600 mt-2">
              By creating this account, you agree to our Privacy Policy &
              Cookie Policy.
            </p>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}