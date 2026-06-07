"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  ChevronDown,
  LogOut,
  User,
  X,
  Scale,
  FileText,
} from "lucide-react";
import { menuItemsDashboard } from "@/app/lib/menuItems";
import { filterMenuItems } from "@/app/hooks/FilterMenu";
import { useAuthContext } from "@/app/core/provider/Auth";
const defaultIcon = Scale;

export default function Sidebar({
  isOpen,
  onToggle,
  collapsed,
  onToggleCollapse,
}: any) {
  const pathname = usePathname();
  const { user, logout } = useAuthContext();
  const router = useRouter();

  const filteredMenu = filterMenuItems(menuItemsDashboard);

  const [openMenus, setOpenMenus] = useState<string[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isMobile = window.innerWidth < 1024;
      if (isMobile && isOpen) {
        onToggle();
      }
    }
  }, [pathname]);

  useEffect(() => {
    filteredMenu.forEach((item: any) => {
      if (item.children?.some((child: any) => child.href === pathname)) {
        setOpenMenus((prev) =>
          prev.includes(item.id) ? prev : [...prev, item.id]
        );
      }
    });
  }, [pathname, filteredMenu]);

  const toggleMenu = (id: string) => {
    setOpenMenus((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <>
      {isOpen && (
        <div
          onClick={onToggle}
          className="fixed inset-0 bg-black/30 backdrop-blur-sm lg:hidden transition-opacity z-40"
        />
      )}

      <aside
        className={`
          fixed inset-y-0 right-0 z-50
          ${collapsed ? "w-20" : "w-72"}
          bg-white text-slate-800
          shadow-xl
          ${isOpen ? "translate-x-0" : "translate-x-full"}
          lg:translate-x-0 lg:static
          transition-all duration-300 ease-in-out
          flex flex-col
          border-l border-slate-200
        `}
      >
        {!collapsed && (
          <div className="p-5 flex justify-between items-center border-b border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-linear-to-br from-slate-700 to-slate-800 rounded-xl flex items-center justify-center shadow-md">
                <Scale className="text-amber-500" size={22} />
              </div>
              <div>
                <p className="text-lg font-bold tracking-tight text-slate-800">
                  سامانه <span className="text-amber-600">نظام</span>
                </p>
                <p className="text-xs text-slate-500 mt-0.5">سامانه جامع قضایی</p>
              </div>
            </div>

            <button
              onClick={onToggle}
              className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <X size={18} className="text-slate-500" />
            </button>
          </div>
        )}

        {collapsed && (
          <div className="py-5 flex justify-center border-b border-slate-200">
            <div className="w-10 h-10 bg-linear-to-br from-slate-700 to-slate-800 rounded-xl flex items-center justify-center shadow-md">
              <Scale className="text-amber-500" size={20} />
            </div>
          </div>
        )}

        {/* منوها */}
        <div className="flex-1 overflow-y-auto py-4">
          <nav className={`${collapsed ? "px-2 space-y-2" : "px-3 space-y-1"}`}>
            {filteredMenu.map((item: any) => {
              const Icon = item.icon || defaultIcon;
              const isActive =
                pathname === item.href ||
                (item.children && item.children.some((c: any) => c.href === pathname));

              const hasChildren = item.children && item.children.length > 0;
              const isOpenMenu = openMenus.includes(item.id);

              return (
                <div key={item.id}>
                  <button
                    onClick={() => {
                      if (collapsed && hasChildren) {
                        router.push(item.children[0].href);
                        return;
                      }

                      if (!hasChildren) {
                        router.push(item.href);
                        return;
                      }

                      toggleMenu(item.id);
                    }}
                    className={`
                      w-full flex items-center cursor-pointer transition-all duration-200
                      ${collapsed ? "justify-center p-3" : "justify-between p-2.5"}
                      rounded-lg
                      ${isActive
                        ? "bg-amber-50 text-amber-700 border border-amber-200 shadow-sm"
                        : "hover:bg-slate-50 text-slate-600 hover:text-slate-900"
                      }
                    `}
                  >
                    <div className={`flex items-center gap-3 ${collapsed && "justify-center w-full"}`}>
                      <Icon
                        size={20}
                        className={isActive ? "text-amber-600" : "text-slate-400"}
                      />
                      {!collapsed && (
                        <span className="text-sm font-medium">{item.label}</span>
                      )}
                    </div>

                    {hasChildren && !collapsed && (
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-200 ${isOpenMenu ? "rotate-180" : ""} text-slate-400`}
                      />
                    )}
                  </button>

                  {/* زیرمنوها */}
                  {hasChildren && isOpenMenu && !collapsed && (
                    <div className="mt-1 space-y-1 border-r border-slate-200 mr-2 pr-2">
                      {item.children.map((child: any) => {
                        const ChildIcon = child.icon || FileText;
                        const isChildActive = pathname === child.href;

                        return (
                          <button
                            key={child.id}
                            onClick={() => router.push(child.href)}
                            className={`
                              w-full text-right p-2.5 text-sm rounded-lg transition-all duration-200
                              flex items-center gap-3
                              ${isChildActive
                                ? "bg-amber-50 text-amber-700 border-r-2 border-amber-500"
                                : "hover:bg-slate-50 text-slate-500 hover:text-slate-700"
                              }
                            `}
                          >
                            <ChildIcon size={16} className={isChildActive ? "text-amber-500" : "text-slate-400"} />
                            <span>{child.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>

        {/* بخش پایین سایدبار - فقط پروفایل و خروج */}
        <div className="border-t border-slate-200 p-3">
          {/* پروفایل کاربر */}
          <button
            className={`
              w-full rounded-lg transition-all duration-200
              ${collapsed
                ? "p-3 flex justify-center hover:bg-slate-50"
                : "p-2.5 flex items-center gap-3 hover:bg-slate-50"
              }
            `}
          >
            <div className={`
              ${collapsed ? "" : "w-8 h-8 rounded-full bg-linear-to-br from-slate-600 to-slate-700 flex items-center justify-center"}
            `}>
              {collapsed ? (
                <User size={18} className="text-slate-500" />
              ) : (
                <User size={16} className="text-white" />
              )}
            </div>
            {!collapsed && user && (
              <div className="text-right flex-1">
                <p className="text-sm font-medium text-slate-700">{user.fullName || user.userName}</p>
                <p className="text-xs text-slate-400">کاربر سیستم</p>
              </div>
            )}
          </button>

          {/* دکمه خروج */}
          <button
            onClick={logout}
            className={`
              w-full mt-2 rounded-lg transition-all duration-200
              ${collapsed
                ? "p-3 flex justify-center hover:bg-red-50"
                : "p-2.5 flex items-center gap-3 hover:bg-red-50 text-red-600"
              }
            `}
          >
            <LogOut size={18} />
            {!collapsed && <span>خروج از سیستم</span>}
          </button>
        </div>
      </aside>
    </>
  );
}