import React, { useEffect, useState } from "react";
import { CategoryItemData } from "../../../types/category";

type Props = {
  isShow: boolean;
  onClose: () => void;
  action: string;
  category?: CategoryItemData;
  onSubmit: (
    action: string,
    category?: CategoryItemData,
    name?: string
  ) => void;
};

const CategoryModal: React.FC<Props> = (props: Props) => {
  const { isShow, onClose, action, category, onSubmit } = props;
  const [name, setName] = useState<string>("");

  useEffect(() => {
    if (action === "add") {
      setName("");
    } else if (action === "edit" && category) {
      setName(category.name);
    }
  }, [action, category]);

  const handleAddCategory = () => {
    setName("");
    onSubmit("add", undefined, name);
  };

  const handleDelCategory = () => {
    onSubmit("del", category);
  };

  const handleEditCategory = () => {
    onSubmit("edit", category, name);
  };

  const handleCloseModal = () => {
    onClose();
  };

  if (!isShow) {
    return null;
  }

  return (
    <div className="fixed top-72 left-1/2 translate-x-[-50%] translate-y-[-50%] z-50 border-2 rounded-lg bg-white">
      <h2 className="bg-slate-400 py-4 text-center text-xl font-bold">
        {action === "add" && "Thêm mới danh mục"}
        {action === "edit" && "Cập nhật danh mục"}
        {action === "del" && "Xoá danh mục"}
      </h2>
      {action === "del" ? (
        <p className="text-center py-8 text-xl px-12">
          Bạn có chắc muốn xoá danh mục
        </p>
      ) : (
        <div className="flex justify-center items-center border-0 my-6 px-12">
          <p>Tên danh mục: </p>
          <input
            type="text"
            value={name}
            className="input ml-4 border-1input input-bordered focus:outline-none pr-14"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      )}
      <div className="p-4 flex justify-end space-x-2">
        {action === "add" && (
          <button className="btn" onClick={handleAddCategory}>
            Thêm mới
          </button>
        )}
        {action === "edit" && (
          <button className="btn" onClick={handleEditCategory}>
            Cập nhật
          </button>
        )}
        {action === "del" && (
          <button className="btn" onClick={handleDelCategory}>
            Xoá
          </button>
        )}
        <button className="btn" onClick={handleCloseModal}>
          Đóng
        </button>
      </div>
    </div>
  );
};

export default CategoryModal;
