import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const Wrapper = (props: Props) => {
  return (
    <div className="w-full overflow-y-scroll bg-white rounded-lg max-h-wrapper shadow-wrapper">
      {props.children}
    </div>
  );
};

export default Wrapper;
