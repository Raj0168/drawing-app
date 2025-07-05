import React from "react";
import type { Shape, ShapeType, Line } from "../types/DrawingElement";

interface CanvasProps {
  shapes: Shape[];
  currentTool: ShapeType | null;
  setShapes: React.Dispatch<React.SetStateAction<Shape[]>>;
  setSelectedShapeId: (id: string | null) => void;
  svgRef: React.RefObject<SVGSVGElement | null>;
  onShapeClick: (e: React.MouseEvent, id: string) => void;
  onShapeDragStart: (e: React.MouseEvent, shape: Shape) => void;
}

const DEFAULT_BORDER = "#333";
const DEFAULT_FILL = "#fff";
const CANVAS_WIDTH = "80%";
const CANVAS_HEIGHT = "100%";
const RECTANGLE_HEIGHT = 70;
const RECTANGLE_WIDTH = 100;
const LINE_LENGTH = 80;
const CIRCLE_RADIUS = 50;
const DEFAULT_STROKE = 2;

export default function Canvas({
  shapes,
  currentTool,
  setShapes,
  setSelectedShapeId,
  svgRef,
  onShapeClick,
  onShapeDragStart,
}: CanvasProps) {
  function handleCanvasClick(e: React.MouseEvent) {
    if (!svgRef.current) return;

    if (!currentTool) {
      alert("Select a Shape to draw first.");
      setSelectedShapeId(null);
      return;
    }

    const { left, top } = svgRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    const id = Date.now().toString();

    let newShape: Shape;
    switch (currentTool) {
      case "rectangle":
        newShape = {
          id,
          type: "rectangle",
          x,
          y,
          width: RECTANGLE_WIDTH,
          height: RECTANGLE_HEIGHT,
          stroke: DEFAULT_BORDER,
          strokeWidth: DEFAULT_STROKE,
          dash: "solid",
          fill: DEFAULT_FILL,
        };
        break;

      case "circle":
        newShape = {
          id,
          type: "circle",
          x,
          y,
          radius: CIRCLE_RADIUS,
          stroke: DEFAULT_BORDER,
          strokeWidth: DEFAULT_STROKE,
          dash: "solid",
          fill: DEFAULT_FILL,
        };
        break;

      case "line":
        newShape = {
          id,
          type: "line",
          x,
          y,
          x2: x + LINE_LENGTH,
          y2: y + LINE_LENGTH,
          stroke: DEFAULT_BORDER,
          strokeWidth: DEFAULT_STROKE,
          dash: "solid",
        };
        break;
    }

    setShapes((prev: Shape[]) => [...prev, newShape]);
    setSelectedShapeId(newShape.id);
  }

  return (
    <svg
      ref={svgRef}
      className="canvas"
      width={CANVAS_WIDTH}
      height={CANVAS_HEIGHT}
      onClick={handleCanvasClick}
    >
      {shapes.map((shape) => {
        const dashArray = shape.dash === "dashed" ? "5,5" : "none";
        const common = {
          stroke: shape.stroke,
          strokeWidth: shape.strokeWidth,
          strokeDasharray: dashArray,
          onMouseDown: (e: React.MouseEvent) => onShapeDragStart(e, shape),
          onClick: (e: React.MouseEvent) => onShapeClick(e, shape.id),
          style: { cursor: "move" as const },
        };

        if (shape.type === "rectangle") {
          return (
            <rect
              key={shape.id}
              {...common}
              x={shape.x}
              y={shape.y}
              width={shape.width}
              height={shape.height}
              fill={shape.fill}
            />
          );
        }

        if (shape.type === "circle") {
          return (
            <circle
              key={shape.id}
              {...common}
              cx={shape.x}
              cy={shape.y}
              r={shape.radius}
              fill={shape.fill}
            />
          );
        }

        const line = shape as Line;
        return (
          <line
            key={shape.id}
            {...common}
            x1={line.x}
            y1={line.y}
            x2={line.x2}
            y2={line.y2}
          />
        );
      })}
    </svg>
  );
}
