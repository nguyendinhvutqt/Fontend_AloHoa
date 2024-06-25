import pathRoute from "./pathRoute";

import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Profile from "../pages/Profile";
import { RoleUser } from "../enums/user/role.enum";
import Product from "../pages/Product";
import ProductDetail from "../pages/ProductDetail";
import Cart from "../pages/Cart";
import HomeAdmin from "../pages/Admin/Home";
import ProductAdmin from "../pages/Admin/Product";
import CategoryAdmin from "../pages/Admin/Category";
import Unauthorized from "../components/Unauthorized";
import OrderAdmin from "../pages/Admin/order";
import OrderDetailAdmin from "../pages/Admin/OrderDetail";
import UserAdmin from "../pages/Admin/User";

export const publicRoutes = [
  {
    path: pathRoute.Home,
    component: Home,
    layout: "main",
  },
  {
    path: pathRoute.Product,
    component: Product,
    layout: "main",
  },
  {
    path: pathRoute.ProductDetail,
    component: ProductDetail,
    layout: "header",
  },
  {
    path: pathRoute.SignIn,
    component: SignIn,
    layout: null,
  },
  {
    path: pathRoute.SignUp,
    component: SignUp,
    layout: null,
  },
  {
    path: pathRoute.Unauthorized,
    component: Unauthorized,
    layout: null,
  },
];

export const privateRoutes = [
  //user role
  {
    path: pathRoute.Profile,
    component: Profile,
    layout: "main",
    role: RoleUser.User,
  },
  {
    path: pathRoute.Cart,
    component: Cart,
    layout: "header",
    role: RoleUser.User,
  },
  //admin role
  {
    path: pathRoute.AdminHome,
    component: HomeAdmin,
    layout: "admin",
    role: RoleUser.Admin,
  },
  {
    path: pathRoute.AdminProduct,
    component: ProductAdmin,
    layout: "admin",
    role: RoleUser.Admin,
  },
  {
    path: pathRoute.AdminCategory,
    component: CategoryAdmin,
    layout: "admin",
    role: RoleUser.Admin,
  },
  {
    path: pathRoute.AdminOrder,
    component: OrderAdmin,
    layout: "admin",
    role: RoleUser.Admin,
  },
  {
    path: pathRoute.AdminOrderDetail,
    component: OrderDetailAdmin,
    layout: "admin",
    role: RoleUser.Admin,
  },
  {
    path: pathRoute.AdminUser,
    component: UserAdmin,
    layout: "admin",
    role: RoleUser.Admin,
  },
];
