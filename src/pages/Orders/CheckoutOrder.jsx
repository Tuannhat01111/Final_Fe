import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getRoomById } from "../../redux/room/roomThunks";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { createOrderPaypal, onApprove } from "../../redux/order/orderThunks";
import moment from "moment";

const CheckoutOrder = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()
    const { id } = useParams()
    const { detail } = useSelector((state) => state.room)
    const [totalPrice, setTotalPrice] = useState(parseInt(location?.state?.totalPrice));

    const handleCreateOrder = async () => {
        const orderId = await dispatch(createOrderPaypal(totalPrice + (totalPrice  / 10)));
        return orderId.payload;
    };
    const handleOnApprove = (data) => {
        dispatch(onApprove({ dataPaypal: data, price: totalPrice + (totalPrice  / 10), note: "", startDate: moment(location?.state?.date?.startDate).toISOString(), endDate: moment(location?.state?.date?.endDate).toISOString(), roomId: id })).unwrap().then((res)=>{
            navigate('/orders')
        });
    };

    useEffect(() => {
        dispatch(getRoomById({ id: id }))
    }, [])

    return (
        <>
            <div className="sm:container mx-auto pt-10">
                <div>
                    <div className="relative">
                        <div className="grid gap-1 grid-cols-2 overflow-hidden">
                            <div className="aspect-square w-full ">
                                <img
                                    className="aspect-square rounded-l-xl object-cover cursor-pointer h-full"
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

                    <div className="flex py-5 px-5 sm:px-0 flex-col sm:flex-row ">
                        <div className="flex sm:w-2/3 flex-col">
                            <div className="mb-6">
                                <h1 className="font-semibold text-xl mb-4">{detail?.name}</h1>
                                <h2>{detail?.street}</h2>
                            </div>

                            <div className="flex flex-row py-5">
                                <div className="w-16 h-16 rounded-full object-cover">
                                    <img src="https://static.vecteezy.com/system/resources/previews/002/002/257/non_2x/beautiful-woman-avatar-character-icon-free-vector.jpg" alt="" />
                                </div>
                                <div className="flex px-5 flex-col justify-center">
                                    <h1 className="text-2xl font-bold">Hoster By : {detail?.user?.profile?.fullName}</h1>
                                    <h2> Joined in November: {moment(detail?.user?.profile?.createdAt).format('MM/DD/YYYY')}</h2>
                                </div>
                            </div>
                            <div className="border border-gray-200 w-full"></div>
                            <div className="py-5">
                                <h1 className="font-semibold pb-2">Description</h1>
                                <div dangerouslySetInnerHTML={{ __html: detail?.user?.profile?.description }}></div>
                            </div>
                        </div>

                        <div className="hidden lg:flex  lg:w-1/3  lg:justify-end  ">
                            <div
                                className=
                                "hidden w-[80%] overflow-hidden overflow-y-auto lg:flex flex-col border border-gray-200  py-4 px-4 rounded-lg shadow-2xl sm:max-h-[35vh]  lg:max-h-[90vh] object-cover"
                            >
                                <div className="flex flex-row gap-1">
                                    <p className="font-semibold text-xl mb-4 ">{location?.state?.price}$/ </p>
                                    <p className=" underline underline-offset-1 "> night</p>
                                </div>
                                <div className="flex flex-row justify-around items-center">
                                    <h2 className="font-semibold">Start Date </h2>
                                    <h2 className="font-semibold">End Date </h2>

                                </div>
                                <div className="flex py-2 justify-around ">
                                    <p className="text-lg">{moment(location?.state?.date?.startDate).format('MM/DD/YYYY')}</p>
                                    <p className="text-lg">{moment(location?.state?.date?.endDate).format('MM/DD/YYYY')}</p>

                                </div>
                                <div className="mt-2 border border-gray-200 w-full"></div>
                                <div className="flex py-2 justify-between">
                                    <h1 className="underline underline-offset-2 text-lg">{location?.state?.price} $ x {location?.state?.diffDay} night</h1>
                                    <h2 className=" text-lg">${location?.state?.totalPrice} </h2>
                                
                                </div>
                                <div className="flex py-2 justify-between">
                                    <h1 className="underline underline-offset-2 text-lg">Tax 10%</h1>
                                    <h2 className=" text-lg">${location?.state?.totalPrice  / 10} </h2>
                                
                                </div>
                                <div className="border border-gray-200 w-full"></div>
                                <div className="flex py-2 justify-between mb-10">
                                    <h1 className="font-bold text-xl">Total after tax </h1>
                                    <h2 className="font-bold text-xl">$ {location?.state?.totalPrice + (location?.state?.totalPrice  / 10)}</h2>
                                </div>
                                <div>

                                <PayPalScriptProvider
                                    options={{
                                        clientId: "AVUFZ--HoO4trdrJGthrRsviaWOTpJBKuFzvGGP2I8lxw9JpgpFTdGou-2Ou7sO3177PY4u-zx33LdiC",
                                    }}
                                >
                                    <PayPalButtons
                                        createOrder={handleCreateOrder}
                                        onApprove={handleOnApprove}
                                    />
                                </PayPalScriptProvider>

                                </div>
                            </div>
                        </div>


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
                                <h1>Review the Host’s full cancellation policy which applies even if you cancel for illness or disruptions caused by COVID-19.</h1>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default CheckoutOrder;
