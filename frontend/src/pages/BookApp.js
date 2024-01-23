import { Button, Col, DatePicker, Form, Input, Row, TimePicker } from "antd";
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import ArtistForm from "../components/ArtistForm";
import moment from "moment";
import { showLoading, hideLoading } from "../redux/alertSlice";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Profile/ProfileSidebar";

import moment from "moment";

function BookApp() {
  const [isAvailable, setIsAvailable] = useState(false);
  const navigate = useNavigate();
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const { user } = useSelector((state) => state.user);
  const [artist, setArtist] = useState(null);
  const params = useParams();
  const dispatch = useDispatch();

  const getArtistData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/v2/artist/get-artist-info-by-id",
        {
            artistId: params.artistId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      dispatch(hideLoading());
      if (response.data.success) {
        setDoctor(response.data.data);
      }
    } catch (error) {
      console.log(error);
      dispatch(hideLoading());
    }
  };
  const checkAvailability = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/v2/user/check-booking-avilability",
        {
            artistId: params.artistId,
          date: date,
          time: time,
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
        setIsAvailable(true);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error booking appointment");
      dispatch(hideLoading());
    }
  };
  const bookNow = async () => {
    setIsAvailable(false);
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/v2/user/book-appointment",
        {
            artistId: params.artistId,
          userId: user._id,
          artistInfo: artist,
          userInfo: user,
          date: date,
          time: time,
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
        navigate('/appointments')
      }
    } catch (error) {
      toast.error("Error booking appointment");
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getArtistData();
  }, []);
  return (
    <Layout>
    {artist && (
      <div>
        <h1 className="page-title">
          {artist.firstName} {artist.lastName}
        </h1>
        <hr />
        <Row gutter={20} className="mt-5" align="middle">

          <Col span={8} sm={24} xs={24} lg={8}>
            <img
              src="https://thumbs.dreamstime.com/b/finger-press-book-now-button-booking-reservation-icon-online-149789867.jpg"
              alt=""
              width="100%"
              height='400'
            />
          </Col>
          <Col span={8} sm={24} xs={24} lg={8}>
            <h1 className="normal-text">
              <b>Timings :</b> {artist.timings[0]} - {artist.timings[1]}
            </h1>
            <p>
              <b>Phone Number : </b>
              {artist.phoneNumber}
            </p>
            <p>
              <b>Address : </b>
              {artist.address}
            </p>
            
            <div className="d-flex flex-column pt-2 mt-2">
              <DatePicker
                format="DD-MM-YYYY"
                onChange={(value) => {
                  setDate(moment(value).format("DD-MM-YYYY"));
                  setIsAvailable(false);
                }}
              />
              <TimePicker
                format="HH:mm"
                className="mt-3"
                onChange={(value) => {
                  setIsAvailable(false);
                  setTime(moment(value).format("HH:mm"));
                }}
              />
            {!isAvailable &&   <Button
                className="primary-button mt-3 full-width-button"
                onClick={checkAvailability}
              >
                Check Availability
              </Button>}

              {isAvailable && (
                <Button
                  className="primary-button mt-3 full-width-button"
                  onClick={bookNow}
                >
                  Book Now
                </Button>
              )}
            </div>
          </Col>
         
        </Row>
      </div>
    )}
  </Layout>
  );
}

export default BookApp;
