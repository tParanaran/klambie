'use client';

import { LoginSchema } from '../schema/login-schema';
import { ILogin } from '../types/login.types';
import { ErrorMessage, Field, Form, Formik, FormikProps } from 'formik';
import { useState } from 'react';
import { IoAlertCircle, IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginForm() {
  const redirect = useRouter();
  const [message, setMessage] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const LoginHandler = async (values: ILogin) => {};
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
        const { values, handleChange, handleSubmit } = props;
        return (
          <Form
            onSubmit={handleSubmit}
            className="md:px-5 lg:px-10 pt-5 sm:pt-10 space-y-2"
          >
            <div>
              <label htmlFor="email" className="text-orange-700 ml-4">
                Email
              </label>
              <Field
                id="email"
                type="text"
                name="email"
                onChange={handleChange}
                values={values.email}
                onClick={() => setMessage('')}
                placeholder="Type your email here"
                className={`appearance-none block w-full rounded-full py-3 px-4 leading-tight focus:outline-none focus:bg-background focus:border focus:border-gray-300 placeholder:text-sm ${
                  message !== ''
                    ? 'border border-orange-700 bg-background'
                    : 'bg-black/10'
                }`}
              />
              <div className="h-5">
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-orange-700 text-xs ml-4 mt-0.5"
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="text-orange-700 ml-4">
                Password
              </label>
              <div className="relative inline-block w-full">
                <Field
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  onChange={handleChange}
                  values={values.password}
                  onClick={() => setMessage('')}
                  placeholder="Type your password here"
                  className={`appearance-none w-full rounded-full py-3 px-4 leading-tight focus:outline-none focus:bg-background focus:border focus:border-gray-300 placeholder:text-sm ${
                    message !== ''
                      ? 'border border-orange-700 bg-background'
                      : ' bg-black/10'
                  }`}
                />
                <button
                  type="button"
                  className="absolute right-4 top-3 text-xl"
                  aria-label="Show Hide Password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                </button>
              </div>
              <div className="h-5">
                {' '}
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-orange-700 text-xs ml-4 mt-0.5"
                />
              </div>
            </div>
            <div className="mt-10">
              <button
                disabled={message !== ''}
                type="submit"
                aria-label="Login"
                className="bg-orange-800 w-full rounded-full font-semibold uppercase hover:bg-orange-700 py-3 px-4 text-[#ededed] disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Login
              </button>
              {message !== '' ? (
                <div className="flex items-center  my-1 ml-4 text-orange-700 space-x-1">
                  {' '}
                  <IoAlertCircle /> <p className="text-sm"> {message}</p>
                </div>
              ) : null}

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
