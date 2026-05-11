export const persianToEnglishNumber = (str: string | number): string => {
  if (!str) return "";
  
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  const arabicDigits = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
  const englishDigits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

  let result = String(str);

  persianDigits.forEach((persian, index) => {
    result = result.replace(new RegExp(persian, "g"), englishDigits[index]);
  });

  arabicDigits.forEach((arabic, index) => {
    result = result.replace(new RegExp(arabic, "g"), englishDigits[index]);
  });

  return result;
};

export const formatDateForBackend = (dateString: string): string => {
  if (!dateString) return "";
  
  const englishDate = persianToEnglishNumber(dateString);
  const parts = englishDate.split("/");
  
  if (parts.length === 3) {
    const year = parts[0].padStart(4, "0");
    const month = parts[1].padStart(2, "0");
    const day = parts[2].padStart(2, "0");
    return `${year}${month}${day}`;
  }
  
  return englishDate.replace(/\D/g, "");
};

export const formatDateForDisplay = (dateString: string): string => {
  if (!dateString) return "";
  
  const cleaned = dateString.replace(/\D/g, "");
  
  if (cleaned.length === 8) {
    return `${cleaned.slice(0, 4)}/${cleaned.slice(4, 6)}/${cleaned.slice(6, 8)}`;
  }
  
  return dateString;
};