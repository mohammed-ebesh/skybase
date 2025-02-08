import * as z from "zod";

export const formSchema = z.object({
  name: z.string().min(1, "الاسم مطلوب"),
  rank: z.string().min(1, "الرتبة مطلوبة"),
  birthDate: z.string().min(1, "تاريخ الميلاد مطلوب"),
  college: z.string().min(1, "اسم الكلية مطلوب"),
  graduationDate: z.string().min(1, "تاريخ التخرج مطلوب"),
  weapon: z.string().min(1, "السلاح مطلوب"),
  religion: z.string().min(1, "الديانة مطلوبة"),
  bloodType: z.string().min(1, "فصيلة الدم مطلوبة"),
  currentRankPromotionDate: z.string().min(1, "تاريخ الترقّي الحالي مطلوب"),
  nextRankPromotionDate: z.string().min(1, "تاريخ الترقّي القادم مطلوب"),
  militaryNumber: z.string().min(1, "الرقم العسكري مطلوب"),
  nationalNumber: z.string().min(1, "الرقم القومي مطلوب"),
  seniorityNumber: z.string().min(1, "رقم الأقدمية مطلوب"),
  category: z.string().min(1, "الفئة مطلوبة"),
  unit: z.string().min(1, "الوحدة مطلوبة"),
  attachedFrom: z.string().min(1, "ملحق من؟"),
  attachedTo: z.string().min(1, "ملحق على؟"),
  subUnit: z.string().min(1, "الوحدة الفرعية مطلوبة"),
  jobTitle: z.string().min(1, "الوظيفة مطلوبة"),
  joinDateHQ: z.string().min(1, "تاريخ الضم على ق.ج مطلوب"),
  joinDateUnit: z.string().min(1, "تاريخ الضم على الوحدة مطلوب"),
  governorate: z.string().min(1, "المحافظة مطلوبة"),
  address: z.string().min(1, "العنوان مطلوب"),
  socialStatus: z.string().min(1, "الحالة الاجتماعية مطلوبة"),
  numberOfMarriages: z.string().refine((val) => {
    const num = Number(val);
    return !isNaN(num) && num >= 0;
  }, "عدد مرات الزواج غير صالح"),
  currentWives: z.string().refine((val) => {
    const num = Number(val);
    return !isNaN(num) && num >= 0;
  }, "عدد الزوجات الحالي غير صالح"),
  numberOfChildren: z.string().refine((val) => {
    const num = Number(val);
    return !isNaN(num) && num >= 0;
  }, "عدد الأولاد غير صالح"),
  medicalStatus: z.string().min(1, "الموقف الطبي مطلوب"),
  militaryQualification: z.string().min(1, "التأهيل العسكري مطلوب"),
  civilQualification: z.string().min(1, "التأهيل المدني مطلوب"),
  securityStatus: z.string().min(1, "الموقف الأمني مطلوب"),
  height: z.string().refine((val) => {
    const num = Number(val);
    return !isNaN(num) && num >= 0;
  }, "الطول يجب أن يكون رقمًا غير سالب"),
  weight: z.string().refine((val) => {
    const num = Number(val);
    return !isNaN(num) && num >= 0;
  }, "الوزن يجب أن يكون رقمًا غير سالب"),
});
