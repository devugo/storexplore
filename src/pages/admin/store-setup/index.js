import SetupStoreimage from '../../../images/setup-store.svg';

import './store-setup.scss';

const StoreSetup = () => {
    return (
        <div className="store-setup">
            <div className="content">
                <div className="left">
                    <img className="setup-img" src={SetupStoreimage} alt="setup image" />
                    <h1>SETUP YOUR STORE</h1>
                    <p>Easiest way to manage your store; stock on goods and profit calculations.</p>
                </div>
                <div className="right"></div>
            </div>
        </div>
    )
}

export default StoreSetup;