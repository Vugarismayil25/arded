import React from 'react'
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import VerificationInput from "react-verification-input";
import './style.css';
import { useVerifyMutation } from '../../Redux/services/UserCreateApi';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router';




function Verify() {

    const [verify] = useVerifyMutation()
let navigate = useNavigate()


    const CodeSchema = Yup.object().shape({
        confirmPassword: Yup.string()
            .length(6, 'Kod 6 rəqəmli olmalıdır')
            .required('Kod tələb olunur'),
    });
    return (


        <div className="verification-wrapper">
            <ToastContainer />
            <div className="verification-box">
                <h2 className="title">Email Verification</h2>

                <Formik
                    initialValues={{ confirmPassword: '' }}
                    validationSchema={CodeSchema}
                    onSubmit={async (values) => {
                        try {
                            console.log(values);
                            let response = await verify(values).unwrap()
                            localStorage.setItem("token", response?.token)
                            toast.success("User added successfully!", {
                                position: "top-right",
                                autoClose: 2000
                            });
                            setTimeout(() => {
                                navigate("/admin")
                            }, 2500);
                        } catch (error) {
                            console.log(error);
                            toast.error(error?.data?.message || "Registration failed", {
                                position: "top-right"
                            });
                        }

                    }}
                >
                    {({ setFieldValue, errors, touched }) => (
                        <Form>
                            <VerificationInput
                                onChange={(value) => setFieldValue("confirmPassword", value)}
                            />
                            {errors.confirmPassword && touched.confirmPassword && (
                                <div className="error-text">{errors.confirmPassword}</div>
                            )}

                            <button type="submit" className="confirm-btn">
                                Confirm
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>

    )
}

export default Verify