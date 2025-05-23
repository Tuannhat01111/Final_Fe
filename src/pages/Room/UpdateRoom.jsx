import React, { useState, useEffect } from 'react';
import './CreateRoom.css';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory } from "../../redux/category/categoryThunks";
import { getRoomById, updateRoom, deleteRoomImages } from "../../redux/room/roomThunks";
import { jwtDecode } from "jwt-decode";
import * as yup from "yup";
import { Autocomplete, TextField, Button } from '@mui/material';
import { Country, State } from 'country-state-city';
import { useParams } from 'react-router-dom';
import ReactQuill from 'react-quill-new';

const validationSchema = yup.object({
    name: yup.string().required("Name is required"),
    street: yup.string().required("street is required"),
    price: yup.number().required("price is required"),
});

const UpdateRoom = () => {
    const dispatch = useDispatch();
    const { id } = useParams()
    const [description, setDescription] = useState('');
    const handleEditorChange = (content) => {
        setDescription(content);
        formik.setFieldValue('description', content);
    };
    useEffect(() => {
        dispatch(getRoomById({ id: id }))
        dispatch(getAllCategory())
    }, [])
    const detail = useSelector((state) => state.room.detail)
    const user = jwtDecode(localStorage.getItem('token'))
    const formik = useFormik({
        initialValues: {
            id: '',
            name: '',
            street: '',
            country: '',
            codeCountry: '',
            city: '',
            codeCity: '',
            description: '',
            district: '',
            email: user?.Email,
            latitude: '',
            longitude: '',
            userId: user?.UserId,
            categoryId: '',
            files: [],
            price: 0,
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            await dispatch(updateRoom(values));
        },
    });

    useEffect(() => {
        if (detail) {
            formik.setValues({
                id: detail.id || "",
                name: detail.name || "",
                street: detail.street || "",
                country: detail.country || "",
                codeCountry: detail.codeCountry || "",
                city: detail.city || "",
                codeCity: detail.codeCity || "",
                description: detail.description || "",
                district: detail.district || "",
                email: detail.email || "",
                latitude: detail.latitude || "",
                longitude: detail.longitude || "",
                categoryId: detail.categoryId || "",
                files: Array.isArray(detail.files) ? detail.files : [],  // Ensuring it's an array
                price: detail.price || "",
                userId: user?.UserId,
            });
            setDescription(detail.description);

            setImagesUpload(detail.roomImages);
        }
    }, [detail]);

    const [selectedCountry, setSelectedCountry] = useState(Country.getAllCountries()[0] ? {
        label: `${Country.getAllCountries()[0].name} (${Country.getAllCountries()[0].isoCode})`,
        isoCode: Country.getAllCountries()[0].isoCode,
        name: Country.getAllCountries()[0].name
    } : null);
    const [selectedState, setSelectedState] = useState(State.getStatesOfCountry("VN")[0] ? {
        label: `${State.getStatesOfCountry("VN")[0].name} (${State.getStatesOfCountry("VN")[0].isoCode})`,
        isoCode: State.getStatesOfCountry("VN")[0].isoCode,
        name: State.getStatesOfCountry("VN")[0].name
    } : null);

    const handleCountryChange = (event, newCountry) => {
        if (newCountry) {
            setSelectedCountry(newCountry);
            formik.setFieldValue('country', newCountry.name);
            formik.setFieldValue('codeCountry', newCountry.isoCode);
        } else {
            setSelectedCountry(null);
            formik.setFieldValue('country', '');
            formik.setFieldValue('codeCountry', '');
        }
    };

    const handleStateChange = (event, newState) => {
        if (newState) {
            setSelectedState(newState);
            formik.setFieldValue('city', newState.name);
            formik.setFieldValue('codeCity', newState.isoCode);


        } else {
            setSelectedState(null);
            formik.setFieldValue('city', '');
            formik.setFieldValue('codeCity', '');
        }
    };
    const { categories } = useSelector((state) => state.category)

    useEffect(() => {
        dispatch(getAllCategory())
    }, [])

    const [imagesUpload, setImagesUpload] = useState([]);

    const handleFile = (event) => {
        console.log("first")
        const file = event.target.files[0];

        if (file) {
            setImagesUpload([...imagesUpload, file]);
            formik.setFieldValue("files", [...formik.values.files, file]);
        }

    };
    const removeImage = (key, i) => {
        console.log(key)
        formik.setFieldValue('files', formik.values.files.filter(x => x.url !== i));
        setImagesUpload(imagesUpload.filter(x => x.url !== i));
        dispatch(deleteRoomImages(key))

    };
    const handleCategoryChange = (event, newValue) => {
        if (newValue) {
            formik.setFieldValue('categoryId', newValue.id);
        } else {
            formik.setFieldValue('categoryId', '');
        }
    };
    return (
        <>
            <div> <section class="bg-white">
                <div class="py-8 px-4  lg:py-16">
                    <div className="flex w-[90%] mx-auto">
                        <div class="w-[50%] grid gap-4 sm:grid-cols-2 sm:gap-6 px-6">
                            <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-dark">Modify your room</h2>
                            <div class="sm:col-span-2">
                                <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">Product Name</label>
                                <TextField fullWidth id="outlined-basic" variant="outlined"
                                    name="name"

                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    error={formik.touched.name && Boolean(formik.errors.name)}
                                    helperText={formik.touched.name && formik.errors.name}
                                    style={{
                                        marginBottom: "10px",
                                        display: "inline-grid",
                                    }} />
                            </div>

                            <div>
                                <label for="categoryId" class="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">Category</label>
                                <Autocomplete
                                    fullWidth
                                    disablePortal
                                    id="combo-div-demo"
                                    options={categories}
                                    getOptionLabel={(option) => option.name} // Chọn thuộc tính hiển thị là name của Category
                                    getOptionSelected={(option, value) => option.id === value.id} // Chọn thuộc tính được chọn dựa trên id
                                    onChange={handleCategoryChange} // Gọi hàm handleCategoryChange khi có sự kiện thay đổi Category
                                    renderInput={(params) => <TextField {...params} variant="outlined" />} // Sử dụng TextField của Material-UI cho input
                                />
                            </div>
                            <div class="w-full">
                                <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">Price</label>
                                <TextField fullWidth id="outlined-basic" variant="outlined"
                                    name="price"
                                    value={formik.values.price}
                                    onChange={formik.handleChange}
                                    error={formik.touched.price && Boolean(formik.errors.price)}
                                    helperText={formik.touched.price && formik.errors.price} />
                            </div>

                            <div>
                                <label for="country" class="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">Country</label>
                                <Autocomplete
                                    value={selectedCountry}
                                    onChange={handleCountryChange}
                                    options={Country.getAllCountries().map(country => ({
                                        label: `${country.name} (${country.isoCode})`,
                                        isoCode: country.isoCode,
                                        name: country.name
                                    }))}
                                    getOptionLabel={(option) => option.label}
                                    renderInput={(params) => <TextField {...params} variant="outlined" />}
                                />

                            </div>
                            <div>
                                <label for="city" class="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">State (City)</label>
                                <Autocomplete fullWidth
                                    disablePortal
                                    id="combo-div-demo"
                                    value={selectedState}
                                    onChange={handleStateChange}
                                    options={State.getStatesOfCountry(formik.values.codeCountry).map(city => ({
                                        label: `${city.name} (${city.isoCode})`,
                                        isoCode: city.isoCode,
                                        name: city.name
                                    }))}
                                    getOptionLabel={(option) => option.label}
                                    renderInput={(params) => <TextField {...params} variant="outlined" />}
                                />
                            </div>
                            <div class="sm:col-span-2">
                                <label for="brand" class="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">Street</label>
                                <TextField fullWidth id="outlined-basic" variant="outlined" name="street"
                                    value={formik.values.street}
                                    onChange={formik.handleChange}
                                    error={formik.touched.street && Boolean(formik.errors.street)}
                                    helperText={formik.touched.street && formik.errors.street}
                                    style={{
                                        marginBottom: "10px",
                                        display: "inline-grid",
                                    }} />
                            </div>
                            <div class="sm:col-span-2">
                                <label for="brand" class="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">Description</label>
                                <div className='editor'>
                                    <ReactQuill theme="snow"
                                        value={description}
                                        onChange={handleEditorChange}
                                        className="editor-input h-full editor-quill"
                                        style={{ borderRadius: 5, height: "300px", marginBottom: "50px" }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="w-[50%] px-6 mt-[6%]">
                            <div class="flex items-center justify-center w-full">
                                <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                    <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewdiv="0 0 20 16">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                        </svg>
                                        <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                                        <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF</p>
                                    </div>
                                    <input id="dropzone-file" onChange={handleFile} type="file" multiple class="hidden" />
                                </label>
                            </div>
                            <div className="flex flex-wrap gap-2 mt-2 relative">
                                {imagesUpload?.map((file, key) => {
                                    return (
                                        <div key={key} className="overflow-hidden relative">
                                            <i onClick={() => { removeImage(file.id, file.url) }} className="mdi mdi-close absolute right-1 hover:text-white cursor-pointer">X</i>
                                            {
                                                file.url ? (
                                                    <img className="h-40 w-40 rounded-md" src={file.url} />
                                                ) : (
                                                    <img className="h-40 w-40 rounded-md" src={URL.createObjectURL(file)} />
                                                )
                                            }
                                        </div>
                                    )
                                })}
                            </div>

                            <button type="submit" class="bg-blue-500 mt-2 hover:bg-blue-700 w-[30%] rounded-lg py-2 text-white font-medium" onClick={formik.handleSubmit}>
                                Update product
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            </div>
        </>);
}

export default UpdateRoom;