"use client";
import Logo from "@/app/assets/Unit660-removebg-preview.png";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form"; // Import useForm
import { useState } from "react";
import Loader from "@/components/shared/Loader";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

function SignInPage() {
  const { login } = useAuth(); // Get login function from AuthContext
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Initialize react-hook-form
  const form = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const handleSubmit = async (data: { username: string; password: string }) => {
    setLoading(true);
    setError("");

    const result = await login(data.username, data.password);

    if (result.success) {
      router.replace("/"); // Forces navigation
    } else {
      setError(result.message || "فشل تسجيل الدخول، يرجى التحقق من بياناتك.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="mx-2">
        <div className="flex items-center justify-center">
          <Image src={Logo} alt="Logo" className="w-[20rem]" />
        </div>
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-4 flex flex-col items-center justify-center text-[#3d3d3d]"
            >
              {/* Username field */}
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="md:w-80 w-full font-semibold">
                    <FormLabel className="font-semibold">
                      اسم المستخدم
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="ادخل اسم المستخدم"
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password field */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="md:w-80 w-full font-semibold">
                    <FormLabel className="font-semibold">كلمة المرور</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="ادخل كلمة المرور"
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Error Message */}
              {error && <p className="text-red-500">{error}</p>}

              <Button
                disabled={loading}
                type="submit"
                className="md:w-80 w-full bg-our-yellow hover:bg-our-darkyellow h-10 rounded-xl text-our-black font-semibold"
              >
                {loading ? (
                  <Loader className="w-6 h-6 text-white" />
                ) : (
                  "تسجيل الدخول"
                )}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;
