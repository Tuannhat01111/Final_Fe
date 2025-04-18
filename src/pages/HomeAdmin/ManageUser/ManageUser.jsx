import { Button, Space, Table, Tag } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { activeUser, bandUser, getAllUser } from '../../../redux/auth/authThunks';
import './User.scss';
const { Column } = Table;

const ManagerUser = () => {
    const dispatch = useDispatch()
    const {users} = useSelector((state) => state.auth)

    const activeUserButton = (id, isBanned) =>{
        if(isBanned === true){
            return dispatch(activeUser(id))
        }
        dispatch(bandUser(id))
    }
    
    useEffect(()=>{
        dispatch(getAllUser())
    },[])
    return (
        <>
            <div className='flex flex-col w-full bg-[#ffffff] '>
                <div className='px-6 py-8' >
                    <h1 className='text-dark text-3xl font-bold'> Manage Users</h1>
                </div>
                <div className='flex w-full px-6'>
       
                <Table dataSource={users}>
                <Column title="Full Name" dataIndex={['profile', 'fullName']} key="profile.fullName" />
                    <Column title="Email" dataIndex="email" key="email" />
                    <Column title="Address" dataIndex={['profile', 'address']} key="profile.address" />
                    <Column
                        title="isActive"
                        dataIndex="isBanned"
                        key="isBanned"
                        render={(text, record) => (
                            <span style={{ color: record.isBanned ? 'red' : 'green' }}>
                              {record.isBanned  ? 'Banned' : 'Active'}
                            </span>
                          )}
                    />
                    <Column
                        title="Action"
                        key="action"
                        render={(_, record) => (
                            <Space size="middle">
                                <Button onClick={()=>{activeUserButton(record?.id, record?.isBanned)}}>{record.isBanned? 'Active User' : 'Ban User'} </Button>
                            </Space>
                        )}
                    />
                </Table>
                             
                </div>
            </div>
        </>
    )
}

export default ManagerUser;