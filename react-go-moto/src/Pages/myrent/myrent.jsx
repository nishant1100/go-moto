import axios from "axios";
import { useEffect, useState } from "react";
import './myRent.css';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const MyRent = () => {
    const [loading, setLoading] = useState(true);
    const [upcoming, setUpcoming] = useState([]);
    const [past, setPast] = useState([]);
    const [reviewData, setReviewData] = useState({
        bookingId: null,
        rating: "",
        comment: "",
    });

    const token = localStorage.getItem("token");

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const res = await axios.get("http://127.0.0.1:8000/api/my-bookings/", {
                headers: {
                    Authorization: `Token ${token}`,
                },
            });

            const upcomingData = res.data.upcoming_bookings;
            const pastData = res.data.past_bookings;
            const cancelled = JSON.parse(localStorage.getItem("cancelled_bookings") || "[]");
            const cleared = JSON.parse(localStorage.getItem("cleared_bookings") || "[]");

            const filteredUpcoming = upcomingData.filter(
                (b) => !cleared.includes(b.id) && !cancelled.includes(b.id)
            );
            const filteredPast = [...pastData];

            cancelled.forEach((id) => {
                const found = upcomingData.find((b) => b.id === id);
                if (found && !cleared.includes(found.id)) {
                    filteredPast.push({ ...found, status: "cancelled" });
                }
            });

            filteredUpcoming.forEach((booking) => {
                const tokenKey = `rent_token_${booking.id}`;
                let rentToken = localStorage.getItem(tokenKey);
                if (!rentToken) {
                    rentToken = `RENT-${booking.id}-${Math.floor(100000 + Math.random() * 900000)}`;
                    localStorage.setItem(tokenKey, rentToken);
                }
            });

            setUpcoming(filteredUpcoming);
            setPast(filteredPast);
        } catch (error) {
            console.error("Error fetching bookings", error);
            alert("Failed to load bookings.");
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = (bookingId) => {
        const cancelledBooking = upcoming.find((b) => b.id === bookingId);
        if (!cancelledBooking) return;

        toast.info(
            ({ closeToast }) => (
                <div>
                    <p><strong>Are you sure?</strong></p>
                    <div className="toast-buttons">
                        <button
                            className="cancel-confirm"
                            onClick={() => {
                                toast.dismiss("cancel-toast");
                                setLoading(true);
                                setTimeout(() => {
                                    const cancelled = JSON.parse(localStorage.getItem("cancelled_bookings") || "[]");
                                    if (!cancelled.includes(bookingId)) {
                                        cancelled.push(bookingId);
                                        localStorage.setItem("cancelled_bookings", JSON.stringify(cancelled));
                                    }
                                    const updatedUpcoming = upcoming.filter((b) => b.id !== bookingId);
                                    const updatedPast = [...past, { ...cancelledBooking, status: "cancelled" }];

                                    setUpcoming(updatedUpcoming);
                                    setPast(updatedPast);
                                    setLoading(false);

                                    toast.success("Booking cancelled successfully!");
                                }, 800);
                            }}
                        >
                            Confirm Cancel
                        </button>
                        <button className="cancel-back" onClick={() => toast.dismiss("cancel-toast")}>
                            Back
                        </button>
                    </div>
                </div>
            ),
            {
                containerId: "confirm-center",
                toastId: "cancel-toast",
                autoClose: false,
                closeOnClick: false,
                draggable: false,
            }
        );
    };

    const openReviewForm = (bookingId) => {
        setReviewData({ bookingId, rating: "", comment: "" });
    };

    const handleReviewSubmit = async () => {
        try {
            await axios.post(
                `http://127.0.0.1:8000/api/leave-review/${reviewData.bookingId}/`,
                {
                    rating: reviewData.rating,
                    comment: reviewData.comment,
                },
                {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                }
            );
            alert("Review submitted!");
            setReviewData({ bookingId: null, rating: "", comment: "" });
        } catch (error) {
            console.error("Review error", error);
            alert("Failed to submit review.");
        }
    };

    if (loading) return <p>Loading bookings...</p>;

    return (
        <div className="my-rent-container">
            <h2>My Bookings</h2>

            <h3>Upcoming Bookings</h3>
            {upcoming.length === 0 && <p>No upcoming bookings.</p>}
            <div className="booking-card-wrapper">
                {upcoming.map((booking) => {
                    const rentSummaryRaw = localStorage.getItem(`rent_summary_${booking.car.id}`);
                    const rentSummary = rentSummaryRaw ? JSON.parse(rentSummaryRaw) : null;
                    const paymentStatus = localStorage.getItem(`payment_status_${booking.car.id}`) || "unknown";
                    const rentToken = localStorage.getItem(`rent_token_${booking.id}`) || "N/A";

                    return (
                        <div key={booking.id} className="booking-card">
                            <div className="booking-image-wrapper">
                                <img src={`http://127.0.0.1:8000${booking.car.image}`} alt={booking.car.name} />
                                <p className="rent-token">Rent Token: <strong>{rentToken}</strong></p>
                            </div>

                            <div className="booking-details">
                                <h4>{booking.car.name}</h4>
                                <p>
                                    From: {new Date(booking.pick_up_date).toLocaleDateString()} <br />
                                    To: {new Date(booking.drop_off_date).toLocaleDateString()}
                                </p>
                                <p>Days: {rentSummary?.days || "N/A"}</p>
                                <p>Rate/day: Nrs. {rentSummary?.ratePerDay || "N/A"}</p>
                                <p>Total Price: Nrs.{rentSummary?.totalPrice || booking.total_price}</p>
                                <p>Payment Status: <strong>{paymentStatus}</strong></p>
                                <button onClick={() => handleCancel(booking.id)}>Cancel Booking</button>
                                {booking.status === "returned" && (
                                    <button onClick={() => openReviewForm(booking.id)}>Leave a Review</button>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            <h3>Cancelled Bookings</h3>
            {past.length === 0 && <p>No cancelled bookings.</p>}
            <div className="booking-card-wrapper">
                {past.map((booking) => {
                    const rentToken = localStorage.getItem(`rent_token_${booking.id}`) || "N/A";

                    const handleClearCancelled = (bookingId) => {
                        toast.warn(
                            ({ closeToast }) => (
                                <div>
                                    <p><strong>Clear this cancelled booking?</strong></p>
                                    <div className="toast-buttons">
                                        <button className="clear-confirm" onClick={() => {
                                            toast.dismiss();
                                            setLoading(true);
                                            setTimeout(() => {
                                                const cancelled = JSON.parse(localStorage.getItem("cancelled_bookings") || "[]");
                                                const updatedCancelled = cancelled.filter((id) => id !== bookingId);
                                                localStorage.setItem("cancelled_bookings", JSON.stringify(updatedCancelled));

                                                const cleared = JSON.parse(localStorage.getItem("cleared_bookings") || "[]");
                                                const updatedCleared = [...cleared, bookingId];
                                                localStorage.setItem("cleared_bookings", JSON.stringify(updatedCleared));

                                                localStorage.removeItem(`rent_token_${bookingId}`);
                                                const updatedPast = past.filter((b) => b.id !== bookingId);
                                                setPast(updatedPast);
                                                setLoading(false);
                                                toast.success("Booking cleared permanently.");
                                            }, 800);
                                        }}>Clear</button>
                                        <button className="cancel-back" onClick={() => toast.dismiss()}>Back</button>
                                    </div>
                                </div>
                            ),
                            { autoClose: false }
                        );
                    };

                    return (
                        <div key={booking.id} className="booking-card">
                            <div className="booking-image-wrapper">
                                <img src={`http://127.0.0.1:8000${booking.car.image}`} alt={booking.car.name} />
                                <p className="rent-token">Rent Token: <strong>{rentToken}</strong></p>
                            </div>
                            <div className="booking-details">
                                <h4>{booking.car.name}</h4>
                                <p>
                                    From: {new Date(booking.pick_up_date).toLocaleDateString()} <br />
                                    To: {new Date(booking.drop_off_date).toLocaleDateString()}
                                </p>
                                <p>Total Price: Nrs. {booking.total_price}</p>
                                <p>Status: {booking.status}</p>
                                {booking.status === "returned" && (
                                    <button onClick={() => openReviewForm(booking.id)}>Leave a Review</button>
                                )}
                                <button className="clear-cancelled-btn" onClick={() => handleClearCancelled(booking.id)}>
                                    Clear
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {reviewData.bookingId && (
                <div className="review-form">
                    <h4>Leave a Review</h4>
                    <label>
                        Rating (1-5):
                        <input
                            type="number"
                            min="1"
                            max="5"
                            value={reviewData.rating}
                            onChange={(e) =>
                                setReviewData({ ...reviewData, rating: e.target.value })
                            }
                        />
                    </label>
                    <br />
                    <label>
                        Comment:
                        <textarea
                            value={reviewData.comment}
                            onChange={(e) =>
                                setReviewData({ ...reviewData, comment: e.target.value })
                            }
                        />
                    </label>
                    <br />
                    <button onClick={handleReviewSubmit}>Submit Review</button>
                    <button onClick={() => setReviewData({ bookingId: null, rating: "", comment: "" })}>Cancel</button>
                </div>
            )}
        </div>
    );
};

export default MyRent;
