import {useRouter} from "next/navigation";
import {useMutation} from "@tanstack/react-query";
import {toast} from "sonner";
import {register} from "@/services/auth.service";

export function useRegister() {
  const router = useRouter();

  return useMutation({
    mutationFn: register,

    onSuccess: () => {
      toast.success("Register successfully");
      router.push("/login");
    },
  });
}