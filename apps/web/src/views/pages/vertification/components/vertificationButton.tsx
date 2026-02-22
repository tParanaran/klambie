'use client';

import axiosInstance from '@/lib/axios';
import VertificationdModal from '@/views/components/vertificationModal';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function VeritificationButton(prop: { token: string }) {
  const redirect = useRouter();
  const [message, setMessage] = useState<string>('');

  const errorMessage = `<p style="margin-bottom: 1.25rem; font-size: 20px;"><b>Your email  verification link expired</b></p>
                        <p style="margin-bottom: 2.5rem;">Looks like the verification link has expired. Do not worry, we can send the link again.</p>`;

  const verifyUser = async () => {
    try {
      const { data } = await axiosInstance.get('/auth/verification', {
        headers: {
          Authorization: `Bearer ${prop.token}`,
        },
      });
      if (data.success) {
        redirect.push('/login');
      }
    } catch (err) {
      return setMessage(errorMessage);
    }
  };

  return (
    <>
      {' '}
      <button
        onClick={verifyUser}
        className="rounded-full py-2 sm:py-3 px-4 bg-orange-800 text-[#ededed] hover:bg-orange-700 font-semibold uppercase"
      >
        Confirm Email
      </button>
      {message && <VertificationdModal html={message} />}
    </>
  );
}
