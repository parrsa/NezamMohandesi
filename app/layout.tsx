import { ToastContainer } from "react-toastify";
import QueryProvider from "./core/provider/ReactQuery";
import { YekanBakh } from "./lib/font";
import "./globals.css";
import UserLayout from "./components/partial/layout/user";
import SessionHandler from "./components/SessionGuard";
import { AuthProvider } from "./core/provider/Auth";
import ClientLayoutSelector from "./components/partial/layout/ClientLayoutSelector";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="fa" className={YekanBakh.variable}>
      <body
        dir="rtl"
        suppressHydrationWarning
        className="bg-black overflow-x-hidden"
        style={{ backgroundColor: "var(--main-bg-color)" }}
      >
        <ToastContainer />
        <SessionHandler>
          <QueryProvider>
            <AuthProvider>
              <ClientLayoutSelector>
                {children}
              </ClientLayoutSelector>
            </AuthProvider>
          </QueryProvider>
        </SessionHandler>
      </body>
    </html>
  );
}
