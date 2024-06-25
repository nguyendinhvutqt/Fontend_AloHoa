import React from "react";

type Props = {
  isShow: boolean;
  status: string;
  orderId: string;
  onSubmit: (orderId: string, status: string) => void;
  closeModal: () => void;
};

const OrderModal: React.FC<Props> = (props: Props) => {
  const { isShow, status, orderId, onSubmit, closeModal } = props;

  const handleSubmit = () => {
    onSubmit(orderId, status);
  };

  if (!isShow) {
    return null;
  }

  return (
    <div className="fixed top-72 left-1/2 translate-x-[-50%] translate-y-[-50%] z-50 border-2 rounded-lg bg-white max-h-96">
      <h2 className="py-4 px-8 bg-slate-400 text-xl text-center">
        Xác nhận trạng thái
      </h2>
      <p className="my-4 px-8">Bạn muốn xác nhận trạng thái này?</p>
      <div className="float-right py-4">
        <button className="btn mx-2" onClick={handleSubmit}>
          Có
        </button>
        <button className="btn mx-2" onClick={closeModal}>
          Không
        </button>
      </div>
    </div>
  );
};

export default OrderModal;
