import { Field } from 'formik';
import ErrorForm from './errorForm';
import { IHandleChange } from './textFieldForm';

interface IFieldForm {
  handleChange: IHandleChange;
  values: number | String;
  name: string;
  label?: string;
  sortLabel?: string;
}

export default function NumberFieldForm({
  handleChange,
  values,
  name,
  label,
  sortLabel,
}: IFieldForm) {
  return (
    <div className="flex flex-col mt-2 grow">
      {label && (
        <label htmlFor={name} className="ml-4">
          {label}
        </label>
      )}
      <Field
        type="text"
        id={name}
        name={name}
        onChange={handleChange}
        values={values}
        placeholder={`${label ? `Type your ${label.toLowerCase()} here` : sortLabel}`}
        className="appearance-none bg-black/10 dark:bg-white/10 rounded-full py-3 px-4 leading-tight focus:outline-none focus:bg-background focus:border focus:border-gray-300 placeholder:text-xs"
      />
      <ErrorForm name={name} />
    </div>
  );
}
