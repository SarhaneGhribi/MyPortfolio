import React, { useState, useEffect, useRef } from "react";
import {
  FaceLandmarker,
  FilesetResolver,
  DrawingUtils,
  NormalizedLandmark,
} from "@mediapipe/tasks-vision";
import { commands } from "../../../../constants/constants";

interface FacialExpression {
  index: number;
  score: number;
  categoryName: string;
  displayName: string;
}
interface FaceLandmarkResult {
  faceLandmarks?: NormalizedLandmark[][];
  faceBlendshapes?: {
    categories: FacialExpression[];
  }[];
}
type order = string;

interface Command {
  command: string;
  prediction: (facialExpressions: FacialExpression[]) => boolean;
}
interface LivenessProps {
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
}
const Liveness: React.FC<LivenessProps> = ({ setCurrentIndex }) => {
  const [webcamRunning, setWebcamRunning] = useState(false);
  const [results, setResults] = useState<FaceLandmarkResult | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [facialExpressions, setFacialExpressions] = useState<
    FacialExpression[]
  >([]);
  const [currentCommand, setCurrentCommand] = useState<string>("Turn left");
  const [completedCommands, setCompletedCommands] = useState<string[]>([]);

  useEffect(() => {
    handleEnableWebcam();
  }, []);

  const requestWebcamAccess = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      videoRef.current!.srcObject = stream;
      setWebcamRunning(true);

      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      const videoWidth = Math.min(screenWidth, screenHeight * (4 / 3));
      const videoHeight = videoWidth * (3 / 4);
      videoRef.current!.width = videoWidth;
      videoRef.current!.height = videoHeight;
    } catch (error) {
      console.error("Error accessing webcam:", error);
    }
  };
  const goToNextScreen = () => {
    setCurrentIndex((prevIndex: number) => Math.min(prevIndex + 1));
  };
  useEffect(() => {
    if (webcamRunning) {
      const createFaceLandmarker = async () => {
        const filesetResolver = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm"
        );
        const faceLandmarker = await FaceLandmarker.createFromOptions(
          filesetResolver,
          {
            baseOptions: {
              modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task`,
              delegate: "GPU",
            },
            outputFaceBlendshapes: true,
            runningMode: webcamRunning ? "VIDEO" : "IMAGE",
            numFaces: 1,
          }
        );

        const predictWebcam = async () => {
          if (!webcamRunning || !videoRef.current) return;

          if (
            videoRef.current.videoWidth > 0 &&
            videoRef.current.videoHeight > 0
          ) {
            const startTimeMs = performance.now();
            const results = await faceLandmarker.detectForVideo(
              videoRef.current,
              startTimeMs
            );

            setResults(results);
          } else {
            console.log("Video track not yet available");
          }

          window.requestAnimationFrame(predictWebcam);
        };
        await new Promise((resolve) => setTimeout(resolve, 100));
        predictWebcam();
      };
      createFaceLandmarker();
    }
  }, [webcamRunning]);

  const handleEnableWebcam = async () => {
    if (!webcamRunning) {
      await requestWebcamAccess();
    } else {
      if (webcamRunning && videoRef.current && videoRef.current.srcObject) {
        (videoRef.current.srcObject as MediaStream)
          .getTracks()
          .forEach((track: MediaStreamTrack) => track.stop());
        setWebcamRunning(false);
      }
    }
  };

  const renderFaceData: (expressions: FacialExpression[]) => React.ReactNode = (
    expressions: FacialExpression[]
  ) => {
    if (!expressions || expressions.length === 0) {
      return (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            backgroundColor: "black",
          }}
        >
          <p>No face detected</p>
        </div>
      );
    }

    const getRandomCommand = () => {
      const filteredCommands = commands.filter(
        (command) =>
          !completedCommands.includes(command.command) &&
          command.command !== currentCommand
      );

      if (filteredCommands.length === 0) {
        return null;
      }

      const randomIndex = Math.floor(Math.random() * filteredCommands.length);
      return filteredCommands[randomIndex];
    };

    const handleCommandCompletion = (command: Command) => {
      const temp: [order] = [command.command];
      if (completedCommands.length < 5) {
        setCompletedCommands(completedCommands.concat(temp));
        setCurrentCommand("");
      }
    };

    if (currentCommand === "" && facialExpressions.length > 0) {
      const command = getRandomCommand();
      if (command) {
        const isCommandCompleted = completedCommands.includes(command.command);
        const commandPrediction = command.prediction(facialExpressions);

        if (!isCommandCompleted && commandPrediction) {
          setCurrentCommand(command.command);
        }
      }
    }

    if (
      currentCommand &&
      facialExpressions.length > 0 &&
      completedCommands.length >= 4 &&
      completedCommands.includes("Smile")
    ) {
      goToNextScreen();
      return null; // Return null to prevent rendering the current command text
    }

    if (
      currentCommand &&
      facialExpressions.length > 0 &&
      completedCommands.length < 5
    ) {
      const currentCommandData = commands.find(
        (command) => command.command === currentCommand
      );
      if (
        currentCommandData &&
        currentCommandData.prediction(facialExpressions) &&
        completedCommands.length < 5
      ) {
        handleCommandCompletion(currentCommandData);

        const nextCommand =
          getRandomCommand() || commands.find((cmd) => cmd.command === "Smile");
        if (nextCommand) {
          setCurrentCommand(nextCommand.command);
        }
      }
    }

    return (
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          backgroundColor: "black",
        }}
      >
        <p>{currentCommand}</p>
      </div>
    );
  };

  useEffect(() => {
    if (!results) return;
    renderFaceData(facialExpressions);
  }, [facialExpressions, results]);

  const drawLandmarks = (
    ctx: CanvasRenderingContext2D,
    landmarks?: NormalizedLandmark[][]
  ) => {
    if (!landmarks) return;

    const drawingUtils = new DrawingUtils(ctx);
    for (const landmark of landmarks) {
      drawingUtils.drawConnectors(
        landmark,
        FaceLandmarker.FACE_LANDMARKS_TESSELATION,
        { color: "#C0C0C070", lineWidth: 1 }
      );
    }
  };

  useEffect(() => {
    if (!results || !canvasRef.current) return;

    const ctx = canvasRef.current.getContext("2d") as CanvasRenderingContext2D;
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    drawLandmarks(ctx, results.faceLandmarks);

    if (results.faceBlendshapes?.[0]?.categories) {
      const expressions = results.faceBlendshapes[0].categories.map(
        (category) => ({
          index: 0,
          score: category.score,
          categoryName: category.categoryName,
          displayName: category.displayName ?? "",
        })
      );
      setFacialExpressions(expressions);
    }
  }, [results]);

  const liveness = () => {
    return (
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0, // Ensure it starts from the left
          backgroundColor: "rgba(255, 255, 255, 0.8)", // Slight transparency for better visibility
          width: "100%", // Change to 100% to fit the parent width
          height: "10%", // Change to 100% to fit the parent height
          display: "flex", // Use flexbox for centering
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h3 style={{ fontSize: "24px", textAlign: "center", color: "black" }}>
          {currentCommand}
        </h3>
      </div>
    );
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%", // Ensure it takes the full width of the parent
        height: "100vh", // Set to full viewport height or use a specific height
        overflow: "hidden", // Prevent overflow
      }}
    >
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        style={{
          transform: "rotateY(180deg)",
          width: "100%", // Use 100% to fill the parent width
          height: "100%", // Use 100% to fill the parent height
          objectFit: "cover", // Maintain aspect ratio
        }}
      />
      {liveness()}
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
};

export default Liveness;
