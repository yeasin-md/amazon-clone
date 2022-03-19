import React, { useState } from 'react';
import './MyLocation.css';
import NotListedLocationIcon from '@material-ui/icons/NotListedLocation';
function MyLocation() {
  const [details, setDetails] = useState(null);
  const getUserGeolocationDetails = () => {
    fetch(
      'https://geolocation-db.com/json/e4f42070-ad2d-11eb-adf1-cf51da9b3410'
    )
      .then(response => response.json())
      .then(data => setDetails(data));
  };
  return (
    <div className="location">
      <div className="location__container">
        {details && (
          <div className="location__details">
            <p>
              Order to:{' '}
              {`${details.city}, ${details.country_name}(${details.country_code})`}
            </p>
            <p>IP: {details.IPv4}</p>
          </div>
        )}
        {/* <button className="findme__button" onClick={getUserGeolocationDetails}> */}
        Locate Me:
        <NotListedLocationIcon
          onClick={getUserGeolocationDetails}
          className="findme"
        />
      </div>
    </div>
  );
}

export default MyLocation;
