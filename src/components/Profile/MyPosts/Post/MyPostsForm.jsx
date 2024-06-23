import { Field, Form, Formik } from "formik";

const MyPostsForm = ({ addPost }) => {
  return (
    <Formik
      initialValues={{ newPostText: "" }}
      onSubmit={(values, { resetForm }) => {
        addPost(values.newPostText);
        resetForm();
      }}
    >
      {() => (
        <Form>
          <div>
            <Field
              name="newPostText"
              placeholder="Type post"
              component="textarea"
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

export default MyPostsForm;
