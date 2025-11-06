"use client";
import { Button } from "@/components";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { apiLogin } from "@/store/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { setTokenWithExpiration } from "@/lib/token-utils";

const LoginPage = () => {
  const { register, handleSubmit } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const router = useRouter();

  const { mutate: login } = useMutation({
    mutationFn: async (data: { username: string; password: string }) => {
      const response = await apiLogin<{ message: string; userId: string }>(
        data
      );
      return response;
    },
    onSuccess: (data) => {
      setIsLoading(false);
      if (data?.message) {
        toast.success(data.message);
        router.push("/admin/dashboard");

        setTokenWithExpiration(data.userId, 1);
      }
    },
    onError: (error) => {
      setIsLoading(false);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    setIsLoading(true);
    login(data);
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <section className="w-full h-full">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6  space-y-4 md:space-y-6 sm:p-8">
              <Link
                href="/"
                className="flex w-full items-center text-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
              >
                <Image
                  src={"/navbar/logo.png"}
                  alt="logo"
                  width={240}
                  height={50}
                />
              </Link>
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your Admin account
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="flex flex-col gap-2">
                  <Input
                    className="border"
                    type="text"
                    placeholder="Username"
                    {...register("username")}
                  />
                  <Input
                    className="border"
                    type={hidePassword ? "password" : "text"}
                    placeholder="Password"
                    {...register("password")}
                  />
                  <Button
                    type="button"
                    onClick={() => setHidePassword(!hidePassword)}
                    variant="ghost"
                  >
                    {hidePassword ? "Show" : "Hide"}
                  </Button>
                </div>
                <Button loading={isLoading} className="w-full" type="submit">
                  Login
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoginPage;
