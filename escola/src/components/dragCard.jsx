import React from "react";
import { useDraggable } from "@dnd-kit/core";

export default function DraggableCard({
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
      {...listeners}
      {...attributes}
      className="draggableCard"
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
      {icon}
      {name}
    </div>
  );
}
