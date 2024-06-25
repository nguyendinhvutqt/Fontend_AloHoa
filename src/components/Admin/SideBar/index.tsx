import { faProductHunt } from "@fortawesome/free-brands-svg-icons";
import {
  faCartShopping,
  faList,
  faRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink, useNavigate } from "react-router-dom";
import useUserStore from "../../../stores/userStore";

const SideBar = () => {
  const navigate = useNavigate();
  const logout = useUserStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    navigate("/");
  };
  return (
    <div className="px-4 py-8">
      <div className="flex flex-col justify-center items-center border-b-2">
        <img
          className="w-1/2"
          src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
          alt="avatar"
        />
        <h2 className="text-2xl my-4">Nguyen dinh vu</h2>
      </div>
      <div className="mt-4">
        <NavLink
          to={"/admin/categories"}
          className={({ isActive }) =>
            isActive
              ? "bg-gray-400 font-bold flex items-center h-12 px-4"
              : "font-thin flex items-center h-12 px-4 hover:bg-slate-300"
          }
        >
          <FontAwesomeIcon className="text-2xl" icon={faList} />
          <p className="mx-4 font-bold">Danh mục</p>
        </NavLink>
        <NavLink
          to={"/admin/products"}
          className={({ isActive }) =>
            isActive
              ? "bg-gray-400 font-bold flex items-center h-12 px-4"
              : "font-thin flex items-center h-12 px-4 hover:bg-slate-300"
          }
        >
          <FontAwesomeIcon className="text-2xl" icon={faProductHunt} />
          <p className="mx-4 font-bold">Sản phẩm</p>
        </NavLink>
        <NavLink
          to={"/admin/users"}
          className={({ isActive }) =>
            isActive
              ? "bg-gray-400 font-bold flex items-center h-12 px-4"
              : "font-thin flex items-center h-12 px-4 hover:bg-slate-300"
          }
        >
          <FontAwesomeIcon className="text-2xl" icon={faUser} />
          <p className="mx-4 font-bold">Người dùng</p>
        </NavLink>
        <NavLink
          to={"/admin/orders"}
          className={({ isActive }) =>
            isActive
              ? "bg-gray-400 font-bold flex items-center h-12 px-4"
              : "font-thin flex items-center h-12 px-4 hover:bg-slate-300"
          }
        >
          <FontAwesomeIcon className="text-2xl" icon={faCartShopping} />
          <p className="mx-4 font-bold">Đơn hàng</p>
        </NavLink>
        <div
          className="font-thin flex items-center h-12 px-4 hover:bg-slate-300 hover:cursor-pointer"
          onClick={handleLogout}
        >
          <FontAwesomeIcon className="text-2xl" icon={faRightFromBracket} />
          <p className="mx-4 font-bold">Đăng xuất</p>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
