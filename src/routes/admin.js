//  Admin Pages
//  Store setup
import Dashboard from '../pages/admin/dashboard';
import StoreSetup from '../pages/admin/store-setup';

// Middlewares
import Admin from '../middlewares/Admin';
import AdminHasNoStore from '../middlewares/AdminHasNoStore';
import Supply from '../pages/admin/supply';

const AdminRoutes = () => {
    return (
        <>
            <Admin exact path="/admin" component={Dashboard} />
            <Admin exact path="/admin/supply" component={Supply} />
            <AdminHasNoStore exact path="/admin/setup-store" component={StoreSetup} />
        </>
    )
}

export default AdminRoutes;