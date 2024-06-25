import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { findAllAndPagination } from "../../../services/orderService";
import { OrderData } from "../../../types/order";
import { formatCurrency } from "../../../utils/formatCurrency";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo } from "@fortawesome/free-solid-svg-icons";
import Pagination from "../../../components/Pagination";

const OrderAdmin: React.FC = () => {
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [search, setSearch] = useState<string>("");
  const [currentaPage, setCurrentPage] = useState<number>(1);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [take, setTake] = useState<number>(5);
  const [totalPage, setTotalPage] = useState<number>(0);

  const fetchOrdersAndPaginationApi = async (
    page: number,
    take: number,
    search: string = ""
  ) => {
    try {
      const res = await findAllAndPagination(page, take, search);
      if (res.data.status === 200) {
        setOrders(res.data.data.orders);
        setTotalPage(res.data.data.totalPage);
        setCurrentPage(res.data.data.currentPage);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message || "Có lỗi xảy ra");
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Có lỗi xả ra");
      }
    }
  };

  const handleDecrementPageChange = (currentPage: number) => {
    if (+currentPage <= 1) return;
    setCurrentPage(+currentPage - 1);
  };

  const handleIncrementPageChange = (currentPage: number) => {
    if (+currentPage >= totalPage) return;
    setCurrentPage(+currentPage + 1);
  };

  const handleSetCurrentPage = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    fetchOrdersAndPaginationApi(currentaPage, take, search);
  }, [currentaPage, take, search]);
  return (
    <div className="min-h-screen">
      <div className="text-base breadcrumbs font-bold">
        <ul>
          <li>
            <Link to={"/admin"}>Trang chủ</Link>
          </li>
          <li>Đơn hàng</li>
        </ul>
      </div>
      <div>
        <div className="flex justify-between">
          <h2 className="my-4 text-black text-xl">Danh sách đơn hàng</h2>
          <select
            name="status"
            id="status"
            value={search}
            className="input mr-8 ml-4 border-1 input-bordered focus:outline-none pr-14 select"
            onChange={(e) => setSearch(e.target.value)}
          >
            <option className="p-2 input" value={"Pendding"}>
              Chờ xác nhận
            </option>
            <option className="p-2 input" value={"Processing"}>
              Đang xử lí
            </option>
            <option className="p-2 input" value={"Shipped"}>
              Đã vận chuyển
            </option>
            <option className="p-2 input" value={"Received"}>
              Đã nhận
            </option>
            <option className="p-2 input" value={"Cancelled"}>
              Đã huỷ
            </option>
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>id</th>
                <th>Người dùng</th>
                <th>Số tiền</th>
                <th>Thời gian</th>
                <th>Trạng thái</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((item) => (
                <tr key={item.id}>
                  <td className="w-36 overflow-x-scroll">{item.id}</td>
                  <td>{item.user.name}</td>
                  <td>{formatCurrency(item.totalAmount)}</td>
                  <td>{item.orderDate}</td>
                  <td>
                    {item.status === "Pendding" && "Chờ xác nhận"}
                    {item.status === "Processing" && "Đang xử lí"}
                    {item.status === "Shipped" && "Đã vận chuyển"}
                    {item.status === "Received" && "Đã nhận"}
                    {item.status === "Cancelled" && "Đã huỷ"}
                  </td>
                  <td>
                    <div>
                      <Link
                        to={`/admin/orders/${item.id}`}
                        className="btn mx-1"
                      >
                        <FontAwesomeIcon icon={faInfo} />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            currentPage={currentaPage}
            totalPages={totalPage}
            decrementPage={handleDecrementPageChange}
            incrementPage={handleIncrementPageChange}
            setPage={handleSetCurrentPage}
          />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default OrderAdmin;
