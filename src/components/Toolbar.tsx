import type { ShapeType } from "../types/DrawingElement";

interface ToolbarProps {
  currentTool: ShapeType | null;
  setCurrentTool: (tool: ShapeType | null) => void;
  saveDrawing: () => void;
  loadDrawing: () => void;
}

export default function Toolbar({
  currentTool,
  setCurrentTool,
  saveDrawing,
  loadDrawing,
}: ToolbarProps) {
  const tools: ShapeType[] = ["rectangle", "circle", "line"];

  return (
    <div className="toolbar">
      <div className="tool-buttons">
        {tools.map((tool) => (
          <button
            key={tool}
            className={currentTool === tool ? "active" : ""}
            onClick={() => setCurrentTool(tool)}
          >
            {tool.charAt(0).toUpperCase() + tool.slice(1)}
          </button>
        ))}
      </div>
      <div className="action-buttons">
        <button onClick={saveDrawing}>Save</button>
        <button onClick={loadDrawing}>Load</button>
      </div>
    </div>
  );
}
