import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import UseUserAuthInfo from '../../hooks/UseUserAuthInfo';
import UseAxiosPublic from '../../hooks/UseAxiosPublic';
import Swal from 'sweetalert2';

// publishable key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const CheckoutForm = () => {
    const { biodataId } = useParams();
    const { userMail, userName } = UseUserAuthInfo();
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const axiosPublic = UseAxiosPublic();
    const [clientSecret, setClientSecret] = useState(null);
    const [biodata, setBiodata] = useState({});
    const paymentAmount = 50 ;
    useEffect(() => {
        axiosPublic.post("/create-payment-intent", {price: paymentAmount})
            .then( res => {
                console.log(res.data.clientSecret);
                setClientSecret(res.data.clientSecret);
            })
    }, [axiosPublic]);

    useEffect(() => {
        axiosPublic.get(`/biodatas/biodata/${biodataId}`)
           .then(res => {
                setBiodata(res.data[0]);
            })
           .catch(err => {
                console.log(err);
            })
    }, [axiosPublic, biodataId]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        setLoading(true);
        setError(null);

        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardElement);

        try {
            const { paymentMethod, error } = await stripe.createPaymentMethod({
                type: 'card',
                card: cardElement,
            });

            if (error) {
                throw new Error(error.message);
            }

            // Todo: these data will go to server
            console.log('Payment Method:', paymentMethod);

            // Todo: will reset successful payment

        } catch (error) {
            setError(error.message);
        }

        // confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: cardElement,
                billing_details: {
                    email: userMail || 'anonymous',
                    name: userName || 'anonymous'
                }
            }
        })

        if (confirmError) {
            console.log('confirm error')
        }
        else {
            console.log('payment intent', paymentIntent)
            if (paymentIntent.status === 'succeeded') {
                console.log('transaction id', paymentIntent.id);

                // now save the payment in the database
                const payment = {
                    email: userMail,
                    price: paymentAmount,
                    transactionId: paymentIntent.id,
                    date: new Date(),
                    biodataId: biodata.biodataId,
                    name: biodata.name,
                    biodataStatus: biodata.biodataStatus,
                    status: 'pending'
                }

                const res = await axiosPublic.post('/premium-biodata-requests', payment);
                console.log('payment saved', res.data);
                if (res.data?.insertedId) {
                    axiosPublic.patch(`/biodatas/biodata/${biodata.biodataId}`, {requestedPremium: "pending"});
                    Swal.fire({
                        title: "Successfully placed your order!!!",
                        text: "Track your order now",
                        icon: "success",
                        showCancelButton: false,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Ok!"
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.href = '/dashboard';
                        }
                    });
                }

            }
        }

        setLoading(false);
    };

    return (
        <div className="container mx-auto p-8 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Request Biodata Premium Access</h2>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="mb-4">
                    <label className="block text-blue-600 font-bold mb-2">Biodata ID</label>
                    <input
                        type="text"
                        value={biodataId}
                        readOnly
                        className="w-full p-2 border border-blue-600 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-blue-600 font-bold mb-2">Your Email</label>
                    <input
                        type="email"
                        value={userMail}
                        readOnly
                        className="w-full p-2 border border-blue-600 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-blue-600 font-bold mb-2">Card Information</label>
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: '#32325d',
                                    '::placeholder': {
                                        color: '#a0aec0',
                                    },
                                },
                                invalid: {
                                    color: '#fa755a',
                                },
                            },
                        }}
                        className="w-full p-2 border border-blue-600 rounded"
                    />
                </div>
                {error && <div className="text-red-600 mb-4">{error}</div>}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white p-2 rounded font-bold"
                    disabled={loading || !clientSecret}
                >
                    {loading ? 'Processing...' : 'Submit Request'}
                </button>
            </form>
        </div>
    );
};

const CheckoutBiodata = () => {
    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm />
        </Elements>
    );
};

export default CheckoutBiodata;