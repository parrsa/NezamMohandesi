'use client';

import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';

interface StatCardProps {
    title: string;
    value: number;
    icon: React.ElementType;
    color: string;
    trend?: number;
}

export const StatCard = ({ title, value, icon: Icon, color, trend }: StatCardProps) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -4 }}
        className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
    >
        <div className="flex items-center justify-between">
            <div>
                <p className="text-gray-500 text-sm mb-1">{title}</p>
                <h3 className="text-3xl font-bold text-gray-800">{value.toLocaleString('fa-IR')}</h3>
                {trend && (
                    <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
                        <TrendingUp size={16} />
                        {trend}% نسبت به ماه قبل
                    </p>
                )}
            </div>
            <div className={`p-4 rounded-2xl bg-linear-to-br ${color} shadow-lg`}>
                <Icon size={28} className="text-white" />
            </div>
        </div>
    </motion.div>
);