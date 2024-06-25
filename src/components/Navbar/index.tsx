import { Link, useNavigate } from "react-router-dom";
import ActionNav from "../ActionNav";
import Search from "../Search";
import useCartStore from "../../stores/cartStore";
import useUserStore from "../../stores/userStore";

const NavBar = () => {
  const navigate = useNavigate();

  const clearCart = useCartStore((state) => state.clearCart);
  const cartProducts = useCartStore((state) => state.products);
  const logout = useUserStore((state) => state.logout);
  const userInfo = useUserStore((state) => state.user);

  const handleLogout = () => {
    logout();
    clearCart();
    navigate("/");
  };

  return (
    <div>
      <div className="navbar flex justify-between bg-base-100 px-5">
        <Link to={"/"} className="">
          <p className="btn btn-ghost text-xl">AloHoa Flower</p>
        </Link>
        <div className="">
          <Search />
        </div>
        <div className="flex-none gap-2">
          <ActionNav
            cart={cartProducts}
            user={userInfo}
            logOut={handleLogout}
          />
        </div>
      </div>
      <div className="bg-green-600">
        <ul className="flex items-center h-12">
          <li className="flex items-center px-4 hover:bg-green-700 hover:text-white h-full font-bold">
            <Link className="" to={"/"}>
              Trang chủ
            </Link>
          </li>
          <li className="flex items-center px-4 hover:bg-green-700 hover:text-white h-full font-bold">
            <Link className="" to={"/products"}>
              Sản phẩm
            </Link>
          </li>
          <li className="flex items-center px-4 hover:bg-green-700 hover:text-white h-full font-bold">
            <Link className="" to={"/about"}>
              Liên hệ
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
