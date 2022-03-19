import React, { useState } from 'react';

function LocationApi() {
  const [details, setDetails] = useState(null);
  const mylocation = () => {
    navigator.geolocation.getCurrentPosition().then(data => setDetails(data));
  };
  return (
    <div>
      <button onClick={mylocation}>My location</button>
      <p>{details}</p>
    </div>
  );
}

export default LocationApi;
