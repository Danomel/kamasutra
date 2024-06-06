import { Field, Form, Formik } from "formik";
import { createField } from "../../../utils/object-helpers";
import s from "./ProfileInfo.module.css";

const ProfileDataForm = ({ profile, saveProfile, setEditMode }) => {
  return (
    <Formik
      initialValues={{
        fullName: profile.fullName,
        lookingForAJob: profile.lookingForAJob ? true : false,
        lookingForAJobDescription: profile.lookingForAJobDescription,
        aboutMe: profile.aboutMe,
      }}
      onSubmit={async (
        values,
        { setSubmitting, resetForm, setStatus, status }
      ) => {
        setSubmitting(true);
        await saveProfile(values, setStatus);
        setSubmitting(false);
        setEditMode(false);
      }}
    >
      {({ isSubmitting, status }) => (
        <Form>
          {true && (
            <div>
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "save"}
              </button>
            </div>
          )}
          {status && status.error && (
            <div>
              {status.error.map((item, index) => (
                <p key={index}>{item}</p>
              ))}
            </div>
          )}
          <div>
            <label htmlFor="fullName"></label>
            <b>Full name</b>: {createField("text", "fullName", "Full Name")}
          </div>
          <div>
            <label htmlFor="lookingForAJob">
              <b>Looking for a job</b>:
            </label>

            <Field type="checkbox" name={"lookingForAJob"} />
          </div>
          <div>
            <label htmlFor="lookingForAJobDescription">
              <b>My professional skills</b>:
            </label>

            {createField(
              "textarea",
              "lookingForAJobDescription",
              "My professional skills"
            )}
          </div>
          <div>
            <label htmlFor="aboutMe">
              <b>About me</b>:{" "}
            </label>
            {createField("textarea", "aboutMe", "About me")}
          </div>
          <div>
            <b>Contacts</b>:{" "}
            {Object.keys(profile.contacts).map((key) => {
              return (
                <div key={key} className={s.contact}>
                  <b>
                    {key}: {createField("text", "contacts." + key, key)}
                  </b>
                </div>
              );
            })}
            /{" "}
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ProfileDataForm;
