"use client";

import { use } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";

export default function LoginPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  const router = useRouter();
  const login = useAuthStore((s) => s.login);

  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    login({ name: "Mock User", email: data.email });
    router.push(`/${locale}`);
  };

  return (
    <section className="max-w-md mx-auto py-16">
      <h1 className="mb-6 text-3xl font-bold">
        {locale === "ar" ? "تسجيل الدخول" : "Login"}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register("email")}
          placeholder="Email"
          className="w-full border px-4 py-2 rounded"
        />
        {errors.email && (
          <p className="text-sm text-red-500">Invalid email</p>
        )}

        <input
          type="password"
          {...register("password")}
          placeholder="Password"
          className="w-full border px-4 py-2 rounded"
        />
        {errors.password && (
          <p className="text-sm text-red-500">
            Password must be at least 6 chars
          </p>
        )}

        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded"
        >
          {locale === "ar" ? "دخول" : "Login"}
        </button>
      </form>
    </section>
  );
}
