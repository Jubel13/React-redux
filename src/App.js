import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useSelector, useDispatch } from "react-redux";
import { Fragment, useEffect } from "react";
import Notifications from "./components/UI/Notification";
import { sendCartData, fetchCartData } from "./store/cart-action";

let isInitial = true;

function App() {
    const cartShown = useSelector((state) => state.ui.isShown);
    const cart = useSelector((state) => state.cart);
    const notifications = useSelector((state) => state.ui.notifications);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCartData());
    }, [dispatch]);

    useEffect(() => {
        if (isInitial) {
            isInitial = false;
            return;
        }
        if (cart.changed) {
            dispatch(sendCartData(cart));
        }
    }, [cart, dispatch]);

    return (
        <Fragment>
            {notifications && (
                <Notifications
                    status={notifications.status}
                    title={notifications.title}
                    message={notifications.message}
                />
            )}
            <Layout>
                {cartShown && <Cart />}
                <Products />
            </Layout>
        </Fragment>
    );
}

export default App;
