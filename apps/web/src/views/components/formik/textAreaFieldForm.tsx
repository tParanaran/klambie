import { useField } from 'formik';
import { IFieldForm } from './textFieldForm';
import ErrorForm from './errorForm';

export default function TextAreaFieldForm({
  name,
  label,
  placeholder = `Type ${label.toLowerCase()} here`,
}: IFieldForm) {
  const [field, meta, helpers] = useField(name);

  return (
    <div className="flex flex-col mt-2 grow">
      <label htmlFor={name} className="ml-4">
        {label}
      </label>
      <textarea
        {...field}
        id={name}
        name={name}
        placeholder={placeholder}
        className="appearance-none  bg-black/10 dark:bg-white/10 rounded-3xl py-3 px-4 leading-tight focus:outline-none focus:bg-background focus:border focus:border-gray-300 placeholder:text-xs h-34"
      />
      <ErrorForm name={name} />
    </div>
  );
}
