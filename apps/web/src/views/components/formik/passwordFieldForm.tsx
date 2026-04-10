import { Field } from 'formik';
import { useState } from 'react';
import ErrorForm from './errorForm';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
import { IHandleChange } from './textFieldForm';

interface IFieldForm {
  handleChange: IHandleChange;
  values: string;
}

export default function PasswordFieldForm({
  handleChange,
  values,
}: IFieldForm) {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div className="flex flex-col mt-2 grow">
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
          className="appearance-none w-full bg-black/10 dark:bg-white/10 rounded-full py-3 px-4 leading-tight focus:outline-none focus:bg-background focus:border focus:border-gray-300 placeholder:text-xs"
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
