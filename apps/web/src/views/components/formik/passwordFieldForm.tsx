import { useField } from 'formik';
import { useState } from 'react';
import ErrorForm from './errorForm';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';

interface IFieldForm {
  name?: string;
  placeholder?: string;
}

export default function PasswordFieldForm({
  name = 'password',
  placeholder = `Type password here`,
}: IFieldForm) {
  const [field, meta, helpers] = useField(name);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div className="flex flex-col mt-2 grow">
      <label htmlFor={name} className="ml-4">
        Password
      </label>
      <div className="relative inline-block w-full">
        <input
          {...field}
          id={name}
          type={showPassword ? 'text' : 'password'}
          name={name}
          placeholder={placeholder}
          className="appearance-none w-full bg-black/10 dark:bg-white/10 rounded-full h-10 px-4 leading-tight focus:outline-none focus:bg-background focus:border focus:border-gray-300 placeholder:text-xs"
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
      <ErrorForm name={name} />
    </div>
  );
}
