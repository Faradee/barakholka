"use client";
import React, { useState, useEffect } from "react";
import { AiOutlineCaretDown, AiFillEdit } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import DropDownContainer from "../containers/DropDownContainer";
import styles from "./styles.module.css";
import Button from "../forms/Button";
import { deletePost } from "@/actions/postActions";
import { useRouter } from "next/navigation";
//TODO: ADD CONFIRMATION FOR DELETING
//ADD POST CHANGE
const PostActions = ({ postId }: { postId: number }) => {
  const [dropdown, setDropDown] = useState<boolean>(false);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const router = useRouter();
  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget)) setDropDown(false);
  };
  const handleDelete = async () => {
    const res = await deletePost(postId);
    if (res) {
      router.replace("/");
    }
  };
  useEffect(() => {
    setConfirmDelete(false);
  }, [dropdown]);
  return (
    <div onBlur={(e) => handleBlur(e)} className="relative">
      <div className="mb-1 flex h-full items-center border-2 border-l-0 border-gray-300 bg-gray-100 active:bg-gray-200">
        <button
          className="h-full w-full"
          title=""
          onClick={() => setDropDown(!dropdown)}
        >
          <AiOutlineCaretDown />
        </button>
      </div>
      {dropdown && (
        <DropDownContainer>
          <ul className={`${styles.list} text-lg font-normal`}>
            <li>
              <span className="mr-5">
                <AiFillEdit size={20} />
              </span>
              <span>Изменить объявление</span>
            </li>
            <li className={`${confirmDelete && styles.button}`}>
              {confirmDelete ? (
                <>
                  <span className="mr-5 w-1/2">Вы уверены?</span>
                  <span className="flex w-1/2">
                    <button
                      className="mr-5 flex w-full justify-center border-b  border-black hover:bg-slate-200 active:bg-slate-300"
                      onClick={() => setDropDown(false)}
                    >
                      Нет
                    </button>
                    <button
                      className="mr-5 flex w-full justify-center border-b border-black hover:bg-slate-200 active:bg-slate-300"
                      onClick={() => handleDelete()}
                    >
                      Да
                    </button>
                  </span>
                </>
              ) : (
                <>
                  <span className="mr-5">
                    <BsFillTrashFill size={20} />
                  </span>
                  <button onClick={() => setConfirmDelete(true)}>
                    Удалить объявление
                  </button>
                </>
              )}
            </li>
          </ul>
        </DropDownContainer>
      )}
    </div>
  );
};

export default PostActions;
