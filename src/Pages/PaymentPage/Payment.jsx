import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import CheckoutForm from './CheckoutForm';
const stripePromise = loadStripe('pk_test_51PKh1BC661GdDglzwgjRdi4Gfuq4LWXjfXj97XD2nJMng9yPPVqQjniEGcz4JDikiC5jxLeu88byFKViF01AA79D004hp4wTsG');

const Payment = () => {
    return (
        <div>
            <Elements stripe={stripePromise}>
                <CheckoutForm></CheckoutForm>
            </Elements>
        </div>
    );
};

export default Payment;