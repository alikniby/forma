import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './style.css';

const LandingPage = () => {
    const [showModal, setShowModal] = useState(true);


  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      goals: '',
      learningStyle: '',
      diagnosis: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('Required'),
      lastName: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      goals: Yup.string().required('Required'),
      learningStyle: Yup.string().required('Required'),
      diagnosis: Yup.string(),
    }),
    onSubmit: (values) => {
        console.log(JSON.stringify(values, null, 2));
        setShowModal(false);
        // Save user profile to localStorage
        localStorage.setItem('userProfile', JSON.stringify(values));
      },
  });

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div>
        <h1>Welcome to Forma</h1>
        <p>
          AI Learning.<br></br> Personalized, adaptive.<br></br><br></br> Reach your full potential now!<br></br> <br></br>Start with building a profile to let Forma get a feel of how you learn and feel. Or you can go direct to MathQuiz.<br></br> If you feel stuck, no worries! The Focus Flamingo <img src="https://creazilla-store.fra1.digitaloceanspaces.com/emojis/58421/flamingo-emoji-clipart-xl.png" alt="flamingo emoji" width="32" height="32"/> is one chat away. You can ask him anything.
        </p>
        <button onClick={openModal}>Create your profile</button>
      </div>

      {showModal && (
        <div className={showModal ? "modal show-modal" : "modal"} onClick={closeModal}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <span className="close" onClick={closeModal}>
            &times;
          </span>
            <h2>Create your profile</h2>
            <form onSubmit={formik.handleSubmit}>
              {/* First Name */}
<label htmlFor="firstName">First Name</label>
<input
  id="firstName"
  name="firstName"
  type="text"
  onChange={formik.handleChange}
  onBlur={formik.handleBlur}
  value={formik.values.firstName}
/>
{formik.touched.firstName && formik.errors.firstName ? (
  <div>{formik.errors.firstName}</div>
) : null}

{/* Last Name */}
<label htmlFor="lastName">Last Name</label>
<input
  id="lastName"
  name="lastName"
  type="text"
  onChange={formik.handleChange}
  onBlur={formik.handleBlur}
  value={formik.values.lastName}
/>
{formik.touched.lastName && formik.errors.lastName ? (
  <div>{formik.errors.lastName}</div>
) : null}

{/* Email */}
<label htmlFor="email">Email Address</label>
<input
  id="email"
  name="email"
  type="email"
  onChange={formik.handleChange}
  onBlur={formik.handleBlur}
  value={formik.values.email}
/>
{formik.touched.email && formik.errors.email ? (
  <div>{formik.errors.email}</div>
) : null}

{/* Goals */}
<label htmlFor="goals">Goals</label>
<textarea
  id="goals"
  name="goals"
  onChange={formik.handleChange}
  onBlur={formik.handleBlur}
  value={formik.values.goals}
/>
{formik.touched.goals && formik.errors.goals ? (
  <div>{formik.errors.goals}</div>
) : null}

{/* Learning Style */}
<label htmlFor="learningStyle">Preferred Learning Style</label>
<select
  id="learningStyle"
  name="learningStyle"
  onChange={formik.handleChange}
  onBlur={formik.handleBlur}
  value={formik.values.learningStyle}
>
  <option value="">Select a learning style</option>
  <option value="visual">Visual</option>
  <option value="auditory">Auditory</option>
  <option value="kinesthetic">Kinesthetic</option>
  <option value="reading-writing">Reading/Writing</option>
</select>
{formik.touched.learningStyle && formik.errors.learningStyle ? (
  <div>{formik.errors.learningStyle}</div>
) : null}

{/* Diagnosis */}
<label htmlFor="diagnosis">Other information (optional)</label>
<input
  id="diagnosis"
  name="diagnosis"
  type="text"
  onChange={formik.handleChange}
  onBlur={formik.handleBlur}
  value={formik.values.diagnosis}
/>
{formik.touched.diagnosis && formik.errors.diagnosis ? (
  <div>{formik.errors.diagnosis}</div>
) : null}

              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default LandingPage;
