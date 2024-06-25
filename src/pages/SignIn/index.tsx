import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm, Resolver } from "react-hook-form";
import axios from "axios";
import useUserStore from "../../stores/userStore";
import { ToastContainer, toast } from "react-toastify";

type FormValues = {
  email: string;
  password: string;
};

const resolver: Resolver<FormValues> = async (values) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Kiểm tra nếu giá trị của trường email không phải là định dạng email hợp lệ
  if (values.email && !emailRegex.test(values.email)) {
    return {
      values: {},
      errors: {
        email: {
          type: "format",
          message: "Email không hợp lệ",
        },
      },
    };
  }

  // Nếu trường email không được điền vào, trả về lỗi yêu cầu
  if (!values.email) {
    return {
      values: {},
      errors: {
        email: {
          type: "required",
          message: "Email không được để trống",
        },
      },
    };
  }

  // Nếu trường password không được điền vào, trả về lỗi yêu cầu
  if (!values.password) {
    return {
      values: {},
      errors: {
        password: {
          type: "required",
          message: "Mật khẩu không được để trống",
        },
      },
    };
  }

  // Kiểm tra nếu trường password có ít hơn 5 kí tự, trả về lỗi yêu cầu
  if (values.password.length < 5) {
    return {
      values: {},
      errors: {
        password: {
          type: "minLength",
          message: "Mật khẩu phải có ít nhất 5 kí tự",
        },
      },
    };
  }

  // Nếu tất cả điều kiện đều thỏa mãn, trả về giá trị và không có lỗi
  return {
    values: values,
    errors: {},
  };
};

const SignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver });

  const setUserData = useUserStore((state) => state.setUserData);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const result = await axios.post(
        "http://localhost:3000/auth/sign-in",
        data
      );
      if (result.status === 200 && result.data.user) {
        const user = result.data.user;
        setUserData(user);
        localStorage.setItem("accessToken", result.data.access_token);
        if (user.role === "Admin") {
          navigate("/admin");
          return;
        }
        navigate(from);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error("Email hoặc mật khẩu không chính xác");
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Có lỗi xảy ra");
      }
    }
  });

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          ĐĂNG NHẬP TÀI KHOẢN
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={onSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email
            </label>
            <div className="mt-2">
              <input
                id="email"
                spellCheck="false"
                autoComplete="email"
                placeholder="Vui lòng nhập email..."
                {...register("email")}
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            {errors?.email && (
              <p className="p-1.5 text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Mật khẩu
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                placeholder="Vui lòng nhập mật khẩu..."
                {...register("password")}
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            {errors?.password && (
              <p className="p-1.5 text-red-600">{errors.password.message}</p>
            )}
            <div className="text-sm float-right m-4">
              <a
                href="#"
                className="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                Quên mật khẩu?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              ĐĂNG NHẬP
            </button>
          </div>
        </form>

        <p className="mt-5 text-center text-sm text-gray-500">
          Bạn chưa có tài khoản?{" "}
          <Link
            to={"/sign-up"}
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Đăng kí tài khoản
          </Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignIn;
