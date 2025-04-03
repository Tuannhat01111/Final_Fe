import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../redux/auth/authThunks";
import { closeFotgetPassword, openLogin } from "../../redux/modal/modalSlice";
import Modal from "./Modal";
import { TextField } from "@mui/material";
import { useFormik } from 'formik';
import * as yup from "yup";

const validationSchema = yup.object({
  email: yup.string().email().required("Email is required")
});

const ForgetPassword = () => {
  const dispatch = useDispatch()
  const { isLoading } = useSelector((state) => state.auth)
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',

    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      await dispatch(resetPassword(values)).unwrap();
      openLoginHandler();
    }
  });

  const open = useSelector((state) => state.modal.forgetPassword)
  const onClose = () => {
    dispatch(closeFotgetPassword())
  }

  const openLoginHandler = () => {
    dispatch(closeFotgetPassword())
    dispatch(openLogin())
  }

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <TextField
        className="w-full text-center mx-0 my-2.5 px-0 py-[7px] border rounded-[10px] border-solid border-black"
        name="email"
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

    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <div className="text-neutral-500 text-center mt-4 font-light">
        <p>
          Already have an account?
          <span
            className="text-blue-500 cursor-pointer hover:underline ml-2"
            onClick={openLoginHandler}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={open}
      title="Forget Password"
      actionLabel="Reset Password"
      onClose={onClose}
      onSubmit={formik.handleSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default ForgetPassword;