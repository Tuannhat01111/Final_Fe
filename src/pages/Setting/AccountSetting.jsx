import { useNavigate } from "react-router-dom";
import { MdOutlineMedicalInformation, MdOutlineSecurity, MdHotel } from "react-icons/md";
import { jwtDecode } from "jwt-decode";

const AccountSetting = () => {
    const navigate = useNavigate();  
    const user = jwtDecode(localStorage.getItem('token'))

    return (
        <>
            <div className="sm:container px-6 sm:mx-auto">
                <div className="flex flex-col w-full sm:px-12 md:px-24 py-14 gap-4">
                    <h1 className="text-xl md:sm:2xl lg:text-3xl xl:text-4xl 2xl:5xl font-medium">Account</h1>
                    <div className="flex flex-row gap-2">
                        <span className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-medium ">{user.UserName}</span>
                        <span className="text-lg md:text-xl lg:text-2xl xl:text-3xl">{user.Email}</span>
                        <p className="text-lg md:text-xl lg:text-2xl xl:text-3xl underline font-semibold  cursor-pointer" onClick={() => {navigate('/account-setting/profile')}}>Go To Profile</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:px-12 md:px-24  md:grid-cols-2 xl:grid-cols-3 gap-4">
                    <div
                        onClick={() => { navigate("personal-info") }}
                        className="bg-white w-full shadow-xl flex flex-col rounded-xl px-4 py-4 cursor-pointer"
                    >
                        <div className="mb-6">
                            <MdOutlineMedicalInformation size={26} />
                        </div>
                        <div className="w-full">
                            <h3 className="text-base font-[400] md:text-base md:font-[500]">Personal Info</h3>
                            <p className="text-gray-400 text-base">Provide personal details and how we can reach you</p>
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
                            <p className="text-gray-400 text-base">Provide personal details and how we can reach you</p>
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
                            <p className="text-gray-400 text-base">Provide personal details and how we can reach you</p>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}
export default AccountSetting