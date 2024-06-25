import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserDataAdmin } from "../../../types/user";
import { findAll } from "../../../services/userService";

const UserAdmin: React.FC = () => {
  const [users, setUsers] = useState<UserDataAdmin[]>([]);

  const fetchUsersApi = async () => {
    try {
      const res = await findAll();
      if (res.data.status === 200) {
        setUsers(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsersApi();
  }, []);
  return (
    <div className="min-h-screen">
      <div className="text-base breadcrumbs font-bold">
        <ul>
          <li>
            <Link to={"/admin"}>Trang chủ</Link>
          </li>
          <li>Người dùng</li>
        </ul>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <td>Tên người dùng</td>
              <td>email</td>
              <td>Số điện thoại</td>
              <td>Địa chỉ</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.address}</td>
                <td>
                  <FontAwesomeIcon icon={faLock} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserAdmin;
