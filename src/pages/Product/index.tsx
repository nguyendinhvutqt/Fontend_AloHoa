import { useEffect, useState } from "react";
import { getCategories } from "../../services/categoryService";
import { CategoryItemData } from "../../types/category";
import { ProductItemData } from "../../types/product";
import {
  getProducts,
  getProductsByCategoryId,
  searchProductsByPrice,
} from "../../services/productService";
import ProductItem from "../../components/ProductItem";
import { ToastContainer, toast } from "react-toastify";

const Product = () => {
  const [categories, setCategories] = useState<CategoryItemData[]>([]);
  const [products, setProducts] = useState<ProductItemData[]>([]);
  const [searchCategory, setSearchCategory] = useState<string>("");
  const [minValue, setMinValue] = useState<number>(0);
  const [maxValue, setMaxValue] = useState<number>(0);

  const fetchCategoriesApi = async () => {
    try {
      const res = await getCategories();
      if (res.data.status === 200) {
        setCategories(res.data.data);
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra");
    }
  };

  const fetchProductApi = async () => {
    try {
      const res = await getProducts();
      if (res.data.status === 200) {
        setProducts(res.data.data);
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra");
    }
  };

  const handleSearchCategory = async () => {
    try {
      const res = await getProductsByCategoryId(searchCategory);
      if (res.data.status === 200) {
        setProducts(res.data.data);
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra");
    }
  };

  const handleSearchPrice = async () => {
    if (maxValue < minValue) {
      toast.error("Giá sản phẩm không hợp lệ");
      return;
    }
    try {
      const res = await searchProductsByPrice(minValue, maxValue);
      if (res.data.status === 200) {
        setProducts(res.data.data);
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra");
    }
  };

  useEffect(() => {
    fetchCategoriesApi();
  }, []);

  useEffect(() => {
    fetchProductApi();
  }, []);
  return (
    <div className="flex">
      <div className="w-80 border-r-2 bg-slate-200">
        <div className="flex flex-col justify-center items-center border-b-2 pb-4">
          <h2 className="text-center text-xl my-3 bg-lime-800 w-full text-white py-2">
            Danh mục
          </h2>
          <select
            defaultValue=""
            className="select select-ghost w-5/6 max-w-xs bg-white"
            onChange={(e) => setSearchCategory(e.target.value)}
          >
            {categories.map((category) => (
              <option
                key={category.id}
                className="p-2 input"
                value={category.id}
              >
                {category.name}
              </option>
            ))}
          </select>
          <button
            className="btn btn-accent my-4 w-5/6"
            onClick={handleSearchCategory}
          >
            Tìm kiếm
          </button>
        </div>
        <div className=" flex flex-col items-center">
          <h2 className="text-xl text-center  bg-lime-800 w-full text-white py-2">
            Giá
          </h2>
          <label className="form-control w-5/6 max-w-xs mx-4">
            <div className="label">
              <span className="label-text">Giá thấp nhất</span>
            </div>
            <input
              type="number"
              placeholder="Nhập giá min..."
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => setMinValue(+e.target.value)}
            />
          </label>
          <label className="form-control w-5/6 max-w-xs mx-4">
            <div className="label">
              <span className="label-text">Giá cao nhất</span>
            </div>
            <input
              type="number"
              placeholder="Nhập giá max"
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => setMaxValue(+e.target.value)}
            />
          </label>
          <button
            className="btn btn-accent my-4 w-5/6"
            onClick={handleSearchPrice}
          >
            Tìm kiếm
          </button>
        </div>
      </div>
      <div className="flex-1">
        <div className="pb-5 border-b-2">
          <h2 className="py-4 text-3xl font-bold ml-10">Danh sách sản phẩm</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 px-5 sm:px-10 justify-evenly">
            {products.map((product) => (
              <ProductItem key={product.id} data={product} />
            ))}
            {products.map((product) => (
              <ProductItem key={product.id} data={product} />
            ))}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Product;
