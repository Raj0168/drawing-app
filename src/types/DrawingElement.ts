export type ShapeType = "rectangle" | "circle" | "line";

export interface ShapeBase {
  id: string;
  type: ShapeType;
  x: number;
  y: number;
  stroke: string;
  strokeWidth: number;
  dash: "solid" | "dashed";
}

export interface Rectangle extends ShapeBase {
  type: "rectangle";
  width: number;
  height: number;
  fill: string;
}

export interface Circle extends ShapeBase {
  type: "circle";
  x: number;
  y: number;
  radius: number;
  fill: string;
}

export interface Line extends ShapeBase {
  type: "line";
  x2: number;
  y2: number;
}

export type Shape = Rectangle | Circle | Line;
