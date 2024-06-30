import { useSelector } from 'react-redux'
import { Song } from './Song'

export const List = ({ toggleActiveTab, songs, search }) => {
  const { activeSong, isPlaying, bgColor } = useSelector(
    (state) => state.player,
  )
  return (
    <>
      {toggleActiveTab == 0 &&
        songs
          ?.filter((song) => {
            return search === ''
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
      {toggleActiveTab == 1 &&
        songs
          ?.filter((song) => song.top_track)
          .filter((song) => {
            return search === ''
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
    </>
  )
}
