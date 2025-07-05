import React, { useState, useRef, useCallback, useEffect } from "react";
import type { Shape, ShapeType } from "../types/DrawingElement";
import Toolbar from "../components/Toolbar";
import Canvas from "../components/Canvas";
import Sidebar from "../components/Sidebar";

export default function DrawingAppPage() {
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [selectedShapeId, setSelectedShapeId] = useState<string | null>(null);
  const [currentTool, setCurrentTool] = useState<ShapeType | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const svgRef = useRef<SVGSVGElement>(null);

  const selectedShape =
    shapes.find((shape) => shape.id === selectedShapeId) || null;

  const handleShapeClick = useCallback((e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setSelectedShapeId(id);
  }, []);

  const startDrag = useCallback((e: React.MouseEvent, shape: Shape) => {
    e.stopPropagation();
    setSelectedShapeId(shape.id);
    setIsDragging(true);
    setOffset({ x: e.clientX - shape.x, y: e.clientY - shape.y });
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging || !selectedShape) return;
      const newX = e.clientX - offset.x;
      const newY = e.clientY - offset.y;

      setShapes((prev) =>
        prev.map((shape) => {
          if (shape.id !== selectedShape.id) return shape;
          if (shape.type === "line") {
            const dx = newX - shape.x;
            const dy = newY - shape.y;
            return {
              ...shape,
              x: newX,
              y: newY,
              x2: shape.x2 + dx,
              y2: shape.y2 + dy,
            };
          }
          return { ...shape, x: newX, y: newY };
        })
      );
    },
    [isDragging, offset, selectedShape]
  );

  const handleMouseUp = useCallback(() => setIsDragging(false), []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  const updateSelectedShape = (updates: Partial<Shape>) => {
    if (!selectedShape) return;
    setShapes(
      (prev) =>
        prev.map((shape) =>
          shape.id === selectedShape.id ? { ...shape, ...updates } : shape
        ) as Shape[]
    );
  };

  const deleteSelectedShape = () => {
    if (!selectedShape) return;
    setShapes((prev) => prev.filter((shape) => shape.id !== selectedShape.id));
    setSelectedShapeId(null);
  };

  const saveDrawing = () => {
    localStorage.setItem("drawing", JSON.stringify(shapes));
    alert("Saved");
  };

  const loadDrawing = () => {
    const data = localStorage.getItem("drawing");
    if (data) {
      setShapes(JSON.parse(data));
      alert("Loaded");
    }
  };

  return (
    <div className="drawing-app">
      <Toolbar
        currentTool={currentTool}
        setCurrentTool={setCurrentTool}
        saveDrawing={saveDrawing}
        loadDrawing={loadDrawing}
      />

      <div className="canvas-wrapper">
        <Canvas
          shapes={shapes}
          currentTool={currentTool}
          setShapes={setShapes}
          setSelectedShapeId={setSelectedShapeId}
          svgRef={svgRef as React.RefObject<SVGSVGElement | null>}
          onShapeClick={handleShapeClick}
          onShapeDragStart={startDrag}
        />

        <Sidebar
          selectedShape={selectedShape}
          updateSelectedShape={updateSelectedShape}
          deleteSelectedShape={deleteSelectedShape}
        />
      </div>
    </div>
  );
}
