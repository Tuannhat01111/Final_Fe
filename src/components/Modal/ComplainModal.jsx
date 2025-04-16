/* eslint-disable react/no-unescaped-entities */
import { TextField } from "@mui/material";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { openRegister,openLogin, closeComplain } from "../../redux/Modal/ModalSlice";
import Modal from "./Modal";
import { complain } from "../../redux/Auth/AuthThunks";

const validationSchema = yup.object({
  email: yup.string().email().required("Email is required"),
  content: yup.string().required("Content is required"),
});

const ComplainModal = () => {
  const dispatch = useDispatch();
  const {isLoading} = useSelector((state)  => state.auth)
  
  const formik = useFormik({
    initialValues: {
      email: "",
      content: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      await dispatch(complain(values)).unwrap();
    },
  });

  const open = useSelector((state) => state.modal.complain);
  const onClose = () => {
    dispatch(closeComplain());
  };

  const openRegisterHandler = () => {
    dispatch(closeComplain());
    dispatch(openRegister());
  };

  const openLoginHandler = () => {
    dispatch(closeComplain());
    dispatch(openLogin())

  };

  const bodyContent = (
    <div className="flex flex-col gap-4 w-full">
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
        className="w-full text-center mx-0 my-2.5 px-0 py-[7px] border rounded-[10px] border-solid border-[black]"
        name="content"
        placeholder="content"
        label="Content"
        type="text"
        value={formik.values.content}
        onChange={formik.handleChange}
        error={formik.touched.content && Boolean(formik.errors.content)}
        helperText={formik.touched.content && formik.errors.content}
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
            onClick={openRegisterHandler}
          >
            Register
          </span>
        </p>
        <p>
        Already have an account?
          <span
            className="text-blue-500 cursor-pointer  hover:underline ml-2"
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
      title="Complain"
      actionLabel="Complain"
      onClose={onClose}
      onSubmit={formik.handleSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default ComplainModal;
