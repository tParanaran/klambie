import { GeneralTabSchema } from '@/views/pages/dashboard/products/schema';
import { FormikProps, setIn } from 'formik';

export const validateGeneralTab = async (formik: FormikProps<any>) => {
  try {
    await GeneralTabSchema.validate(formik.values, {
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

    const firstErrorPath = err.inner?.[0]?.path;

    if (firstErrorPath) {
      const el = document.querySelector(`[name="${firstErrorPath}"]`);
      el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    return false;
  }
};
