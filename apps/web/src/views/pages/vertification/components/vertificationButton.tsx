'use client';

import { useRouter } from 'next/navigation';

export default function VeritificationButton(prop: { token: string }) {
  const redirect = useRouter();

  const verifyUser = async () => {
    try {
      //   const { data } = await axiosInstance.get('/auth/verify', {
      //     headers: {
      //       Authorization: `Bearer ${prop.token}`,
      //     },
      //   });
      //   Swal.fire({
      //     icon: "success",
      //     title: data.message,
      //     showConfirmButton: false,
      //     timer: 2000,
      //   }).then(() => redirect.push("/login"));
    } catch (error) {
      //   ErrorHandler(error);
    }
  };

  return (
    <button
      onClick={verifyUser}
      className="rounded-full py-2 sm:py-3 px-4 bg-orange-800 text-[#ededed] hover:bg-orange-700 font-semibold uppercase"
    >
      Confirm Email
    </button>
  );
}
