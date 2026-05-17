"use client";

import { LayoutsInterface } from "@/@types/App/components.type";
import Footer from "@/app/components/footer";
import { Header } from "@/app/components/Header";

const UserLayout: React.FC<LayoutsInterface> = ({ children }) => {
  return (
    <div className="flex flex-col  items-center overflow-hidden">
      <div className="w-full">
        <Header />
      </div>
      <div className="w-full h-full xl:w-[1230px] 2xl:w-[1450px] font-vazir mt- flex   font-vazirflex flex-col">
        <main
          role="main"
          aria-label="Main content"
          className="flex flex-col w-full  gap-8"
        >
          <div className="mb-5 min-h- max-h-fit">{children}</div>
        </main>
      </div>
      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
};

export default UserLayout;
