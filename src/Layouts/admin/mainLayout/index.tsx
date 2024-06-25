import React from "react";
import { Link } from "react-router-dom";
import SideBar from "../../../components/Admin/SideBar";

type Props = {
  children: React.ReactNode;
};

const AdminMainLayout = (props: Props) => {
  const { children } = props;
  return (
    <div className="flex relative">
      <div className="sticky top-0 w-1/5 h-screen">
        <SideBar />
      </div>
      <div className="flex-1 relative border-l-2">
        <div className="navbar px-5 bg-gray-700 sticky top-0 z-10">
          <Link to={"/admin"}>
            <p className="btn btn-ghost text-xl text-white">AloHoa Flower</p>
          </Link>
        </div>
        <div className="mx-8 my-4">{children}</div>
      </div>
    </div>
  );
};

export default AdminMainLayout;
