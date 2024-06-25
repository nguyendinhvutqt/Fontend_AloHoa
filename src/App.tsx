import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";

import { privateRoutes, publicRoutes } from "./routes/index";
import useUserStore from "./stores/userStore";
import MainLayout from "./Layouts/mainLayout";
import HeaderOnly from "./Layouts/headerOnly";
import PrivateRoute from "./components/PrivateRoute";
import AdminMainLayout from "./Layouts/admin/mainLayout";

function App() {
  const user = useUserStore((state) => state.user);

  return (
    <>
      <Router>
        <Routes>
          {publicRoutes.map((route) => {
            const Comp = route.component;

            let Layout;
            if (route.layout === "main") {
              Layout = MainLayout;
            } else if (route.layout === "header") {
              Layout = HeaderOnly;
            } else if (route.layout === "admin") {
              Layout = AdminMainLayout;
            } else {
              Layout = Fragment;
            }

            return (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <Layout>
                    <Comp />
                  </Layout>
                }
              />
            );
          })}
          {privateRoutes.map((route) => {
            const Comp = route.component;

            let Layout;
            if (route.layout === "main") {
              Layout = MainLayout;
            } else if (route.layout === "header") {
              Layout = HeaderOnly;
            } else if (route.layout === "admin") {
              Layout = AdminMainLayout;
            } else {
              Layout = Fragment;
            }

            return (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <PrivateRoute user={user} role={route.role}>
                    <Layout>
                      <Comp />
                    </Layout>
                  </PrivateRoute>
                }
              />
            );
          })}
        </Routes>
      </Router>
    </>
  );
}

export default App;
