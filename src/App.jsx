import { useSelector } from 'react-redux'
import { useGetSongsQuery } from './redux/services/samespaceApi'
import { Song } from './components/Song'
import { Loader } from './components/Loader'
import { Error } from './components/Error'
import { Player } from './components/Player'
import { Sidebar } from './components/Sidebar'
import { useState } from 'react'

function App() {
  const { activeSong, isPlaying, currentIndex, bgColor, currentSongs } =
    useSelector((state) => state.player)
  const { data, isFetching, error } = useGetSongsQuery()
  const songs = data?.data

  const [toggleActiveTab, setToggleActiveTab] = useState(0)
  const [search, setSearch] = useState('')

  if (isFetching) return <Loader />
  if (error) return <Error />

  return (
    <main
      className="p-8 h-screen grid gap-12 md:flex"
      style={{ background: `linear-gradient(to right, ${bgColor}, #000)` }}
    >
      <Sidebar />
      <div className="hidden md:w-[432px] md:grid gap-6 py-2 h-fit">
        <nav className="flex gap-10">
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
        </nav>
        <div className="w-[400px] relative place-self-center ">
          <input
            className="w-full h-12 pl-4 pr-12 bg-white/[0.08] rounded-lg text-white focus:outline-none"
            type="search"
            placeholder="Search Song, Artist"
            onChange={(e) => setSearch(e.target.value)}
          />
          <img
            src="/public/search.svg"
            className="absolute top-2 right-2"
            alt="search"
          />
        </div>

        {!toggleActiveTab &&
          songs
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
