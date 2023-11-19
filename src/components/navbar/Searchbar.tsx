"use client";
import { useCallback, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useSearchParams, useRouter } from "next/navigation";
import { AiOutlineClose } from "react-icons/ai";
//TODO: ADD RESPONSIVENESS
const Searchbar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState<string>("");
  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (query !== "") {
        const params = new URLSearchParams(searchParams);
        params.set("search", query);
        if (params.has("page")) params.delete("page");
        router.replace("/?" + params.toString());
      }
    },
    [searchParams, query, router],
  );
  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="mx-5 flex h-full w-1/2 items-center justify-center rounded-xl"
    >
      <label className="relative flex h-full w-full flex-grow rounded-s-xl border border-black font-normal  outline-none focus-within:border-blue-500 ">
        <input
          className="h-full w-full rounded-s-xl px-2 outline-none"
          value={query}
          name="query"
          type="text"
          onChange={(e) => setQuery(e.currentTarget.value)}
        />
        {query && (
          <div
            onClick={() => setQuery("")}
            className="flex cursor-pointer items-center justify-center rounded-full p-1 hover:bg-slate-100 active:bg-slate-200"
          >
            <AiOutlineClose size={30} />
          </div>
        )}
      </label>

      <button
        type="submit"
        title="Поиск"
        className="flex h-full w-[50px] flex-grow-0 items-center justify-center rounded-e-xl border border-l-0 border-black active:bg-slate-50"
      >
        <CiSearch size={30} />
      </button>
    </form>
  );
};

export default Searchbar;
