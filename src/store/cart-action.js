import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

export const fetchCartData = () => {
    return async (dispatch) => {
        const fetchCart = async () => {
            const response = await fetch(
                "https://react-http-8325a-default-rtdb.firebaseio.com/cart.json"
            );
            if (!response.ok) {
                throw new Error("Failed to fetch");
            }

            const data = await response.json();
            return data;
        };

        try {
            const cartData = await fetchCart();
            dispatch(
                cartActions.replaceCart({
                    items: cartData.items || [],
                    totalQuantity: cartData.totalQuantity,
                })
            );
        } catch (error) {
            dispatch(
                uiActions.showNotifications({
                    title: "Error!",
                    status: "error",
                    message: "Sending Cart Data Failed!",
                })
            );
        }
    };
};

export const sendCartData = (cart) => {
    return async (dispatch) => {
        dispatch(
            uiActions.showNotifications({
                title: "Sending .....",
                status: "pending",
                message: "Sending Cart Data.....",
            })
        );

        const sendRequest = async () => {
            const response = await fetch(
                "https://react-http-8325a-default-rtdb.firebaseio.com/cart.json",
                {
                    method: "PUT",
                    body: JSON.stringify({
                        items: cart.items,
                        totalQuantity: cart.totalQuantity,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error("Sending Cart Data Failed!");
            }
        };

        try {
            await sendRequest();

            dispatch(
                uiActions.showNotifications({
                    title: "Success",
                    status: "success",
                    message: "Send Cart Data success!",
                })
            );
        } catch (error) {
            console.log(error);
            dispatch(
                uiActions.showNotifications({
                    title: "Error!",
                    status: "error",
                    message: "Sending Cart Data Failed!",
                })
            );
        }
    };
};
