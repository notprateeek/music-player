import { useDispatch } from 'react-redux'
import {
  playPause,
  setActiveSong,
  setBgColor,
} from '../redux/features/playerSlice'
import { useState } from 'react'

export const Song = ({ index, song, songs, bgColor }) => {
  const coverBaseUrl = 'https://cms.samespace.com/assets/'

  const [songDuration, setSongDuration] = useState()

  const dispatch = useDispatch()

  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, songs, index, bgColor }))
    dispatch(setBgColor(song.accent))
    dispatch(playPause(true))
  }

  const formattedDuration = `${Math.floor(songDuration / 60)}:${`0${Math.floor(
    songDuration % 60,
  )}`.slice(-2)}`

  return (
    <div
      className="cursor-pointer h-[80px] flex p-4 justify-between items-center"
      onClick={handlePlayClick}
    >
      <div className="flex gap-4">
        <img
          src={`${coverBaseUrl}${song.cover}`}
          className="w-12 h-12 rounded-full"
          alt="song cover"
        />
        <div className="grid">
          <span className="text-lg text-white">{song.name}</span>
          <span className="text-lg text-white/60">{song.artist}</span>
        </div>
      </div>
      <span className="text-lg text-white/60">{formattedDuration}</span>
      <audio
        hidden
        controls
        src={song.url}
        onLoadedMetadata={(e) => {
          setSongDuration(e.target.duration)
        }}
      />
    </div>
  )
}
