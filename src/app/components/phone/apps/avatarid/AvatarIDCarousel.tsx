import React, { useEffect } from "react";

interface AvatarIdCarouselProps {
  totalScreens: number;
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>; // Correct type for setter function:unknown;
}

const AvatarIdCarousel: React.FC<AvatarIdCarouselProps> = ({
  currentIndex,
  setCurrentIndex,
}) => {
  const goToNextImage = () => {
    setCurrentIndex((prevIndex: number) => Math.min(prevIndex + 1));
  };
  useEffect(() => {
    console.log("Current Index Updated:", currentIndex);
  }, [currentIndex]);
  const imagePath = `/avatarid/avatarid-${currentIndex}.png`;

  return (
    <div
      className="h-full w-full cursor-pointer rounded-[20px]"
      onClick={goToNextImage}
      style={{
        backgroundImage: `url("${imagePath}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    ></div>
  );
};

export default AvatarIdCarousel;
