import React from "react";
import { useDraggable } from "@dnd-kit/core";

export default function DraggableFolder({
  id,
  position,
  icon,
  name,
  onClick,
  onDragEnd,
  onContextMenu,
}) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });
  const style = {
    position: "absolute",
    left: position.x + (transform?.x || 0),
    top: position.y + (transform?.y || 0),
  };

  return (
    <div
      style={style}
      ref={setNodeRef}
      className="draggableFolder"
      onClick={onClick}
      onContextMenu={onContextMenu}
      onPointerUp={() => {
        if (transform) {
          onDragEnd(id, {
            x: position.x + transform.x,
            y: position.y + transform.y,
          });
        }
      }}
    >
      <div {...listeners} style={{ cursor: "grab" }}>
        {icon}
      </div>
      <div>{name}</div>
    </div>
  );
}
