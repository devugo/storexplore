import AuthRoutes from './auth';
import AdminRoutes from './admin';
import GeneralRoutes from './general';

const Routes = () => {
    return (
        <>
            <GeneralRoutes />
            <AuthRoutes />
            <AdminRoutes />
        </>
    )
}

export default Routes;