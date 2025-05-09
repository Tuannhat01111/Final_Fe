import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Upload } from 'antd';
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfileByToken, updateProfile, uploadAvatar } from "../../redux/Profile/ProfileThunks";
import BreadcrumbSetting from "./Breadcrumb";
import { TextField, Button } from '@mui/material';
import ReactQuill from 'react-quill-new';
import * as yup from "yup";
import { useFormik } from 'formik';
import 'react-quill-new/dist/quill.snow.css';
import './UpdateProfile.scss';

const validationSchema = yup.object({
    fullName: yup.string().required("Name is required"),
    address: yup.string().required("Address is required"),
    phone: yup.string().required("NUmber phone is required"),
});

const UpdateProfile = () => {
    const [description, setDescription] = useState('');
    const handleEditorChange = (content) => {
        setDescription(content);
        formik.setFieldValue('description', content);
    };
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            fullName: '',
            avatarUrl: '',
            address: '',
            phone: '',
            description: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            dispatch(updateProfile({ id: user.UserId, profile: values }));
        },
    });

    const { profile } = useSelector((state) => state.profile)
    const user = jwtDecode(localStorage.getItem('token'))
    const [imageUrl, setImageUrl] = useState('https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=338&ext=jpg&ga=GA1.1.1224184972.1714176000&semt=sph');

    useEffect(() => {
        if (profile) {
            formik.setValues({
                fullName: profile.fullName || "",
                avatarUrl: profile.avatarUrl || "",
                phone: profile.phone || "",
                address: profile.address || "",
                description: profile.description || "",
            });
            setDescription(profile.description);
            setImageUrl(profile.avatarUrl);
        }
    }, [profile]);


    useEffect(() => {
        dispatch(getProfileByToken());
    }, []);

    const [loading, setLoading] = useState(false);

    const handleUploadAvatar = async (event) => {
        const file = event.fileList[0].originFileObj;
        if (file) {
            
            setImageUrl(URL.createObjectURL(file));

            await dispatch(uploadAvatar(file));

      
            await new Promise(resolve => setTimeout(resolve, 1000));

            dispatch(getProfileByToken());
        }
    };

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );
    return (
        <>
            <div className="flex flex-col px-6 sm:px-12 md:px-24 lg:px-48 ">
                <div className="flex flex-col w-full py-14 gap-4">
                    <BreadcrumbSetting />
                </div>
                <div className="flex flex-col lg:flex-row px-4 sm:px-12 lg:px-24 gap-20 border border-gray-200 shadow-2xl rounded-2xl py-8 ">

                    <div className="flex flex-col gap-2 lg:gap-4 lg:w-1/3">

                        <div className="flex justify-center items-center">
                            <Upload
                                name="avatar"
                                listType="picture-circle"
                                className="avatar-uploader"
                                showUploadList={false}
                                onChange={handleUploadAvatar}
                            >
                                {imageUrl ? <img loading='lazy' className=" object-cover w-[100px] h-[100px] rounded-full" src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                            </Upload>
                        </div>
                        <div className='flex flex-col gap-8'>
                            <div class="w-full">
                                <label for="fullName" class="block mb-2 text-sm font-medium text-gray-900">Name</label>
                                <TextField fullWidth id="outlined-basic" variant="outlined"
                                    name="fullName"
                                    value={formik.values.fullName}
                                    onChange={formik.handleChange}
                                    error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                                    helperText={formik.touched.fullName && formik.errors.fullName}
                                    InputProps={{ sx: { borderRadius: 3 } }}
                                />
                            </div>

                            <div class="w-full">
                                <label for="phone" class="block mb-2 text-sm font-medium text-gray-900">Phone</label>
                                <TextField fullWidth id="outlined-basic" variant="outlined"
                                    name="phone"
                                    value={formik.values.phone}
                                    onChange={formik.handleChange}
                                    error={formik.touched.phone && Boolean(formik.errors.phone)}
                                    helperText={formik.touched.phone && formik.errors.phone}
                                    InputProps={{ sx: { borderRadius: 3 } }}
                                />
                            </div>

                            <div class="w-full">
                                <label for="address" class="block mb-2 text-sm font-medium text-gray-900">Address</label>
                                <TextField fullWidth id="outlined-basic" variant="outlined"
                                    name="address"
                                    value={formik.values.address}
                                    onChange={formik.handleChange}
                                    error={formik.touched.address && Boolean(formik.errors.address)}
                                    helperText={formik.touched.address && formik.errors.address}
                                    InputProps={{ sx: { borderRadius: 3 } }}
                                />
                            </div>

                        </div>



                    </div>
                    <div className="flex flex-col lg:w-2/3">
                        <p className="italic text-gray-600 mb-6">
                        Please take a few minutes to update your full personal profile information. This will not only help us assist you better but also enhance the reliability of your account when booking rooms, sending feedback, or interacting with property owners. Clear and accurate information will also ensure a smoother verification and payment process. Thank you for your cooperation!                        </p>


                        <div class="sm:col-span-2 h-full lg:pt-3">
                            <label for="brand" class="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">Description</label>

                            <div className='editor'>
                                <ReactQuill theme="snow"
                                    value={description}
                                    onChange={handleEditorChange}
                                    className="editor-input h-full editor-quill"
                                    style={{ borderRadius: 5, height: "100px", marginBottom: "50px" }}
                                />
                            </div>

                        </div>
                        <div className="w-full flex justify-center">
                            <button
                                className="max-w-[25%] bg-blue-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-full w-full"
                                onClick={formik.handleSubmit}
                                type="submit"
                            >
                                Save Change
                            </button>
                        </div>
                    </div>

                </div>

            </div>


        </>
    )
}

export default UpdateProfile;

