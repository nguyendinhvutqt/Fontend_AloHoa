import { useEffect, useState } from "react";
import useUserStore from "../../stores/userStore";
import { ToastContainer, toast } from "react-toastify";
import { update } from "../../services/userService";
import { findAllByUser } from "../../services/orderService";
import { OrderUser } from "../../types/order";
import Pagination from "../../components/Pagination";

const Profile = () => {
  const [name, setName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [orders, setOrders] = useState<OrderUser[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(0);

  const handleDecrementPageChange = (currentPage: number) => {
    if (+currentPage <= 1) return;
    setCurrentPage(+currentPage - 1);
  };

  const handleIncrementPageChange = (currentPage: number) => {
    if (+currentPage >= totalPage) return;
    console.log(currentPage);
    setCurrentPage(+currentPage + 1);
  };

  const handleSetCurrentPage = (page: number) => {
    setCurrentPage(page);
  };

  const user = useUserStore((state) => state.user);
  const setUserData = useUserStore((state) => state.setUserData);

  const fetchOrdersByUserApi = async (page: number, take: number) => {
    try {
      const res = await findAllByUser(page, take, "");
      console.log(res);
      if (res.data.status === 200) {
        setOrders(res.data.data.orders);
        setTotalPage(res.data.data.totalPage);
        setCurrentPage(res.data.data.currentPage);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    if (!name) {
      toast.error("Vui lòng nhập họ và tên");
      return;
    }

    if (!address) {
      toast.error("Vui lòng nhập địa chỉ");
      return;
    }

    if (!phone) {
      toast.error("Vui lòng nhập số điện thoại");
      return;
    }

    const data = {
      username: name,
      address: address,
      phone: phone,
    };

    const res = await update(data);
    if (res.data.status === 200) {
      setUserData({
        userId: res.data.data.id,
        email: res.data.data.email,
        avatar: res.data.data.avatarUrl,
        role: res.data.data.role,
        username: res.data.data.name,
        address: res.data.data.address,
        phone: res.data.data.phone,
      });
      toast.success("Cập nhật thông tin thành công");
    }
  };

  useEffect(() => {
    fetchOrdersByUserApi(currentPage, 5);
  }, [currentPage]);

  useEffect(() => {
    if (user) {
      setName(user.username);
      setAddress(user.address || "");
      setPhone(user.phone || "");
    }
  }, [user]);
  return (
    <div>
      <div className="flex mx-12 mt-12 mb-4 border-b-2 pb-4">
        <div className="w-1/3">
          <img
            src={
              user?.avatar
                ? user?.avatar
                : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
            }
            alt="avatar"
          />
        </div>
        <div className="flex-1 my-8 mx-12">
          <h2 className="text-center text-2xl">Thông tin cá nhân</h2>
          <div className="flex flex-col justify-center items-center mt-8">
            <div className="flex items-center justify-center">
              <p className="py-4 w-44">Họ và tên:</p>
              <input
                type="text"
                className="input input-bordered w-full max-w-xs focus:outline-none ml-4"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-center">
              <p className="py-4 w-44">Địa chỉ:</p>
              <input
                type="text"
                className="input input-bordered w-full max-w-xs focus:outline-none ml-4"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-center">
              <p className="py-4 w-44">Số điện thoại:</p>
              <input
                type="text"
                className="input input-bordered w-full max-w-xs focus:outline-none ml-4"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-center mt-4">
            <button className="btn" onClick={handleSubmit}>
              Cập nhật
            </button>
          </div>
        </div>
      </div>
      <div className="px-12 py-4">
        <h2 className="text-xl">Đơn hàng của bạn</h2>
        <table className="table">
          <thead>
            <tr>
              <td>Id</td>
              <td>Ngày đặt hàng</td>
              <td>Tổng tiền</td>
              <td>ghi chú</td>
              <td>Trạng thái</td>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.orderDate}</td>
                <td>{order.totalAmount}</td>
                <td>
                  <div dangerouslySetInnerHTML={{ __html: order.note }} />
                </td>
                <td>{order.status === "Pendding" && "Chờ xác nhận"}
                    {order.status === "Processing" && "Đang xử lí"}
                    {order.status === "Shipped" && "Đã vận chuyển"}
                    {order.status === "Received" && "Đã nhận"}
                    {order.status === "Cancelled" && "Đã huỷ"}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPage}
          decrementPage={handleDecrementPageChange}
          incrementPage={handleIncrementPageChange}
          setPage={handleSetCurrentPage}
        />
      </div>
      <ToastContainer />
    </div>
  );
};

export default Profile;
