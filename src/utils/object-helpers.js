import { Field } from "formik";

export const updateObjectArray = (items, itemId, objPropName, newObjProps) => {
  return items.map((u) => {
    if (u[objPropName] === itemId) {
      return { ...u, ...newObjProps };
    }
    return u;
  });
};

export const createField = (type, name, placeholder) => (
  <Field type={type} name={name} placeholder={placeholder} />
);
