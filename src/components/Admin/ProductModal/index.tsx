import React, { FormEvent, useEffect } from "react";
import { CategoryItemData } from "../../../types/category";
import { ProductItemData, UpdateProductData } from "../../../types/product";
import { Resolver, useForm } from "react-hook-form";

type Props = {
  isShow: boolean;
  onClose: () => void;
  action: string;
  product?: ProductItemData;
  categories?: CategoryItemData[];
  isLoading: boolean;
  onSubmit: (
    action: string,
    product?: ProductItemData,
    dataForm?: FormData,
    dataUpdate?: UpdateProductData
  ) => void;
};

type FormValues = {
  name: string;
  description: string;
  file: File;
  price: number;
  categoryId: string;
};

const resolver: Resolver<FormValues> = async (values) => {
  if (!values.name) {
    return {
      values: {},
      errors: {
        name: {
          type: "required",
          message: "Tên sản phẩm không được để trống",
        },
      },
    };
  }
  if (!values.description) {
    return {
      values: {},
      errors: {
        description: {
          type: "required",
          message: "Mô tả sản phẩm không được để trống",
        },
      },
    };
  }
  if (values.price < 1) {
    return {
      values: {},
      errors: {
        price: {
          type: "valueAsNumber",
          message: "Giá sản phẩm không hợp lệ",
        },
      },
    };
  }
  if (values.file.length < 1) {
    return {
      values: {},
      errors: {
        file: {
          type: "required",
          message: "Hình ảnh không được để trống",
        },
      },
    };
  }
  if (!values.categoryId) {
    return {
      values: {},
      errors: {
        categoryId: {
          type: "required",
          message: "Danh mục không được để oo trống",
        },
      },
    };
  }
  return {
    values: values,
    errors: {},
  };
};

const ProductModal: React.FC<Props> = (props: Props) => {
  const { isShow, onClose, action, product, onSubmit, categories, isLoading } =
    props;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver,
    defaultValues: {
      name: product?.name || "",
      description: product?.description || "",
      price: product?.price || 0,
      categoryId: product?.categoryId || "",
    },
  });

  useEffect(() => {
    if (action === "add") {
      reset({
        name: "",
        description: "",
        price: 0,
        categoryId: categories && categories[0].id,
      });
    } else if (action === "edit" && product) {
      reset({
        name: product.name,
        description: product.description,
        price: product.price,
        categoryId: product.categoryId,
      });
    }
  }, [action, product, reset, categories]);

  const handleSubmitForm = handleSubmit(async (data) => {
    if (action === "add") {
      const dataForm = new FormData();
      dataForm.append("name", data.name);
      dataForm.append("description", data.description);
      dataForm.append("price", data.price.toString());
      dataForm.append("file", data.file[0]);
      dataForm.append("categoryId", data.categoryId);
      await onSubmit("add", undefined, dataForm, undefined);
      reset({
        name: "",
        description: "",
        price: 0,
        categoryId: categories && categories[0].id,
      });
    } else if (action === "edit") {
      const dataForm: UpdateProductData = {
        name: data.name,
        description: data.description,
        price: data.price.toString(),
        categoryId: data.categoryId,
      };
      onSubmit("edit", product, undefined, dataForm);
    }
  });

  const handleDelProduct = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit("del", product, undefined, undefined);
  };

  const handleCloseModal = () => {
    onClose();
  };

  if (!isShow) {
    return null;
  }

  return (
    <form
      onSubmit={action === "del" ? handleDelProduct : handleSubmitForm}
      className="fixed top-72 left-1/2 translate-x-[-50%] translate-y-[-50%] z-50 border-2 rounded-lg bg-white max-h-96 overflow-y-scroll"
    >
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
        <div className="flex flex-col justify-center items-center border-0 my-6 px-12">
          <div>
            <div className="flex items-center my-2">
              <p className="w-20">Tên sản phẩm: </p>
              <input
                id="name"
                type="text"
                className="input ml-4 border-1 input-bordered focus:outline-none pr-14"
                {...register("name")}
              />
            </div>
            {errors?.name && (
              <p className="text-red-600">{errors.name.message}</p>
            )}
          </div>
          <div>
            <div className="flex items-center my-2">
              <p className="w-20">Mô tả: </p>
              <input
                type="text"
                className="input ml-4 border-1 input-bordered focus:outline-none pr-14"
                {...register("description")}
              />
            </div>
            {errors?.description && (
              <p className="text-red-600">{errors.description.message}</p>
            )}
          </div>
          <div>
            <div className="flex items-center my-2">
              <p className="w-20">Giá: </p>
              <input
                type="number"
                className="input ml-4 border-1 input-bordered focus:outline-none pr-14"
                {...register("price")}
              />
            </div>
            {errors?.price && (
              <p className="text-red-600">{errors.price.message}</p>
            )}
          </div>
          <div>
            <div className="flex items-center my-2 px-2">
              <p className="w-20">Hình ảnh: </p>
              <input
                type="file"
                className="ml-4 file-input flex-1 file-input-bordered w-full max-w-xs"
                {...register("file")}
              />
            </div>
            {errors?.file && (
              <p className="text-red-600">{errors.file.message}</p>
            )}
          </div>
          <div className="w-full">
            <div className="flex w-full items-center my-2 px-2">
              <p className="w-20">Danh mục: </p>
              <select
                defaultValue={categories && categories[0].id}
                className="input flex-1 ml-4 border-1 input-bordered focus:outline-none pr-14 select"
                {...register("categoryId")}
              >
                {categories?.map((category) => (
                  <option
                    key={category.id}
                    className="p-2 input"
                    value={category.id}
                  >
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            {errors?.categoryId && (
              <p className="text-red-600">{errors.categoryId.message}</p>
            )}
          </div>
        </div>
      )}
      <div className="p-4 flex justify-end space-x-2">
        {action === "add" && (
          <button disabled={isLoading} className="btn" type="submit">
            {isLoading ? "Đang thêm..." : "Thêm mới"}
          </button>
        )}
        {action === "edit" && (
          <button disabled={isLoading} className="btn" type="submit">
            {isLoading ? "Đang cập nhật..." : "Cập nhật"}
          </button>
        )}
        {action === "del" && (
          <button disabled={isLoading} className="btn" type="submit">
            {isLoading ? "Đang xoá..." : "Xoá"}
          </button>
        )}
        <button className="btn" onClick={handleCloseModal}>
          Đóng
        </button>
      </div>
    </form>
  );
};

export default ProductModal;
