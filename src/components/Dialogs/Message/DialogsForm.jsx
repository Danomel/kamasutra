import { Field, Form, Formik } from "formik";

const DialogsForm = (props) => {
  debugger;
  return (
    <Formik
      initialValues={{ message: "" }}
      onSubmit={(values, { resetForm }) => {
        props.onSendMessageClick(values.message);
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
