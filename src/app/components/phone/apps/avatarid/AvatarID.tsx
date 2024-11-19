import React, { useState } from "react";
import AvatarIdCarousel from "./AvatarIDCarousel";

function AvatarID() {
  const [currentImageIndex, setCurrentImageIndex] = useState(1);
  console.log("Current Image Index:", currentImageIndex);
  return (
    <>
      {currentImageIndex >= 1 && currentImageIndex <= 7 && (
        <AvatarIdCarousel
          currentIndex={currentImageIndex}
          setCurrentIndex={setCurrentImageIndex}
          totalScreens={7}
        />
      )}
    </>
  );
}

export default AvatarID;
