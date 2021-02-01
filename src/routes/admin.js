//  Admin Pages
import Dashboard from '../pages/admin/dashboard';

// Middlewares
import Auth from '../middlewares/Auth';

const AdminRoutes = () => {
    return (
        <>
            <Auth exact path="/admin" component={Dashboard} />
        </>
    )
}

export default AdminRoutes;