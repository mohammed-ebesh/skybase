import { useState } from "react";
import { formSchema } from "@/app/schema/officerSchema"; // Zod schema for validation
import {
  officerRanks,
  religions,
  bloodTypes,
  socialStatuses,
  governorates,
} from "@/utils/helper"; // Helper data arrays for dropdowns

function AddSoldier() {
  const initialFormData = {
    name: "",
    rank: "",
    birthDate: "",
    college: "",
    graduationDate: "",
    weapon: "",
    religion: "",
    bloodType: "",
    currentRankPromotionDate: "",
    nextRankPromotionDate: "",
    militaryNumber: "",
    nationalNumber: "",
    seniorityNumber: "",
    category: "",
    unit: "",
    attachedFrom: "",
    attachedTo: "",
    subUnit: "",
    jobTitle: "",
    joinDateHQ: "",
    joinDateUnit: "",
    governorate: "",
    address: "",
    socialStatus: "",
    numberOfMarriages: "",
    currentWives: "",
    numberOfChildren: "",
    medicalStatus: "",
    militaryQualification: "",
    civilQualification: "",
    securityStatus: "",
    height: "",
    weight: "",
    profilePicture: null,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;
    if (type === "file") {
      const file = files?.[0] || null;
      setFormData((prev) => ({ ...prev, [name]: file }));
      setImagePreview(file ? URL.createObjectURL(file) : null);
      return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const parseResult = formSchema.safeParse(formData);
    if (!parseResult.success) {
      const zodErrors = {};
      parseResult.error.issues.forEach((issue) => {
        const fieldName = issue.path[0];
        zodErrors[fieldName] = issue.message;
      });
      setErrors(zodErrors);
    } else {
      setErrors({});
      alert("تم حفظ البيانات بنجاح!");
      console.log("نموذج البيانات:", formData);
    }
  };

  const handleProfilePictureClick = () => {
    document.getElementById("profilePicture").click();
  };

  const baseInputClasses = `
    border border-gray-300 rounded px-2 py-1
    focus:outline-none focus:ring-2 focus:ring-slate-600
    invalid:ring-2 invalid:ring-red-500
  `;

  const renderInput = (label, name, type = "text", options = {}) => (
    <div className="flex flex-col mb-4">
      <label className="mb-1 font-semibold text-gray-700" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        className={baseInputClasses}
        value={type === "file" ? undefined : formData[name]}
        onChange={handleChange}
        {...options}
      />
      {errors[name] && (
        <span className="text-red-600 text-sm mt-1">{errors[name]}</span>
      )}
    </div>
  );

  const renderSelect = (
    label,
    name,
    optionsList,
    placeholder = "اختر قيمة"
  ) => {
    return (
      <div className="flex flex-col mb-4">
        <label className="mb-1 font-semibold text-gray-700" htmlFor={name}>
          {label}
        </label>
        <select
          id={name}
          name={name}
          className={`${baseInputClasses} py-[0.460rem]`}
          value={formData[name]}
          onChange={handleChange}
        >
          <option value="">{placeholder}</option>
          {optionsList.map((option) => {
            // If option is an object, use label & value; otherwise, use item itself
            const optionLabel = option.label || option;
            const optionValue = option.value || option;

            return (
              <option key={optionValue} value={optionValue}>
                {optionLabel}
              </option>
            );
          })}
        </select>
        {errors[name] && (
          <span className="text-red-600 text-sm mt-1">{errors[name]}</span>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-screen-lg mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">
        إضافة كرت صف ضابط{" "}
      </h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-4">
        {/* الصفحة الأولى */}

        <div className="col-span-3">
          <h2 className="text-xl font-bold mb-2 border-b pb-1">
            البيانات الأساسية
          </h2>

          {/* Profile Picture */}
          <div className="col-span-1 flex flex-col mb-4 relative">
            <input
              id="profilePicture"
              name="profilePicture"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleChange}
            />
            <div
              onClick={handleProfilePictureClick}
              className="
              group flex flex-col items-center justify-center
              border-2 border-dashed border-gray-300 rounded-lg p-6
              cursor-pointer hover:border-blue-600 hover:bg-blue-50
              transition-colors
            "
            >
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="معاينة الصورة"
                  className="w-28 h-42 object-cover rounded shadow-sm"
                />
              ) : (
                <div className="flex flex-col items-center text-gray-600 group-hover:text-blue-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 mb-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                  <p className="font-medium">اسحب الصورة أو انقر هنا لرفعها</p>
                  <p className="text-sm text-gray-500">(المقاس المطلوب 4×6)</p>
                </div>
              )}
            </div>
            {errors.profilePicture && (
              <span className="text-red-600 text-sm mt-1">
                {errors.profilePicture}
              </span>
            )}
          </div>
        </div>
        {renderInput("الاسم:", "name")}
        {renderSelect("الرتبة:", "rank", officerRanks, "اختر الرتبة")}
        {renderInput("تاريخ الميلاد:", "birthDate", "date")}
        {renderInput("الكلية:", "college")}
        {renderInput("تاريخ التخرج:", "graduationDate", "date")}
        {renderInput("السلاح:", "weapon")}
        {renderSelect("الديانة:", "religion", religions, "اختر الديانة")}
        {renderSelect(
          "فصيلة الدم:",
          "bloodType",
          bloodTypes,
          "اختر فصيلة الدم"
        )}

        {/* Section 2: Military Details */}
        <h2 className="col-span-3 text-xl font-bold mt-6 mb-4">
          البيانات العسكرية
        </h2>
        {renderInput("الرقم العسكري:", "militaryNumber")}
        {renderInput("الرقم القومي:", "nationalNumber")}
        {renderInput("رقم الأقدمية:", "seniorityNumber")}
        {renderInput("الفئة:", "category")}
        {renderInput("الوحدة:", "unit")}
        {renderInput("ملحق من:", "attachedFrom")}
        {renderInput("ملحق على:", "attachedTo")}
        {renderInput("الوحدة الفرعية:", "subUnit")}
        {renderInput("الوظيفة:", "jobTitle")}
        {renderInput("تاريخ الضم على ق.ج:", "joinDateHQ", "date")}
        {renderInput("تاريخ الضم على الوحدة:", "joinDateUnit", "date")}

        {/* Section 3: Social Details */}
        <h2 className="col-span-3 text-xl font-bold mt-6 mb-4">
          البيانات الاجتماعية
        </h2>
        {renderSelect(
          "المحافظة:",
          "governorate",
          governorates,
          "اختر المحافظة"
        )}
        {renderInput("العنوان:", "address")}
        {renderSelect(
          "الحالة الاجتماعية:",
          "socialStatus",
          socialStatuses,
          "اختر الحالة الاجتماعية"
        )}
        {renderInput("عدد مرات الزواج:", "numberOfMarriages", "number")}
        {renderInput("عدد الزوجات الحالي:", "currentWives", "number")}
        {renderInput("عدد الأولاد:", "numberOfChildren", "number")}

        {/* Section 4: Additional Details */}
        <h2 className="col-span-3 text-xl font-bold mt-6 mb-4">
          البيانات الإضافية
        </h2>
        {renderInput("الموقف الأمني:", "securityStatus")}
        {renderInput("الطول (سم):", "height", "number")}
        {renderInput("الوزن (كجم):", "weight", "number")}
        {renderInput("الموقف الطبي:", "medicalStatus")}
        {renderInput("التأهيل العسكري:", "militaryQualification")}
        {renderInput("التأهيل المدني:", "civilQualification")}

        {/* Submit Button */}
        <div className="col-span-3 flex justify-center mt-6">
          <button
            type="submit"
            className="cursor-pointer text-xs md:text-base bg-our-black text-white px-4 py-2 rounded-xl hover:opacity-90  focus:outline-none focus:ring-2 "
          >
            حفظ البيانات
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddSoldier;
