import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// The schema itself
export const formSchema = z.object({
  username: z.string().min(5, {
    message: "اسم المستخدم يجب ان يكون 5 أحرف على الأقل",
  }),
  password: z.string().min(1, {
    message: "كلمة المرور فارغة",
  }),
});

// ProfileForm logic
export function ProfileForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // Submit handler
  // function onSubmit(values: z.infer<typeof formSchema>) {
  //   console.log(values)
  // }

  return { form };
}
