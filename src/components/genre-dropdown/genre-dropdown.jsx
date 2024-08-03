import React from "react";
import { GenreItem } from "../genre-item/genre-item";
import { useState } from "react";

export const GenreDropdown = () => {

const genres = ["Horror", "Drama", "Action", "Mystery", "Fantasy", "Documentary"]

  return (
    <div className="genre-dropdown">
      <ul className="genre-dropdown-list">
        {genres.map((genre) => (
          <div key={genre}>
          <GenreItem genre={genre}/>
          </div>
        ))}
      </ul>
    </div>
  );
};
