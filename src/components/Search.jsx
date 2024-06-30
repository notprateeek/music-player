export const Search = ({ setSearch }) => {
  return (
    <div className="w-full relative place-self-center ">
      <input
        className="w-full h-12 pl-4 pr-12 bg-white/[0.08] rounded-lg  focus:outline-none"
        type="search"
        placeholder="Search Song, Artist"
        onChange={(e) => setSearch(e.target.value.toLowerCase())}
      />
      <img src="/search.svg" className="absolute top-2 right-2" alt="search" />
    </div>
  )
}
