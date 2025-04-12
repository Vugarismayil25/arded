import React, { useState } from 'react'
import "./style.css"
import { NavLink } from 'react-router'
import { FaBars, FaHome, FaUsers } from "react-icons/fa";
import { AiOutlineFileAdd } from "react-icons/ai";
import { RiImageAddFill } from "react-icons/ri";
import { BsCursorFill } from "react-icons/bs";
import { ImExit } from "react-icons/im";
import { TiDelete } from "react-icons/ti";
import { GrSystem } from "react-icons/gr";
import { jwtDecode } from "jwt-decode";
function Sidebar() {
  const [open, setOpen] = useState(false);
  const token = localStorage.getItem("token")
  let decode = jwtDecode(token)
  console.log(decode);
  return (
    <>
      <div className={`bars ${open ? "bars-open" : ""}`} onClick={() => setOpen(!open)}>

        {open ? <TiDelete /> : <FaBars />}
      </div>
      <div className={`sidebar ${open ? "open" : ""}`}>
        <h1>Admin Panel</h1>
        <ul>
          <li>

            <NavLink to={"/admin"} end style={({ isActive }) => isActive ? { backgroundColor: "#1E293B", color: "white" } : { backgroundColor: "#111827", color: "#7e8288" }} ><FaHome />Dashboard</NavLink>
          </li>
          {
            decode.role == "superadmin" ? (<li>

              <NavLink to={"/admin/users"} style={({ isActive }) => isActive ? { backgroundColor: "#1E293B", color: "white" } : { backgroundColor: "#111827", color: "#7e8288" }}><FaUsers />Users</NavLink>
            </li>) : ""
          }

          <li>

            <NavLink to={"/admin/add-category"} style={({ isActive }) => isActive ? { backgroundColor: "#1E293B", color: "white" } : { backgroundColor: "#111827", color: "#7e8288" }}><AiOutlineFileAdd />Add Category</NavLink>
          </li>
          <li>

            <NavLink to={"/admin/add-image"} style={({ isActive }) => isActive ? { backgroundColor: "#1E293B", color: "white" } : { backgroundColor: "#111827", color: "#7e8288" }}><RiImageAddFill />Add Image</NavLink>
          </li>
          <li>

            <NavLink to={"/admin/cursor"} style={({ isActive }) => isActive ? { backgroundColor: "#1E293B", color: "white" } : { backgroundColor: "#111827", color: "#7e8288" }}><BsCursorFill />Cursor</NavLink>
          </li>

          {
            decode.role == "superadmin" ? (   <li>

              <NavLink to={"/admin/system-log"} style={({ isActive }) => isActive ? { backgroundColor: "#1E293B", color: "white" } : { backgroundColor: "#111827", color: "#7e8288" }}><GrSystem />System Log</NavLink>
            </li>) : ""
          }
       
          <li>

            <NavLink to={"/"} style={({ isActive }) => isActive ? { backgroundColor: "#1E293B", color: "white" } : { backgroundColor: "#111827", color: "#7e8288" }}><ImExit />Logout</NavLink>

          </li>
        </ul>
      </div>
    </>

  )
}

export default Sidebar