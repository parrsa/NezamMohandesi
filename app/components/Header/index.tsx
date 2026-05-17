"use client";
import { Menu, X, Search, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

const Logo = () => (
  <svg
    width="39"
    height="29"
    viewBox="0 0 39 29"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2.17295 21.2169H0.0118667V2.6365C-0.110459 0.957782 0.705043 -0.0723395 2.82535 0.0039658H36.1386C37.4026 0.0039658 38.6259 0.767019 38.6259 2.59835L38.6667 21.2169H36.5056L36.5464 2.17867H2.21372L2.17295 21.2169Z"
      fill="#0037B3"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16.4043 17.3635V15.1125L20.1556 13.3193L36.3025 21.4077V22.9338H34.6715L20.1556 15.7611L16.4043 17.3635Z"
      fill="#0037B3"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.43164 20.4158L9.47242 18.1648L13.2237 16.3716L29.3707 24.4218L29.3299 25.9861L27.7397 25.9479L13.2237 18.8134L9.43164 20.4158Z"
      fill="#0037B3"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2.58008 23.4297V21.1787L6.33139 19.3855L22.4783 27.4357V29H20.8473L6.33139 21.8273L2.58008 23.4297Z"
      fill="#0037B3"
    />
  </svg>
);

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const router = useRouter();
  const pathname = usePathname();

  const dropdownRef = useRef<HTMLDivElement>(null);

  const mainMenuItems = [
    { id: "home", label: "صفحه اصلی", href: "/" },
    { id: "about", label: "معرفی سازمان", href: "/introduction" },
    {
      id: "news",
      label: "اخبار و اطلاعیه‌ها",
      href: "/news",
      dropdown: [
        { label: "اخبار عمومی", href: "/news/general" },
        { label: "اطلاعیه‌ها", href: "/news/announcements" },
        { label: "اخبار صنفی", href: "/news/professional" },
      ],
    },
    {
      id: "services",
      label: "خدمات",
      href: "/services",
      dropdown: [
        { label: "آموزش", href: "/services/education" },
        { label: "صدور پروانه", href: "/services/license" },
        { label: "آزمون‌ها", href: "/services/exams" },
        { label: "مشاوره", href: "/services/consulting" },
      ],
    },
    { id: "magazine", label: "نشریه پیام مهندسی", href: "/magazine" },
    { id: "contact", label: "تماس با ما", href: "/contact" },
  ];

  const getCurrentPageFromPath = () => {
    if (pathname === "/") return "home";
    // تطبیق مسیر معرفی سازمان با id
    if (pathname === "/introduction") return "about";
    const path = pathname.split("/")[1];
    return path || "home";
  };

  const [currentPage, setCurrentPage] = useState<string>(
    getCurrentPageFromPath(),
  );

  useEffect(() => {
    const newPage = getCurrentPageFromPath();
    if (newPage !== currentPage) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCurrentPage(newPage);
    }
  }, [pathname, currentPage]);

  const handleNavigate = (page: string, href: string) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    setOpenDropdown(null);
    router.push(href);
  };

  const handleDropdownToggle = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenDropdown(openDropdown === id ? null : id);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
      }
    };

    if (openDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openDropdown]);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="bg-neutral-200 border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* لوگو و نام سازمان - لینک به صفحه اصلی */}
            <Link href="/" className="flex items-center gap-3">
              <div className="flex items-center justify-center text-white font-bold text-lg">
                <Logo />
              </div>
              <div className="text-right">
                <div className="text-gray-800 font-bold text-sm md:text-base">
                  سازمان نظام مهندسی ساختمان استان تهران
                </div>
              </div>
            </Link>

            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center bg-white border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-400 focus-within:border-transparent">
                <button className="px-2 py-1.5 bg-gray-50 hover:bg-gray-100">
                  <Search className="w-4 h-4 text-gray-600" />
                </button>
                <input
                  type="text"
                  placeholder="جستجو..."
                  className="px-3 py-1.5 text-sm w-48 outline-none"
                />
              </div>

              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg">
                <span className="font-medium text-sm">
                  شماره تماس: 021 4264 4000
                </span>
              </div>

              <button
                className="lg:hidden w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="w-4 h-4" />
                ) : (
                  <Menu className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* منوی دسکتاپ */}
      <div className="hidden md:flex bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center h-14">
            <nav className="hidden lg:flex gap-1">
              {mainMenuItems.map((item) => (
                <div
                  key={item.id}
                  className="relative group"
                  ref={openDropdown === item.id ? dropdownRef : null}
                >
                  {item.dropdown ? (
                    <button
                      onClick={(e) => handleDropdownToggle(item.id, e)}
                      className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 flex items-center gap-1 ${
                        currentPage === item.id
                          ? "text-blue-600 bg-blue-50"
                          : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                      }`}
                    >
                      {item.label}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          openDropdown === item.id ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 flex items-center gap-1 ${
                        currentPage === item.id
                          ? "text-blue-600 bg-blue-50"
                          : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                      }`}
                    >
                      {item.label}
                    </Link>
                  )}

                  {item.dropdown && openDropdown === item.id && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full right-0 mt-1 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
                    >
                      {item.dropdown.map((subItem, idx) => (
                        <Link
                          key={idx}
                          href={subItem.href}
                          onClick={() => setOpenDropdown(null)}
                          className="block w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* منوی موبایل */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-200 overflow-hidden"
          >
            <div className="py-3 px-4 space-y-1">
              {mainMenuItems.map((item) => (
                <div key={item.id}>
                  {item.dropdown ? (
                    <>
                      <button
                        onClick={(e) => handleDropdownToggle(item.id, e)}
                        className={`w-full text-right py-2.5 px-3 rounded-lg flex items-center justify-between ${
                          currentPage === item.id
                            ? "bg-blue-50 text-blue-600"
                            : "text-gray-700"
                        }`}
                      >
                        <span>{item.label}</span>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${
                            openDropdown === item.id ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {item.dropdown && openDropdown === item.id && (
                        <div className="mr-4 space-y-1 border-r-2 border-blue-200 pr-2 mt-1">
                          {item.dropdown.map((subItem, idx) => (
                            <Link
                              key={idx}
                              href={subItem.href}
                              onClick={() => {
                                setMobileMenuOpen(false);
                                setOpenDropdown(null);
                              }}
                              className="block w-full text-right py-2 px-3 text-sm text-gray-600 rounded-lg hover:bg-blue-50"
                            >
                              {subItem.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setCurrentPage(item.id);
                      }}
                      className={`block w-full text-right py-2.5 px-3 rounded-lg ${
                        currentPage === item.id
                          ? "bg-blue-50 text-blue-600"
                          : "text-gray-700"
                      }`}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
