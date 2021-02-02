//  Admin Pages
//  Store setup
import Dashboard from '../pages/admin/dashboard';
import StoreSetup from '../pages/admin/store-setup';

// Middlewares
import Admin from '../middlewares/Admin';
import AdminHasNoStore from '../middlewares/AdminHasNoStore';

const AdminRoutes = () => {
    return (
        <>
            <Admin exact path="/admin" component={Dashboard} />
            <AdminHasNoStore exact path="/admin/setup-store" component={StoreSetup} />
        </>
    )
}

export default AdminRoutes;