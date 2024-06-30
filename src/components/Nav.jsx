export const Nav = ({ toggleActiveTab, setToggleActiveTab }) => {
  return (
    <>
      <nav className="flex gap-6 xl:gap-10">
        <span
          className={`cursor-pointer text-2xl font-bold ${
            !toggleActiveTab ? '' : 'text-white/50'
          }`}
          onClick={() => setToggleActiveTab(0)}
        >
          For You
        </span>
        <span
          className={`cursor-pointer text-2xl font-bold ${
            toggleActiveTab ? '' : 'text-white/50'
          }`}
          onClick={() => setToggleActiveTab(1)}
        >
          Top Tracks
        </span>
      </nav>
    </>
  )
}
