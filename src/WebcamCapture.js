import React, { useRef } from "react";

const WebcamCapture = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });

      if (videoRef.current && canvasRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (error) {
      console.error("Error accessing webcam:", error);
    }
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      // Set canvas dimensions to match the video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // Draw the current video frame on the canvas
      context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

      // Convert the canvas image to a data URL
      const imageDataURL = canvas.toDataURL();
      console.log("Captured image:", imageDataURL);
    }
  };

  return (
    <div>
      <button onClick={startWebcam}>Start Webcam</button>
      <button onClick={captureImage}>Capture Image</button>
      <video ref={videoRef}></video>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default WebcamCapture;
