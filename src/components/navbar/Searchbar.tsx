import { useCallback } from "react";
import { FaSearch } from "react-icons/fa";
import { useRouter, useSearchParams } from "next/navigation";
//TODO: LINK SEARCH TO SEARCHPARAMS
const Searchbar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query = new FormData(e.currentTarget).get("query")! as string;
    router.replace("/?" + createQueryString("search", query));
  };
  return (
    <form
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
        <FaSearch size={30} />
      </button>
    </form>
  );
};

export default Searchbar;
