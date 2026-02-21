import { Field } from 'formik';
import { ChangeEvent, useState } from 'react';
import ErrorForm from './errorForm';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';

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

export default function PasswordFieldForm(prop: IFieldForm) {
  const { handleChange, values, name, label } = prop;
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div className="flex flex-col mt-3 grow">
      <label htmlFor="password" className="ml-4">
        Password
      </label>
      <div className="relative inline-block w-full">
        <Field
          id="password"
          type={showPassword ? 'text' : 'password'}
          name="password"
          onChange={handleChange}
          values={values}
          placeholder="Type your password here"
          className="appearance-none w-full bg-black/10 rounded-full py-3 px-4 leading-tight focus:outline-none focus:bg-background focus:border focus:border-gray-300 placeholder:text-sm"
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
      <ErrorForm name={'password'} />
    </div>
  );
}
