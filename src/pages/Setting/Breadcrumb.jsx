import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';
import { useNavigate } from 'react-router-dom';

const BreadcrumbSetting = () => {
  const navigate = useNavigate()
  return (
    <Breadcrumb
    className='grid text-lg'
      items={[
        {
          className:' hover:bg-gray-200 hover:text-black',
          title: <HomeOutlined className='text-3xl text-center'/>,
          onClick: () => navigate('/')
        },
        {
          className:'flex flex-row item-center justify-center hover:bg-gray-200 hover:text-black',
          title: (
            <>
              <UserOutlined className='text-xl' />
              <span>Account Setting</span>
            </>
          ),
          onClick: () => navigate('/account-setting')
        },
        {
          title: 'User Infor',
        },
      ]}
    />
  )
}

export default BreadcrumbSetting;

