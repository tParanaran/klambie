'use client';

import { RegisterSchema } from '../schema/register.schema';
import { IRefferal, IRegister } from '../types/register.types';
import { Form, Formik, FormikProps } from 'formik';
import { useState } from 'react';
import { isAxiosError } from 'axios';
import Link from 'next/link';
import TextFieldForm from '@/views/components/formik/textFieldForm';
import PasswordFieldForm from '@/views/components/formik/passwordFieldForm';
import ButtonForm from '@/views/components/formik/buttonForm';
import axiosInstance from '@/lib/axios';
import DOMPurify from 'dompurify';
import VertificationdModal from '@/views/components/vertificationModal';

export default function RegisterForm(prop: IRefferal) {
  const [message, setMessage] = useState<string>('');
  const [html, setHtml] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const RegisterHandler = async (values: IRegister) => {
    try {
      const { data } = await axiosInstance.post('/auth/register', values);
      if (data) {
        setHtml(DOMPurify.sanitize(data.message));
        setIsSuccess(data.success);
      }
    } catch (err: any) {
      if (isAxiosError(err)) {
        return setMessage(err.response?.data.message as string);
      }
      setMessage(err.message);
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          name: '',
          email: '',
          password: '',
          refferal: prop.refferal,
        }}
        validationSchema={RegisterSchema}
        onSubmit={(values) => {
          RegisterHandler(values);
        }}
      >
        {(props: FormikProps<IRegister>) => {
          const { values, handleChange, handleSubmit } = props;
          return (
            <Form
              onSubmit={handleSubmit}
              className="md:px-5 lg:px-10 pt-5 sm:pt-10 space-y-2"
            >
              <TextFieldForm
                handleChange={handleChange}
                values={values.name}
                name={'name'}
                label={'Name'}
              />

              <TextFieldForm
                handleChange={handleChange}
                values={values.email}
                name={'email'}
                label={'Email'}
              />

              <PasswordFieldForm
                handleChange={handleChange}
                values={values.password}
                name={'password'}
                label={'Password'}
              />

              <div className="mt-10">
                <ButtonForm message={message} href={'Register'} />
                <div className="text-center mt-2 text-sm">
                  <span>Do have an account?</span>{' '}
                  <Link href={'/login'} className="text-orange-700">
                    Sign in
                  </Link>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
      {isSuccess && <VertificationdModal html={html} />}
    </>
  );
}
