import { ErrorMessage } from 'formik';

export default function ErrorForm({ name }: { name: string }) {
  return (
    <div className="h-3">
      <ErrorMessage
        name={name}
        component="div"
        className="text-orange-700 text-xs ml-4 mt-0.5"
      />
    </div>
  );
}
