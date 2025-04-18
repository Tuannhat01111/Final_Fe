import { useDispatch, useSelector } from "react-redux";
import { closeDetails, openDetails } from "../../redux/modal/modalSlice";
import {  Modal } from 'antd';
import { useEffect } from "react";
import { getRoomById } from "../../redux/room/roomThunks";

const DetailsRoomModal = ({id}) => {
    const dispatch = useDispatch()
    const { isLoading } = useSelector((state) => state.auth)
    const open = useSelector((state) => state.modal.details)

    const onClose = () => {
        dispatch(closeDetails())
    }
    const {detail} = useSelector((state)=> state.room)
    const onOpen = () => {
        dispatch(openDetails())
    }

    useEffect(()=>{
        dispatch(getRoomById({id:id}))
    },[id])



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
                    <div className="max-h-[96]">
                        <img className="h-96 w-full object-cover" loading="lazy" src={detail?.roomImages?.[0]?.url} alt=""/>
                    </div>
                    <div className="flex flex-col gap-4">
                        <h1 className="text-xl font-medium">Address: {detail?.street} - {detail?.city} - {detail?.country}</h1>
                        <h1 className="text-xl font-medium"> Price:$ {detail?.price}</h1>
                    </div>
                    <div>
                    <div dangerouslySetInnerHTML={{ __html: detail?.description}}></div>
                    </div>
                </div>
                </>
            </Modal>
        </>
    );
};

export default DetailsRoomModal;