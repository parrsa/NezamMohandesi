// "use client";
// import { Search, Bell, User, LogOut, LogIn, Menu } from "lucide-react";
// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { useRouter } from "next/navigation";
// import { useAuthContext } from "@/app/core/provider/Auth";
// import { useHeaderAction } from "@/app/core/provider/HeaderActionProvider/HeaderAction";

// const ADMIN_PERMISSION = 171;

// interface HeaderProps {
//   onMenuClick?: () => void;
// }

// export function Header({ onMenuClick }: HeaderProps) {
//   const [userMenuOpen, setUserMenuOpen] = useState(false);
//   const router = useRouter();
//   const { user, Logout } = useAuthContext();
//   const { action, actionSecound } = useHeaderAction();
//   const isAdmin = user?.permissionCodes?.includes(ADMIN_PERMISSION);

//   return (
//     <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-200">
//       <div className="flex items-center justify-between h-16 px-4 lg:px-6">

//         {/* بخش راست: دکمه منو (موبایل) و اکشن اول */}
//         <div className="flex items-center gap-4 flex-1">
//           {/* دکمه همبرگر فقط در موبایل */}
//           <button
//             onClick={onMenuClick}
//             className="lg:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors"
//           >
//             <Menu size={24} />
//           </button>

//           <div className="w-full">{action}</div>
//         </div>

//         {/* بخش چپ: اکشن دوم و پروفایل کاربر */}
//         <div className="flex items-center justify-end gap-3 flex-1">
//           <div className="flex items-center justify-end w-full">
//             {actionSecound}
//           </div>

//           {user ? (
//             <div className="relative">
//               <motion.button
//                 onClick={() => setUserMenuOpen(!userMenuOpen)}
//                 className="flex items-center justify-center gap-2 bg-gray-100 px-3 py-2 rounded-xl hover:bg-gray-200 transition-colors"
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//               >
//                 <User className="w-5 h-5 text-gray-700" />
//                 <span className="hidden md:block text-sm font-medium text-gray-800">
//                   {user.fullName}
//                 </span>
//               </motion.button>

//               <AnimatePresence>
//                 {userMenuOpen && (
//                   <motion.div
//                     initial={{ opacity: 0, y: -10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -10 }}
//                     className="absolute left-0 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-xl overflow-hidden z-50"
//                   >
//                     <button
//                       onClick={() => router.push(isAdmin ? "/admin" : "/UserPanel")}
//                       className="w-full text-right px-4 py-3 hover:bg-gray-50 text-sm text-gray-700 transition-colors"
//                     >
//                       {isAdmin ? "پنل ادمین" : "پنل کاربری"}
//                     </button>
//                     <div className="h-px bg-gray-100" />
//                     <button
//                       onClick={Logout}
//                       className="w-full text-right px-4 py-3 hover:bg-red-50 text-sm text-red-600 flex items-center gap-2 transition-colors"
//                     >
//                       <LogOut className="w-4 h-4" />
//                       خروج
//                     </button>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>
//           ) : (
//             <motion.button
//               onClick={() => router.push("/login")}
//               className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors shadow-sm"
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//             >
//               <LogIn className="w-5 h-5" />
//               <span className="hidden sm:inline">ورود</span>
//             </motion.button>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// }
"use client";
import { Search, Bell, User, LogOut, LogIn, Menu, Shield, Scale } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/app/core/provider/Auth";
import { useHeaderAction } from "@/app/core/provider/HeaderActionProvider/HeaderAction";

const ADMIN_PERMISSION = 171;

interface HeaderProps {
  onMenuClick?: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const router = useRouter();
  const { user, Logout } = useAuthContext();
  const { action, actionSecound } = useHeaderAction();
  const isAdmin = user?.permissionCodes?.includes(ADMIN_PERMISSION);
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-sm">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">

        <div className="flex items-center gap-4 flex-1">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors"
          >
            <Menu size={22} />
          </button>

          <div className="lg:hidden flex items-center gap-2">
            <div className="w-8 h-8 bg-linear-to-br from-slate-800 to-slate-900 rounded-lg flex items-center justify-center">
              <Scale className="text-amber-500" size={16} />
            </div>
            <span className="font-bold text-slate-800">نظام</span>
          </div>

          <div className="w-full hidden md:flex">{action}</div>
        </div>

        <div className="flex items-center justify-end gap-2 flex-1">
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 text-slate-600"
          >
            <Search size={20} />
          </button>

          <div className="hidden md:flex items-center justify-end w-full">
            {actionSecound}
          </div>

          <button className="relative p-2 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors">
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {user ? (
            <div className="relative">
              <motion.button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center justify-center gap-2 bg-linear-to-r from-slate-800 to-slate-900 px-6 py-1 rounded-xl hover:from-slate-900 hover:to-slate-800 transition-all shadow-md"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="w-8 h-8 bg-amber-500/20 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-amber-400" />
                </div>
                <div className="hidden md:block text-right">
                  <p className="text-sm font-medium text-white">
                    {user?.fullName?.split(" ")[0] || user?.userName || "کاربر"}
                  </p>
                  <p className="text-xs text-slate-400">
                    {isAdmin ? "مدیر سیستم" : "کاربر عادی"}
                  </p>
                </div>
              </motion.button>

              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute left-0 mt-2 w-56 bg-white border border-slate-100 rounded-xl shadow-xl overflow-hidden z-50"
                  >
                    <div className="px-4 py-3 border-b border-slate-100">
                      <p className="text-sm font-medium text-slate-800">{user?.fullName || user?.userName}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{"کاربر سامانه نظام"}</p>
                    </div>
                    <button
                      onClick={Logout}
                      className="w-full text-right px-4 py-3 hover:bg-red-50 text-sm text-red-600 flex items-center gap-2 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      خروج از سیستم
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <motion.button
              onClick={() => router.push("/login")}
              className="flex items-center gap-2 bg-linear-to-r from-slate-800 to-slate-900 text-white px-4 py-2 rounded-xl hover:from-slate-900 hover:to-slate-800 transition-all shadow-md"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <LogIn className="w-4 h-4" />
              <span className="hidden sm:inline">ورود به سامانه</span>
            </motion.button>
          )}
        </div>
      </div>

      {/* نوار جستجوی موبایل */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-slate-200 p-3 bg-white"
          >
            <div className="flex items-center bg-slate-50 rounded-xl px-3 py-2 border border-slate-200">
              <Search className="w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="جستجو..."
                className="bg-transparent border-none outline-none text-sm px-2 flex-1 text-slate-700"
                autoFocus
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}