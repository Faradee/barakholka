"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { useRouter } from "next/navigation";

const PaginationSwitch = ({ lastPage }: { lastPage: boolean }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const createQueryString = useCallback(
    (name: string, value: string | number) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value.toString());

      return params.toString();
    },
    [searchParams],
  );
  const handlePagination = useCallback(
    (pageNumber: number) => {
      const hasQuery = !searchParams.has("page") && searchParams.size !== 0;
      router.replace(pathname + "?" + createQueryString("page", pageNumber));
    },
    [router, searchParams, createQueryString, pathname],
  );

  return (
    <div className="flex items-center justify-center">
      <button
        title="Предыдущая страница"
        className={
          searchParams.has("page") && searchParams.get("page") !== "1"
            ? ""
            : "pointer-events-none opacity-0"
        }
        onClick={() =>
          handlePagination(parseInt(searchParams.get("page")!) - 1)
        }
      >
        <AiOutlineArrowLeft size={32} color="black" />
      </button>

      <span className="m-2 w-8 border-2 border-black p-2 text-center">
        {searchParams.get("page") ? searchParams.get("page") : 1}
      </span>

      <button
        title="Следующая страница"
        className={!lastPage ? "" : "pointer-events-none opacity-0"}
        onClick={() => {
          const page = searchParams.has("page")
            ? parseInt(searchParams.get("page")!) + 1
            : 2;
          handlePagination(page);
        }}
      >
        <AiOutlineArrowRight size={32} color="black" />
      </button>
    </div>
  );
};

export default PaginationSwitch;
