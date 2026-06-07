"use client";

import { Button } from "@/app/components/button/Button";
import { AdvertisingsItemType } from "../../types";
import { CircleCheckBig, Megaphone } from "lucide-react";

interface CardTypes {
  item: AdvertisingsItemType;
  setIsOpenEditModal:any;
  setAdvertisingData:any;
  setIsOpenRemoveModal:any;
}

function CardTariff({ item,setIsOpenEditModal ,setAdvertisingData,setIsOpenRemoveModal}: CardTypes) {
  const { title, description, price, duration, features, isActive } = item;
  return (
    <li className="min-h-120 relative w-full flex flex-col justify-between gap-3 bg-white rounded-2xl p-6 border-2 border-slate-200 hover:shadow-xl transition-shadow">
      <span
        className={`absolute px-2 py-0.5 rounded-full right-[15%] -top-2.5 text-white text-[13px] font-medium ${
          isActive ? "bg-green-500" : "bg-red-500"
        }`}
      >
        {isActive ? "فعال" : "غیرفعال"}
      </span>
      <div className="h-[90%]  flex flex-col items-center gap-3">
        <div className="w-20 h-20 rounded-full bg-linear-to-br text-white from-blue-500 to-purple-500 flex items-center justify-center mb-3">
          <Megaphone className="w-8 h-8" />
        </div>
        <div className="h-[18%] flex flex-col items-center gap-1">
          <p className="text-xl font-bold">{title}</p>
          <p className="text-center">{description}</p>
        </div>
        <div className="h-[15%] flex flex-col items-center">
          <div className="flex gap-2 items-center">
            <span className="text-3xl font-bold bg-linear-to-l from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {Intl.NumberFormat("fa-IR").format(Number(price))}
            </span>
            <span className="text-zinc-500">تومان</span>
          </div>
          <span>{duration}</span>
        </div>
        <ul className={`self-stretch flex flex-col gap-1 h-37 overflow-y-auto ${features.length > 5 ? "inset-shadow-[0_-10px_15px_-18px]" : ""}`}>
          {features.map((feature: string, index: number) => (
            <li key={index} className="flex gap-1 ">
              <div>
                <CircleCheckBig className="w-4 h-4 text-green-400 mt-0.5" />
              </div>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="h-[10%]">
        <div className="flex gap-3">
          <Button type="button" onClick={()=>{
            setAdvertisingData(item)
            setIsOpenEditModal(true)}} className="h-11 flex-1 px-4 py-2 font-medium text-base bg-linear-to-l from-blue-500 to-purple-500 text-white rounded-lg hover:shadow-lg transition-shadow cursor-pointer">
            ویرایش
          </Button>
          <Button type="button" onClick={() => {
            setAdvertisingData(item)
            setIsOpenRemoveModal(true)}} className=" h-11 font-medium text-base cursor-pointer px-4 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors">
            حذف
          </Button>
        </div>
      </div>
    </li>
  );
}

export default CardTariff;
