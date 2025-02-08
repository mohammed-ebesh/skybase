import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ConfirmDeleteProps {
  openDialog: boolean;
  setOpenDialog: (open: boolean) => void;
  onConfirm: (id?: string | number) => void;
  id?: string | number;
  name?: string; // Name of the item being deleted
  loading?: boolean;
}

function ConfirmDelete({
  openDialog,
  setOpenDialog,
  onConfirm,
  id,
  name,
  loading = false,
}: ConfirmDeleteProps) {
  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogContent dir="rtl">
        <DialogHeader className="flex items-center md:items-start">
          <DialogTitle>تأكيد الحذف</DialogTitle>
          <DialogDescription>
            {name
              ? `هل أنت متأكد من حذف ${name}؟`
              : "هل أنت متأكد أنك تريد الحذف؟"}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex gap-5">
          <DialogClose
            className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400"
            onClick={() => setOpenDialog(false)}
          >
            إلغاء
          </DialogClose>
          <button
            onClick={() => onConfirm(id)}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 disabled:opacity-50"
            disabled={loading} // Disable button while loading
          >
            {loading ? "جارٍ الحذف..." : "حذف"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ConfirmDelete;
