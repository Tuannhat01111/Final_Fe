import { Spin } from 'antd';
import './Spin.scss'
 const SpinLoading = () =>{
    return(
        <>
        <div className="flex justify-center items-center w-full h-[90vh] max-h-[98vh]">
            <Spin size="large"  />
        </div>
        </>
    )
}

export default SpinLoading