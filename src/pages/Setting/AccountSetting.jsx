import { useNavigate } from "react-router-dom";
import { MdOutlineMedicalInformation, MdOutlineSecurity, MdHotel } from "react-icons/md";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProfileByToken } from "../../redux/Profile/ProfileThunks";

const AccountSetting = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { profile } = useSelector((state) => state.profile)
    const user = jwtDecode(localStorage.getItem('token'))

    useEffect(() => {
        dispatch(getProfileByToken());
    }, []);

    return (
        <>
            <div className="sm:container px-6 sm:mx-auto">
                <div className="flex flex-col lg:flex-row container mx-auto gap-8 mb-8 max-h-[50vh]   ">
                    <div className="flex flex-col lg:w-1/3 mt-8">
                        <div className="flex flex-row w-full sm:px-0 lg:px-12 py-8 shadow-xl rounded-2xl border border-gray-200 ">
                            <div className=" flex flex-col justify-center items-center  w-full">
                                <img className="object-cover h-40 w-40 mb-3 rounded-full" loading="lazy" src={profile.avatarUrl} alt="" />
                                <h1 className="text-2xl font-semibold mb-3">{profile.fullName}</h1>
                                <h3 className="text-l font-medium mb-3">
                                    {user.Roles}
                                </h3>

                                <p className="text-gray-400 text-base italic text-justify">
                                    {user.Roles === 'Hotel Owner' ? (
                                        'As a Hotel Owner, you have full access to manage your hotel’s information, bookings, pricing, and more. Control your property with ease and reach more potential guests.'
                                    ) : user.Roles === 'User' ? (
                                        'As a User, you can explore hotels, view available rooms, and make bookings for your stay. Upgrade to a Hotel Owner to manage your own property.'
                                    ) : (
                                        'Welcome! Your role allows you to access certain features on the platform. Upgrade to unlock more capabilities.'
                                    )}
                                </p>

                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col shadow-xl rounded-2xl border border-gray-200 px-8 mt-8 w-full lg::w-2/3">
                        <div className="flex flex-col py-8 gap-8 ">
                            <h1 className="text-3xl font-bold">Your Information</h1>
                        </div>
                        <div className="border border-gray-200 w-full"></div>
                        <div className="flex flex-col gap-4 mb-8 py-8">
                            <p className="font-bold">Full Name:  {profile.fullName}</p>
                            <p className="font-bold">Address:  {profile.address}</p>
                            <p className="font-bold">Number Phone:  {profile.phone}</p>
                            <p className="font-bold">Language: Vietnamese</p>
                            <p className="font-bold">Description:  </p>
                            <div dangerouslySetInnerHTML={{ __html: profile?.description }}></div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row grid-cols-1 sm:px-12 md:px-24  md:grid-cols-2 xl:grid-cols-3 gap-4">
                    <div
                        onClick={() => { navigate("personal-info") }}
                        className="bg-white w-full shadow-xl flex flex-col rounded-xl px-4 py-4 cursor-pointer"
                    >
                        <div className="mb-6">
                            <MdOutlineMedicalInformation size={26} />
                        </div>
                        <div className="w-full">
                            <h3 className="text-base font-[400] md:text-base md:font-[500]">Update Personal Information</h3>
                            <p className="text-gray-400 text-base italic">Keep your profile details up to date so we can contact you easily and provide better support when needed.</p>
                        </div>
                    </div>
                    <div
                        onClick={() => { navigate("secutiry") }}
                        className="bg-white w-full shadow-xl flex flex-col rounded-xl px-4 py-4 cursor-pointer"
                    >
                        <div className="mb-6">
                            <MdOutlineSecurity size={26} />
                        </div>
                        <div className="w-full">
                            <h3 className="text-base font-[400] md:text-base md:font-[500]">Account Setting</h3>
                            <p className="text-gray-400 text-base italic">Manage your account information to keep your profile secure and personalized for a better experience.</p>
                        </div>
                    </div>
                    <div
                        onClick={() => { navigate("contract") }}
                        className="bg-white w-full shadow-xl flex flex-col rounded-xl px-4 py-4 cursor-pointer"
                    >
                        <div className="mb-6">
                            <MdHotel size={26} />
                        </div>
                        <div className="w-full">
                            <h3 className="text-base font-[400] md:text-base md:font-[500]">Upgrade to Owner Hotel</h3>
                            <p className="text-gray-400 text-base italic">Elevate your role to Hotel Owner and unlock advanced features to manage and promote your property efficiently on our platform.</p>

                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}
export default AccountSetting