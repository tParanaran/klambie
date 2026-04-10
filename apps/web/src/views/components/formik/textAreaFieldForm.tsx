import { Field } from 'formik';
import { IFieldForm } from './textFieldForm';
import ErrorForm from './errorForm';

export default function TextAreaFieldForm({
  handleChange,
  values,
  name,
  label,
}: IFieldForm) {
  return (
    <div className="flex flex-col mt-2 grow">
      <label htmlFor={name} className="ml-4">
        {label}
      </label>
      <Field
        as="textarea"
        type="text"
        id={name}
        name={name}
        onChange={handleChange}
        values={values}
        placeholder={`Type product ${label.toLocaleLowerCase()} here`}
        className="appearance-none  bg-black/10 rounded-3xl py-3 px-4 leading-tight focus:outline-none focus:bg-background focus:border focus:border-gray-300 placeholder:text-xs h-28"
      />
      <ErrorForm name={name} />
    </div>
  );
}
