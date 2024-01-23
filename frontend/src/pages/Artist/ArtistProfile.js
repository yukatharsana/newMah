import { Button, Col, Form, Input, Row, TimePicker } from "antd";
import React, { useEffect, useState } from "react";
import Layout from "../../components/Profile/ProfileSidebar";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../../redux/alertSlice";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ArtistForm from "../../components/ArtistForm";
import moment from "moment";

function ArtistProfile() {
  const { user } = useSelector((state) => state.user);
  const params = useParams();
  const [artist, setArtist] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
  
      const response = await axios.post(
        "/api/v2/artist/update-artist-profile",
        {
          ...values,
          userId: user._id,
          timings: [
            moment(values.timings[0]).format("HH:mm"),
            moment(values.timings[1]).format("HH:mm"),
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
  
      dispatch(hideLoading());
  
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
  
      // Handle specific error cases if needed
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        toast.error(`Server Error: ${error.response.status}`);
      } else if (error.request) {
        // The request was made but no response was received
        toast.error("No response received from the server");
      } else {
        // Something happened in setting up the request that triggered an Error
        toast.error("An error occurred while processing the request");
      }
  
      // Log the error for further investigation
      console.error("API Request Error:", error);
    }
  };
  

  const getArtistData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/v2/artist/get-artist-info-by-user-id",
        {
          userId: params.userId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      dispatch(hideLoading());
      if (response.data.success) {
        setArtist(response.data.data);
      }
    } catch (error) {
      console.log(error);
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getArtistData();
  }, []);
  return (
    <div>
      <h1 className="page-title">Artist Profile</h1>
      <hr />
      {artist && <ArtistForm onFinish={onFinish} initivalValues={artist} />}
    </div>
  );
}

export default ArtistProfile;
