"use client";

import React, { useEffect, useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  User,
  MessageSquare,
  Building,
  Link2,
} from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const DefaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

export default function ContactPage() {
  const position = [35.6997, 51.338] as [number, number];
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const contactInfo = [
    {
      icon: <Phone className="w-5 h-5" />,
      title: "تلفن",
      items: ["۰۲۱-۸۸۷۷۶۶۵۵", "۰۲۱-۸۸۷۷۶۶۵۶"],
      description: "ساعت پاسخگویی: ۸ الی ۱۷",
    },
    {
      icon: <Mail className="w-5 h-5" />,
      title: "ایمیل",
      items: ["info@teio.ir", "support@teio.ir"],
      description: "پاسخگویی در اسرع وقت",
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      title: "آدرس",
      items: ["تهران، خیابان آزادی"],
      description: "نبش خیابان کارگر، پلاک ۱۲۳",
    },
    {
      icon: <Clock className="w-5 h-5" />,
      title: "ساعت کاری",
      items: ["شنبه تا چهارشنبه: ۸ الی ۱۷"],
      description: "پنجشنبه: ۸ الی ۱۳",
    },
  ];

  const quickLinks = [
    { name: "نشریات", href: "/magazine" },
    { name: "اخبار", href: "/news" },
    { name: "ویدیوها", href: "/videos" },
    { name: "تبلیغات", href: "/advertisements" },
  ];

  const socialNetworks = [
    { icon: <Link2 className="w-5 h-5" />, name: "اینستاگرام", href: "#" },
    { icon: <Link2 className="w-5 h-5" />, name: "تلگرام", href: "#" },
    { icon: <Link2 className="w-5 h-5" />, name: "لینکدین", href: "#" },
    { icon: <Link2 className="w-5 h-5" />, name: "یوتیوب", href: "#" },
  ];

  const faqs = [
    {
      question: "چگونه می‌توانم با سازمان تماس بگیرم؟",
      answer:
        "شما می‌توانید از طریق تلفن، ایمیل یا فرم تماس با ما در ارتباط باشید.",
    },
    {
      question: "ساعت کاری سازمان چگونه است؟",
      answer:
        "ساعت کاری سازمان از شنبه تا چهارشنبه ۸ الی ۱۷ و پنجشنبه ۸ الی ۱۳ می‌باشد.",
    },
    {
      question: "آدرس سازمان کجاست؟",
      answer:
        "سازمان در تهران، خیابان آزادی، نبش خیابان کارگر، پلاک ۱۲۳ واقع شده است.",
    },
    {
      question: "چگونه می‌توانم عضو سازمان شوم؟",
      answer:
        "برای عضویت در سازمان می‌توانید به بخش عضویت در وبسایت مراجعه کنید.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400 rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                <Building className="w-6 h-6" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold">تماس با ما</h1>
            </div>
            <p className="text-lg text-blue-100 opacity-90">
              سازمان نظام مهندسی ساختمان استان تهران - ارتباط مستقیم با ما
            </p>
            <div className="flex flex-wrap gap-2 mt-4 text-sm">
              <span className="px-3 py-1 bg-white/20 rounded-full backdrop-blur-sm">
                پاسخگویی سریع
              </span>
              <span className="px-3 py-1 bg-white/20 rounded-full backdrop-blur-sm">
                پشتیبانی ۲۴ ساعته
              </span>
              <span className="px-3 py-1 bg-white/20 rounded-full backdrop-blur-sm">
                ارتباط مستقیم
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {contactInfo.map((info, index) => (
            <div
              key={index}
              className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 shadow-lg shadow-gray-100/50 border border-white/50 hover:shadow-xl hover:shadow-blue-100/30 transition-all duration-300 hover:scale-[1.02] group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl text-white shadow-lg shadow-blue-200 group-hover:shadow-blue-300 transition-all duration-300">
                  {info.icon}
                </div>
                <h3 className="font-bold text-gray-800">{info.title}</h3>
              </div>
              <div className="space-y-1">
                {info.items.map((item, idx) => (
                  <p key={idx} className="text-sm text-gray-600 font-medium">
                    {item}
                  </p>
                ))}
                <p className="text-xs text-gray-400 mt-2">{info.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="space-y-6">
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 shadow-lg shadow-gray-100/50 border border-white/50">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-blue-600" />
                سوالات متداول
              </h3>
              <div className="space-y-3">
                {faqs.slice(0, 2).map((faq, index) => (
                  <details
                    key={index}
                    className="group bg-gray-50/50 rounded-lg p-3 hover:bg-blue-50/30 transition-colors duration-200"
                  >
                    <summary className="flex items-center justify-between cursor-pointer text-sm font-medium text-gray-700 list-none">
                      {faq.question}
                      <ChevronDown className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform duration-200" />
                    </summary>
                    <p className="mt-2 text-xs text-gray-500 pr-2">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-white/70 backdrop-blur-xl rounded-2xl p-6 shadow-lg shadow-gray-100/50 border border-white/50 overflow-hidden">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-gradient-to-br from-red-500 to-red-600 rounded-xl text-white shadow-lg shadow-red-200">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800">موقعیت مکانی سازمان</h3>
              <p className="text-xs text-gray-400">
                تهران، خیابان آزادی، نبش خیابان کارگر، پلاک ۱۲۳
              </p>
            </div>
          </div>

          <div className="w-full h-[400px] rounded-xl overflow-hidden relative z-0">
            {isMounted && (
              <MapContainer
                center={position}
                zoom={15}
                style={{ height: "100%", width: "100%" }}
                zoomControl={true}
                scrollWheelZoom={true}
                className="z-0"
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                  <Popup>
                    <div className="text-right" dir="rtl">
                      <p className="font-bold text-sm">
                        سازمان نظام مهندسی ساختمان
                      </p>
                      <p className="text-xs text-gray-600">استان تهران</p>
                      <p className="text-xs text-gray-500 mt-1">
                        خیابان آزادی، نبش کارگر، پلاک ۱۲۳
                      </p>
                    </div>
                  </Popup>
                </Marker>
              </MapContainer>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  );
}
