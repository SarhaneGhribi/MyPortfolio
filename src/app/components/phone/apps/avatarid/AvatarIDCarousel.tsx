import React from "react";

interface AvatarIdCarouselProps {
  totalScreens: number;
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>; // Correct type for setter function:unknown;
}

const AvatarIdCarousel: React.FC<AvatarIdCarouselProps> = ({
  totalScreens,
  currentIndex,
  setCurrentIndex,
}) => {
  const goToNextImage = () => {
    setCurrentIndex((prevIndex: number) =>
      Math.min(prevIndex + 1, totalScreens)
    );
  };

  const imagePath = `/avatarid/avatarid-${currentIndex}.png`;

  return (
    <div
      className="flex flex-col items-center cursor-pointer"
      onClick={goToNextImage}
      style={{
        backgroundImage: `url("${imagePath}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "95%",
        width: "90%",
        position: "absolute",
        borderRadius: "20px",
      }}
    ></div>
  );
};

export default AvatarIdCarousel;
