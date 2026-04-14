import { useField } from 'formik';
import ErrorForm from './errorForm';

interface RadioOption {
  label: string;
  value: string | boolean;
}

interface RadioFieldFormProps {
  name: string;
  label: string;
  options: RadioOption[];
}

export default function RadioButtonField({
  name,
  label,
  options,
}: RadioFieldFormProps) {
  const [field, meta, helpers] = useField(name);

  return (
    <div className="flex flex-col mt-2">
      <label className="ml-4">{label}</label>

      <div className="flex gap-x-3">
        {options.map((opt) => (
          <label
            key={String(opt.value)}
            className={`flex items-center px-4 h-10 rounded-full cursor-pointer border transition grow ${
              field.value === opt.value
                ? 'bg-orange-800 text-light'
                : 'bg-black/10 dark:bg-white/10 border-transparent'
            }`}
          >
            <input
              {...field}
              type="radio"
              name={name}
              value={String(opt.value)}
              checked={field.value === opt.value}
              onChange={() => helpers.setValue(opt.value)}
              className="hidden"
            />
            {opt.label}
          </label>
        ))}
      </div>

      <ErrorForm name={name} />
    </div>
  );
}
