import { useDispatch, useSelector } from "react-redux";
import { closeDetailsChart, openDetailsChart } from "../../redux/modal/modalSlice";
import { Modal } from 'antd';
import { useEffect } from "react";
import { getRoomOrdersStatsById } from "../../redux/room/roomThunks";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const DetailsChartModal = ({ id }) => {
    const dispatch = useDispatch()
    const open = useSelector((state) => state.modal.detailsChart)
    const dataRoom = useSelector((state) => state.room.dataRoom)

    const onClose = () => {
        dispatch(closeDetailsChart())
    }
    const detail = useSelector((state) => state.room.detail)

    useEffect(() => {
        dispatch(getRoomOrdersStatsById(id))
    }, [id])

    return (
        <>
            <Modal
                title={detail?.name}
                centered
                open={open}
                onCancel={() => onClose()}
                width={1000}
                footer={null}
            >
                <>
                    <div className="flex flex-col px-4 max-h-[70vh] overflow-hidden overflow-y-auto">
                        <div className="flex w-full justify-center py-4 ">
                            <h1 className="text-3xl font-bold ">Chart </h1>

                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 ">
                            <div className="flex flex-col border border-gray-200 shadow-sm justify-center rounded-xl ">
                                <h1 className="text-lg sm:text-xl md:text-xl mb-5 font-semibold">Quantity Order By Weekly</h1>

                                <ResponsiveContainer width="100%" height={400}>
                                    <BarChart data={dataRoom.weeklyOrders}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip formatter={(value) => `${value.toLocaleString()}`} />
                                        <Legend />
                                        <Bar dataKey="quantity" fill="#8884d8" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="flex flex-col border border-gray-200 shadow-sm justify-center rounded-xl ">
                                <h1 className="text-lg sm:text-xl md:text-xl mb-5 font-semibold">Quantity Order By Monthly</h1>

                                <ResponsiveContainer width="100%" height={400}>
                                    <BarChart data={dataRoom.monthlyOrders}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip formatter={(value) => `${value.toLocaleString()}`} />
                                        <Legend />
                                        <Bar dataKey="quantity" fill="#8884d8" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>

                            <div className="flex flex-col border border-gray-200 shadow-sm justify-center rounded-xl ">
                                <h1 className="text-lg sm:text-xl md:text-xl mb-5 font-semibold">Quantity Order By Quarterly</h1>

                                <ResponsiveContainer width="100%" height={400}>
                                    <BarChart data={dataRoom.quarterlyOrders}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip formatter={(value) => `${value.toLocaleString()}`} />
                                        <Legend />
                                        <Bar dataKey="quantity" fill="#8884d8" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </>
            </Modal>
        </>
    );
};

export default DetailsChartModal;