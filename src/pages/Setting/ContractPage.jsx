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
                        <h1 className='text-xl font-bold text-center'>NÂNG CẤP LÊN VAI TRÒ CHỦ KHÁCH SẠN</h1>
                        <div className="contract-details">
                            <h2 className="font-semibold text-lg mb-4">1. Thông tin về các bên:</h2>
                            <div className="flex flex-col lg:flex-row gap-8">
                                <div className="party w-full lg:w-1/2">
                                    <h3 className="font-semibold text-base mb-2">Bên A ({profile?.fullName}):</h3>
                                    <p>Tên: {profile?.fullName}</p>
                                    <p>Địa chỉ: {profile?.address}</p>
                                    <p>Số điện thoại: {profile?.phone}</p>
                                </div>
                                <div className="party w-full lg:w-1/2">
                                    <h3 className="font-semibold text-base mb-2">Bên Quản Lý Nền Tảng:</h3>
                                    <p>Tên: Ha Tuan Nhat</p>
                                    <p>Địa chỉ: Cẩm Lệ, Đà Nẵng, Việt Nam</p>
                                    <p>Số điện thoại: 0354635678</p>
                                </div>
                            </div>
                        </div>

                        <div className="contract-details">
                            <h2>2. Mô tả dịch vụ:</h2>
                            <p>
                                Bên B đồng ý thực hiện việc nâng cấp tài khoản của Bên A từ vai trò "Người Dùng" lên "Chủ Khách Sạn" trên nền tảng quản lý và đặt phòng trực tuyến của mình. Thông qua việc nâng cấp này, Bên A sẽ được cấp quyền truy cập vào các tính năng nâng cao bao gồm: tạo và quản lý thông tin khách sạn, thêm và chỉnh sửa phòng, điều chỉnh giá, cập nhật tình trạng phòng trống, quản lý đơn đặt phòng, phản hồi đánh giá từ khách hàng, và theo dõi hiệu quả kinh doanh. Ngoài ra, Bên A cũng có thể tận dụng các công cụ tiếp thị và thống kê được cung cấp để tối ưu hóa hoạt động kinh doanh và nâng cao trải nghiệm người dùng. Việc vận hành và kiểm soát thông tin sẽ do Bên A toàn quyền quản lý dưới sự hỗ trợ kỹ thuật và nền tảng của Bên B.
                            </p>
                        </div>
                        <div className="contract-details">
                            <h2>3. Quyền và nghĩa vụ của Chủ Khách Sạn:</h2>
                            <p>
                                Bên A có trách nhiệm cung cấp đầy đủ, chính xác và kịp thời các thông tin liên quan đến khách sạn của mình bao gồm: tên khách sạn, địa chỉ, hình ảnh, mô tả, tiện ích, giá phòng, chính sách hoàn hủy, và các thông tin cần thiết khác để phục vụ cho việc hiển thị và tiếp thị trên nền tảng.
                            </p>
                            <p>
                                Bên A cam kết thường xuyên cập nhật thông tin khi có thay đổi nhằm đảm bảo tính minh bạch và tránh gây hiểu nhầm cho khách hàng sử dụng dịch vụ.
                            </p>
                            <p>
                                Bên A chịu hoàn toàn trách nhiệm trong việc vận hành, quản lý khách sạn của mình bao gồm: tiếp nhận và xử lý đơn đặt phòng, đảm bảo chất lượng dịch vụ, thực hiện đúng các cam kết với khách hàng, và giải quyết các khiếu nại phát sinh (nếu có).
                            </p>
                            <p>
                                Bên A cũng đồng ý tuân thủ đầy đủ các quy định, chính sách và điều khoản sử dụng của nền tảng do Bên B đưa ra trong suốt thời gian sử dụng dịch vụ.
                            </p>

                        </div>
                        <div className="contract-details">
                            <h2>4. Quyền và nghĩa vụ của Bên B:</h2>
                            <p>
                                Bên B có trách nhiệm cung cấp đầy đủ hệ thống công cụ, giao diện quản lý, và các chức năng cần thiết nhằm hỗ trợ Bên A trong việc đăng tải, chỉnh sửa, và quản lý thông tin khách sạn một cách dễ dàng và hiệu quả trên nền tảng.
                            </p>
                            <p>
                                Bên B cam kết đảm bảo hệ thống vận hành ổn định, liên tục và an toàn, đồng thời thực hiện bảo trì định kỳ để nâng cao chất lượng dịch vụ. Trường hợp xảy ra lỗi kỹ thuật, Bên B có nghĩa vụ xử lý và khắc phục sự cố trong thời gian sớm nhất.
                            </p>
                            <p>
                                Bên B sẽ cung cấp dịch vụ hỗ trợ kỹ thuật và chăm sóc khách hàng cho Bên A qua các kênh chính thức như email, điện thoại hoặc live chat, nhằm giải đáp thắc mắc và hỗ trợ vận hành khi cần thiết.
                            </p>
                            <p>
                                Bên B có quyền đưa ra các chính sách, quy định, và hướng dẫn nhằm đảm bảo tính đồng bộ, công bằng và hiệu quả của hệ thống. Bên A có trách nhiệm tuân thủ theo các chính sách này trong suốt thời gian hợp tác.
                            </p>

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
                                onBegin={() => { onBegin() }}
                            />
                            <div className='absolute bottom-2 right-6'>
                                <button className='mt-4' onClick={handleClear}>Clear</button>

                            </div>
                        </div>
                        <div className='flex flex-row w-full justify-center'>
                            <button
                                className="mt-4 max-w-[25%] bg-blue-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-full w-full"
                                onClick={handleSubmit}
                                type="submit"
                            >
                                Submit
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContractPage;
