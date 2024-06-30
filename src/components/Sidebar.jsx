import { BottomSheet } from '@/components/BottomSheet'

export const Sidebar = ({
  toggleActiveTab,
  setToggleActiveTab,
  songs,
  search,
  setSearch,
}) => {
  return (
    <aside className="flex justify-between h-fit xl:flex-col xl:h-full">
      <div className="xl:hidden">
        <BottomSheet
          toggleActiveTab={toggleActiveTab}
          setToggleActiveTab={setToggleActiveTab}
          songs={songs}
          search={search}
          setSearch={setSearch}
        />
      </div>
      <img src="/logo.svg" className="h-10 w-fit" />
      <img src="/user.svg" className="w-12 h-12" />
    </aside>
  )
}
