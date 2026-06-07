"use client";
import {
  Users,
  MessageCircle,
  Newspaper,
  Library,
  Building2,
  TrafficCone,
  Wrench,
  Map,
  Zap,
  Paintbrush,
} from "lucide-react";
import { motion } from "framer-motion";

const specialtyGroups = [
  {
    id: "architecture",
    title: "معماری",
    icon: Paintbrush,
    color: "from-blue-500 to-blue-700",
  },
  {
    id: "electrical",
    title: "برق",
    icon: Zap,
    color: "from-yellow-500 to-yellow-700",
  },
  {
    id: "mechanical",
    title: "مکانیک",
    icon: Wrench,
    color: "from-gray-500 to-gray-700",
  },
  {
    id: "surveying",
    title: "نقشه برداری",
    icon: Map,
    color: "from-green-500 to-green-700",
  },
  {
    id: "traffic",
    title: "ترافیک",
    icon: TrafficCone,
    color: "from-red-500 to-red-700",
  },
  {
    id: "urbanism",
    title: "شهرسازی",
    icon: Building2,
    color: "from-purple-500 to-purple-700",
  },
  {
    id: "library",
    title: "کتابخانه تخصصی",
    icon: Library,
    color: "from-indigo-500 to-indigo-700",
  },
  {
    id: "news",
    title: "اخبار",
    icon: Newspaper,
    color: "from-cyan-500 to-cyan-700",
  },
  {
    id: "consulting",
    title: "مشاوره فنی",
    icon: MessageCircle,
    color: "from-teal-500 to-teal-700",
  },
];

export function SpecialtyGroups() {
  return (
    <div className="w-full bg-white py-6  overflow-x-auto">
      <div className=" mx-auto">
        <div className="text-center mb-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            گروه‌های تخصصی
          </h2>
        </div>

        <div className="flex gap-8 p-3 overflow-x-auto  pb- justify-start md:justify-between">
          {specialtyGroups.map((group, index) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="flex flex-col items-center group cursor-pointer shrink-0"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className={`w-20 h-20 md:w-24 md:h-24 bg-blue-900 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300`}
              >
                <group.icon className="w-7 h-7 md:w-8 md:h-8 text-white" />
              </motion.div>

              {/* متن زیر دایره */}
              <span className="mt-4 text-gray-700 font-medium text-sm md:text-base text-center whitespace-nowrap">
                {group.title}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
