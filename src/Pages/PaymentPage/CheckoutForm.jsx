import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useContext, useEffect, useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useCart from '../../Hooks/useCart';
import Swal from 'sweetalert2';
import { MediplusContext } from '../../Context/MediplusProvider';


const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure()
    const [cart, refetch] = useCart()
    const {user} = useContext(MediplusContext)
    const [clientSecret, setClientSecret] = useState('')
    const totalPrice = cart.reduce((acc, curr)=> acc + parseInt(curr.perUnitPrice), 0)
    console.log(totalPrice);
    useEffect(()=>{
        if(totalPrice > 0){
            axiosSecure.post("/create-payment-intent", {totalPrice})
        .then(res=> {
            // console.log(res.data);
            setClientSecret(res.data.clientSecret)
        })
        }
    },[axiosSecure, totalPrice])

    const handleSubmit = async (event) => {
        // Block native form submission.
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }



        // confirm payment
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
        }

        (async () => {
            const {paymentIntent, error} = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: card, /* 36 no line r card*/
                    billing_details: {
                        email: user?.email || 'Anonymous',
                        name: user?.displayName || 'Anonymous',
                    },
                },
            },);
            if (error) {
              console.log(error.message);
            } else if (paymentIntent && paymentIntent.status === 'succeeded') {
               
                // send payment info to backend
                const paymentInfo = {
                    name: user?.displayName,
                    userEmail: user?.email,
                    paidPrice: totalPrice,
                    TraxID: paymentIntent.id,
                    paymentMethod: 'card',
                    cartIds: cart.map(item=>  item._id),
                    date: new Date(),
                    status: 'pending'
                }

                const {data} = await axiosSecure.post('/payment', {paymentInfo})
                console.log(data); 
                if(data.result.acknowledged){
                    Swal.fire({
                        position: "top-center",
                        icon: "success",
                        title: "Payment Successful",
                        showConfirmButton: false,
                        timer: 1000
                    });
                }
                if(data.deleteCart.deletedCount > 0){
                    refetch()
                }
            }
          })();
    };
    return (
        <div className='w-2/5 mx-auto'>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <div className='text-center'>
                    <button className='btn bg-orange-400 px-8' type="submit" disabled={!stripe || !clientSecret}>Pay</button>
                </div>

            </form>
        </div>
    );
};

export default CheckoutForm;