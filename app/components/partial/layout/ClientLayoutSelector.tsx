// "use client";
// import React from "react";
// import UserLayout from "./user";
// import ProtectedRoute, { ADMIN_PERMISSION } from "@/app/core/provider/ProtectedRoute";
// import AdminLayout from "./admin";
// import { useAuthContext } from "@/app/core/provider/Auth";
// import { PermissionsProvider } from "@/app/core/provider/PermissonProvider";


// interface ClientLayoutSelectorProps {
//   children: React.ReactNode;
// }

// export default function ClientLayoutSelector({ children }: ClientLayoutSelectorProps) {
//   const { user, loading } = useAuthContext();
//   // const isAdmin = "true";

//   const isAdmin = user?.permissionCodes.includes(ADMIN_PERMISSION);

//   const renderLayout = () => {
//     if (loading) return <div>در حال بارگذاری...</div>;

//     if (isAdmin) return <AdminLayout>{children}</AdminLayout>;
//     return <UserLayout >{children}</UserLayout>;
//   };

//   return (
//     // <PermissionsProvider userPermissions={user?.permissionCodes ?? []}>
//     <PermissionsProvider userPermissions={user?.permissionCodes ?? []}>
//       <ProtectedRoute>{renderLayout()}</ProtectedRoute>
//     </PermissionsProvider>
//   )
//   // return <UserLayout>{children}</UserLayout>;
// }

"use client";
import React from "react";
import UserLayout from "./user";
import AdminLayout from "./admin";
import { useAuthContext } from "@/app/core/provider/Auth";
import ProtectedRoute from "@/app/core/provider/ProtectedRoute";

interface ClientLayoutSelectorProps {
  children: React.ReactNode;
}

export default function ClientLayoutSelector({ children }: ClientLayoutSelectorProps) {
  const { user, loading, isLoggedIn } = useAuthContext();

  const renderLayout = () => {
    if (loading) return <div>در حال بارگذاری...</div>;
    if (isLoggedIn) return <AdminLayout>{children}</AdminLayout>;

    return <UserLayout>{children}</UserLayout>;
  };

  return (
    <ProtectedRoute>{renderLayout()}</ProtectedRoute>
  );
}