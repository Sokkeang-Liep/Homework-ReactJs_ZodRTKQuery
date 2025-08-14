import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegEyeSlash } from "react-icons/fa";
import { PiEye } from "react-icons/pi";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUploadFileMutation } from "../../features/file/fileSlice";
import { useRegisterMutation } from "../../features/auth/authSlide";
import { useNavigate } from "react-router";

const schema = z.object({
  name: z.string().nonempty("Name is required"),
  email: z.string().nonempty("Email is required").email("Invalid email"),
  password: z
    .string()
    .nonempty("Password is required")
    .min(4, "Must be at least 4 characters"),
});

export default function Register() {
  const [uploadFile] = useUploadFileMutation();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [registerUser] = useRegisterMutation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "Keang",
      email: "keang@gmail.com",
      password: "K12@#",
    },
  });

  const handleImagePreview = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const onSubmit = async (data) => {
    if (image) {
      const formData = new FormData();
      formData.append("file", image);
      const res = await uploadFile(formData).unwrap();
      data.avatar = res.location;
    } else {
      data.avatar = ""; // Or handle no avatar case
    }

    const checkRegister = await registerUser(data).unwrap();
    if (checkRegister) {
      navigate("/login");
    }
  };

  const inputClass =
    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";

  return (
    <div className="bg-teal-500 min-h-screen flex items-center justify-center">
      <form
        className="w-full max-w-md bg-white rounded-2xl p-8 shadow-lg"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-3xl font-bold mb-8 text-center text-teal-600">
          Register
        </h1>

        {/* Avatar Upload */}
        <div className="flex justify-center mb-6">
          <label
            htmlFor="dropzone-file"
            className={`flex items-center justify-center w-32 h-32 rounded-full border-2 ${
              preview ? "border-gray-300" : "border-dashed border-gray-300"
            } cursor-pointer bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600 overflow-hidden`}
          >
            {preview ? (
              <img
                className="w-full h-full object-cover"
                src={preview}
                alt="Avatar preview"
              />
            ) : (
              <div className="flex flex-col items-center justify-center">
                <svg
                  className="w-6 h-6 mb-2 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Upload avatar
                </p>
              </div>
            )}
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              accept="image/jpeg,image/png,image/webp,image/jpg"
              onChange={handleImagePreview}
            />
          </label>
        </div>

        {/* Email Field */}
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            {...register("email")}
            type="email"
            id="email"
            className={inputClass}
            placeholder="Enter your email"
          />
          {errors.email && (
            <span className="text-red-600 text-sm mt-1">
              {errors.email.message}
            </span>
          )}
        </div>

        {/* Name Field */}
        <div className="mb-5">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your name
          </label>
          <input
            {...register("name")}
            type="text"
            id="name"
            className={inputClass}
            placeholder="Enter your name"
          />
          {errors.name && (
            <span className="text-red-600 text-sm mt-1">
              {errors.name.message}
            </span>
          )}
        </div>

        {/* Password Field */}
        <div className="mb-5 relative">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your password
          </label>
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
            className="absolute inset-y-0 right-0 flex items-center pr-3 mt-7 text-gray-500 dark:text-gray-400"
          >
            {isShowPassword ? <PiEye size={20} /> : <FaRegEyeSlash size={20} />}
          </button>
          {errors.password && (
            <span className="text-red-600 text-sm mt-1">
              {errors.password.message}
            </span>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-teal-600 text-white font-medium py-2.5 rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 mt-4"
        >
          Register
        </button>
      </form>
    </div>
  );
}