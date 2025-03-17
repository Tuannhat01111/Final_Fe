import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProfileByToken } from "../../redux/Profile/ProfileThunks";
import BreadcrumbSetting from './Breadcrumb';
import { jwtDecode } from "jwt-decode";


const ProfilePage = () => {
    const dispatch = useDispatch();

    const { profile } = useSelector((state) => state.profile)
    const user = jwtDecode(localStorage.getItem('token'))

    useEffect(() => {
        dispatch(getProfileByToken());
    }, []);

    return (
        <>  
        <div className="flex flex-col w-full pt-8 px-12 gap-4">
            <BreadcrumbSetting />
        </div>
            <div className="flex flex-col lg:flex-row container mx-auto gap-8 mb-8 max-h-[80vh]   ">
                <div className="flex flex-col lg:w-1/3 mt-8">
                    <div className="flex flex-row w-full sm:px-0 lg:px-12 py-8 shadow-xl rounded-2xl border border-gray-200 ">
                        <div className=" flex flex-col justify-center items-center  w-full">
                            <img className="object-cover h-40 w-40 rounded-full" loading="lazy" src={profile.avatarUrl} alt="" />
                            <h1 className="text-2xl font-semibold">{profile.fullName}</h1>
                            <h3 className="text-l font-medium" >{user.Roles }</h3>
                        </div>

                    </div>
                    <div className="py-10">
                        <div className="flex items-center justify-center ">
                            <img className="object-cover h-40" loading="lazy" src="https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-GuestFavorite/original/78b7687c-5acf-4ef8-a5ea-eda732ae3b2f.png" />

                            <h1 className="text-center text-6xl font-bold"> 5.0</h1>
                            <img className="object-cover h-40" loading="lazy" src="https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-GuestFavorite/original/b4005b30-79ff-4287-860c-67829ecd7412.png" />
                        </div>
                        <div className="flex flex-col items-center justify-center gap-4">
                            <h1 className="text-3xl font-bold text-center">Guest Is Like</h1>
                            <p className="text-xl text-gray-400 text-center">One of the most popular homes on Airbnb based on ratings, reviews, and trust</p>
                        </div>
                    </div>                   
                     {/* <div className="border border-gray-200 w-full"></div> */}
                </div>
                <div className="flex flex-col shadow-xl rounded-2xl border border-gray-200 px-8 mt-8 w-full lg::w-2/3">
                    
                    <div className="flex flex-col py-8 gap-8 ">
                        <h1 className="text-3xl font-bold">Information about {profile.fullName}</h1>
                        </div>
                    <div className="border border-gray-200 w-full"></div>
    

                    <div className="flex flex-col gap-4 mb-8 py-8">
                        <p className="font-bold">Address:  {profile.address}</p>
                        <p className="font-bold">Phone:  {profile.phone}</p>
                        <p className="font-bold">Language: Vietnamese</p>
                        <p className="font-bold">Description:  </p>
                        <div dangerouslySetInnerHTML={{ __html: profile?.description }}></div>

                    </div>
                   
                </div>
            </div>
        </>
    )
}

export default ProfilePage;