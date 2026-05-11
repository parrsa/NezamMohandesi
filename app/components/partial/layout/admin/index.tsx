// "use client";
// import QueryProvider from "@/app/core/provider/ReactQuery";
// import Sidebar from "@/app/components/SideBarAdminPanel";
// import { useState } from "react";
// import { Header } from "@/app/components/HeaderAdmin";
// import { HeaderActionsProvider } from "@/app/core/provider/HeaderActionProvider/HeaderAction";
// const AdminLayoutContent = ({ children }: { children: React.ReactNode }) => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [collapsed, setCollapsed] = useState(false);

//   const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
//   const toggleCollapse = () => setCollapsed(!collapsed);
//   return (
//     <div className="min-h-screen flex bg-gray-50">
//       <Sidebar
//         isOpen={isSidebarOpen}
//         onToggle={toggleSidebar}
//         collapsed={collapsed}
//         onToggleCollapse={toggleCollapse}
//       />

//       <div className={`flex-1 flex flex-col overflow-hidden z-50 `}>
//         <Header />

//         <main
//           role="main"
//           aria-label="Main content"
//           className="flex flex-col w-full gap-8"
//         >
//           <div className="mb-5 min-h-screen max-h-fit">{children}</div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default function AdminLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <QueryProvider>
//       <HeaderActionsProvider>
//         {/* <HeaderResetOnRouteChange /> */}
//         <AdminLayoutContent>{children}</AdminLayoutContent>
//       </HeaderActionsProvider>
//     </QueryProvider>
//   );
// }


"use client";
import QueryProvider from "@/app/core/provider/ReactQuery";
import { useState } from "react";
import { Header } from "@/app/components/HeaderAdmin";
import { HeaderActionsProvider } from "@/app/core/provider/HeaderActionProvider/HeaderAction";
import Sidebar from "@/app/components/SideBarAdminPanel";

const AdminLayoutContent = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleCollapse = () => setCollapsed(!collapsed);

  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar
        isOpen={isSidebarOpen}
        onToggle={toggleSidebar}
        collapsed={collapsed}
        onToggleCollapse={toggleCollapse}
      />

      <div className="flex-1 flex flex-col overflow-hidden relative w-full">
        <Header onMenuClick={toggleSidebar} />

        <main
          role="main"
          aria-label="Main content"
          className="flex flex-col w-full gap-8"
        >
          <div className="mb-5 min-h-screen max-h-fit">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryProvider>
      <HeaderActionsProvider>
        {/* <HeaderResetOnRouteChange /> */}
        <AdminLayoutContent>{children}</AdminLayoutContent>
      </HeaderActionsProvider>
    </QueryProvider>
  );
}