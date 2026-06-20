import React from "react";

const DocumentIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M21 7V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V7C3 4 4.5 2 8 2H16C19.5 2 21 4 21 7Z"
      stroke="#64748B"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14.5 4.5V6.5C14.5 7.6 15.4 8.5 16.5 8.5H18.5"
      stroke="#64748B"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 13H12"
      stroke="#64748B"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 17H16"
      stroke="#64748B"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const BorderIcon = () => (
  <svg
    width="2"
    height="37"
    viewBox="0 0 2 37"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <line
      x1="1"
      y1="1"
      x2="0.999998"
      y2="36"
      stroke="#2563EB"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const approvalsListItem = [
  {
    id: 1,
    name: "مصوبات هيئت مديره دوره دهم",
    list: [
      {
        id: 11,
        title: "مصوبات صد و سی و هشتمين",
        creationDate: "1403/08/19",
      },
    ],
  },
  {
    id: 2,
    name: "مصوبات هيئت مديره دوره دهم",
    list: [
      {
        id: 21,
        title: "مصوبات صد و سی و هشتمين",
        creationDate: "1403/08/19",
      },
    ],
  },
  {
    id: 3,
    name: "مصوبات هيئت مديره دوره دهم",
    list: [
      {
        id: 31,
        title: "مصوبات صد و سی و هشتمين",
        creationDate: "1403/08/19",
      },
    ],
  },
  {
    id: 1,
    name: "مصوبات هيئت مديره دوره دهم",
    list: [
      {
        id: 11,
        title: "مصوبات صد و سی و هشتمين",
        creationDate: "1403/08/19",
      },
    ],
  },
  {
    id: 2,
    name: "مصوبات هيئت مديره دوره دهم",
    list: [
      {
        id: 21,
        title: "مصوبات صد و سی و هشتمين",
        creationDate: "1403/08/19",
      },
    ],
  },
  {
    id: 3,
    name: "مصوبات هيئت مديره دوره دهم",
    list: [
      {
        id: 31,
        title: "مصوبات صد و سی و هشتمين",
        creationDate: "1403/08/19",
      },
    ],
  },
  {
    id: 1,
    name: "مصوبات هيئت مديره دوره دهم",
    list: [
      {
        id: 11,
        title: "مصوبات صد و سی و هشتمين",
        creationDate: "1403/08/19",
      },
    ],
  },
  {
    id: 2,
    name: "مصوبات هيئت مديره دوره دهم",
    list: [
      {
        id: 21,
        title: "مصوبات صد و سی و هشتمين",
        creationDate: "1403/08/19",
      },
    ],
  },
  {
    id: 3,
    name: "مصوبات هيئت مديره دوره دهم",
    list: [
      {
        id: 31,
        title: "مصوبات صد و سی و هشتمين",
        creationDate: "1403/08/19",
      },
    ],
  },
  {
    id: 1,
    name: "مصوبات هيئت مديره دوره دهم",
    list: [
      {
        id: 11,
        title: "مصوبات صد و سی و هشتمين",
        creationDate: "1403/08/19",
      },
    ],
  },
  {
    id: 2,
    name: "مصوبات هيئت مديره دوره دهم",
    list: [
      {
        id: 21,
        title: "مصوبات صد و سی و هشتمين",
        creationDate: "1403/08/19",
      },
    ],
  },
  {
    id: 3,
    name: "مصوبات هيئت مديره دوره دهم",
    list: [
      {
        id: 31,
        title: "مصوبات صد و سی و هشتمين",
        creationDate: "1403/08/19",
      },
    ],
  },
];

export default function EntryExitOfBoard() {
  return (
    <div className="grid grid-cols-3 gap-6 bg-white rounded-2xl p-3 mt-5">
      {approvalsListItem.map((item, index) => {
        return (
          <div key={index} className="flex flex-col gap-5">
            <h2 className="text-[#334155] font-bold pr-2 text-xl flex items-center gap-1">
              <BorderIcon />
              {item.name}
            </h2>
            <div className="flex flex-col gap-5">
              {item.list.map((child, childIndex) => (
                <div key={childIndex} className="flex items-center gap-1">
                  <DocumentIcon />
                  <p className="text-[#334155]">
                    {child.title} <span>{child.creationDate}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
