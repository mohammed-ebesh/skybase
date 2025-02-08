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
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Fetch Non-Commissioned Officers Data
  const {
    data: OfficersData,
    isLoading: OfficersDataLoading,
    refetch,
  } = useFetch(`/api/v1/individuals/non-commissioned-officers`);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Extract required fields and map API response to table format
  const data =
    OfficersData?.member?.map((officer) => ({
      id: officer.id,
      rank: officer.militaryRank.rank, // Rank
      name: officer.name, // Name
      militaryId: officer.militaryId, // Military ID
      specialization: officer.specialization || "غير محدد", // Specialization
      task: officer.task?.task || "غير محدد", // Task
      status: officer.status?.status || "غير محدد", // Current status
      mobile: officer.mobileNumber || "غير متوفر", // Mobile Number
      age: new Date().getFullYear() - new Date(officer.birthdate).getFullYear(), // Calculate age
      bloodType: officer.bloodType?.type || "غير محدد", // Blood Type
      socialStatus: officer.socialStatus?.status || "غير محدد", // Social Status
    })) || [];

  const handleDeleteNonOfficer = async () => {
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
    {
      accessorKey: "rank",
      header: "الرتبة", // Rank
    },
    {
      accessorKey: "name",
      header: "الإسم", // Name
    },
    {
      accessorKey: "militaryId",
      header: "الرقم العسكري", // Military ID
    },
    {
      accessorKey: "specialization",
      header: "التخصص", // Specialization
    },
    {
      accessorKey: "task",
      header: "المهمة", // Task
    },
    {
      accessorKey: "status",
      header: "الحالة", // Status
    },
    {
      accessorKey: "mobile",
      header: "رقم الموبايل", // Mobile Number
    },
    {
      accessorKey: "age",
      header: "العمر", // Age
    },
    {
      accessorKey: "bloodType",
      header: "فصيلة الدم", // Blood Type
    },
    {
      accessorKey: "socialStatus",
      header: "الحالة الاجتماعية", // Social Status
    },
  ];

  const handleEditClick = (row) => {
    console.log(row);
  };

  const handleDeleteClick = (row) => {
    setSelectedRow(row);
    setIsDeleteDialogOpen(true);
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
          إضافة كرت صف ضابط
        </div>
      </div>

      {OfficersDataLoading ? (
        <Spinner />
      ) : (
        <Table data={data} tableAction={tableAction} columns={columns} />
      )}

      <ConfirmDelete
        openDialog={isDeleteDialogOpen}
        setOpenDialog={setIsDeleteDialogOpen}
        onConfirm={handleDeleteNonOfficer} // API Call
        id={selectedRow?.id}
        name={selectedRow?.name} // Officer Name
        loading={isDeleting}
      />
    </div>
  );
}

export default OrganizationManagement;
