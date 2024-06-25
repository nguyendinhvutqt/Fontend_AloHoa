import { Link } from "react-router-dom";
import CartIcon from "../CartIcon";
import { CartData } from "../../types/cart";
import { UserData } from "../../types/user";

type props = {
  cart: CartData[];
  user: UserData | null;
  logOut: () => void;
};

const ActionNav = (props: props) => {
  const { user, cart, logOut } = props;

  if (!user) {
    return (
      <div>
        <Link to={"/sign-in"} className="btn btn-ghost">
          Đăng nhập
        </Link>
      </div>
    );
  }
  return (
    <>
      <CartIcon cart={cart} />
      <div className="dropdown dropdown-end px-2">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle avatar"
        >
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS Navbar component"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
            />
          </div>
        </div>
        <ul
          tabIndex={0}
          className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
        >
          <li>
            <Link to={"/profile"} className="justify-between">
              Profile
              <span className="badge">New</span>
            </Link>
          </li>
          <li>
            <a>Settings</a>
          </li>
          <li>
            <button onClick={logOut}>Đăng xuất</button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default ActionNav;
