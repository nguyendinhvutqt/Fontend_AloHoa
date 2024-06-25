import { FormEvent, useEffect, useState } from "react";
import { ProductItemData } from "../../types/product";
import {
  getProductById,
  getProductsByCategoryId,
} from "../../services/productService";
import { Link, useNavigate, useParams } from "react-router-dom";
import { formatCurrency } from "../../utils/formatCurrency";
import useCartStore from "../../stores/cartStore";
import useUserStore from "../../stores/userStore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductDetail = () => {
  const navigate = useNavigate();

  const [product, setProduct] = useState<ProductItemData | null>(null);
  const [products, setProducts] = useState<ProductItemData[]>([]);
  const [quantity, setQuantity] = useState<number>(1);

  const user = useUserStore((state) => state.user);
  const addTocart = useCartStore((state) => state.addToCart);
  const { id } = useParams();

  const fetchProductApi = async (productId: string) => {
    try {
      const res = await getProductById(productId);
      if (res.data.status === 200) {
        setProduct(res.data.data);
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra");
    }
  };

  const fetchProductByCategoryIdApi = async (categoryId: string) => {
    try {
      const res = await getProductsByCategoryId(categoryId);
      if (res.data.status === 200) {
        setProducts(res.data.data);
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra");
    }
  };

  useEffect(() => {
    fetchProductApi(id as string);
  }, [id]);

  useEffect(() => {
    if (product) {
      fetchProductByCategoryIdApi(product.categoryId);
    }
  }, [product]);

  const handleSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) {
      navigate("/sign-in", { state: { from: `/products/${product?.id}` } });
    }
    if (product) {
      addTocart(product, quantity);
      toast.success("Thêm sản phẩm vào giỏ hàng thành công");
    }
  };

  const decrementQuantity = () => {
    if (quantity <= 1) {
      return;
    }
    setQuantity((prev) => prev - 1);
  };

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  return (
    <div>
      <div className="text-base breadcrumbs border-t-2 px-10 pt-5 font-bold">
        <ul>
          <li>
            <Link to={"/"}>Trang chủ</Link>
          </li>
          <li>
            <Link to={"/products"}>Sản phẩm</Link>
          </li>
          <li>{product?.name}</li>
        </ul>
      </div>

      <div className="flex items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
        <div className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
          <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
            <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
              <div className="h-full flex items-center overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
                <img
                  src={product?.imageUrl}
                  alt="product"
                  className="object-cover object-center"
                />
              </div>
              <form
                onSubmit={handleSubmitForm}
                className="sm:col-span-8 lg:col-span-7"
              >
                <h2 className="text-2xl py-4 font-bold text-gray-900 sm:pr-12">
                  {product?.name}
                </h2>

                <section aria-labelledby="information-heading" className="mt-2">
                  <div className="text-xl text-gray-900">
                    Giá: {product && formatCurrency(product.price as number)}
                  </div>
                  <div className="text-xl text-gray-900 py-4">
                    {product?.description}
                  </div>
                  <div className="flex items-center pb-4">
                    <button
                      type="button"
                      className="text-gray-500 rounded-l-md px-3 py-1 bg-gray-200 hover:bg-gray-300 focus:outline-none"
                      onClick={decrementQuantity}
                    >
                      -
                    </button>
                    <input
                      className="w-16 text-center border border-gray-300 outline-none"
                      value={quantity}
                      id="quantityInput"
                      onChange={(e) => setQuantity(parseInt(e.target.value))}
                    />
                    <button
                      type="button"
                      className="text-gray-500 rounded-r-md px-3 py-1 bg-gray-200 hover:bg-gray-300 focus:outline-none"
                      onClick={incrementQuantity}
                    >
                      +
                    </button>
                  </div>
                  <div className="text-2xl text-gray-900">
                    Tổng tiền:{" "}
                    {product &&
                      formatCurrency((product.price as number) * quantity)}
                  </div>
                </section>

                <button
                  type="submit"
                  className="flex w-full items-center justify-center mt-5 rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none"
                >
                  Thêm vào giỏ hàng
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto my-4">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 px-10">
          Sản phẩm liên quan
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 px-5 sm:px-10 justify-evenly mt-5">
          {products?.map((product) => (
            <div key={product.id} className="group relative">
              <img
                src={product.imageUrl}
                alt={product.imageUrl}
                className="h-36 sm:h-60 w-36 sm:w-full  object-cover"
              />
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <p>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </p>
                  </h3>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  {formatCurrency(product.price as number)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ProductDetail;
