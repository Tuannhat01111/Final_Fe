import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  register } from "../../redux/auth/authThunks";
import {  closeRegister, openLogin } from "../../redux/modal/modalSlice";
import Modal from "./Modal";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { TextField } from "@mui/material";
import { useFormik } from 'formik';
import * as yup from "yup";
import {
  registerByGoogleAccount,
} from "../../redux/auth/authThunks";

const validationSchema = yup.object({
  email: yup.string().email().required("Email is required"),
  password: yup.string().required("Password is required"),
  confirmpassword: yup.string().required("Confirm Password is required")
});

const RegisterModal = () =>{
    const dispatch = useDispatch()
    const handleSuccessRegister = (response) => {  
        dispatch(
          registerByGoogleAccount(
            response.credential,
           )
        );
    };
    const handleErrorRegister = (error) => {
      dispatch(error);
    };
    const {isLoading} = useSelector((state)  => state.auth)
 
    const formik = useFormik({
      initialValues: {
        email: '',
        password: '',
        confirmpassword: '',
  
      },
      validationSchema: validationSchema,
      onSubmit: async (values) => {
        await dispatch(register(values)).unwrap();
          onClose();
      }
    });
    const open = useSelector((state) => state.modal.register)


    const onClose = () =>{
        dispatch(closeRegister())
    }

    const openRegisterHandler = () => {
      dispatch(closeRegister())
      dispatch(openLogin())
    }
  
    const bodyContent = (
        <div className="flex flex-col gap-4">
          <TextField
            className="w-full text-center mx-0 my-2.5 px-0 py-[7px] border rounded-[10px] border-solid border-black"
            name="email"
            label = "Email"
            placeholder="Email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            style={{
              marginBottom: "10px",
              display: "inline-grid",
            }}
            
          />
          
          <TextField
            className="w-full text-center mx-0 my-2.5 px-0 py-[7px] border rounded-[10px] border-[solid] border-[black]"
            name="password"
            label = "Password"
            placeholder="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            style={{
              marginBottom: "10px",
              display: "inline-grid",
            }}
          />
          
          <TextField
            className="w-full text-center mx-0 my-2.5 px-0 py-[7px] border rounded-[10px] border-[solid] border-[black]"
            name="confirmpassword"
            label = "Confirm Password"
            placeholder="Password"
            type="password"
            value={formik.values.confirmpassword}
            onChange={formik.handleChange}
            error={formik.touched.confirmpassword && Boolean(formik.errors.confirmpassword)}
            helperText={formik.touched.confirmpassword && formik.errors.confirmpassword}
            style={{
              marginBottom: "10px",
              display: "inline-grid",
            }}
          />
          
        </div>
      );
    
      const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
          <hr />
          <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={handleSuccessRegister}
                onError={handleErrorRegister  }
              style={{ marginTop: "100px" }}
              cookiePolicy={"single_host_origin"}
              isSignedIn={true}
            />
            </div>
          </GoogleOAuthProvider>
          <div className="text-neutral-500 text-center mt-4 font-light">
            <p>
              Already have an account?
              <span
            className="text-blue-500 cursor-pointer hover:underline ml-2"
            onClick={openRegisterHandler}
              >
                Log In
              </span>
            </p>
          </div>
        </div>
      );
    
      return (
        <Modal
          disabled={isLoading}
          isOpen={open}
          title="Register"
          actionLabel="Sign In"
          onClose={onClose}
          onSubmit={formik.handleSubmit}
          body={bodyContent}
          footer={footerContent}
        />
      );
    };

export default RegisterModal;