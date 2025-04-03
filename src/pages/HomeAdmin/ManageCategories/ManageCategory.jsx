import { ExclamationCircleFilled } from '@ant-design/icons';
import React, { useEffect, useState } from "react";
import { Button, Modal } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import { createCategory, deleteCategory, getAllCategory, getCategoryId, updateCategory } from "../../../redux/Category/CategoryThunks";
import "./ManageCategory.css"
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
const { confirm } = Modal;
const validationSchema = yup.object({
    name: yup.string().required("Name is required"),
    description: yup.string().required("description is required"),
});

const validationSchema2 = yup.object({
    name: yup.string().required("Name is required"),
    description: yup.string().required("description is required"),
});

const ManageCategories = () => {
    const [modal2Open, setModal2Open] = useState(false);
    const [updateOpen, setUpdateOpen] = useState(false);
    const dispatch = useDispatch()
    const categories = useSelector((state) => state.category.categories)
    const [selectedCategory, setSelectedCategory] = useState(null)
    const  category  = useSelector((state) => state.category.category)

    const formik = useFormik({
        initialValues: {
            name: "",
            description: "",

        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            await dispatch(createCategory(values)).unwrap();
            setModal2Open(false)
        },
    });


    const formik2 = useFormik({
        initialValues: {
            id: "",
            name: "",
            description: "",
        },
        validationSchema: validationSchema2,
        onSubmit: async (values) => {
            await dispatch(updateCategory({ id: selectedCategory, name: values.name, description: values.description })).unwrap().then((res) => {
                setUpdateOpen(false);
            });
        },
    });

    useEffect(() => {
        if (category) {
            formik2.setValues({               
                name: category.name || "",
                description: category.description || "",                       
            });
        }
    }, [category]);


    const showConfirm = (id) => {
        
        confirm({
            title: 'Do you want to delete these items?',
            icon: <ExclamationCircleFilled />,
            content: 'Some descriptions',
            okButtonProps:{
                style:{
                    backgroundColor: 'red'
                }
            },
            onOk() {
                dispatch(deleteCategory(id))
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    useEffect(() => {
        dispatch(getAllCategory());
    }, []);

    useEffect(() => {
        dispatch(getCategoryId(selectedCategory));
    }, [selectedCategory]);

    return (
        <>
            <div className="max-h-[94vh] overflow-hidden overflow-y-auto w-screen bg-[#222b3c]">
                <div className="max-w-6xl p-4 mx-auto">
                    <div className="flex justify-between">
                        <h1 className="text-4xl font-semibold text-white">Manager Category</h1>
                        <Button className="text-white" onClick={() => setModal2Open(true)}>Create Category</Button>
                        <Modal
                            title="Create Category"
                            centered
                            open={modal2Open}
                            onOk={() => setModal2Open(false)}
                            onCancel={() => setModal2Open(false)}
                            footer={false}
                        >
                            <div className="flex flex-col gap-4 py-4">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Name Category"
                                    className="input border rounded p-2 w-full"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.name && formik.errors.name && (
                                    <div className="text-red-500 text-sm">{formik.errors.name}</div>
                                )}
                                <textarea
                                    name="description"
                                    rows="4"
                                    placeholder="Description Category"
                                    className="textarea border rounded p-2 w-full"
                                    value={formik.values.description}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.description && formik.errors.description && (
                                    <div className="text-red-500 text-sm">{formik.errors.description}</div>
                                )}
                                <Button type="primary" onClick={formik.handleSubmit} className="bg-blue-500" >
                                    Create Category
                                </Button>
                            </div>
                        </Modal>
                    </div>
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                        {categories?.map((item, index) => (
                            <div key={index} className="card border rounded overflow-hidden">
                                <div className="p-4 flex flex-col justify-between items-center gap-4">
                                    <div className="flex flex-row justify-between w-full gap-8 ">
                                        <h5 className="text-lg font-bold">{item.name}</h5>
                                        <span className="badge bg-green-500 text-white rounded-full px-3 py-1">Active</span>
                                    </div>
                                    <div>
                                        {selectedCategory === item?.id ? (
                                            <Modal
                                                title="Update Category"
                                                centered
                                                open={updateOpen}
                                                onOk={() => setUpdateOpen(false)}
                                                onCancel={() => setUpdateOpen(false)}
                                                footer={false}
                                            >
                                                <div className="flex flex-col gap-4 py-4">
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        placeholder="Name Category"
                                                        className="input border rounded p-2 w-full"
                                                        value={formik2.values.name}
                                                        onChange={formik2.handleChange}
                                                        onBlur={formik2.handleBlur}
                                                    />
                                                    {formik2.touched.name && formik2.errors.name && (
                                                        <div className="text-red-500 text-sm">{formik2.errors.name}</div>
                                                    )}
                                                    <textarea
                                                        name="description"
                                                        rows="4"
                                                        placeholder="Description Category"
                                                        className="textarea border rounded p-2 w-full"
                                                        value={formik2.values.description}
                                                        onChange={formik2.handleChange}
                                                        onBlur={formik2.handleBlur}
                                                    />
                                                    {formik2.touched.description && formik2.errors.description && (
                                                        <div className="text-red-500 text-sm">{formik2.errors.description}</div>
                                                    )}
                                                    <Button type="primary" onClick={formik2.handleSubmit} className="bg-blue-500">Update Category</Button>
                                                </div>
                                            </Modal>
                                        ) : (
                                            <>
                                            </>
                                        )}
                                        <p>{item.description}</p>
                                        <p className="text-gray-600">{item?.rooms?.length} rooms</p>
                                    </div>
                                </div>
                                <div className="bg-gray-100 p-4 flex justify-around">
                                    <button onClick={() => { setSelectedCategory(item?.id), setUpdateOpen(true) }} className="text-4xl text-[#008489] "><FaEdit /></button>
                                    <button onClick={()=>{showConfirm(item?.id)}} className="text-4xl text-red-500 "><MdDeleteForever /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>


            </div>
        </>
    );
};

export default ManageCategories;