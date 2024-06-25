import { Link } from "react-router-dom";
import { ProductItemData } from "../../types/product";
import { formatCurrency } from "../../utils/formatCurrency";

type Props = {
  data: ProductItemData;
};

const ProductItem = (props: Props) => {
  const { data } = props;
  return (
    <div className="card w-auto bg-base-100 shadow-xl">
      <figure>
        <img
          className="h-60 w-64 object-cover"
          src={data.imageUrl}
          alt="Product"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title line-clamp-1">
          {data.name}
          {/* <div className="badge badge-secondary">NEW</div> */}
        </h2>
        <p>{formatCurrency(data.price)}</p>
        <p className="line-clamp-1">
          If a dog chews shoes whose shoes does he choose?
        </p>
        <div className="card-actions justify-end">
          <Link to={`/products/${data.id}`} className="badge badge-outline">
            Chi tiết
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
