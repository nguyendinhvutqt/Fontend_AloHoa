const pathRoute = {
  // user role
  Home: "/",
  Product: "/products",
  SignIn: "/sign-in",
  SignUp: "/sign-up",
  Profile: "/profile",
  ProductDetail: "/products/:id",
  Cart: "/cart",
  Unauthorized: "/unauthorized",

  // admin role
  AdminHome: "/admin",
  AdminCategory: "/admin/categories",
  AdminProduct: "/admin/products",
  AdminOrder: "/admin/orders",
  AdminUser: "/admin/users",
  AdminOrderDetail: "/admin/orders/:id",
};

export default pathRoute;
