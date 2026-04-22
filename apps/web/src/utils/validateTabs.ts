import { IProductFormValues } from '@/views/pages/dashboard/products/types';
import { FormikProps, setIn } from 'formik';
import { AnySchema } from 'yup';

export const validateTabs = async (
  formik: FormikProps<IProductFormValues>,
  schema: AnySchema,
) => {
  try {
    await schema.validate(formik.values, {
      abortEarly: false,
    });

    return true;
  } catch (err: any) {
    let touched = { ...formik.touched };
    let errors = {};

    err.inner.forEach((e: any) => {
      if (!e.path) return;

      touched = setIn(touched, e.path, true);
      errors = setIn(errors, e.path, e.message);
    });

    formik.setTouched(touched);
    formik.setErrors(errors);

    console.log(errors);

    const firstErrorPath = err.inner?.[0]?.path;

    if (firstErrorPath) {
      const el = document.querySelector(`[name="${firstErrorPath}"]`);
      el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    return false;
  }
};
