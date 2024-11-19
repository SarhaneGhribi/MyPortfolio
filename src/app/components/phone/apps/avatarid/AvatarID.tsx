import React, { useEffect, useState } from "react";
import AvatarIdCarousel from "./AvatarIDCarousel";
import Ekyc from "./Liveness";

function AvatarID() {
  const [currentImageIndex, setCurrentImageIndex] = useState(1);
  useEffect(() => {
    console.log("Current Image Index Updated:", currentImageIndex);
  }, [currentImageIndex]);
  return (
    <>
      {currentImageIndex >= 1 && currentImageIndex <= 7 && (
        <>
          {console.log("Rendering First AvatarIdCarousel")}
          <AvatarIdCarousel
            currentIndex={currentImageIndex}
            setCurrentIndex={setCurrentImageIndex}
            totalScreens={7}
          />
        </>
      )}
      {currentImageIndex === 8 && (
        <>
          {console.log("Rendering Ekyc")}
          <Ekyc
            currentIndex={currentImageIndex}
            setCurrentIndex={setCurrentImageIndex}
          />
        </>
      )}
      {currentImageIndex > 8 && currentImageIndex <= 23 && (
        <>
          {console.log("Rendering Second AvatarIdCarousel")}
          <AvatarIdCarousel
            key={`carousel-${currentImageIndex}`}
            currentIndex={currentImageIndex}
            setCurrentIndex={setCurrentImageIndex}
            totalScreens={14}
          />
        </>
      )}
    </>
  );
}

export default AvatarID;
