// src/components/GlobalCursor.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosition } from "../../Redux/slice/CursorSlice";
import "./Cursor.css"

function GlobalCursor() {
    const dispatch = useDispatch();
    const { position, size, color, visible } = useSelector((state) => state.cursor);

    useEffect(() => {
        const handleMouseMove = (event) => {
            dispatch(setPosition({ x: event.clientX, y: event.clientY }));
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [dispatch]);

    if (!visible) return null;

    return (
        <div
        className="custom-cursor"
            style={{
                position: "fixed",
                left: position.x - size,
                top: position.y - size,
                width: size * 2,
                height: size * 2,
                zIndex: 9999, 
                borderRadius: "50%",
                backgroundColor: color,
                pointerEvents: "none",
                boxShadow: `0 0 ${size * 2}px ${size * 2}px ${color}`,
                transition: "width 0.1s ease, height 0.1s ease",
                mixBlendMode: "difference",
            }}
        />
    );
}

export default GlobalCursor;