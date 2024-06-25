import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import {
  addCategory,
  dellCategory,
  getCategoriesAndPagination,
  updateCategory,
} from "../../../services/categoryService";
import { CategoryItemData } from "../../../types/category";
import { ChangeEvent, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useDebounce } from "use-debounce";
import CategoryModal from "../../../components/Admin/CategoryModal";
import axios from "axios";
import Pagination from "../../../components/Pagination";

const CategoryAdmin = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalAction, setModalAction] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<
    CategoryItemData | undefined
  >(undefined);
  const [categories, setCategories] = useState<CategoryItemData[]>([]);
  const [search, setSearch] = useState<string>("");
  const [searchValue] = useDebounce(search, 1000);
  const [currentPage, setCurrentPage] = useState<number>(1);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [take, setTake] = useState<number>(5);
  const [totalPages, setTotalPages] = useState<number>(0);

  const fetchCategoriesAndPagination = async (
    page: number,
    take: number,
    searchValue: string
  ) => {
    try {
      const res = await getCategoriesAndPagination(page, take, searchValue);
      if (res.data.status === 200) {
        setCurrentPage(res.data.data.currentPage);
        setCategories(res.data.data.categories);
        setTotalPages(res.data.data.totalPage);
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

  useEffect(() => {
    fetchCategoriesAndPagination(currentPage, take, searchValue);
  }, [currentPage, take, searchValue]);

  const handleDecrementPageChange = (currentPage: number) => {
    if (+currentPage <= 1) return;
    setCurrentPage(+currentPage - 1);
  };

  const handleIncrementPageChange = (currentPage: number) => {
    if (+currentPage >= totalPages) return;
    setCurrentPage(+currentPage + 1);
  };

  const handleSetCurrentPage = (page: number) => {
    setCurrentPage(page);
  };

  const handleSetSearchValue = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentPage(1);
    setSearch(e.target.value);
  };

  const fetchAddCategoryApi = async (name: string) => {
    try {
      const res = await addCategory({ name });
      if (res.data.status === 201) {
        toast.success("Tạo mới danh mục thành công");
        setCategories((prev) => {
          const updatedCategories = [res.data.data, ...prev];

          // Tính toán lại totalPages
          const newTotalPages = Math.ceil(updatedCategories.length / take);
          setTotalPages(newTotalPages);

          return updatedCategories;
        });
        setShowModal(false);
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

  const fetchDelCategoryApi = async (categoryId: string) => {
    try {
      const res = await dellCategory({ categoryId });
      if (res.data.status === 200) {
        toast.success("Xoá danh mục sản phẩm thành công");
        setCategories((prev) => {
          const updatedCategories = prev.filter(
            (item) => item.id !== categoryId
          );

          // Tính toán lại totalPages
          const newTotalPages = Math.ceil(updatedCategories.length / take);
          setTotalPages(newTotalPages);

          // Nếu trang hiện tại vượt quá totalPages mới, điều chỉnh lại trang hiện tại
          if (currentPage > newTotalPages) {
            setCurrentPage(newTotalPages);
          }

          return updatedCategories;
        });
        setShowModal(false);
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

  const fetchUpdateCategoryApi = async (categoryId: string, name: string) => {
    try {
      const res = await updateCategory(categoryId, { name });
      if (res.data.status === 200) {
        setCategories((prev) =>
          prev.map((item) => {
            if (item.id === categoryId) {
              item.name = name;
            }
            return item;
          })
        );
        toast.success("Cập nhật danh mục thành công");
        setShowModal(false);
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

  const handleSubmitForm = (
    action: string,
    category?: CategoryItemData,
    name: string = ""
  ) => {
    if (action === "add") {
      fetchAddCategoryApi(name);
    }
    if (action === "del" && category) {
      fetchDelCategoryApi(category.id);
    }
    if (action === "edit" && category) {
      fetchUpdateCategoryApi(category.id, name);
    }
  };

  const handleOpenModalAddCategory = () => {
    setShowModal(true);
    setModalAction("add");
  };

  const handleOpenModalEditCategory = (category: CategoryItemData) => {
    setShowModal(true);
    setModalAction("edit");
    setSelectedCategory(category);
  };

  const handleOpenModalDelCategory = (category: CategoryItemData) => {
    setShowModal(true);
    setModalAction("del");
    setSelectedCategory(category);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  return (
    <div className="relative min-h-screen">
      <div className="text-base breadcrumbs font-bold">
        <ul>
          <li>
            <Link to={"/admin"}>Trang chủ</Link>
          </li>
          <li>Danh mục</li>
        </ul>
      </div>
      <div className="border-t-2 mt-4 py-4">
        <div className="flex justify-between">
          <button className="btn" onClick={handleOpenModalAddCategory}>
            Thêm mới
          </button>
          <input
            type="text"
            className="input border border-gray-300 focus:outline-none"
            placeholder="Tìm kiếm danh mục..."
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
              <th></th>
            </tr>
          </thead>
          <tbody>
            {categories.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td className="flex justify-center items-center">
                    <div>
                      <button
                        className="btn mx-1"
                        onClick={() => handleOpenModalEditCategory(item)}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button
                        className="btn mx-1"
                        onClick={() => handleOpenModalDelCategory(item)}
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
          totalPages={totalPages}
          decrementPage={handleDecrementPageChange}
          incrementPage={handleIncrementPageChange}
          setPage={handleSetCurrentPage}
        />
      </div>
      <ToastContainer />
      <CategoryModal
        isShow={showModal}
        onClose={handleCloseModal}
        action={modalAction}
        category={selectedCategory}
        onSubmit={handleSubmitForm}
      />
    </div>
  );
};

export default CategoryAdmin;
