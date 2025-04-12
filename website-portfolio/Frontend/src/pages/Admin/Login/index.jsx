import React from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './style.css'
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../../Redux/services/UserCreateApi';
import { ToastContainer, toast } from 'react-toastify';

;

function Login() {

  const [login] = useLoginMutation()

  const navigate = useNavigate()


  const formik = useFormik({
    initialValues: {
      email: '',

    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
    }),
    onSubmit: async (values) => {
      try {
        await login(values).unwrap()
        toast.success("User added successfully!", {
          position: "top-right",
          autoClose: 2000
        });
        formik.resetForm();
        setTimeout(() => {
          navigate("/verify");
        }, 2500);
      } catch (error) {
        console.log(error);
        toast.error(error?.data?.message || "Registration failed", {
          position: "top-right"
        });
      }
    },
  });
  return (
    <div className='login'>
      <ToastContainer />
      <div className="login-wrapper">
        <h2>Admin Login</h2>
        <form onSubmit={formik.handleSubmit}>

          <input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            placeholder="Email"
          />
          {formik.touched.email && formik.errors.email ? (
            <div>{formik.errors.email}</div>
          ) : null}


          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login