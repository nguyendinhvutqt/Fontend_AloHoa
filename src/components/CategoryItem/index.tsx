import { CategoryItemData } from "../../types/category";

type Props = {
  data: CategoryItemData;
};

const CategoryItem = (props: Props) => {
  return (
    <div
      className="hero p-5 place-items-center h-52"
      style={{ backgroundImage: `url(${props.data.imageUrl})` }}
    >
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <button className="btn btn-active btn-secondary ">
            {props.data.name}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryItem;
