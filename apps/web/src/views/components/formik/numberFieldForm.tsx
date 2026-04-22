import { useField } from 'formik';
import ErrorForm from './errorForm';

interface IFieldForm {
  name: string;
  label?: string;
  placeholder?: string;
}

export default function NumberFieldForm({
  name,
  label,
  placeholder = `Type ${label?.toLowerCase() || name} here`,
}: IFieldForm) {
  const [field, meta, helpers] = useField(name);
  return (
    <div className="flex flex-col mt-2 grow">
      {label && (
        <label htmlFor={name} className="ml-4 line-clamp-1">
          {label}
        </label>
      )}
      <input
        {...field}
        value={field.value ?? ''}
        type="text"
        id={name}
        name={name}
        placeholder={placeholder}
        className="appearance-none bg-black/10 dark:bg-white/10 rounded-full h-10 px-4 leading-tight focus:outline-none focus:bg-background focus:border focus:border-gray-300 placeholder:text-xs"
      />
      <ErrorForm name={name} />
    </div>
  );
}
