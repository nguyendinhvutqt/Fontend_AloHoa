import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div
      className="hero p-5 place-items-start opacity-90"
      style={{
        backgroundImage:
          "url(https://hanoispiritofplace.com/wp-content/uploads/2016/01/hinh-anh-hoa-mai-vang-7.jpg)",
      }}
    >
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">AloHoa Flower</h1>
          <p className="mb-5">
            Chúng tôi luôn cung cấp cho bạn những sản phẩm chất lượng nhất. Hãy
            chọn cho mình những sản phẩm mà bạn thấy thích
          </p>
          <Link to={"/products"} className="btn btn-primary">
            Tới mua sắm
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
