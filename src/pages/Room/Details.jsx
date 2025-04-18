import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getRoomById, sendFeedback } from "../../redux/room/roomThunks";
import TextField from '@mui/material/TextField';
import DatePicker from "../../components/calendar/Calendar";
import { openLogin } from "../../redux/modal/modalSlice";
import useTotalPrice, { calculateNumberOfDays } from './useTotalPrice';
import moment from "moment";
import { jwtDecode } from "jwt-decode";

const Details = () => {
    const dispatch = useDispatch()
    const user = null
    const { id } = useParams()
    const { detail } = useSelector((state) => state.room)
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
    if (isLoggedIn) {
        const user = jwtDecode(localStorage.getItem('token'))

    }

    const navigate = useNavigate()
    useEffect(() => {
        dispatch(getRoomById({ id: id }))
    }, [])
    const [feedback, setFeedback] = useState('')
    const handleChange = (event) => {
        const newFeedback = event.target.value;
        setFeedback(newFeedback);
    };

    const handleSendFeedback = (event) => {
        dispatch(sendFeedback({ roomId: id, content: feedback, userId: user.UserId }))
    };
    const [selectedDateRange, setSelectedDateRange] = useState({
        startDate: new Date(),
        endDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
        key: 'selection',
    });

    const totalPrice = useTotalPrice(selectedDateRange, detail?.price);
    const diffDay = calculateNumberOfDays(selectedDateRange?.startDate, selectedDateRange?.endDate)

    const handleDateChange = (selected) => {
        setSelectedDateRange(selected.selection);
    };


    const handleSubmit = () => {
        if (!isLoggedIn) {
            dispatch(openLogin())
            return
        }
        navigate(`/order/${id}`, { state: { date: selectedDateRange, totalPrice: totalPrice, price: detail?.price, diffDay: diffDay } })
    }
    const disabledDatesArray = detail?.busyDates?.map(busyDate => new Date(busyDate));
    return (
        <>
            <div className="sm:container mx-auto pt-10">
                <div>
                    <div className="relative">
                        <div className="grid gap-1 grid-cols-2 overflow-hidden">
                            <div className="aspect-square w-full ">
                                <img
                                    className="aspect-square rounded-l-xl object-cover cursor-pointer h-full "
                                    src={detail?.roomImages?.[0]?.url}
                                    alt=""
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-2 ">
                                {detail?.roomImages?.map((item, index) => {
                                    return (
                                        <div className="aspect-square cursor-pointer object-cover " key={item?.id}>
                                            <img
                                                className={`h-full w-full 
                                            ${index === 1 ? 'rounded-tr-xl' : ''} 
                                            ${index === 3 ? 'rounded-br-xl' : ''}
                                            ` }
                                                src={item?.url} alt="" />
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="flex py-5 px-5 sm:px-0 flex-col  lg:flex-row ">
                        <div className="flex w-full lg:w-2/3 flex-col">
                            <div className="mb-6">
                                <h1 className="font-semibold text-xl mb-4">{detail.name}</h1>
                                <h2>Address: {detail.street}</h2>
                            </div>
                            <div className="border border-gray-200 w-full"></div>

                            <div className="flex flex-row py-5">
                                <div className="w-16 h-16 rounded-full object-cover">
                                    <img className=" object-cover w-[70px] h-[70px] rounded-full"
                                        src={
                                            detail?.user?.profile?.avatarUrl ||
                                            "https://static.vecteezy.com/system/resources/previews/002/002/257/non_2x/beautiful-woman-avatar-character-icon-free-vector.jpg"
                                        }
                                        alt="avatar"
                                    />
                                </div>
                                <div className="flex px-5 flex-col justify-center">
                                    <h1 className="font-semibold">Owner home/Person create: {detail?.user?.profile?.fullName}</h1>
                                    <h2>Address: {detail?.user?.profile?.address}</h2>
                                </div>
                            </div>
                            <div className="border border-gray-200 w-full"></div>
                            <div className="py-5">
                                <div dangerouslySetInnerHTML={{ __html: detail?.description }}></div>
                            </div>

                            <div className="border border-gray-200 w-full"></div>
                            <div className="py-6">
                                <h1 className="py-2 font-semibold text-2xl">Type of accommodation service</h1>
                                <div className="grid grid-cols-2">
                                    <div className="flex flex-row items-center">
                                        <h1 >Phân loại: {detail?.category?.name}</h1>
                                    </div>
                                    <div className="flex flex-row items-center">
                                        <h1 className="px-4">Mô tả phân loại:  {detail?.category?.description}</h1>
                                    </div>
                                </div>
                            </div>

                            <div className="border border-gray-200 w-full"></div>
                            <div className="flex flex-row py-5">
                                <div className="w-16 h-16 rounded-full object-cover">
                                    <img src={detail?.user?.profile?.avatarUrl} alt="" />
                                </div>
                                <div className="flex px-5 flex-col justify-center">
                                    <h1 className="text-2xl font-bold">Hoster By : {detail?.user?.profile?.fullName}</h1>
                                    <h2> Joined in November: {moment(detail?.user?.profile?.createdAt).format('DD/MM/YYYY')}</h2>
                                    <h2> Number Phone : {detail?.user?.profile?.phone}</h2>

                                </div>
                            </div>
                            <div className="flex flex-col-reverse lg:flex-row py-4">
                                <div className="flex w-full lg:w-2/4 flex-col">
                                    <div className="py-2">
                                        <h1 className="font-bold text-lg"> Introduction</h1>
                                        <div dangerouslySetInnerHTML={{ __html: detail?.user?.profile?.description }}></div>
                                    </div>
                                </div>
                                

                                {isLoggedIn && (
                                    <div className="flex w-full lg:w-2/4 flex-col lg:ml-40">
                                        <h1 className="font-bold text-lg">Feedback:</h1>

                                        <TextField
                                            id="outlined-multiline-static"
                                            value={feedback}
                                            onChange={handleChange}
                                            multiline
                                            rows={12}
                                            placeholder="If you have any problems, please enter here and the system will send an email to the store owner"
                                        />

                                        <div className="py-4">
                                            <button
                                                className="py-3 px-6 border border-black rounded-xl font-semibold"
                                                onClick={handleSendFeedback}
                                            >
                                                Send feedback to owner room
                                            </button>
                                        </div>
                                    </div>
                                )}

                            </div>
                            <div className="border border-gray-200 w-full"></div>
                            <div className="hidden sm:flex justify-center flex-col py-4 w-full ">
                                <div>
                                    <h4 className=" text-xl font-bold ">Please choose start date and end date:</h4>
                                </div>
                                <DatePicker
                                    value={selectedDateRange}
                                    onChange={handleDateChange}
                                    disabledDates={disabledDatesArray}
                                />
                            </div>

                        </div>
                        <div class="lg:hidden  fixed z-50 w-full h-20 -translate-x-1/2 bg-white bottom-0 left-1/2 shadow-[1px_1px_5px_-1px_rgba(0,0,0,0.3)] ">

                            <div class="grid h-full grid-cols-2 mx-auto">
                                <div className="flex flex-col justify-start px-6 py-4">
                                    <h1>1231231</h1>
                                    <p className=" font-medium underline underline-offset-4 cursor-pointer">ngay 09 - ngay 12 thang 4</p>


                                </div>
                                <div className="flex items-center justify-center">
                                    <button className="flex py-3 px-8 border border-none justify-center items-center w-full rounded-2xl bg-primary text-white" onClick={() => { handleSubmit() }}>
                                        Booking
                                    </button><i className="fas fa-eye  ms-2"></i>
                                </div>


                            </div>

                        </div>
                        <div className="hidden lg:flex  lg:w-1/3  lg:justify-end  ">
                            <div
                                className=
                                "hidden w-[80%] lg:flex flex-col border border-gray-200 py-4 px-4 rounded-lg shadow-2xl sm:max-h-[90vh]  lg:max-h-[35vh] sm:sticky sm:top-20 lg:top-44 object-cover"
                            >
                                <div className="flex flex-row items-center">
                                    <h1 className="font-bold text-2xl">${detail?.price}</h1>
                                    <h1>/night</h1>
                                </div>
                                <span className="py-2">
                                    {/* <Link to={`/order/${id}`}> */}
                                    <button className="bg-blue-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-full justify-center items-center w-full" onClick={() => { handleSubmit() }}>
                                        Booking
                                    </button><i className="fas fa-eye  ms-2"></i>
                                    {/* </Link> */}

                                </span>

                                <div className="flex py-2 justify-between">
                                    <h1 className="underline">${detail?.price} x {diffDay} day</h1>
                                    <h1>${totalPrice}</h1>
                                </div>

                                <div className="flex py-2 justify-between">
                                    <h1 className="underline">%Tax</h1>
                                    <h1 className="text-green-600">+10%</h1>
                                </div>
                                <div className="mt-2 border border-gray-200 w-full"></div>

                                <div className="flex py-2 justify-between">
                                    <h1 className="font-bold text-xl">Total before taxes</h1>
                                    <h1 className="font-blod text-xl">${totalPrice}</h1>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="border border-gray-200 w-full"></div>
                    <div className="py-10">
                        <div className="flex items-center justify-center border-r border-gray-400">
                            <img className="object-cover h-40" loading="lazy" src="https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-GuestFavorite/original/78b7687c-5acf-4ef8-a5ea-eda732ae3b2f.png" />

                            <h1 className="text-center text-6xl font-bold"> 5.0</h1>
                            <img className="object-cover h-40" loading="lazy" src="https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-GuestFavorite/original/b4005b30-79ff-4287-860c-67829ecd7412.png" />
                        </div>
                        <div className="flex flex-col items-center justify-center gap-4">
                            <h1 className="text-3xl font-bold text-center">Guest Is Like</h1>
                            <p className="text-xl text-gray-400 text-center">One of the most popular homes on Airbnb based on ratings, reviews, and trust</p>
                        </div>
                    </div>
                    <div className="border border-gray-200 w-full"></div>
                    <div className="grid grid-cols-2 gap-12">
                        {detail?.feedbacks?.map((item) => (

                            <div className="flex flex-col px-4 py-4 gap-4 w-4/5">
                                <div className="flex flex-row gap-4 ">
                                    <div className="max-h-24 max-w-24">
                                        <img className="object-cover h-12 w-12 rounded-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqKRdNTUVE6P28Z1Gjw-fwnfsE6icmFmf4eiXXEpmc4A&s" alt="" />
                                    </div>
                                    <div className="flex flex-col">
                                        <h2 className="text-lg font-medium">{item.userName}</h2>
                                        <p className="text-gray-400">Active two year ago</p>
                                    </div>
                                </div>
                                <div>
                                    <p className="">{item.content}</p>
                                </div>

                            </div>
                        ))}

                    </div>

                    <div className="border border-gray-200 w-full"></div>

                    <div className="py-8 px-5">
                        <h1 className="text-xl font-semibold py-4">Things to now</h1>
                        <div className="grid grid-cols-1 sm:grid-cols-3">
                            <div className="flex flex-col">
                                <h1 className="font-semibold text-lg">House rule</h1>
                                <h1>Check in</h1>
                                <h1>Check out</h1>
                                <h1>4 guest maximum</h1>
                            </div>
                            <div className="flex flex-col">
                                <h1 className="font-semibold text-lg">Safety & property</h1>
                                <h1>Nearby lake, river, other body of water</h1>
                                <h1>Carbon monoxide alarm</h1>
                                <h1>Smoke alarm</h1>
                            </div>
                            <div className="flex flex-col">
                                <h1 className="font-semibold text-lg">Cancellation policy</h1>
                                <h1>This reservation is non-refundable.</h1>
                                <h1>Review the Hosts full cancellation policy which applies even if you cancel for illness or disruptions caused by COVID-19.</h1>

                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}
export default Details;