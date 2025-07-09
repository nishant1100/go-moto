import React from 'react';
import './terms.css';

const TermsAndConditions = () => {
  return (
    <div className="terms-container">
      <h1 className="terms-title">Terms and Conditions for Go Moto</h1>
      <p className="terms-intro">
        Please read these terms and conditions carefully before using the car rental services.
      </p>
      <ol className="terms-list">
        <li><strong>Eligibility:</strong> Customers must be at least 21 years old with a valid driving license.</li>
        <li><strong>Booking:</strong> All bookings must be made online through the official Go Moto website.</li>
        <li><strong>Payment:</strong> Full payment is required to confirm your reservation.</li>
        <li><strong>Identification:</strong> You must present a government-issued photo ID and a valid driving license at pickup.</li>
        <li><strong>Rental Period:</strong> Vehicles can only be rented for a maximum of 7 days per booking.</li>
        <li><strong>Cancellation Policy:</strong> Cancellations made within 24 hours of the pickup time may incur a cancellation fee.</li>
        <li><strong>Late Returns:</strong> A late fee will apply if the car is returned later than the agreed time.</li>
        <li><strong>Fuel Policy:</strong> Vehicles must be returned with the same fuel level as at the time of pickup.</li>
        <li><strong>Vehicle Condition:</strong> Cars must be returned in good condition. Damages may result in extra charges.</li>
        <li><strong>Prohibited Use:</strong> Vehicles cannot be used for illegal activities, racing, or off-road driving.</li>
        <li><strong>Accidents:</strong> Any accidents must be reported immediately to local authorities and Go Moto.</li>
        <li><strong>Insurance:</strong> Basic insurance is included. Additional coverage can be purchased during booking.</li>
        <li><strong>Driver Responsibility:</strong> The renter is responsible for the car and any fines or violations during the rental period.</li>
        <li><strong>Multiple Drivers:</strong> Additional drivers must be declared and approved by Go Moto.</li>
        <li><strong>Technical Failures:</strong> In the event of mechanical issues, Go Moto will arrange for replacement or refund.</li>
        <li><strong>Cleanliness:</strong> Please return the vehicle in a clean state. Excessive dirt may result in cleaning fees.</li>
        <li><strong>No Smoking:</strong> Smoking inside the car is strictly prohibited and may lead to a penalty.</li>
        <li><strong>Pet Policy:</strong> Transporting pets is only allowed with prior consent and must be done with proper carriers.</li>
        <li><strong>Location Restrictions:</strong> Vehicles are to be used only within Nepal unless otherwise permitted.</li>
        <li><strong>Dispute Resolution:</strong> Any disputes will be settled under the laws of Nepal.</li>
      </ol>
      <p className="terms-footer">
        By renting a vehicle from Go Moto, you agree to comply with all of the above terms and conditions.
      </p>
    </div>
  );
};

export default TermsAndConditions;
