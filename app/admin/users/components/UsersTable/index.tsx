"use client";

import { persianDate } from "@/app/lib/persianDate";
import { User } from "../../types";
import { cn } from "@/app/lib/utils";
import Image from "next/image";
import { Button } from "@/app/components/button/Button";
import { SquarePen, Trash2 } from "lucide-react";
interface TableProps {
  arrayInCurrentPage: User[];
  setIsOpenEditModal: (isActive: boolean) => void;
  setUserData: (data: User) => void;
  setIsOpenRemoveModal:(isActive: boolean) => void;
}

function UsersTable({
  arrayInCurrentPage,
  setIsOpenEditModal,
  setUserData,
  setIsOpenRemoveModal
}: TableProps) {
  const tableCol = [
    {
      key: "fullName",
      label: "نام",
      width: "w-3/12",
      className: "w-3/12 font-medium",
      render: (row: any) => (
        <div className="flex items-center gap-3">
          <div className="overflow-hidden w-12 h-12 bg-linear-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
            {row.fullName.slice(0, 1)}
            {/* {row.avatar === "" || !row.avatar ? (<>{row.fullName.slice(0,1)}</>) : (<>
          <Image src={row.avatar} width={100} height={100} alt={row.fullName} />
          </>)} */}
          </div>
          <span>{row.fullName}</span>
        </div>
      ),
    },
    {
      key: "email",
      label: "ایمیل",
      width: "w-3/12",
      className: "w-3/12 text-gray-500",
    },
    {
      key: "area",
      label: "حوزه",
      width: "w-[12.5%]",
      className: "w-[12.5%]",
      render: (row: any) => (
        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
          {row.area}
        </span>
      ),
    },
    {
      key: "role",
      label: "نقش",
      width: "w-[12.5%]",
      className: "w-[12.5%]",
      render: (row: any) => (
        <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
          {row.role}
        </span>
      ),
    },
    {
      key: "publications",
      label: "نشریات",
      width: "w-1/12",
      className: "w-1/12 font-bold",
    },
    {
      key: "membershipDate",
      label: "تاریخ عضویت",
      width: "w-[12.5%]",
      className: "w-[12.5%] text-gray-700",
      render: (row: any) => <>{persianDate(new Date(row.membershipDate))}</>,
    },
    {
      key: "actions",
      label: "عملیات",
      width: "w-[12.5%]",
      className: "w-[12.5%]",
      render: (row: any) => (
        <div>
          <Button
            onClick={() => {
              setIsOpenEditModal(true);
              setUserData(row);
            }}
            className="p-2 hover:bg-purple-100 rounded-lg transition-colors cursor-pointer"
          >
            <SquarePen className="w-4 text-purple-600" />
          </Button>
          <Button onClick={() => {
            setIsOpenRemoveModal(true);
              setUserData(row);
          }} className="p-2 hover:bg-red-100 rounded-lg transition-colors cursor-pointer">
            <Trash2 className="w-4 text-red-600" />
          </Button>
        </div>
      ),
    },
  ];
  return (
    <div className="bg-white rounded-2xl shadow border border-gray-200 overflow-y-hidden px-4">
      <div
        className="overflow-auto no-scrollbar"
        style={{ maxHeight: "650px", minHeight: "650px", minWidth: "900px" }}
      >
        <table className="min-w-[900px] mt-4">
          <thead className="border-b border-gray-200 bg-white sticky top-0 z-10">
            <tr className="px-4">
              {tableCol.map((col: any, index: number) => (
                <th
                  key={String(col.key)}
                  className={`py-3 text-right text-base font-medium text-zinc-700
                   ${col.width} ${index === 0 && "pr-7"} ${
                    index === 6 && "pl-7"
                  }`}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white h-full">
            {arrayInCurrentPage.length === 0 ? (
              <tr>
                <td
                  colSpan={tableCol.length}
                  className="py-6 text-center text-gray-500 h-72 text-lg"
                >
                  کاربری وجود ندارد.
                </td>
              </tr>
            ) : (
              arrayInCurrentPage.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-100 transition px-4">
                  {tableCol.map((col: any, index: number) => (
                    <td
                      key={String(col.key)}
                      className={cn(
                        "py-3 text-bace",
                        index === 0 && "pr-7",
                        col.className
                      )}
                    >
                      {col.render ? col.render(row) : (row as any)[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UsersTable;
