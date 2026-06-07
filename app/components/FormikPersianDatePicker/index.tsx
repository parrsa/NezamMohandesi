import DatePicker, { DateObject } from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import { useEffect, useState } from "react"
import { FieldInputProps, FormikProps } from "formik"
import { cn } from "@/app/lib/utils"

type Props = {
    field: FieldInputProps<string>
    form: FormikProps<any>
    placeholder?: string
    className?: string
    inputClass?: string
    style?: React.CSSProperties
    readOnly?: boolean
    error?: boolean
}

export default function FormikPersianDatePicker({
    field,
    form,
    placeholder = "تاریخ را انتخاب کنید",
    className = "",
    inputClass = "",
    style = {},
    error,
    readOnly = false
}: any) {
    const [value, setValue] = useState<DateObject | null>(null)

    useEffect(() => {
        if (!field?.value) {
            setValue(null)
            return
        }

        try {
            if (typeof field.value === 'string') {
                const dateObj = new DateObject({
                    calendar: persian,
                    locale: persian_fa,
                    format: "YYYY/MM/DD",
                    date: field.value 
                })

                if (dateObj.isValid) {
                    setValue(dateObj)
                } else {
                    setValue(null)
                }
            }
        } catch (e) {
            console.error("Error parsing date:", field.value, e)
            setValue(null)
        }
    }, [field?.value])

    const handleChange = (date: DateObject | null) => {
        if (!date) {
            form?.setFieldValue(field?.name, "")
            setValue(null)
            return
        }

        const jalaliDateString = date.format("YYYY/MM/DD")

        form?.setFieldValue(field?.name, jalaliDateString)
        setValue(date)
    }

    return (
        <div className={`w-full ${className}`}>
            <DatePicker
                value={value}
                onChange={handleChange}
                calendar={persian}
                locale={persian_fa}
                calendarPosition="bottom-right"
                format="YYYY/MM/DD"
                placeholder={placeholder}
                containerStyle={{
                    width: "100%",
                }}
                style={{
                    width: "100%",
                    direction: "rtl",
                    ...style,
                }}
                inputClass={cn(
                    "h-10 file:text-foreground placeholder:text-muted-foreground placeholder:text-[15.5px] placeholder:font-medium selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex w-full min-w-0 rounded-lg border px-3 py-2 text-base bg-input-background transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                    "focus-visible:border-ring border-gray-300 focus-visible:ring-ring/50 focus-visible:ring-[1px]",
                    error ? "border-red-500 ring-red-200" : "",
                    inputClass
                )}
                readOnly={readOnly}
            />
        </div>
    )
}