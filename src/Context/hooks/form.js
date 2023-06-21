import { useState } from 'react';

export const useForm = (callback, initialValues) => {
  const [values, setValues] = useState(initialValues);

  const handleChange = (e) => {
    let name, value;

    // This handles regular events
    if (e.target) {
      name = e.target.name;
      value = e.target.value;
    }
    // This handles custom values from the DatePicker and Slider components
    else if (e.name && e.value !== undefined) {
      name = e.name;
      value = e.value;
    }

    if (name && value !== undefined) {
      setValues((values) => ({ ...values, [name]: value }));
    }
  };

  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    console.log('Form values at handleSubmit:', values);
    callback(values);
  };

  return { handleChange, handleSubmit, values };
};
