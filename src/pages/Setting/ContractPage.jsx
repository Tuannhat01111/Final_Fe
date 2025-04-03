import React, { useEffect, useRef, useState } from 'react';
import './ContractPage.css';
import SignaturePad from 'react-signature-pad-wrapper'
import BreadcrumbSetting from './Breadcrumb';
import { jwtDecode } from "jwt-decode";
import { getProfileByUserID } from '../../redux/Profile/ProfileThunks';
import { useDispatch, useSelector } from "react-redux";
import { upgrateToOwnerStore } from '../../redux/UserRole/UserRoleThunks';

function ContractPage() {
    const sigPadRef = useRef(null);
    const [isSigned, setIsSigned] = useState(false);
    const [signatureData, setSignatureData] = useState('');
    const user = jwtDecode(localStorage.getItem('token'))
    const dispatch = useDispatch()
    const { profile } = useSelector((state) => state.profile)

    const handleSubmit = () => {
        if (sigPadRef.current != null) {
            sigPadRef.current.clear();
            setIsSigned(false);
            dispatch(upgrateToOwnerStore())
        }
    };

    const handleClear = () => {
        if (sigPadRef.current) {
            sigPadRef.current.clear();
            setIsSigned(false);
        }
    };

    useEffect(() => {
        dispatch(getProfileByUserID(user?.UserId));
    }, []);


useEffect(() => {
    const interval = setInterval(() => {
      if (sigPadRef.current && !sigPadRef.current.isEmpty()) {
        const data = sigPadRef.current.toDataURL();
        if (data !== signatureData) {
          setSignatureData(data);
          setIsSigned(true);
        }
      }
    }, 500);

    return () => clearInterval(interval); 
  }, [signatureData]);

    const onBegin = () => {
        setIsSigned(true);
    };
    return (
        <div className="sm:container px-6 lg:mx-auto">
            <div className="flex flex-col w-full md:mx-12 lg:px-36 py-14  gap-4">
                <BreadcrumbSetting />
                <div className='flex mx-2 sm:mx-6 xl:mx-28'>

                    <div className="flex flex-col w-full  px-4 py-4 rounded-lg border border-gray-300 contract-page" >
                        <h1 className='text-xl font-bold text-center'>HỢP ĐỒNG NÂNG CẤP VAI TRÒ CHỦ KHÁCH SẠN</h1>
                        <div className="contract-details">
                            <h2>1. Thông tin về các bên:</h2>
                            <div className="party">
                                <h3>Bên A ({profile?.fullName}):</h3>
                                <p>Tên: {profile?.fullName}</p>
                                <p>Địa chỉ: {profile?.address}</p>
                                <p>Số điện thoại: {profile?.phone}</p>
                            </div>
                            <div className="party">
                                <h3>Bên B:</h3>
                                <p>Tên:  DBN</p>
                                <p>Địa chỉ: Hải châu, Đà Nẵng, Việt nam</p>
                                <p>Số điện thoại: 09999999999</p>
                            </div>
                        </div>
                        <div className="contract-details">
                            <h2>2. Mô tả dịch vụ:</h2>
                            <p>Bên B đồng ý nâng cấp vai trò từ "Người Dùng" lên "Chủ Khách Sạn" trên nền tảng của mình. Việc này cho phép Bên A quản lý và vận hành khách sạn của mình trực tuyến, bao gồm quản lý thông tin, đặt phòng, giá cả, và dịch vụ khác.</p>
                        </div>
                        <div className="contract-details">
                            <h2>3. Quyền và nghĩa vụ của Chủ Khách Sạn:</h2>
                            <p>Bên A cam kết cung cấp thông tin chính xác và cập nhật về khách sạn cho Bên B.</p>
                            <p>Bên A chịu trách nhiệm về quản lý và vận hành khách sạn, bao gồm chính sách giá, dịch vụ, và mọi hoạt động liên quan.</p>
                        </div>
                        <div className="contract-details">
                            <h2>4. Quyền và nghĩa vụ của Bên B:</h2>
                            <p>Bên B cam kết cung cấp công cụ và chức năng cho Bên A quản lý và tiếp thị khách sạn một cách hiệu quả trên nền tảng.</p>
                            <p>Bên B sẽ cung cấp hỗ trợ kỹ thuật và dịch vụ khách hàng cho Bên A khi cần thiết.</p>
                        </div>
                        <div className="contract-details">
                            <h2>5. Thanh toán và chi phí:</h2>
                            <p>Chi phí nâng cấp và sử dụng dịch vụ sẽ được thỏa thuận riêng giữa hai bên theo thỏa thuận.</p>
                        </div>
                        <div className="contract-details">
                            <h2>6. Thời hạn và chấm dứt hợp đồng:</h2>
                            <p>Hợp đồng này có hiệu lực từ ngày ký kết và kéo dài cho đến khi một bên thông báo việc chấm dứt hợp đồng cho bên kia với ít nhất [số ngày/tháng] thông báo trước.</p>
                        </div>
                        <div className="contract-details">
                            <h2>7. Điều khoản cuối cùng:</h2>
                            <p>Hai bên cam kết tuân thủ tất cả các điều khoản và điều kiện được quy định trong hợp đồng này.</p>
                        </div>
                        <div className="signatures">
                            <p>Bên A: [Chữ ký của Chủ Khách Sạn]</p>
                        </div>
                       
                        <div className='border border-gray-500 border-dashed mt-8 relative w-full h-[200px] overflow-hidden ' style={{ borderRadius: "20px" }}>
                            {!isSigned && <div style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'black',
                                pointerEvents: 'none', 
                            }}>Sign Here</div>}
                            <SignaturePad
                                ref={sigPadRef}
                                canvasProps={{ className: 'signature-canvas', width: '100%', height: '50%' }}
                                redrawOnResize={true}
                                options={{ minWidth: 1, maxWidth: 5, penColor: 'rgb(66, 133, 244)' }}
                                onBegin={()=>{onBegin()}}
                            />
                            <div className='absolute bottom-2 right-6'>
                             <button className='mt-4' onClick={handleClear}>Clear</button>

                            </div>
                        </div>
                        <div className='flex flex-row w-full justify-center'>

                        <button className='mt-4 bg-primary hover:bg-primary hover:opacity-85 py-1 rounded-lg text-dark w-1/5' onClick={handleSubmit}>Submit</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContractPage;
