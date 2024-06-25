import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { format } from "date-fns";

import { OrderDetailData } from "../../../types/order";
import {
  findOrderDetailsByOrderId,
  update,
} from "../../../services/orderService";
import { formatCurrency } from "../../../utils/formatCurrency";
import OrderModal from "../../../components/Admin/OrderModal";

const OrderDetailAdmin: React.FC = () => {
  const [orderDetail, setOrderDetail] = useState<OrderDetailData>();
  const [isShow, setIsShow] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("");
  const [orderId, setOrderId] = useState<string>("");

  const { id } = useParams();

  const fetchOrderDetailApi = async (orderId: string) => {
    try {
      const res = await findOrderDetailsByOrderId(orderId);
      if (res.data.status === 200) {
        setOrderDetail(res.data.data);
        setStatus(res.data.data.status);
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

  const handleSubmit = async (orderId: string, status: string) => {
    try {
      const res = await update(orderId, status);
      if (res.data.status === 200) {
        toast.success(res.data.message);
        setIsShow(false);
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

  const handleCloseModal = () => {
    setIsShow(false);
  };

  const handleAction = () => {
    setIsShow(true);
  };

  const getSumMoney = (orderDetail: OrderDetailData) => {
    let sumMoney = 0;
    orderDetail.orderItems.forEach((item) => {
      sumMoney += item.quantity * item.price;
    });
    return sumMoney;
  };

  useEffect(() => {
    if (id) {
      setOrderId(id);
      fetchOrderDetailApi(id);
    }
  }, [id]);

  return (
    <div className=" min-h-screen relative">
      <div className="text-base breadcrumbs font-bold">
        <ul>
          <li>
            <Link to={"/admin"}>Trang chủ</Link>
          </li>
          <li>
            <Link to={"/admin/orders"}>Đơn hàng</Link>
          </li>
          <li>Đơn hàng</li>
        </ul>
      </div>
      <div>
        <table className="table">
          <thead>
            <tr>
              <td>Tên sản phẩm</td>
              <td>Hình ảnh</td>
              <td>Giá</td>
              <td>Số lượng</td>
              <td>Tổng tiền</td>
            </tr>
          </thead>
          <tbody>
            {orderDetail?.orderItems?.map((item) => (
              <tr key={item.id}>
                <td>{item.product.name}</td>
                <td>
                  <img
                    className="w-32 h-32 object-cover"
                    src={item.product.imageUrl}
                    alt="image"
                  />
                </td>
                <td>{formatCurrency(item.price)}</td>
                <td>{item.price}</td>
                <td>{formatCurrency(item.quantity * item.price)}</td>
              </tr>
            ))}
            <tr>
              <td>Tổng tiền:</td>
              <td></td>
              <td></td>
              <td></td>
              <td>{orderDetail && formatCurrency(getSumMoney(orderDetail))}</td>
            </tr>
          </tbody>
        </table>
        <div className="flex items-center m-4">
          <p>Nội dung: </p>
          {orderDetail?.note && (
            <div
              className="ml-4"
              dangerouslySetInnerHTML={{ __html: orderDetail?.note }}
            />
          )}
        </div>
        <div className="flex ml-4 my-6">
          <p>Ngày đặt hàng:</p>
          <p className="ml-4">
            {orderDetail &&
              format(new Date(orderDetail.orderDate), "dd-MM-yyyy")}
          </p>
        </div>
        <div className="flex items-center m-4">
          <p>Trạng thái:</p>
          <select
            name="status"
            id="status"
            value={status}
            className="input ml-4 border-1 input-bordered focus:outline-none pr-14 select"
            onChange={(e) => setStatus(e.target.value)}
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
        <div className="my-6">
          <button className="btn mx-2" onClick={handleAction}>
            Xác nhận
          </button>
        </div>
      </div>
      <OrderModal
        isShow={isShow}
        status={status}
        orderId={orderId}
        closeModal={handleCloseModal}
        onSubmit={handleSubmit}
      />
      <ToastContainer />
    </div>
  );
};

export default OrderDetailAdmin;
