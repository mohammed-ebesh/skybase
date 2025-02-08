"use client";
import { useState } from "react";
import Table from "@/components/shared/Table";
import { Trash2, Eye, Pencil } from "lucide-react";
import ConfirmDelete from "../../shared/ConfirmDelete";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useFetch } from "@/lib/useFetch";
import Cookies from "js-cookie";
import { Spinner } from "@/components/ui/Spinner";

function OrganizationManagement() {
  const router = useRouter();
  const pathname = usePathname(); // e.g. "/units/1/administration"
  const searchParams = useSearchParams(); // e.g. "?sectionId=7"

  // Fetch officers data
  const {
    data: OfficersData,
    isLoading: OfficersDataLoading,
    refetch, // For refetching after delete
  } = useFetch(`/api/v1/individuals/officers`);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Extract required fields and map API response to table format
  const data =
    OfficersData?.member?.map((officer) => ({
      id: officer.id,
      rank: officer.militaryRank.rank,
      name: officer.name,
      militaryId: officer.militaryId, // Military ID
      specialization: officer.specialization, // Specialization
      task: officer.task?.task || "غير محدد", // Task
      status: officer.status?.status || "غير محدد", // Current status
      mobile: officer.mobileNumber,
      age: new Date().getFullYear() - new Date(officer.birthdate).getFullYear(), // Calculate age
      bloodType: officer.bloodType?.type || "غير محدد", // Blood Type
      socialStatus: officer.socialStatus?.status || "غير محدد", // Social Status
    })) || [];

  // Delete an officer

  const handleDeleteOfficer = async () => {
    if (!selectedRow) return;
    setIsDeleting(true);

    try {
      const token = Cookies.get("auth_token"); // Get token from cookies

      const response = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL +
          `/api/v1/individuals/${selectedRow.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "", // Attach token
          },
        }
      );

      if (!response.ok) {
        throw new Error("فشل في حذف الضابط.");
      }

      // Refresh the data
      refetch();
      setIsDeleteDialogOpen(false);
    } catch (error) {
      console.error("خطأ أثناء حذف الضابط:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const tableAction = (row) => (
    <div className="flex gap-2">
      <div title="عرض">
        <Eye
          className="w-4 cursor-pointer text-[#71717A]"
          onClick={() => console.log(row)}
        />
      </div>
      <div title="تعديل">
        <Pencil
          className="w-4 cursor-pointer text-green-500"
          onClick={() => handleEditClick(row)}
        />
      </div>
      <div title="حذف">
        <Trash2
          className="text-red-400 w-4 cursor-pointer"
          onClick={() => {
            setSelectedRow(row);
            setIsDeleteDialogOpen(true);
          }}
        />
      </div>
    </div>
  );

  const columns = [
    { accessorKey: "rank", header: "الرتبة" },
    { accessorKey: "name", header: "الإسم" },
    { accessorKey: "militaryId", header: "الرقم العسكري" },
    { accessorKey: "specialization", header: "التخصص" },
    { accessorKey: "task", header: "المهمة" },
    { accessorKey: "status", header: "الحالة" },
    { accessorKey: "mobile", header: "رقم الموبايل" },
    { accessorKey: "age", header: "العمر" },
    { accessorKey: "bloodType", header: "فصيلة الدم" },
    { accessorKey: "socialStatus", header: "الحالة الاجتماعية" },
  ];

  const handleEditClick = (row) => {
    console.log(row);
  };

  // Handle "إضافة" button click
  const handleAddClick = () => {
    const updatedParams = new URLSearchParams(searchParams.toString());
    updatedParams.set("sectionId", "8");
    router.push(`${pathname}?${updatedParams.toString()}`);
  };

  return (
    <div>
      <div className="flex items-center justify-end mb-2">
        <div
          onClick={handleAddClick}
          className="cursor-pointer text-xs md:text-base bg-our-black text-white px-4 py-2 rounded-xl hover:opacity-90  focus:outline-none focus:ring-2 "
        >
          إضافة كرت ضابط
        </div>
      </div>

      {OfficersDataLoading ? (
        <Spinner />
      ) : (
        <Table data={data} tableAction={tableAction} columns={columns} />
      )}

      {/* Confirm Delete Dialog */}
      <ConfirmDelete
        openDialog={isDeleteDialogOpen}
        setOpenDialog={setIsDeleteDialogOpen}
        onConfirm={handleDeleteOfficer} // API Call
        id={selectedRow?.id}
        name={selectedRow?.name} // Officer Name
        loading={isDeleting}
      />
    </div>
  );
}

export default OrganizationManagement;
