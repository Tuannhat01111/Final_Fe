import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/auth/authThunks";
import { closeLogin, openForgetPassword, openRegister } from "../../redux/modal/modalSlice";
import Modal from "./Modal";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import * as yup from "yup";
import { useFormik } from 'formik';
import { TextField } from "@mui/material";
import {

  loginByGoogleAccount,
} from "../../redux/auth/authThunks";

const validationSchema = yup.object({
  email: yup.string().email().required("Email is required"),
  password: yup.string().required("Password is required")
});


const LoginModal = () => {
  const dispatch = useDispatch()
  const handleSuccessLogin = (response) => {
    dispatch(
      loginByGoogleAccount(
        response.credential,
      )   
    );    
    dispatch(closeLogin())
  };
  const handleErrorLogin = (error) => {
    dispatch(error);
  };
  const { isLoading } = useSelector((state) => state.auth)
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',

    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      await dispatch(login(values)).unwrap();
      onClose();
    }
  });

  const open = useSelector((state) => state.modal.login)
  const onClose = () => {
    dispatch(closeLogin())
  }

  const openRegisterHandler = () => {
    dispatch(closeLogin())
    dispatch(openRegister())
  }

  const openForgetHandler = () => {
    dispatch(closeLogin())
    dispatch(openForgetPassword())
  }

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <TextField
        className="w-full text-center mx-0 my-2.5 px-0 py-[7px] border rounded-[10px] border-solid border-black"
        name="email"
        label="Email"
        placeholder="email"
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
        placeholder="password"
        label="Password"
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
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleSuccessLogin}
            onError={handleErrorLogin}
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
             Register
          </span>
        </p>
        <p>
          Don't have password? 
          <span
            className="text-blue-500 cursor-pointer  hover:underline ml-2"
            onClick={openForgetHandler}
          >
             Forget Password
          </span>
        </p>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={open}
      title="Login"
      actionLabel="Log In"
      onClose={onClose}
      onSubmit={formik.handleSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;