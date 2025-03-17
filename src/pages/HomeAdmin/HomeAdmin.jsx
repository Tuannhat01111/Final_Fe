import { Outlet } from "react-router-dom";
import AdminNavbar from '../../components/Navbar/AdminNavbar';
import MenuAdmin from '../../components/Menu/MenuAdmin'

const HomeAdmin = () => {
    return (
        <>
            <div>
                <AdminNavbar />
                <div className="flex">
                    <div className="w-1/6">
                        <MenuAdmin />
                    </div>
                    <div className="flex w-5/6  max-h-[93vh] max-w-full">
                        <Outlet/>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomeAdmin;
