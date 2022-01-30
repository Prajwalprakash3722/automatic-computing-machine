import Header from "./Header";
import { NextComponentType } from "next";

interface Props {
  children: React.ReactNode;
}

const Layout: NextComponentType<Props> = ({ children }) => {
  return (
    <>
      <Header />
      <main className="p-4 mx-auto">{children}</main>
    </>
  );
};
export default Layout;
