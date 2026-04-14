'use client';

import { isAxiosError } from 'axios';
import { LoginSchema } from '../schema/login.schema';
import { ILogin } from '../types/login.types';
import { Form, Formik, FormikProps } from 'formik';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthHandler } from '@/utils/authHandler';
import { useAuthStore } from '@/store/authStore';
import Link from 'next/link';
import TextFieldForm from '@/views/components/formik/textFieldForm';
import PasswordFieldForm from '@/views/components/formik/passwordFieldForm';
import ButtonForm from '@/views/components/formik/buttonForm';
import axiosInstanceClient from '@/lib/axios/client';
import { useToastStore } from '@/store/toastStore';

export default function LoginForm() {
  const { onAuthSuccess } = useAuthStore();
  const showToast = useToastStore((s) => s.showToast);
  const redirect = useRouter();
  const [message, setMessage] = useState<string>('');

  const LoginHandler = async (values: ILogin) => {
    try {
      const { data } = await axiosInstanceClient.post('/auth/login', values);

      if (data.success) {
        await AuthHandler(redirect, onAuthSuccess);
        showToast({ type: 'success', message: data.message });
      }
    } catch (err: any) {
      if (isAxiosError(err)) {
        return setMessage(err.response?.data.message as string);
      }
      setMessage(err.message);
    }
  };
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={LoginSchema}
      onSubmit={(values) => {
        LoginHandler(values);
      }}
    >
      {(props: FormikProps<ILogin>) => {
        const { handleSubmit } = props;
        return (
          <Form
            onSubmit={handleSubmit}
            className="md:px-5 lg:px-10 pt-5 sm:pt-10 space-y-2"
          >
            <TextFieldForm name="email" label="Email" />
            <PasswordFieldForm />
            <div className="mt-10">
              <ButtonForm message={message} href={'Login'} />
              <div className="text-center mt-2 text-sm">
                <span>Don't have an account?</span>{' '}
                <Link href={'/register'} className="text-orange-700">
                  Sign up
                </Link>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
