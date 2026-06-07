"use client";

import { Button } from "@/app/components/button/Button";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import CardTariff from "./components/CardTariff";
import { AdvertisingsItemType } from "./types";
import CreateTariffModal from "./components/CreateTariffModal";
import { useState } from "react";
import EditTariffModal from "./components/EditTariffModal";
import RemoveTariffModal from "./components/RemoveTariffModal";

const Advertisings: AdvertisingsItemType[] = [
  {
    id: 1,
    title: "تبلیغ روی جلد نشریه",
    description: "نمایش تبلیغ در صفد نشریات",
    price: 34000000,
    duration: "ماهانه",
    features: ["نمایش در تمام نسخه‌ها", "دسترسی به 10,000+ مهندس"],
    isActive: true,
  },
  {
    id: 2,
    title: "تبلیغ روی جلد نشریه",
    description: "نمایش تبلیغ در صفحه اول و پشت جلد نشریات",
    price: 1000000,
    duration: "ماهانه",
    features: [
      "نمایش در تمام نسخه‌ها نمایش در تمام نسخه‌ها نمایش در تمام نسخه‌ها ",
      "دسترسی به 10,000+ مهندس",
    ],
    isActive: true,
  },
  {
    id: 3,
    title: "تبلیغ روی جلد نشریه",
    description: "نمایش تبلیغ در د نشریات",
    price: 50000000,
    duration: "ماهانه",
    features: ["نمایش در تمام نسخه‌ها", "دسترسی به 10,000+ مهندس"],
    isActive: false,
  },
  {
    id: 4,
    title: "تبلیغ روی جلد نشریه",
    description: "نمایش تبلیغ در صفحه اول و پشت جلد نشریات",
    price: 20000000,
    duration: "ماهانه",
    features: [
      "نمایش در تمام نسخه‌ها",
      "دسترسی به 10,000+ مهندس",
      "نمایش در تمام نسخه‌ها",
      "دسترسی به 10,000+ مهندس",
      "دسترسی به 10,000+ مهندس",
    ],
    isActive: true,
  },
  {
    id: 5,
    title: "تبلیغ روی جلد نشریه",
    description: "نمایش تبلیغ درد نشریات",
    price: 16000000,
    duration: "ماهانه",
    features: [
      "نمایش در تمام نسخه‌ها",
      "دسترسی به 10,000+ مهندس",
      "نمایش در تمام نسخه‌ها",
      "دسترسی به 10,000+ مهندس",
      "نمایش در تمام نسخه‌ها",
      "دسترسی به 10,000+ مهندس",
    ],
    isActive: false,
  },
];

function Advertising() {
  const [isOpenCreateModal, setIsOpenCreateModal] = useState<boolean>(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState<boolean>(false);
  const [isOpenRemoveModal, setIsOpenRemoveModal] = useState<boolean>(false);
  const [advertisingData, setAdvertisingData] =
    useState<AdvertisingsItemType | null>(null);
  const onRemoveTariff = () => {
    console.log("deleted", advertisingData?.id);
  };
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="h-full"
    >
      <div className="bg-[#F3F8FE] h-full bg-linear-to-tl from-purple-50 to-blue-50 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-medium">مدیریت تعرفه‌های تبلیغاتی</h2>
          <Button
            onClick={() => setIsOpenCreateModal(true)}
            className="flex justify-center items-center h-11 bg-linear-to-r from-blue-500 to-purple-500 text-white text-base cursor-pointer rounded-xl gap-2 px-6 py-3 hover:shadow-lg transition-shadow"
          >
            <Plus className="w-5 h-5" />
            <span>افزودن تعرفه جدید</span>
          </Button>
        </div>
        {Advertisings.length > 0 ? (
          <ul className="grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2  grid-cols-1  gap-x-4 gap-y-6">
            {Advertisings.map((item: AdvertisingsItemType) => (
              <CardTariff
                key={item.id}
                item={item}
                setIsOpenEditModal={setIsOpenEditModal}
                setAdvertisingData={setAdvertisingData}
                setIsOpenRemoveModal={setIsOpenRemoveModal}
              />
            ))}
          </ul>
        ) : (
          <div className="flex h-2/3 items-center justify-center">
            <p className="text-xl text-zinc-500 font-medium">موردی یافت نشد!</p>
          </div>
        )}
        {isOpenCreateModal && (
          <CreateTariffModal
            setIsOpenCreateModal={setIsOpenCreateModal}
            isOpenCreateModal={isOpenCreateModal}
          />
        )}
        {isOpenEditModal && (
          <EditTariffModal
            setIsOpenEditModal={setIsOpenEditModal}
            isOpenEditModal={isOpenEditModal}
            advertisingData={advertisingData}
          />
        )}
        {isOpenRemoveModal && (
          <RemoveTariffModal
            isOpenRemoveModal={isOpenRemoveModal}
            setIsOpenRemoveModal={setIsOpenRemoveModal}
            onRemoveTariff={onRemoveTariff}
          />
        )}
      </div>
    </motion.section>
  );
}

export default Advertising;
