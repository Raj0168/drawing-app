import type { Shape } from "../types/DrawingElement";

interface SidebarProps {
  selectedShape: Shape | null;
  updateSelectedShape: (updates: Partial<Shape>) => void;
  deleteSelectedShape: () => void;
}

export default function Sidebar({
  selectedShape,
  updateSelectedShape,
  deleteSelectedShape,
}: SidebarProps) {
  const disabled = selectedShape === null;

  const hasFill = selectedShape !== null && selectedShape.type !== "line";

  return (
    <div
      className={`sidebar ${disabled ? "disabled" : ""}`}
      onClick={(e) => e.stopPropagation()}
    >
      <h3>Edit Shape</h3>

      <label>Stroke Color</label>
      <input
        type="color"
        value={selectedShape?.stroke ?? "#000000"}
        disabled={disabled}
        onChange={(e) =>
          selectedShape && updateSelectedShape({ stroke: e.target.value })
        }
      />

      <label>Fill Color</label>
      <input
        type="color"
        value={hasFill ? selectedShape.fill : "#ffffff"}
        disabled={disabled || !hasFill}
        onChange={(e) =>
          hasFill && updateSelectedShape({ fill: e.target.value })
        }
      />

      <label>Line Width</label>
      <input
        type="range"
        min={1}
        max={10}
        value={selectedShape?.strokeWidth ?? 1}
        disabled={disabled}
        onChange={(e) =>
          selectedShape &&
          updateSelectedShape({ strokeWidth: Number(e.target.value) })
        }
      />

      <label>Line Style</label>
      <select
        value={selectedShape?.dash ?? "solid"}
        disabled={disabled}
        onChange={(e) =>
          selectedShape &&
          updateSelectedShape({
            dash: e.target.value as "solid" | "dashed",
          })
        }
      >
        <option value="solid">Solid</option>
        <option value="dashed">Dashed</option>
      </select>

      <button
        className="delete-button"
        disabled={disabled}
        onClick={deleteSelectedShape}
      >
        Delete Shape
      </button>
    </div>
  );
}
