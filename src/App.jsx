import { useSelector } from 'react-redux'
import { useGetSongsQuery } from './redux/services/samespaceApi'
import { Skeleton } from '@/components/ui/skeleton'
import { Error } from './components/Error'
import { Player } from './components/Player'
import { Sidebar } from './components/Sidebar'
import { useState } from 'react'
import { Nav } from './components/Nav'
import { Search } from './components/Search'
import { List } from './components/List'

const App = () => {
  const { activeSong, isPlaying, currentIndex, bgColor, currentSongs } =
    useSelector((state) => state.player)
  const { data, isFetching, error } = useGetSongsQuery()
  const songs = data?.data

  const [toggleActiveTab, setToggleActiveTab] = useState(0)
  const [search, setSearch] = useState('')

  if (isFetching)
    return (
      <div className="h-screen grid place-items-center place-content-center space-y-3">
        <Skeleton className="h-[125px] w-[250px] rounded-xl bg-white/[0.08]" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px] bg-white/[0.08]" />
          <Skeleton className="h-4 w-[200px] bg-white/[0.08]" />
        </div>
      </div>
    )
  if (error) return <Error />

  return (
    <main
      className="p-8 h-screen flex flex-col gap-12 xl:flex-row 2xl:gap-40"
      style={{ background: `linear-gradient(to right, ${bgColor}, #000)` }}
    >
      <Sidebar
        toggleActiveTab={toggleActiveTab}
        setToggleActiveTab={setToggleActiveTab}
        songs={songs}
        search={search}
        setSearch={setSearch}
      />
      <div className="hidden xl:w-[430px] xl:grid gap-6 py-1 h-fit">
        <Nav
          toggleActiveTab={toggleActiveTab}
          setToggleActiveTab={setToggleActiveTab}
        />
        <Search setSearch={setSearch} />
        <List toggleActiveTab={toggleActiveTab} songs={songs} search={search} />
      </div>
      <Player
        activeSong={activeSong}
        isPlaying={isPlaying}
        currentSongs={currentSongs}
        currentIndex={currentIndex}
      />
    </main>
  )
}

export default App
