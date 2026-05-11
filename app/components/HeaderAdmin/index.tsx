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
import { Search, Bell, User, LogOut, LogIn, Menu } from "lucide-react";
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
  const router = useRouter();
  const { user, Logout } = useAuthContext();
  const { action, actionSecound } = useHeaderAction();
  const isAdmin = user?.permissionCodes?.includes(ADMIN_PERMISSION);

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">

        <div className="flex items-center gap-4 flex-1">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors"
          >
            <Menu size={24} />
          </button>

          <div className="w-full hidden md:flex">{action}</div>
        </div>

        <div className="flex items-center justify-end gap-3 flex-1">
          <div className="hidden md:flex items-center justify-end w-full">
            {actionSecound}
          </div>

          {user ? (
            <div className="relative">
              <motion.button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center justify-center gap-2 bg-gray-100 px-2 py-2 rounded-xl hover:bg-gray-200 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <User className="w-5 h-5 text-gray-700" />
             
              </motion.button>

              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute left-0 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-xl overflow-hidden z-50"
                  >
                    <button
                      onClick={Logout}
                      className="w-full text-right px-4 py-3 hover:bg-red-50 text-sm text-red-600 flex items-center gap-2 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      خروج
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <motion.button
              onClick={() => router.push("/login")}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors shadow-sm"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <LogIn className="w-5 h-5" />
              <span className="hidden sm:inline">ورود</span>
            </motion.button>
          )}
        </div>
      </div>
    </header>
  );
}