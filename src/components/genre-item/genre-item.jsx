import { useState } from "react";
import React from "react";

export const GenreItem = ({ genre }) => {
  const [isHovered, setIsHovered] = useState(false);

  const imagesList = {
    Horror: {
      default: require("../../images/Yellow-Horror-Genre.png"),
      hovered: require("../../images/Horror-Genre.png")
    },
    Drama: {
      default: require("../../images/Yellow-Drama-Genre.png"),
      hovered: require("../../images/Drama-Genre.png")
    },
    Action: {
      default: require("../../images/Yellow-Action-Genre.png"),
      hovered: require("../../images/Action-Genre.png")
    },
    Mystery: {
      default: require("../../images/Yellow-Mystery-Genre.png"),
      hovered: require("../../images/Mystery-Genre.png")
    },
    Fantasy: {
      default: require("../../images/Yellow-Fantasy-Genre.png"),
      hovered: require("../../images/Fantasy-Genre.png")
    },
    Documentary: {
      default: require("../../images/Yellow-Documentary-Genre.png"),
      hovered: require("../../images/Documentary-Genre.png")
    }
  };

  const getImageSrc = () => {
    const images = imagesList[genre];
    return isHovered ? images.default : images.hovered;
  };

  return (
    <li
      className="menu-font-size genre-dropdown-item"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img alt="Menu Icon" className="menu-icon" src={getImageSrc()} />
      <p>{genre}</p>
    </li>
  );
};
