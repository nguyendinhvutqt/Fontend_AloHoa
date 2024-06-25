import { useEffect, useRef, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import useCartStore from "../../stores/cartStore";
import { formatCurrency } from "../../utils/formatCurrency";
import useUserStore from "../../stores/userStore";
import { CartData, CartPaypent, CartItemData } from "../../types/cart";
import { ToastContainer, toast } from "react-toastify";
import { createOrder } from "../../services/orderService";
import axios from "axios";

const Cart = () => {
  const [name, setName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [note, setNote] = useState<string>("");

  const cart = useCartStore((state) => state.products);
  const [cartItems, setCartItems] = useState<CartData[]>(cart);

  const quillRef = useRef(null);

  const user = useUserStore((state) => state.user);
  const delItem = useCartStore((state) => state.delItem);
  const clearCart = useCartStore((state) => state.clearCart);
  const updateItem = useCartStore((state) => state.updateItem);

  const getSumMoney = (cart: CartData[]) => {
    const totalMoney = cart.reduce((acc, item) => {
      return acc + Number(item.product.price) * Number(item.quantity);
    }, 0);
    return totalMoney;
  };

  const getOrderItem = (cart: CartData[]) => {
    const orderItem: CartItemData[] = cart.map((item) => {
      return {
        productId: item.product.id,
        quantity: item.quantity,
        price: item.product.price,
      };
    });
    console.log("order: ", orderItem);
    return orderItem;
  };

  useEffect(() => {
    if (user) {
      setName(user.username);
      setAddress(user.address || "");
      setPhone(user.phone || "");
    }
  }, [user]);

  const handleDelItem = (productId: string) => {
    setCartItems((prev) => {
      return prev.filter((item) => item.product.id !== productId);
    });
    delItem(productId);
    toast.success("Xoá sản phẩm thành công");
  };

  const decrementQuantity = (productId: string) => {
    const updateCartItems = cartItems.map((item) => {
      if (item.quantity <= 1) {
        return item;
      }
      if (item.product.id === productId) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCartItems(updateCartItems);
  };

  const incrementQuantity = (productId: string) => {
    const updateCartItems = cartItems.map((item) => {
      if (item.product.id === productId) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCartItems(updateCartItems);
  };

  const handleUpdateQuantityItem = (productId: string) => {
    let quantity: number = 0;
    for (let i = 0; i < cartItems.length; i++) {
      if (cartItems[i].product.id === productId) {
        quantity = cartItems[i].quantity;
        break;
      }
    }
    if (quantity === 0) {
      return;
    }
    updateItem(productId, quantity);
    toast.success("Cập nhật giỏ hàng thành công");
  };

  const fetchCreateOrderApi = async (data: CartPaypent) => {
    try {
      const res = await createOrder(data);
      console.log(res);
      if (res.data.status === 201) {
        await setTimeout(() => {
          toast.success(res.data.message);
        }, 100);
        clearCart();
      }
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message || "Có lỗi xảy ra");
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Có lỗi xảy ra");
      }
    }
  };

  const handleCreateOrder = async () => {
    const data: CartPaypent = {
      userId: user?.userId,
      totalAmount: getSumMoney(cart),
      note: note,
      orderItems: getOrderItem(cart),
    };
    console.log("data: ", data);
    fetchCreateOrderApi(data);
  };

  if (cart.length < 1) {
    return <Navigate to={"/"}></Navigate>;
  }

  return (
    <div className="border-t-2 px-10 mb-10">
      <div className="text-base breadcrumbs pt-5 font-bold">
        <ul>
          <li>
            <Link to={"/"}>Trang chủ</Link>
          </li>
          <li>Giỏ hàng</li>
        </ul>
      </div>
      <div className="mt-4 pb-4 border-b-2 ">
        <p className="text-3xl">Giỏ hàng của bạn</p>
      </div>
      <div className="flex mt-4">
        <div className="w-full sm:w-3/5 p-4 border rounded">
          <div className="mt-4">
            <div className="flow-root">
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <li
                    key={item.product.id}
                    className="flex p-6 border-2 rounded-lg my-2"
                  >
                    <div className="h-28 w-28 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={item.product.imageUrl}
                        alt="cart"
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="ml-4 flex flex-1">
                      <div className="flex flex-col flex-1 justify-between text-base font-medium text-gray-900">
                        <p className="text-2xl">{item.product.name}</p>
                        <p className="">
                          Giá: {formatCurrency(item.product.price)}
                        </p>
                        <div className="flex items-center pb-4">
                          <button
                            type="button"
                            className="text-gray-500 rounded-l-md px-3 py-1 bg-gray-200 hover:bg-gray-300 focus:outline-none"
                            onClick={() => decrementQuantity(item.product.id)}
                          >
                            -
                          </button>
                          <input
                            className="w-16 text-center border border-gray-300 outline-none"
                            value={item.quantity}
                            id="quantityInput"
                            readOnly
                          />
                          <button
                            type="button"
                            className="text-gray-500 rounded-r-md px-3 py-1 bg-gray-200 hover:bg-gray-300 focus:outline-none"
                            onClick={() => incrementQuantity(item.product.id)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <button
                          type="button"
                          className="btn my-2 font-medium text-indigo-600 hover:text-indigo-500"
                          onClick={() =>
                            handleUpdateQuantityItem(item.product.id)
                          }
                        >
                          Cập nhật
                        </button>
                        <button
                          type="button"
                          className="btn my-2 font-medium text-indigo-600 hover:text-indigo-500"
                          onClick={() => handleDelItem(item.product.id)}
                        >
                          Xoá
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="w-full sm:w-2/5 px-8">
          <h2 className="text-center text-xl font-bold">Thông tin của bạn</h2>
          <div className="my-4">
            <div className="flex my-2">
              <p className="py-2 w-48">Họ và tên:</p>
              <input
                type="text"
                className="input input-bordered w-full max-w-xs focus:outline-none ml-4"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex my-2">
              <p className="py-2 w-48">Địa chỉ:</p>
              <input
                type="text"
                className="input input-bordered w-full max-w-xs focus:outline-none ml-4"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="flex my-2">
              <p className="py-2 w-48">Số điện thoại:</p>
              <input
                className="input input-bordered w-full max-w-xs focus:outline-none ml-4"
                type="text"
                value={phone}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <p>Ghi chú:</p>
              <ReactQuill
                ref={quillRef}
                theme="snow"
                value={note}
                onChange={setNote}
              />
            </div>
            <div className="flex">
              <p className="py-2">
                Tổng tiền: {formatCurrency(getSumMoney(cart))}
              </p>
            </div>
          </div>
          <div className="flex flex-col">
            <button className="btn my-2" onClick={handleCreateOrder}>
              Thanh toán tại nhà
            </button>
            {/* <button className="btn my-2">Thanh toán online</button> */}
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" />
    </div>
  );
};

export default Cart;
