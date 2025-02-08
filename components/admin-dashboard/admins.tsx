import { Plus, Trash2, Eye, Pencil } from "lucide-react";
import Table from "../shared/Table";
import Image from "next/image";
import { useFetch } from "@/lib/useFetch";
import { useState, useCallback, useMemo } from "react";
import Cookies from "js-cookie";
import ConfirmDelete from "../shared/ConfirmDelete";

// ✅ Define TypeScript Interfaces
interface Role {
  id: number;
  name: string;
  scope: string;
}

interface Unit {
  id: number;
  name: string;
}

interface UnitPermission {
  id: number;
  role: Role;
  unit: Unit;
}

interface Admin {
  id: number;
  name: string;
  username: string;
  image: string;
  unitPermissions?: UnitPermission[];
}

function Admins() {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<Admin | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const {
    data: adminsData,
    isLoading: adminsDataLoading,
    error: fetchError,
    refetch,
  } = useFetch("/api/v1/admins");

  // ✅ Handle Admin Deletion
  const handleDeleteAdmin = useCallback(async () => {
    if (!selectedRow) return;
    setIsDeleting(true);

    try {
      const token = Cookies.get("auth_token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/admins/${selectedRow.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );

      if (!response.ok) {
        throw new Error("فشل في حذف المستخدم.");
      }

      // ✅ Refetch data only after successful deletion
      await refetch();
      setIsDeleteDialogOpen(false);
    } catch (error) {
      console.error("خطأ أثناء حذف المستخدم:", error);
    } finally {
      setIsDeleting(false);
    }
  }, [selectedRow, refetch]);

  // ✅ Handle Edit Click
  const handleEditClick = (row: Admin) => {
    console.log("Editing:", row);
  };

  // ✅ Memoized Action Buttons to Prevent Re-renders
  const tableAction = useCallback(
    (row: Admin) => (
      <div className="flex gap-2">
        <div title="عرض">
          <Eye
            className="w-4 cursor-pointer text-[#71717A]"
            onClick={() => console.log("Viewing:", row)}
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
    ),
    []
  );

  // ✅ Memoized Columns for Performance
  const columns = useMemo(
    () => [
      {
        accessorKey: "image",
        header: "الصورة",
        cell: ({ row }: { row: { original: Admin } }) => (
          <Image
            src={row.original.image}
            alt={row.original.name}
            width={40}
            height={40}
            className="rounded-full object-cover"
          />
        ),
      },
      { accessorKey: "name", header: "الاسم" },
      { accessorKey: "username", header: "اسم المستخدم" },
    ],
    []
  );

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">قائمة المسؤولين</h1>
        <button
          className="cursor-pointer flex items-center text-xs md:text-base bg-our-black text-white px-4 py-2 rounded-xl hover:opacity-90 focus:outline-none"
          /* onClick={() => setShowAddModal(true)} */
        >
          <Plus size={16} />
          إضافة مستخدم
        </button>
      </div>

      {/* Loading & Error Handling */}
      {adminsDataLoading ? (
        <p className="text-gray-600 text-center">جارِ تحميل البيانات...</p>
      ) : fetchError ? (
        <p className="text-red-500 text-center">خطأ في تحميل البيانات!</p>
      ) : (
        <Table
          tableAction={tableAction}
          data={adminsData?.member ?? []}
          columns={columns}
        />
      )}

      {/* Confirm Delete Dialog */}
      <ConfirmDelete
        openDialog={isDeleteDialogOpen}
        setOpenDialog={setIsDeleteDialogOpen}
        onConfirm={handleDeleteAdmin} // API Call
        id={selectedRow?.id}
        name={selectedRow?.name}
        loading={isDeleting}
      />
    </div>
  );
}

export default Admins;
