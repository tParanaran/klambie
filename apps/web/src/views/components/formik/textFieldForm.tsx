import { Field } from 'formik';
import { ChangeEvent } from 'react';
import ErrorForm from './errorForm';

interface IFieldForm {
  handleChange: {
    (e: ChangeEvent<any>): void;
    <T = string | ChangeEvent<any>>(
      field: T,
    ): T extends React.ChangeEvent<any>
      ? void
      : (e: string | React.ChangeEvent<any>) => void;
  };
  values: string;
  name: string;
  label: string;
}

export default function TextFieldForm({
  handleChange,
  values,
  name,
  label,
}: IFieldForm) {
  return (
    <div className="flex flex-col mt-3 grow">
      <label htmlFor={name} className="ml-4">
        {label}
      </label>
      <Field
        type="text"
        id={name}
        name={name}
        onChange={handleChange}
        values={values}
        placeholder={`Type your ${label.toLowerCase()} here`}
        className="appearance-none bg-black/10 rounded-full py-3 px-4 leading-tight focus:outline-none focus:bg-background focus:border focus:border-gray-300 placeholder:text-sm"
      />
      <ErrorForm name={name} />
    </div>
  );
}
