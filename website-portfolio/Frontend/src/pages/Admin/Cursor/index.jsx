// src/components/CursorSettings.js
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setColor, setSize } from "../../../Redux/slice/CursorSlice";

import "./style.css"
import GlobalCursor from "../../../components/Admin/GlobalCursor";


function Cursor() {
  const dispatch = useDispatch();
  const { size, color } = useSelector((state) => state.cursor);
  return (
    <div className="content">
    <div className="cursor-wrapper">
    <div className="cursor-settings">

<h2>Cursor Settings</h2>
<div className="setting">
  <label>Color:</label>
  <input
    type="color"
    value={color}
    onChange={(e) => dispatch(setColor(e.target.value))}
  />
</div>
<div className="setting">
  <label>Size:</label>
  <input
    type="number"
    value={size}
    onChange={(e) => dispatch(setSize(Number(e.target.value)))}
    min={0}
    max={50}
  />
</div>
<GlobalCursor />
</div>
    </div>
    </div>
  );
}

export default Cursor;