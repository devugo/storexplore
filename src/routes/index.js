import AuthRoutes from './auth';
import AdminRoutes from './admin';

const Routes = () => {
    return (
        <>
            <AuthRoutes />
            <AdminRoutes />
        </>
    )
}

export default Routes;