import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Layout from "../../components/Shop/Layout/DashboardSideBar";
import { showLoading, hideLoading } from "../../redux/alertSlice";
import {toast} from 'react-hot-toast'
import axios from "axios";
import { Table } from "antd";
import moment from "moment";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import DashboardSideBar from "../../components/Shop/Layout/DashboardSideBar";

function ArtistsList() {
  const [artists, setArtists] = useState([]);
  const dispatch = useDispatch();
  const getArtistsData = async () => {
    try {
      dispatch(showLoading());
      const resposne = await axios.get("/api/v2/admin/get-all-artists", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(hideLoading());
      if (resposne.data.success) {
        setArtists(resposne.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  const changeArtistStatus = async (record, status) => {
    try {
      dispatch(showLoading());
      const resposne = await axios.post(
        "/api/v2/admin/change-artist-account-status",
        { artistId: record._id, userId: record.userId, status: status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (resposne.data.success) {
        toast.success(resposne.data.message);
        getArtistsData();
      }
    } catch (error) {
      toast.error('Error changing artist account status');
      dispatch(hideLoading());
    }
  };
  useEffect(() => {
    getArtistsData();
  }, []);
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => (
        <span>
          {record.firstName} {record.lastName}
        </span>
      ),
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (record , text) => moment(record.createdAt).format("DD-MM-YYYY"),
    },
    {
      title: "status",
      dataIndex: "status",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending" && (
            <h1
              className="anchor"
              onClick={() => changeArtistStatus(record, "approved")}
            >
              Approve
            </h1>
          )}
          {record.status === "approved" && (
            <h1
              className="anchor"
              onClick={() => changeArtistStatus(record, "blocked")}
            >
              Block
            </h1>
          )}
        </div>
      ),
    },
  ];
  return (
    <div>
    <DashboardHeader />
    <div className="flex justify-between w-full">
        <div className="w-[200px] 800px:w-[330px]">
          <DashboardSideBar active={12} />
        </div>
        <div className="w-full justify-center  flex">
        <h1 className="page-header">Artists List</h1>
      <hr /><br/>
       <Table columns={columns} dataSource={artists} />
        </div>
       </div>
    </div>


  );
}

export default ArtistsList;
