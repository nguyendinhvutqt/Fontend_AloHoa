import Tippy from "@tippyjs/react/headless";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "tippy.js/dist/tippy.css";

import Wrapper from "../Wrapper";
import { searchProducts } from "../../services/productService";
import { ProductItemData } from "../../types/product";
import ItemSearch from "../ItemSearch";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const Search = () => {
  const [searchName, setSearchName] = useState<string>("");
  const [products, setProducts] = useState<ProductItemData[]>([]);
  const [value] = useDebounce(searchName, 1000);

  const fetchSearchProductApi = async (value: string) => {
    try {
      const res = await searchProducts(value);
      if (res.data.status === 200) {
        setProducts(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseSearch = () => {
    setSearchName("");
    setProducts([]);
  };

  useEffect(() => {
    if (value) {
      fetchSearchProductApi(value);
    }
  }, [value]);
  return (
    <Tippy
      interactive
      visible={products.length ? true : false}
      render={(attrs) => (
        <div className="box h-60 w-96" {...attrs}>
          <Wrapper>
            <div className="pl-2 my-3">
              {products.map((product) => (
                <ItemSearch key={product.id} data={product} />
              ))}
              {products.map((product) => (
                <ItemSearch key={product.id} data={product} />
              ))}
              {products.map((product) => (
                <ItemSearch key={product.id} data={product} />
              ))}
            </div>
          </Wrapper>
        </div>
      )}
    >
      <div className="form-control pl-2 lg:w-96 relative">
        <input
          type="text"
          placeholder="Tìm kiếm tên sản phẩm..."
          className="input input-bordered w-full focus:outline-none pr-14"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        {searchName && (
          <FontAwesomeIcon
            className="absolute top-1/2 right-4 transform -translate-x-1/2 -translate-y-1/2 hover:cursor-pointer"
            icon={faXmark}
            onClick={handleCloseSearch}
          />
        )}
      </div>
    </Tippy>
  );
};

export default Search;
