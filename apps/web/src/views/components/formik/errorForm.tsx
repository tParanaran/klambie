import { ErrorMessage } from 'formik';

export default function ErrorForm(prop: { name: string }) {
  return (
    <div className="h-3">
      <ErrorMessage
        name={prop.name}
        component="div"
        className="text-orange-700 text-xs ml-4 mt-0.5"
      />
    </div>
  );
}
