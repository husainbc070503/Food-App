import { Flip, Slide, ToastContainer, Zoom, toast } from "react-toastify";
import { url } from "../../controllers/API";

const Payment = async (user, items, totalPrice) => {
    try {

        const res = await fetch(`${url}/api/order/pay`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`
            },
            body: JSON.stringify({
                purchasedProducts: JSON.stringify(items),
                totalPrice
            })
        })

        const data = await res.json();
        console.log(data)

        const options = {
            key: "rzp_test_FlqRfa8gpkyIvH",
            amount: data.amount,
            currency: data.currency,
            name: data.name,
            description: data.description,
            order_id: data.id,

            handler: function (response) {

                toast.info(`Payment Id: ${response.razorpay_payment_id}`, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Slide
                })

                toast.info(`Order Id: ${response.razorpay_order_id}`, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Flip
                })

                toast.success('Thank you for purchasing our products. Your product will be delivered soon to your address.', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Zoom
                })

            },

            prefill: {
                email: data.order.purchasedUser.email,
                name: data.order.purchasedUser.name
            }
        }

        const rzp = new window.Razorpay(options);
        rzp.open();
        <ToastContainer />

    } catch (error) {
        console.log(error);
    }
}

export default Payment
