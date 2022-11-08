import * as yup from 'yup';

export const namePlantValidationSchema = yup.object().shape({
  namePlant: yup.string().required('Name Plant is Required'),
});
