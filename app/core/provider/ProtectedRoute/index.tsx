// "use client";

// import { useEffect, useState } from "react";
// import { useAuthContext } from "../Auth";
// import { usePathname, useRouter } from "next/navigation";
// // import { user } from "@/app/components/partial/layout/ClientLayoutSelector";

// export const ADMIN_PERMISSION = 171;

// export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
//   const { loading, user } = useAuthContext();
//   const router = useRouter();
//   const pathname = usePathname();

//   const [authorized, setAuthorized] = useState(false);

//   useEffect(() => {
//     if (loading) return;

//     const adminPaths = ["/admin"];
//     const dashboardPath = "/";

//     let allow = true;

//     if (!user) {
//       const restrictedPaths = [...adminPaths, dashboardPath];
//       const isRestricted = restrictedPaths.some(path =>
//         pathname.startsWith(path)
//       );

//       if (isRestricted) {
//         allow = false;
//         router.replace("/");
//       }
//     }

//     else {
//       const isAdmin = user.permissionCodes.includes(ADMIN_PERMISSION);

//       if (isAdmin) {
//         if (!adminPaths.some(path => pathname.startsWith(path))) {
//           allow = false;
//           router.replace("/admin");
//         }
//       } else {
//         const isAdminRoute = adminPaths.some(path =>
//           pathname.startsWith(path)
//         );

//         if (isAdminRoute) {
//           allow = false;
//           router.replace("/");
//         }
//       }
//     }

//     setAuthorized(allow);
//   // }, [ user, pathname, router]);
//   }, [loading, user, pathname, router]);

//   if ( !authorized) {
//   // if (loading || !authorized) {
//     return (
//       <div className="min-h-screen flex flex-col justify-center items-center bg-linear-to-br from-gray-50 to-gray-200">
//         <div className="flex items-center mb-5">
//           {[...Array(3)].map((_, i) => (
//             <div
//               key={i}
//               className="w-3 h-3 mx-1.5 bg-blue-600 rounded-full"
//               style={{
//                 animation: `bounce 1.4s infinite ease-in-out ${i * 0.16}s`
//               }}
//             />
//           ))}
//         </div>

//         <p className="text-gray-800 text-lg font-semibold font-sans">
//           در حال بارگذاری
//         </p>

//       </div>
//     );
//   }

//   return <>{children}</>;
// }

"use client";

import { useEffect, useState } from "react";
import { useAuthContext } from "../Auth";
import { usePathname, useRouter } from "next/navigation";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { loading, isLoggedIn } = useAuthContext();
  const router = useRouter();
  const pathname = usePathname();

  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (loading) return;

    const isAdminPath = pathname?.startsWith('/admin');

    if (isAdminPath && !isLoggedIn) {
      router.replace("/");
      setAuthorized(false);
      return;
    }

    if (isLoggedIn && (pathname === "/" || pathname === "")) {
      router.replace("/admin");
      return;
    }

    setAuthorized(true);
  }, [loading, isLoggedIn, pathname]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-linear-to-br from-gray-50 to-gray-200">
        <div className="flex items-center mb-5">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-3 h-3 mx-1.5 bg-blue-600 rounded-full"
              style={{
                animation: `bounce 1.4s infinite ease-in-out ${i * 0.16}s`
              }}
            />
          ))}
        </div>

        <p className="text-gray-800 text-lg font-semibold font-sans">
          در حال بارگذاری
        </p>
      </div>
    );
  }

  if (!authorized) {
    return null;
  }

  return <>{children}</>;
}