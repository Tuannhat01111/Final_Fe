import ChartBox from "../../../components/Chart/ChartBox";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getAllRooms } from "../../../redux/Room/RoomThunks";
import { getCountByMonth, getOrderByAdmin } from "../../../redux/Order/OrderThunks";
import { getAllCategory, getAllCategoryForAdmin } from "../../../redux/Category/CategoryThunks";
import { getAllStore, getAllUser } from "../../../redux/Auth/AuthThunks";

const Dashboard = () => {
    const dispatch = useDispatch()
    const { users, stores } = useSelector((state) => state.auth)
    const rooms = useSelector((state) => state.room.rooms)
    const orders = useSelector((state) => state.order.data)
    const categoriesChart = useSelector((state) => state.category.categoriesChart)

    useEffect(() => {
        dispatch(getAllUser())
        dispatch(getAllStore())
        dispatch(getAllRooms({ categoryId: '' }))
        dispatch(getOrderByAdmin())
        dispatch(getCountByMonth())
        dispatch(getAllCategoryForAdmin())
        dispatch(getAllCategory())
    }, [])
    return (
        <>
            <div className="w-full py-2 px-5 bg-[#ffffff] h-full overflow-y-auto  ">
                <div className="grid grid-cols-1 mg:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4">
                    <div className="  grid grid-col-1 grid-row-2 gap-4 col-span-2 " >
                        <div className="p-5 rounded-10 border-2 border-solid border-[#384256]">
                            <div className="p-4">
                                <h1 className="mb-5 text-2xl font-bold text-dark">Welcome to Adminitrator</h1>
                            </div>
                        </div>
                        <div className="p-5 rounded-10 border-2 border-solid border-[#384256]">
                            <ResponsiveContainer width="100%" height={400}>
                                <BarChart data={categoriesChart}>
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip formatter={(value) => `${value.toLocaleString()}`} />
                                    <Legend />
                                    <Bar dataKey="quantityRoom" fill="#8884d8" />
                                </BarChart>
                            </ResponsiveContainer>

                            <h1 className="text-center mt-4">Quantity Room Per Category</h1>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-5 col-span-1 lg:col-span-2 ">
                        <div className="grid xl:grid-cols-2 grid-row-2 gap-4" >
                            <div className="p-5 rounded-10 border-2 border-solid border-[#384256] "  >

                                <ChartBox props={chartBoxUser} data={{ title: "Total User", number: users?.length }} />
                            </div>
                            <div className="p-5 rounded-10 border-2 border-solid border-[#384256]" >
                                <ChartBox props={chartBoxUser} data={{ title: "Total Owner", number: stores?.length }} />
                            </div>
                            <div className="p-5 rounded-10 border-2 border-solid border-[#384256]" >
                                <ChartBox props={chartBoxUser} data={{ title: "Total Order", number: orders?.length }} />
                            </div>
                            <div className="p-5 rounded-10 border-2 border-solid border-[#384256]" >
                                <ChartBox props={chartBoxUser} data={{ title: "Total Room", number: rooms?.length }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard;

export const chartBoxUser = {
    color: "#000000",
    icon: "/userIcon.svg",
    title: "Total Users",
    number: "11.238",
    dataKey: "users",
    percentage: 45,
    chartData: [
        { name: "Sun", users: 400 },
        { name: "Mon", users: 600 },
        { name: "Tue", users: 500 },
        { name: "Wed", users: 700 },
        { name: "Thu", users: 400 },
        { name: "Fri", users: 500 },
        { name: "Sat", users: 450 },
    ],
};
