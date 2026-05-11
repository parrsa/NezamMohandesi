function Footer() {
    return (
        <>
            <footer className="relative mt-20 bg-white border-t border-gray-200 text-gray-900 py-12">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white">
                                    <span className="text-xl">ن.م</span>
                                </div>
                                <span>نظام مهندسی</span>
                            </div>
                            <p className="text-gray-600 text-sm">
                                سازمان نظام مهندسی ساختمان استان تهران
                            </p>
                        </div>
                        <div>
                            <h4 className="mb-4">دسترسی سریع</h4>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li className="hover:text-blue-600 cursor-pointer transition-colors">نشریات</li>
                                <li className="hover:text-blue-600 cursor-pointer transition-colors">اخبار</li>
                                <li className="hover:text-blue-600 cursor-pointer transition-colors">ویدیوها</li>
                                <li className="hover:text-blue-600 cursor-pointer transition-colors">تبلیغات</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="mb-4">ارتباط با ما</h4>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li>تلفن: ۰۲۱-۸۸۷۷۶۶۵۵</li>
                                <li>ایمیل: info@teio.ir</li>
                                <li>آدرس: تهران، خیابان آزادی</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="mb-4">شبکه‌های اجتماعی</h4>
                            <div className="flex gap-3">
                                {['T', 'I', 'L', 'W'].map((letter, i) => (
                                    <div
                                        key={i}
                                        className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 cursor-pointer transition-colors"
                                    >
                                        {letter}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-gray-200 pt-8 text-center text-gray-600 text-sm">
                        <p>© ۱۴۰۴ سازمان نظام مهندسی - تمامی حقوق محفوظ است</p>
                    </div>
                </div>
            </footer>
        </>
    )
}
export default Footer