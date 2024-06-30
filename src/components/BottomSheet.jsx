import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Nav } from './Nav'
import { Search } from './Search'
import { List } from './List'

export const BottomSheet = ({
  toggleActiveTab,
  setToggleActiveTab,
  songs,
  search,
  setSearch,
}) => {
  return (
    <Drawer>
      <DrawerTrigger>
        <img src="/menu.svg" />
      </DrawerTrigger>
      <DrawerContent className="bg-neutral-900 border-neutral-900 h-[85%] px-2 md:px-8">
        <DrawerHeader className="flex justify-between my-6">
          <DrawerTitle className="flex gap-4">
            <Nav
              toggleActiveTab={toggleActiveTab}
              setToggleActiveTab={setToggleActiveTab}
            />
          </DrawerTitle>
          <DrawerClose>
            <img src="/close.svg" className="w-6 h-6" />
          </DrawerClose>
        </DrawerHeader>

        <div className="px-4">
          <Search setSearch={setSearch} />
          <div className="mt-8">
            <List
              toggleActiveTab={toggleActiveTab}
              songs={songs}
              search={search}
            />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
