import { Table } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderByAdmin } from '../../../redux/order/orderThunks';
import './Order.scss';
const { Column } = Table;

const ManagerUser = () => {
    const dispatch = useDispatch()
    const orders = useSelector((state) => state.order.data)
    
    useEffect(()=>{
        dispatch(getOrderByAdmin())
    },[])
    return (
        <>
            <div className='flex flex-col w-full bg-[#ffffff] '>
                <div className='px-6 py-8' >
                    <h1 className='text-dark text-3xl font-bold'> Manage Orders</h1>
                </div>
                <div className='flex w-full px-6'>
       
                <Table dataSource={orders}>
                <Column title="ID" dataIndex={['id']} key="id" />
                    <Column title="Name Hotel Owner"  dataIndex={['room', 'email']} key="room.email" />
                    <Column title="Name Customer"  dataIndex={['user', 'userName']} key="user.userName" />
                    <Column title="Start Date" dataIndex="startDate" key="startDate" />
                    <Column title="End Date" dataIndex="endDate" key="endDate" />
                    <Column title="Price" dataIndex={['price']} key="price" />
                    <Column title="Room Name" dataIndex={['room', 'name']} key="room.name" />
                    <Column title="Country" dataIndex={['room', 'country']} key="room.country" />
                </Table>
                             
                </div>
            </div>
        </>
    )
}

export default ManagerUser;