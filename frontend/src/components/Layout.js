import React, { useState } from "react";
//import "../layout.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Badge } from "antd";

function Layout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const location = useLocation();
  const userMenu = [

    {
      name: "Appointments",
      path: "/appointments",
      icon: "ri-file-list-line",
    },
    {
      name: "Apply Doctor",
      path: "/apply-doctor",
      icon: "ri-hospital-line",
    }
  ];

  const artistMenu = [

    {
      name: "Appointments",
      path: "/artist/appointments",
      icon: "ri-file-list-line",
    },
    {
      name: "Profile",
      path: `/atist/profile/${user?._id}`,
      icon: "ri-user-line",
    },
  ];

  const adminMenu = [
 
    {
      name: "Artists",
      path: "/admin/artistlist",
      icon: "ri-user-star-line",
    },

  ];

  const menuToBeRendered = user?.isAdmin ? adminMenu : user?.isArtist ? artistMenu : userMenu;
  const role = user?.isAdmin ? "Admin" : user?.isArtist ? "Artist" : "User";
  return (
    <div className="main">
      <div className="d-flex layout">
        <div className="sidebar">


          <div className="menu">
            {menuToBeRendered.map((menu) => {
              const isActive = location.pathname === menu.path;
              return (
                <div
                  className={`d-flex menu-item ${
                    isActive && "active-menu-item"
                  }`}
                >
                  <i className={menu.icon}></i>
                  {!collapsed && <Link to={menu.path}>{menu.name}</Link>}
                </div>
              );
            })}

          </div>
        </div>

        <div className="content">
          <div className="header">
            {collapsed ? (
              <i
                className="ri-menu-2-fill header-action-icon"
                onClick={() => setCollapsed(false)}
              ></i>
            ) : (
              <i
                className="ri-close-fill header-action-icon"
                onClick={() => setCollapsed(true)}
              ></i>
            )}

          </div>

          <div className="body">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
