import React, { useEffect, useState } from "react";
import { AxiosResponse } from "axios";

import { getCategories } from "../../services/categoryService";
import { CategoryItemData } from "../../types/category";
import Banner from "../../components/Banner";
import CategoryItem from "../../components/CategoryItem";
import { getProducts } from "../../services/productService";
import { ProductItemData } from "../../types/product";
import ProductItem from "../../components/ProductItem";
import { ToastContainer, toast } from "react-toastify";

const Home: React.FC = () => {
  const [categories, setCategories] = useState<CategoryItemData[]>([]);
  const [products, setProducts] = useState<ProductItemData[]>([]);

  const fetchProductsApi = async () => {
    try {
      const res: AxiosResponse = await getProducts();
      if (res.data.status === 200) {
        setProducts(res.data.data);
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra");
    }
  };

  const fetchCategoriesApi = async () => {
    try {
      const res: AxiosResponse = await getCategories();
      if (res.data.status === 200) {
        setCategories(res.data.data);
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra");
    }
  };

  useEffect(() => {
    fetchCategoriesApi();
  }, []);

  useEffect(() => {
    fetchProductsApi();
  }, []);
  return (
    <>
      <div>
        <Banner />
      </div>

      {/* <div className="flex gap-4 mx-5 pb-8 pt-4 overflow-x-auto border-b-2">
        {categories.map((category) => (
          <CategoryItem key={category.id} data={category} />
        ))}
        {categories.map((category) => (
          <CategoryItem key={category.id} data={category} />
        ))}
      </div> */}

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

      <div className="flex gap-4 mx-5 pb-8 pt-4 overflow-x-auto">
        <div
          className="hero p-5 place-items-end"
          style={{
            backgroundImage:
              "url(https://inkythuatso.com/uploads/images/2022/05/hinh-nen-hoa-bo-cong-anh-trong-gio-1-11-15-28-30.jpg)",
          }}
        >
          <div className="hero-content text-center text-neutral-content">
            <div className="max-w-md">
              <h1 className="mb-5 text-3xl font-bold text-black">
                Nhận đặt hoa theo yêu cầu
              </h1>
              <h1 className="mb-5 text-3xl font-bold text-black">
                Liên hệ: 0123 456 789
              </h1>
            </div>
          </div>
        </div>
        <div
          className="hero p-5 place-items-center "
          style={{
            backgroundImage:
              "url(https://hinhanhdep.net/wp-content/uploads/2018/01/hinh-anh-hoa-tulip-17.jpg)",
          }}
        >
          <div className="hero-content text-center text-neutral-content">
            <div className="max-w-md">
              <h1 className="mb-5 text-3xl font-bold">Hello there</h1>
              <button className="btn btn-primary">Get Started</button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Home;
