import { ReactNode } from "react";
import { UserData } from "../../types/user";
import { Navigate } from "react-router-dom";
import { RoleUser } from "../../enums/user/role.enum";

type Props = {
  children: ReactNode;
  user: UserData | null;
  role: RoleUser;
};

const PrivateRoute = (props: Props) => {
  const { children, user, role } = props;
  if (!user) {
    return (
      <Navigate to={"/sign-in"} state={{ from: location.pathname }} replace />
    );
  }
  if (user.role !== role) {
    return <Navigate to={"/unauthorized"} />;
  }
  return <>{children}</>;
};

export default PrivateRoute;
