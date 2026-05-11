/** @format */

import { StaticImageData } from "next/image";
import React from "react";

export interface LayoutsInterface {
  data_User?:any
  addressId?:any
  TransferId?:any
  PaymentId?:any
  formdata_order?:any
  route?:any
  setRoute?:any
  formListOrder_pendding?:any
  isSwitchEnabled?:any
  setIsSwitchEnabled?:any
  IsError_unavailable?: any
  children?: React.ReactNode;
  setSuggested?: React.Dispatch<React.SetStateAction<boolean>>;
  setShowModal?: React.Dispatch<React.SetStateAction<boolean>>;
  variant?:
  | "not-bottomnavigate"
  | "notpadding"
  | "glasses"
  | "button"
  | "nonav"
  | any;
  endpoint?: string;
  data?: any
  noFooter?: boolean;
  Top_Header?: any[] | object | any
}

export interface SidebarContext {
  sidebarToggle: () => void;
  toggleSidebar: () => void;
  closeSidebar: () => void;
}

export interface IListChildren {
  title: string;
  name: string;
  id: number;
  children?: React.ReactNode;
}

export interface IList {
  title: string;
  name: string;
  id: number;
  value: boolean;
  children?: React.ReactNode;
}

export interface IInfoNav {
  title: string;
  path: string;
  id: number;
  icon?: StaticImageData;
  colordicon?: StaticImageData;
  soon?: boolean;
}

export interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export interface IPageList {
  index: number;
  components: React.FunctionComponent;
  name: string;
}

export interface ComponentsInterface {
  ref?: any;
}
