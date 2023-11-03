"use client";
import React, { useEffect, useState } from "react";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import {
  findFavorite,
  setFavorite,
  unsetFavorite,
} from "@/actions/postActions";
const Favorite = ({ postId }: { postId: number }) => {
  const [favorited, setFavorited] = useState<boolean>(false);
  const [favoriteCount, setFavoriteCount] = useState<number>(0);
  const updateFavorite = async () => {
    const res = favorited
      ? await unsetFavorite(postId)
      : await setFavorite(postId);
    if (res) {
      setFavorited(!favorited);
    }
  };
  useEffect(() => {
    const fetchFavorite = async () => {
      const favorites = await findFavorite(postId);
      if (favorites) {
        setFavorited(favorites.favoritedByUser);
        setFavoriteCount(favorites.favoriteCount);
      }
    };
    fetchFavorite();
  }, [postId, favorited]);
  return (
    <form className="h-full border-2 border-gray-300 bg-gray-100 p-0.5 active:bg-gray-200">
      <button
        title="Добавить в закладки"
        onClick={(e) => {
          e.preventDefault();
          updateFavorite();
        }}
        className="flex items-center"
      >
        <span className="mr-2">{favoriteCount}</span>
        {favorited ? <AiFillStar color="yellow" /> : <AiOutlineStar />}
      </button>
    </form>
  );
};

export default Favorite;
