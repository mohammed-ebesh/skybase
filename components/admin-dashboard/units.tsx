import { Plus, Trash2, Eye, Pencil } from "lucide-react";
import Table from "../shared/Table";
import { useFetch } from "@/lib/useFetch";
import { useState, useCallback, useMemo } from "react";
import Cookies from "js-cookie";
import ConfirmDelete from "../shared/ConfirmDelete";

// ✅ TypeScript Interfaces
interface Leader {
  id: number;
  name: string;
}

interface Unit {
  id: number;
  name: string;
  leader?: Leader;
}

function Units() {
  const {
    data: unitsData,
    isLoading: unitsDataLoading,
    error: fetchError,
    refetch,
  } = useFetch("/api/v1/units");

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<Unit | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // ✅ Handle Unit Deletion
  const handleDeleteUnit = useCallback(async () => {
    if (!selectedRow) return;
    setIsDeleting(true);

    try {
      const token = Cookies.get("auth_token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/units/${selectedRow.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );

      if (!response.ok) {
        throw new Error("فشل في حذف الوحدة.");
      }

      // ✅ Refetch only after successful delete
      await refetch();
      setIsDeleteDialogOpen(false);
    } catch (error) {
      console.error("خطأ أثناء حذف الوحدة:", error);
    } finally {
      setIsDeleting(false);
    }
  }, [selectedRow, refetch]);

  // ✅ Handle Edit Click
  const handleEditClick = useCallback((row: Unit) => {
    console.log("Editing:", row);
  }, []);

  // ✅ Memoized Action Buttons to Prevent Re-renders
  const tableAction = useCallback(
    (row: Unit) => (
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
    [handleEditClick]
  );

  // ✅ Memoized Columns for Performance
  const columns = useMemo(
    () => [
      { accessorKey: "name", header: "اسم الوحدة" },
      {
        accessorKey: "leader.name",
        header: "القائد",
        cell: ({ row }: { row: { original: Unit } }) => (
          <span className="text-gray-700 font-medium">
            {row.original.leader?.name ?? "غير محدد"}
          </span>
        ),
      },
    ],
    []
  );

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">قائمة الوحدات</h1>
        <button
          className="cursor-pointer flex items-center text-xs md:text-base bg-our-black text-white px-4 py-2 rounded-xl hover:opacity-90 focus:outline-none"
          /* onClick={() => setShowAddModal(true)} */
        >
          <Plus size={16} />
          إضافة وحدة
        </button>
      </div>

      {/* Loading & Error Handling */}
      {unitsDataLoading ? (
        <p className="text-gray-600 text-center">جارِ تحميل البيانات...</p>
      ) : fetchError ? (
        <p className="text-red-500 text-center">خطأ في تحميل البيانات!</p>
      ) : (
        <Table
          tableAction={tableAction}
          data={unitsData?.member ?? []}
          columns={columns}
        />
      )}

      {/* Confirm Delete Dialog */}
      <ConfirmDelete
        openDialog={isDeleteDialogOpen}
        setOpenDialog={setIsDeleteDialogOpen}
        onConfirm={handleDeleteUnit} // API Call
        id={selectedRow?.id}
        name={selectedRow?.name}
        loading={isDeleting}
      />
    </div>
  );
}

export default Units;
