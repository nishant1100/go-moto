import axios from "axios";
import { useEffect, useState } from "react";
import './myRent.css';

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
            setUpcoming(res.data.upcoming_bookings);
            setPast(res.data.past_bookings);
        } catch (error) {
            console.error("Error fetching bookings", error);
            alert("Failed to load bookings.");
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = async (bookingId) => {
        try {
            await axios.post(
                `http://127.0.0.1:8000/api/cancel-booking/${bookingId}/`,
                {},
                {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                }
            );
            alert("Booking cancelled!");
            fetchBookings();
        } catch (error) {
            console.error("Cancel error", error);
            alert("Failed to cancel booking.");
        }
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
            {upcoming.map((booking) => (
                <div key={booking.id} className="booking-card">
                    <img
                        src={`http://127.0.0.1:8000${booking.car.image}`}
                        alt={booking.car.name}
                    />
                    <div className="booking-details">
                        <h4>{booking.car.name}</h4>
                        <p>
                            From: {new Date(booking.pick_up_date).toLocaleString()} <br />
                            To: {new Date(booking.drop_off_date).toLocaleString()}
                        </p>
                        <p>Total Price: {booking.total_price}</p>
                        <p>Status: {booking.status}</p>
                        <button onClick={() => handleCancel(booking.id)}>
                            Cancel Booking
                        </button>
                        {booking.status === "returned" && (
                            <button onClick={() => openReviewForm(booking.id)}>
                                Leave a Review
                            </button>
                        )}
                    </div>
                </div>
            ))}

            <h3>Past Bookings</h3>
            {past.length === 0 && <p>No past bookings.</p>}
            {past.map((booking) => (
                <div key={booking.id} className="booking-card">
                    <img
                        src={`http://127.0.0.1:8000${booking.car.image}`}
                        alt={booking.car.name}
                    />
                    <div className="booking-details">
                        <h4>{booking.car.name}</h4>
                        <p>
                            From: {new Date(booking.pick_up_date).toLocaleString()} <br />
                            To: {new Date(booking.drop_off_date).toLocaleString()}
                        </p>
                        <p>Total Price: {booking.total_price}</p>
                        <p>Status: {booking.status}</p>
                        {booking.status === "returned" && (
                            <button onClick={() => openReviewForm(booking.id)}>
                                Leave a Review
                            </button>
                        )}
                    </div>
                </div>
            ))}

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
                    <button
                        onClick={() => setReviewData({ bookingId: null, rating: "", comment: "" })}
                    >
                        Cancel
                    </button>
                </div>
            )}
        </div>
    );
};

export default MyRent;
