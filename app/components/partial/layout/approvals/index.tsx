"use client";

import { LayoutsInterface } from "@/@types/App/components.type";
import Footer from "@/app/components/footer";
import { Header } from "@/app/components/Header";

const ArrowIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.5249 9.96004L4.2649 6.70004C3.8799 6.31504 3.8799 5.68504 4.2649 5.30004L7.5249 2.04004"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const approvalsList = [
  {
    id: 1,
    name: "مصوبات هيات مديره و هيات رييسه",
    path: "/ratifications",
  },
  {
    id: 2,
    name: "جلسات هیات مدیره",
    path: "/meeting",
  },
  {
    id: 3,
    name: "ورود و خروج اعضای هیات مدیره",
    path: "/entry-exit-of-board",
  },
];

export default function ApprovalsLayout({ children }: LayoutsInterface) {
  return (
    <div className="flex flex-col  items-center overflow-hidden">
      <div className="w-full">
        <Header />
      </div>
      <div className="w-full h-full xl:w-[1230px] 2xl:w-[1450px] font-vazir flex flex-col">
        <div className="flex flex-col gap-1 bg-white rounded-tl-2xl rounded-bl-2xl py-3 px-1">
          {approvalsList.map((item) => {
            return (
              <div key={item.id} className={`w-full flex items-center gap-1`}>
                <span className="text-black">
                  <ArrowIcon />
                </span>
                <p>{item.name}</p>
              </div>
            );
          })}
        </div>

        <main
          role="main"
          aria-label="Main content"
          className="flex flex-col w-full gap-8"
        >
          <div className="mb-5 min-h- max-h-fit">{children}</div>
        </main>
      </div>
      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
}
