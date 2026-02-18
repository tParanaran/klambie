'use client';

import { RegisterSchema } from '../schema/register.schema';
import { IRegister } from '../types/register.types';
import { Form, Formik, FormikProps } from 'formik';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import TextFieldForm from '@/views/components/formik/textFieldForm';

import PasswordFieldForm from '@/views/components/formik/passwordFieldForm';
import ButtonForm from '@/views/components/formik/buttonForm';

export default function RegisterForm() {
  const redirect = useRouter();
  const [message, setMessage] = useState<string>('');

  const LoginHandler = async (values: IRegister) => {};
  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        password: '',
      }}
      validationSchema={RegisterSchema}
      onSubmit={(values) => {
        LoginHandler(values);
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
  );
}
