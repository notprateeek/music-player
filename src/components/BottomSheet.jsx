import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { useSelector } from 'react-redux'
import { Song } from './Song'

export const BottomSheet = ({
  toggleActiveTab,
  setToggleActiveTab,
  songs,
  search,
  setSearch,
}) => {
  const { activeSong, isPlaying, bgColor } = useSelector(
    (state) => state.player,
  )
  return (
    <Drawer>
      <DrawerTrigger>
        <img src="/menu.svg" />
      </DrawerTrigger>
      <DrawerContent className="bg-neutral-900 border-neutral-900 h-[80%] px-2 md:px-8">
        <DrawerHeader className="flex justify-between my-6">
          <DrawerTitle className="flex gap-4">
            <span
              className={`cursor-pointer text-2xl font-bold ${
                !toggleActiveTab ? 'text-white' : 'text-white/50'
              }`}
              onClick={() => setToggleActiveTab(0)}
            >
              For You
            </span>
            <span
              className={`cursor-pointer text-2xl font-bold ${
                toggleActiveTab ? 'text-white' : 'text-white/50'
              }`}
              onClick={() => setToggleActiveTab(1)}
            >
              Top Tracks
            </span>
          </DrawerTitle>
          <DrawerClose>
            <img src="/close.svg" className="w-6 h-6" />
          </DrawerClose>
        </DrawerHeader>

        <div className="px-4">
          <div className="mb-8">
            <input
              className="w-full h-12 pl-4 pr-12 bg-white/[0.08] rounded-lg text-white focus:outline-none"
              type="search"
              placeholder="Search Song, Artist"
              onChange={(e) => setSearch(e.target.value)}
            />
            <img
              src="/search.svg"
              className="absolute top-2 right-2"
              alt="search"
            />
          </div>

          {!toggleActiveTab &&
            songs
              ?.filter((song) => {
                return search.toLowerCase() === ''
                  ? song
                  : song.name.toLowerCase().includes(search) ||
                      song.artist.toLowerCase().includes(search)
              })
              .map((song, index) => (
                <Song
                  key={song.id}
                  index={index}
                  song={song}
                  isPlaying={isPlaying}
                  activeSong={activeSong}
                  songs={songs}
                  bgColor={bgColor}
                />
              ))}
          {toggleActiveTab &&
            songs
              ?.filter((song) => song.top_track)
              .filter((song) => {
                return search.toLowerCase() === ''
                  ? song
                  : song.name.toLowerCase().includes(search) ||
                      song.artist.toLowerCase().includes(search)
              })
              .map((song, index) => (
                <Song
                  key={song.id}
                  index={index}
                  song={song}
                  isPlaying={isPlaying}
                  activeSong={activeSong}
                  songs={songs}
                  bgColor={bgColor}
                />
              ))}
        </div>
      </DrawerContent>
    </Drawer>
  )
}
