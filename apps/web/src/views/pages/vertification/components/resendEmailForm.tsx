'use client';

import { isAxiosError } from 'axios';
import { Form, Formik, FormikProps } from 'formik';
import { useState } from 'react';
import { ResendSchema } from './schemas/resend.schema';
import TextFieldForm from '@/views/components/formik/textFieldForm';
import ButtonForm from '@/views/components/formik/buttonForm';
import axiosInstance from '@/app/lib/axios';
import DOMPurify from 'dompurify';
import VertificationdModal from '@/views/components/vertificationModal';

interface IResend {
  email: string;
}

export default function ResendEmailForm() {
  const [message, setMessage] = useState<string>('');
  const [html, setHtml] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const ResendHandler = async (values: IResend) => {
    try {
      const { data } = await axiosInstance.post('/auth/resend', values);
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
          email: '',
        }}
        validationSchema={ResendSchema}
        onSubmit={(values) => {
          ResendHandler(values);
        }}
      >
        {(props: FormikProps<IResend>) => {
          const { values, handleChange, handleSubmit } = props;
          return (
            <Form
              onSubmit={handleSubmit}
              className="md:px-5 lg:px-10 space-y-3 text-left"
            >
              <TextFieldForm
                handleChange={handleChange}
                values={values.email}
                name={'email'}
                label={''}
              />

              <ButtonForm message={message} href={'Resend Email'} />
            </Form>
          );
        }}
      </Formik>
      {isSuccess && <VertificationdModal html={html} />}
    </>
  );
}
