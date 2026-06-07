// "use client";

// import { useEffect, useState } from "react";
// import { usePathname, useRouter } from "next/navigation";

// export const setCookie = (name: string, value: string, days = 1) => {
//     const expires = new Date(Date.now() + days * 864e5).toUTCString();
//     document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
// };

// export const getCookie = (name: string) => {
//     return document.cookie.split("; ").reduce((r, v) => {
//         const parts = v.split("=");
//         return parts[0] === name ? decodeURIComponent(parts.slice(1).join("=")) : r;
//     }, "");
// };
// export const SESSION_COOKIE_NAME = "sessionId";
// export const SESSION_QUERY_KEY = "sessionId";
// // Sso testing
// export const SSO_BASE = "http://10.0.1.141:9050";
// // Sso published
// // export const SSO_BASE = "https://sso.tceo.ir";
// export const SSO_LOGIN = `${SSO_BASE}/account/login`;

// export default function SessionHandler({ children }: { children: React.ReactNode }) {
//     const pathname = usePathname();


//     const router = useRouter();
//     const [ready, setReady] = useState(false);

//     useEffect(() => {
//         const checkSession = async () => {
//                const isAdminPath = pathname?.startsWith('/admin');
            
//             if (!isAdminPath) {
//                 setReady(true);
//                 return;
//             }
//             const params = new URLSearchParams(window.location.search);
//             const sessionFromQuery = params.get(SESSION_QUERY_KEY);

//             let session = getCookie(SESSION_COOKIE_NAME) || "";

//             if (sessionFromQuery) {
//                 session = sessionFromQuery;
//                 setCookie(SESSION_COOKIE_NAME, sessionFromQuery, 1);
//                 params.delete(SESSION_QUERY_KEY);
//                 const base = window.location.origin + window.location.pathname;
//                 const qs = params.toString();
//                 const newUrl = qs ? `${base}?${qs}` : base;
//                 window.history.replaceState({}, "", newUrl);
//             }

//             if (!session) {
//                 const returnUrl = encodeURIComponent(window.location.href);
//                 window.location.href = `${SSO_LOGIN}?returnUrl=${returnUrl}`;
//                 return;
//             }

//             try {
//                 localStorage.setItem(SESSION_COOKIE_NAME, session);
//             } catch (e) { }

//             setReady(true);
//         };

//         checkSession();
//     }, []);

//     if (!ready) {
//         return (
//             <div className="min-h-screen flex flex-col justify-center items-center bg-linear-to-br from-gray-50 to-gray-200">
//                 <div className="flex items-center mb-5">
//                     {[...Array(3)].map((_, i) => (
//                         <div
//                             key={i}
//                             className="w-3 h-3 mx-1.5 bg-blue-600 rounded-full"
//                             style={{
//                                 animation: `bounce 1.4s infinite ease-in-out ${i * 0.16}s`
//                             }}
//                         />
//                     ))}
//                 </div>

//                 <p className="text-gray-800 text-lg font-semibold font-sans">
//                     در حال بررسی وضعیت ورود
//                 </p>
//                 <p className="text-gray-600 text-sm mt-2">
//                     لطفاً چند لحظه صبر کنید...
//                 </p>
//             </div>
//         );
//     }

//     return <>{children}</>;
// }

"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export const setCookie = (name: string, value: string, days = 1) => {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
};

export const getCookie = (name: string) => {
    return document.cookie.split("; ").reduce((r, v) => {
        const parts = v.split("=");
        return parts[0] === name ? decodeURIComponent(parts[1]) : r;
    }, "");
};

export const removeCookie = (name: string) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

export const SESSION_COOKIE_NAME = "sessionId";
export const SESSION_QUERY_KEY = "sessionId";
export const SSO_BASE = "http://10.0.1.141:9051";
export const SSO_LOGIN = `${SSO_BASE}/account/login`;

export default function SessionHandler({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const [ready, setReady] = useState(false);
    const [processingSession, setProcessingSession] = useState(false);

    useEffect(() => {
        const checkSession = async () => {
            const params = new URLSearchParams(window.location.search);
            const sessionFromQuery = params.get(SESSION_QUERY_KEY);

            if (sessionFromQuery) {
                setProcessingSession(true);
                
                setCookie(SESSION_COOKIE_NAME, sessionFromQuery, 1);
                
                try {
                    localStorage.setItem(SESSION_COOKIE_NAME, sessionFromQuery);
                } catch (e) {
                }
                
                params.delete(SESSION_QUERY_KEY);
                const base = window.location.origin + window.location.pathname;
                const qs = params.toString();
                const newUrl = qs ? `${base}?${qs}` : base;
                window.history.replaceState({}, "", newUrl);
                
                setTimeout(() => {
                    router.push("/admin");
                    setProcessingSession(false);
                }, 100);
                return;
            }

            const sessionFromCookie = getCookie(SESSION_COOKIE_NAME);

            const isAdminPath = pathname?.startsWith('/admin');
            
            if (!isAdminPath) {
                setReady(true);
                return;
            }

            if (!sessionFromCookie) {
                const returnUrl = encodeURIComponent(window.location.href);
                window.location.href = `${SSO_LOGIN}?returnUrl=${returnUrl}`;
                return;
            }

            setReady(true);
        };

        checkSession();
    }, [pathname, router]);

    if (processingSession) {
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
                    در حال تکمیل فرآیند ورود...
                </p>
                <p className="text-gray-600 text-sm mt-2">
                    در حال هدایت به پنل مدیریت
                </p>
            </div>
        );
    }

    if (!ready && pathname?.startsWith('/admin')) {
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
                    در حال بررسی وضعیت ورود
                </p>
                <p className="text-gray-600 text-sm mt-2">
                    لطفاً چند لحظه صبر کنید...
                </p>
            </div>
        );
    }

    return <>{children}</>;
}