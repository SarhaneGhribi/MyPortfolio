export interface FacialExpression {
  index: number;
  score: number;
  categoryName: string;
  displayName: string;
}

export interface FaceLandmarkResult {
  faceLandmarks?: NormalizedLandmark[][];
  faceBlendshapes?: {
    categories: FacialExpression[];
  }[];
}

export type NormalizedLandmark = {
  x: number;
  y: number;
};
interface Command {
  command: string;
  prediction: (facialExpressions: FacialExpression[]) => boolean;
}

export const commands: Command[] = [
  {
    command: "Blink",
    //@ts-expect-error dont mind this

    prediction: (face) => {
      const eyeBlinkLeft = face.find(
        (expression) => expression.categoryName === "eyeBlinkLeft"
      );
      const eyeBlinkRight = face.find(
        (expression) => expression.categoryName === "eyeBlinkRight"
      );
      return (
        eyeBlinkLeft &&
        eyeBlinkRight &&
        eyeBlinkLeft.score > 0.5 &&
        eyeBlinkRight.score > 0.5
      );
    },
  },
  {
    command: "Turn left",
    prediction: (face) =>
      //@ts-expect-error dont mind this
      face.find((expression) => expression.categoryName === "jawLeft")?.score >
      0.02,
  },
  {
    command: "Turn right",
    prediction: (face) =>
      //@ts-expect-error dont mind this

      face.find((expression) => expression.categoryName === "jawRight")?.score >
      0.002,
  },
  {
    command: "Smile",
    //@ts-expect-error dont mind this

    prediction: (face) => {
      const smileLeft = face.find(
        (expression) => expression.categoryName === "mouthSmileLeft"
      );
      const smileRight = face.find(
        (expression) => expression.categoryName === "mouthSmileRight"
      );
      return (
        smileLeft &&
        smileRight &&
        smileLeft.score > 0.75 &&
        smileRight.score > 0.75
      );
    },
  },
];
