interface MenuItem {
  id: string;
  label: string;
  gradient: string;
  path: string;
}
// client Nav item
export const menuItems: MenuItem[] = [
  {
    id: "home",
    label: "خانه",
    path: "/",
    gradient: "from-blue-500 to-blue-600",
  },
  {
    id: "publications",
    label: "نشریات",
    path: "/publications",
    gradient: "from-purple-500 to-purple-600",
  },
  {
    id: "news",
    label: "اخبار",
    path: "/news",
    gradient: "from-green-500 to-green-600",
  },
  {
    id: "videos",
    label: "ویدیوها",
    path: "/videos",
    gradient: "from-pink-500 to-pink-600",
  },
  // {
  //   id: "advertising",
  //   label: "تبلیغات",
  //   path: "/advertising",
  //   gradient: "from-yellow-500 to-orange-600",
  // },
];

// dashboard side item
import {
  Calendar,
  Home,
  Users,
  ShoppingBag,
  Video,
  Newspaper,
} from "lucide-react";

export const menuItemsDashboard: any[] = [
  {
    id: "dashboard",
    label: "داشبورد",
    icon: Home,
    href: "/admin",
  },
  {
    id: "news",
    label: "اخبار",
    icon: Newspaper,
    href: "/admin/news",
  },
  {
    id: "category",
    label: "دسته بندی اخبار",
    icon: Video,
    href: "/admin/news-categories"
  },
  {
    id: "videos",
    label: "ویدیوها",
    icon: Video,
    href: "/admin/videos",
  },
  // {
  //   id: "advertising",
  //   label: "تعرفه تبلیغات",
  //   icon: Calendar,
  //   href: "/admin/advertising",
  // },
  // {
  //   id: "users",
  //   label: "کاربران",
  //   icon: Users,
  //   href: "/admin/users",
  // },
];
