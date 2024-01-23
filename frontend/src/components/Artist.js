import React from "react";
import { useNavigate } from "react-router-dom";

function Artist({ artist }) {
  const navigate = useNavigate();
  return (
    <div
      className="card p-2 cursor-pointer"
      onClick={() => navigate(`/book-appointment/${artist._id}`)}
    >
      <h1 className="card-title">
        {artist.firstName} {artist.lastName}
      </h1>
      <hr />
      <p>
        <b>Phone Number : </b>
        {artist.phoneNumber}
      </p>
      <p>
        <b>Address : </b>
        {artist.address}
      </p>
      <p>
        <b>Timings : </b>
        {artist.timings[0]} - {artist.timings[1]}
      </p>
    </div>
  );
}

export default Artist;
