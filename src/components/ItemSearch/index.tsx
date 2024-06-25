import { Link } from "react-router-dom";
import { ProductItemData } from "../../types/product";
import { formatCurrency } from "../../utils/formatCurrency";

type Props = {
  data: ProductItemData;
};

const ItemSearch = (props: Props) => {
  const { data } = props;
  return (
    <Link
      to={`/products/${data.id}`}
      className="flex items-center justify-center hover:bg-slate-300 hover:cursor-pointer pt-1"
    >
      <img className="w-14 h-14" src={data.imageUrl} alt="image" />
      <div className="flex-1 ml-4">
        <p className="">{data.name}</p>
        <p>{formatCurrency(data.price)}</p>
      </div>
    </Link>
  );
};

export default ItemSearch;
