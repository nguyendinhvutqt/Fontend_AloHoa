import { ReactNode } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

type Props = {
  children: ReactNode;
};

const HeaderOnly = (props: Props) => {
  return (
    <>
      <div className="max-w-7xl">
        <Header />
        {props.children}
        <Footer />
      </div>
    </>
  );
};

export default HeaderOnly;
