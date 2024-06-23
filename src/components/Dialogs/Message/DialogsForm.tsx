import { Field, Form, Formik } from "formik";
import React from "react";

type PropsType = { onSendMessageClick: (newMessageText: string) => void };

const DialogsForm: React.FC<PropsType> = ({ onSendMessageClick }) => {
  return (
    <Formik
      initialValues={{ message: "" }}
      onSubmit={(values, { resetForm }) => {
        onSendMessageClick(values.message);
        resetForm();
      }}
    >
      {() => (
        <Form>
          <div>
            <Field
              component="textarea"
              name="message"
              placeholder="Enter your message"
            />
          </div>
          <div>
            <button type="submit">Send</button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default DialogsForm;
