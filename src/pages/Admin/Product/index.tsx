import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import React, { ChangeEvent, useEffect, useState } from "react";
import { ProductItemData, UpdateProductData } from "../../../types/product";
import axios from "axios";
import {
  addProduct,
  delProduct,
  getProductsAndPagination,
  updateProduct,
} from "../../../services/productService";
import ProductModal from "../../../components/Admin/ProductModal";
import { CategoryItemData } from "../../../types/category";
import { getCategories } from "../../../services/categoryService";
import { useDebounce } from "use-debounce";
import Pagination from "../../../components/Pagination";
import { formatCurrency } from "../../../utils/formatCurrency";

const ProductAdmin: React.FC = () => {
  const [categories, setCategories] = useState<CategoryItemData[]>([]);
  const [products, setProducts] = useState<ProductItemData[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<
    ProductItemData | undefined
  >(undefined);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalAction, setModalAction] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [searchValue] = useDebounce(search, 1000);
  const [currentPage, setCurrentPage] = useState<number>(1);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [take, setTake] = useState<number>(5);
  const [totalPage, setTotalPage] = useState<number>(0);

  const fetchProductsAndPaginationApi = async (
    page: number,
    take: number,
    searchValue: string
  ) => {
    try {
      const res = await getProductsAndPagination(page, take, searchValue);
      if (res.data.status === 200) {
        setCurrentPage(res.data.data.currentPage);
        setTotalPage(res.data.data.totalPage);
        setProducts(res.data.data.products);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message || "Có lỗi xảy ra");
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Có lỗi xảy ra");
      }
    }
  };

  const fetchCategoriesApi = async () => {
    setLoading(true);
    try {
      const res = await getCategories();
      if (res.data.status === 200) {
        setCategories(res.data.data);
        setLoading(false);
      } else {
        setLoading(false);
        toast.error("Có lỗi xảy ra");
      }
    } catch (error) {
      setLoading(false);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message || "Có lỗi xảy ra");
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Có lỗi xảy ra");
      }
    }
  };

  const fetchAddProductApi = async (data: FormData) => {
    setLoading(true);
    try {
      const res = await addProduct(data);
      if (res.data.status === 201) {
        setProducts((prev) => [res.data.data, ...prev]);
        toast.success("Thêm mới sản phẩm thành công");
        setLoading(false);
        setShowModal(false);
      }
    } catch (error) {
      setLoading(false);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message || "Có lỗi xảy ra");
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Có lỗi xả ra");
      }
    }
  };

  const fetchUpdateProductApi = async (
    productId: string,
    data: UpdateProductData
  ) => {
    setLoading(true);
    try {
      const res = await updateProduct(productId, data);
      if (res.data.status === 200) {
        setProducts((prev) => {
          return prev.map((item) => {
            if (item.id === res.data.data.id) {
              item = res.data.data;
            }
            return item;
          });
        });
        toast.success("Cập nhật sản phẩm thành công");
        setLoading(false);
        setShowModal(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message || "Có lỗi xảy ra");
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Có lỗi xả ra");
      }
    }
  };

  const fetchDelProductApi = async (productId: string) => {
    setLoading(true);
    try {
      const res = await delProduct(productId);
      console.log(res.data);
      if (res.data.status === 200) {
        setProducts((prev) => {
          return prev.filter((item) => item.id !== productId);
        });
        toast.success("Xoá sản phẩm thành công");
        setLoading(false);
        setShowModal(false);
      }
    } catch (error) {
      setLoading(false);
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

  const handleSetSearchValue = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handleOpenAddProduct = () => {
    setShowModal(true);
    setModalAction("add");
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOpenModalDelProduct = (product: ProductItemData) => {
    setModalAction("del");
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleOpenModalEditProduct = (product: ProductItemData) => {
    setModalAction("edit");
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleSubmitForm = (
    action: string,
    product?: ProductItemData,
    formData?: FormData,
    dataUpdate?: UpdateProductData
  ) => {
    if (action === "add" && formData) {
      fetchAddProductApi(formData);
    }
    if (action === "del" && product) {
      fetchDelProductApi(product.id);
    }
    if (action === "edit" && dataUpdate && product) {
      fetchUpdateProductApi(product.id, dataUpdate);
    }
  };

  useEffect(() => {
    fetchProductsAndPaginationApi(currentPage, take, searchValue);
  }, [currentPage, take, searchValue]);

  useEffect(() => {
    fetchCategoriesApi();
  }, []);

  return (
    <div className=" min-h-screen">
      <div className="text-base breadcrumbs font-bold">
        <ul>
          <li>
            <Link to={"/admin"}>Trang chủ</Link>
          </li>
          <li>Sản phẩm</li>
        </ul>
      </div>
      <div className="border-t-2 mt-4 py-4">
        <div className="flex justify-between">
          <button className="btn" onClick={handleOpenAddProduct}>
            Thêm mới
          </button>
          <input
            type="text"
            className="input border border-gray-300 focus:outline-none"
            placeholder="Tìm kiếm sản phẩm..."
            value={search}
            onChange={handleSetSearchValue}
          />
        </div>
        <h2 className="mt-4 text-black text-xl">Danh mục sản phẩm</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Tên danh mục</th>
              <th>Giá</th>
              <th>Hình ảnh</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{formatCurrency(item.price)}</td>
                  <td>
                    <img
                      className="w-32 h-32 object-cover"
                      src={item.imageUrl}
                      alt="product image"
                    />
                  </td>
                  <td className="flex justify-center items-center">
                    <div>
                      <button
                        className="btn mx-1"
                        onClick={() => handleOpenModalEditProduct(item)}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button
                        className="btn mx-1"
                        onClick={() => handleOpenModalDelProduct(item)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
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
      <ProductModal
        isShow={showModal}
        onClose={handleCloseModal}
        action={modalAction}
        product={selectedProduct}
        categories={categories}
        isLoading={loading}
        onSubmit={handleSubmitForm}
      />
    </div>
  );
};

export default ProductAdmin;
