import { useCallback, useRef } from "react";
import { CiSearch } from "react-icons/ci";
import { useSearchParams, useRouter } from "next/navigation";
//TODO: ADD RESPONSIVENESS AND DELETE PAGE QUERY STRING ON SEARCH
const Searchbar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryRef = useRef<HTMLFormElement>(null);
  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const query = new FormData(e.currentTarget).get("query")! as string;
      if (query !== "") {
        const params = new URLSearchParams(searchParams);
        params.set("search", query);
        if (params.has("page")) params.delete("page");
        router.replace("/?" + params.toString());
      }
    },
    [searchParams, router],
  );
  return (
    <form
      ref={queryRef}
      onSubmit={(e) => handleSubmit(e)}
      className="mx-5 flex h-full w-1/2 items-center justify-center rounded-xl"
    >
      <input
        className="h-full w-full flex-grow rounded-s-xl border border-black px-2 outline-none focus-within:border-blue-500 "
        name="query"
        type="text"
      />

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
