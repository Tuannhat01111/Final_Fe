import { useState } from "react"
import { useDispatch } from "react-redux";
import { changePassword } from "../../redux/Auth/AuthThunks";
import { Switch } from 'antd';
import BreadcrumbSetting from "./Breadcrumb";
import { disableOwnerStore } from "../../redux/UserRole/UserRoleThunks";
import { TextField, Button } from '@mui/material';
import * as yup from "yup";
import { useFormik } from "formik";

const validationSchema = yup.object({
    password: yup.string().required("Current Password is required"),
    newPassword: yup.string().required("New Password is required"),
    confirmPassword: yup.string().required("Confirm Password is required"),
});


const Security = () => {
    const dispatch = useDispatch()
    const [isChangePassword, setIsChangePassword] = useState(false);

    const formik = useFormik({
        initialValues: {
            password: "",
            newPassword: "",
            confirmPassword: "",
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            dispatch(changePassword(values))
        },
    });

    const handleSubmit = () => {
        dispatch(disableOwnerStore())
    };

    return (
        <>
            <div className="sm:container px-6 lg:mx-auto">
                <div className="flex flex-col w-full md:px-12 lg:px-24 py-14 gap-4">

                    <BreadcrumbSetting />

                    <div className="my-2">
                        <div className="flex flex-row justify-between">
                            <p className=" text-2xl mb-5 font-semibold">Change Password</p>
                            <button className=" font-medium text-[#008489]" onClick={() => { setIsChangePassword(!isChangePassword) }}>Update</button>
                        </div>
                        {isChangePassword ? (
                            <>
                                <div className="flex flex-col">
                                    <div className="flex flex-col w-full gap-2 my-2">
                                        <TextField
                                            className="w-full text-center mx-0 my-2.5 px-0 py-[7px] border rounded-[10px] border-solid border-[black]"
                                            name="password"
                                            label="Current Password"
                                            placeholder="Current Password"
                                            type="password"
                                            value={formik.values.password}
                                            onChange={formik.handleChange}
                                            error={formik.touched.password && Boolean(formik.errors.password)}
                                            helperText={formik.touched.password && formik.errors.password}
                                            slots={{
                                                autoComplete: "off"
                                            }}
                                            style={{
                                                marginBottom: "10px",
                                                display: "inline-grid",
                                            }}
                                        />
                                    </div>
                                    <div className="flex flex-col w-full gap-2 my-2">
                                        <TextField
                                            className="w-full text-center mx-0 my-2.5 px-0 py-[7px] border rounded-[10px] border-solid border-[black]"
                                            name="newPassword"
                                            label="New Password"
                                            placeholder="New Password"
                                            type="password"
                                            value={formik.values.newPassword}
                                            onChange={formik.handleChange}
                                            error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
                                            helperText={formik.touched.newPassword && formik.errors.newPassword}
                                            slots={{
                                                autoComplete: "off"
                                            }}
                                            style={{
                                                marginBottom: "10px",
                                                display: "inline-grid",
                                            }}
                                        />
                                    </div>
                                    <div className="flex flex-col w-full gap-2 my-2">
                                        <TextField
                                            className="w-full text-center mx-0 my-2.5 px-0 py-[7px] border rounded-[10px] border-solid border-[black]"
                                            name="confirmPassword"
                                            label="Confirm New Password"
                                            placeholder="Confirm New Password"
                                            type="password"
                                            value={formik.values.confirmPassword}
                                            onChange={formik.handleChange}
                                            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                                            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                                            slots={{
                                                autoComplete: "off"
                                            }}
                                            style={{
                                                marginBottom: "10px",
                                                display: "inline-grid",
                                            }}
                                        />
                                    </div>

                                    <div className="w-full flex justify-center">
                                        <button
                                            className="max-w-[15%] bg-blue-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-full w-full"
                                            onClick={formik.handleSubmit}
                                            type="submit"
                                        >
                                            Save Change
                                        </button>
                                    </div>

                                </div>
                            </>
                        )
                            : (
                                <>

                                </>

                            )}
                    </div>

                    <div className="border border-gray-200 w-full"></div>

                    <div className="my-2">
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-row ">
                                <p className=" text-2xl font-semibold">Account Security</p>
                            </div>  <div className="my-4 flex flex-row justify-between">
                                <p className=" text-gray-700">Enable two-step authentication </p>
                                <Switch size="large" value={false} />
                            </div>
                            <div className="my-4 flex flex-row justify-between">
                                <p className=" text-gray-700">Enable 2-Factor Authentication (2FA) </p>
                                <Switch size="large" value={false} />
                            </div>

                        </div>
                    </div>
                    <div className="border border-gray-200 w-full"></div>
                    <div className="my-2">
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-row ">
                                <p className=" text-2xl font-semibold">Appearance</p>
                            </div>
                            <div className="my-4 flex flex-row justify-between">
                                <p className=" text-gray-700">Dark mode</p>
                                <Switch size="large" defaultChecked />
                            </div>
                        </div>
                    </div>
                    <div className="border border-gray-200 w-full"></div>
                    <div className="my-2">
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-row ">
                                <p className=" text-2xl font-semibold">Account Setting</p>
                            </div>
                            <div className="my-4 flex flex-row justify-between">
                                <p className=" text-gray-700">Disable account</p>
                                <button className=" font-normal text-[#D93900]" >Disable</button>
                            </div>
                            <div className="my-4 flex flex-row justify-between">
                                <p className=" text-gray-700"> Disable owner store</p>
                                <button className='font-normal text-[#D93900]' onClick={handleSubmit}>Disable</button>
                            </div>
                        </div>
                    </div>
                    <div className="border border-gray-200 w-full"></div>
                    <div className="my-2">
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-row ">
                                <p className=" text-2xl font-semibold">Notification</p>
                            </div>
                            <div className="my-4 flex flex-row justify-between">
                                <p className=" text-gray-700">Allow in browser push notification</p>
                                <button className=" font-normal text-[#D93900]" >Disable</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default Security