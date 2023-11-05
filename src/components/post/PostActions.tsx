"use client";
import React, { useState, useEffect } from "react";
import { AiOutlineCaretDown, AiFillEdit } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import DropDownContainer from "../containers/DropDownContainer";
import styles from "./styles.module.css";
import { deletePost } from "@/actions/postActions";
import { useRouter, usePathname } from "next/navigation";
//ADD POST CHANGE
const PostActions = ({ postId }: { postId: number }) => {
  const [dropdown, setDropDown] = useState<boolean>(false);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();
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
      <button
        onClick={() => setDropDown(!dropdown)}
        className="mb-1 flex h-full w-full items-center border-2 border-l-0 border-gray-300 bg-gray-100 active:bg-gray-200"
      >
        <AiOutlineCaretDown />
      </button>
      {dropdown && (
        <DropDownContainer>
          <ul className={`${styles.list} text-lg font-normal`}>
            <li>
              <button
                className="flex w-full items-center"
                onClick={() => {
                  router.push(pathname + "/edit");
                }}
              >
                <span className="mr-5">
                  <AiFillEdit size={20} />
                </span>
                Изменить объявление
              </button>
            </li>
            <li className={`${confirmDelete}`}>
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
                <button
                  className="flex w-full items-center"
                  onClick={() => setConfirmDelete(true)}
                >
                  <span className="mr-5">
                    <BsFillTrashFill size={20} />
                  </span>
                  Удалить объявление
                </button>
              )}
            </li>
          </ul>
        </DropDownContainer>
      )}
    </div>
  );
};

export default PostActions;
