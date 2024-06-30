import { Field } from "formik";
import React from "react";

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
