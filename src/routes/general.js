//  Admin Pages
import Home from '../pages/home';

// Middlewares
import Auth from '../middlewares/Auth';

const GeneralRoutes = () => {
    return (
        <>
            <Auth exact path="/" component={Home} />
        </>
    )
}

export default GeneralRoutes;