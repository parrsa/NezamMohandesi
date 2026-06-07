"use client";

import { Button } from "@/app/components/button/Button";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import { User } from "./types";
import UsersTable from "./components/UsersTable";
import { useState } from "react";
import { generatePageNumbers } from "@/app/lib/generatePageNumbers";
import Pagination from "@/app/components/Pagination";
import CreateUsersModal from "./components/CreateUsersModal";
import EditUsersModal from "./components/EditUsersModal/insex";
import RemoveUsersModal from "./components/RemoveUsersModal";

const users: User[] = [
  {
    id: 1,
    fullName: "پارسا سلیمان نیا",
    email: "parsa@gmail.com",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    area: "برنامه نویسی",
    role: "مهندس",
    publications: "12",
    membershipDate: "2025-12-29T14:35:20.123+03:30",
  },
  {
    id: 2,
    fullName: "راشد قادری",
    email: "rashed@gmail.com",
    avatar: "",
    area: "معماری",
    role: "ناشر",
    publications: "23",
    membershipDate: "2025-12-29T14:35:20.123+03:30",
  },
  {
    id: 3,
    fullName: "سکینه چراغی",
    email: "sakineh@gmail.com",
    avatar: "https://randomuser.me/api/portraits/women/45.jpg",
    area: "عمران",
    role: "ناشر",
    publications: "7",
    membershipDate: "2025-12-29T14:35:20.123+03:30",
  },
  {
    id: 4,
    fullName: "فربد زمانیان",
    email: "farbod@gmail.com",
    avatar: "https://randomuser.me/api/portraits/men/76.jpg",
    area: "برق",
    role: "مهندس",
    publications: "5",
    membershipDate: "2025-12-29T14:35:20.123+03:30",
  },
  {
    id: 5,
    fullName: "آراد",
    email: "arad@gmail.com",
    avatar: "",
    area: "عمران",
    role: "مهندس",
    publications: "2",
    membershipDate: "2025-12-29T14:35:20.123+03:30",
  },
  {
    id: 6,
    fullName: "افشین حسامی",
    email: "afshin@gmail.com",
    avatar: "",
    area: "معماری",
    role: "ناشر",
    publications: "10",
    membershipDate: "2025-12-29T14:35:20.123+03:30",
  },
  {
    id: 7,
    fullName: "پارسا سلیمان نیا",
    email: "parsa@gmail.com",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    area: "برنامه نویسی",
    role: "مهندس",
    publications: "12",
    membershipDate: "2025-12-29T14:35:20.123+03:30",
  },
  {
    id: 8,
    fullName: "راشد قادری",
    email: "rashed@gmail.com",
    avatar: "",
    area: "معماری",
    role: "ناشر",
    publications: "23",
    membershipDate: "2025-12-29T14:35:20.123+03:30",
  },
  {
    id: 9,
    fullName: "سکینه چراغی",
    email: "sakineh@gmail.com",
    avatar: "https://randomuser.me/api/portraits/women/45.jpg",
    area: "عمران",
    role: "ناشر",
    publications: "7",
    membershipDate: "2025-12-29T14:35:20.123+03:30",
  },
  {
    id: 10,
    fullName: "فربد زمانیان",
    email: "farbod@gmail.com",
    avatar: "https://randomuser.me/api/portraits/men/76.jpg",
    area: "برق",
    role: "مهندس",
    publications: "5",
    membershipDate: "2025-12-29T14:35:20.123+03:30",
  },
  {
    id: 11,
    fullName: "آراد",
    email: "arad@gmail.com",
    avatar: "",
    area: "عمران",
    role: "مهندس",
    publications: "2",
    membershipDate: "2025-12-29T14:35:20.123+03:30",
  },
  {
    id: 12,
    fullName: "افشین حسامی",
    email: "afshin@gmail.com",
    avatar: "",
    area: "معماری",
    role: "ناشر",
    publications: "10",
    membershipDate: "2025-12-29T14:35:20.123+03:30",
  },
];

function Users() {
  const [currentPage, setCurrentPage] = useState(1);
const [isOpenEditModal, setIsOpenEditModal] = useState<boolean>(false);
const [userData, setUserData] =
    useState<User | null>(null);
    const [isOpenCreateModal, setIsOpenCreateModal] = useState<boolean>(false);
    const [isOpenRemoveModal, setIsOpenRemoveModal] = useState<boolean>(false);
  const showIsPage = 8;
  const totalPages = Math.ceil(users?.length / showIsPage);

  const arrayInCurrentPage = users?.slice(
    (currentPage - 1) * showIsPage,
    currentPage * showIsPage
  );

  const pageNumbers: any = generatePageNumbers(totalPages, currentPage);

  const onRemoveUser = () => {
    console.log("deleted", userData?.id);
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
          <h2 className="text-2xl font-medium">مدیریت کاربران</h2>
          <Button
            onClick={() => setIsOpenCreateModal(true)}
            className="flex justify-center items-center h-11 bg-linear-to-r from-blue-500 to-purple-500 text-white text-base cursor-pointer rounded-xl gap-2 px-6 py-3 hover:shadow-lg transition-shadow"
          >
            <Plus className="w-5 h-5" />
            <span>افزودن کاربر جدید</span>
          </Button>
        </div>
        <UsersTable arrayInCurrentPage={arrayInCurrentPage} setIsOpenEditModal={setIsOpenEditModal} setUserData={setUserData} setIsOpenRemoveModal={setIsOpenRemoveModal} />
        <div className="h-16 w-full flex items-center justify-center">
          {/* <Pagination
            pageNumbers={pageNumbers}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          /> */}
        </div>
        {isOpenCreateModal && (
          <CreateUsersModal
            setIsOpenCreateModal={setIsOpenCreateModal}
            isOpenCreateModal={isOpenCreateModal}
          />
        )}
        {isOpenEditModal && (
          <EditUsersModal
            setIsOpenEditModal={setIsOpenEditModal}
            isOpenEditModal={isOpenEditModal}
            userData={userData}
          />
        )}
        {isOpenRemoveModal && (
          <RemoveUsersModal
            isOpenRemoveModal={isOpenRemoveModal}
            setIsOpenRemoveModal={setIsOpenRemoveModal}
            onRemoveUser={onRemoveUser}
            fullName={userData?.fullName}
          />
        )}
      </div>
    </motion.section>
  );
}

export default Users;
