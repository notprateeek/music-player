import { useRef, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { nextSong, playPause, prevSong } from '../redux/features/playerSlice'

export const Player = ({
  activeSong,
  isPlaying,
  currentSongs,
  currentIndex,
}) => {
  const ref = useRef(null)
  const dispatch = useDispatch()
  const coverBaseUrl = 'https://cms.samespace.com/assets/'
  const [mute, setMute] = useState(false)
  const [seekTime, setSeekTime] = useState(0)
  const [songTime, setSongTime] = useState(0)
  const [currentSongDuration, setCurrentSongDuration] = useState(null)

  useEffect(() => {
    if (ref.current) {
      if (isPlaying) {
        ref.current.play()
      } else {
        ref.current.pause()
      }
    }
  })

  const handlePlayPause = () => {
    isPlaying ? dispatch(playPause(false)) : dispatch(playPause(true))
  }

  const handleNextSong = () => {
    if (currentIndex < currentSongs.length - 1) {
      dispatch(nextSong((currentIndex + 1) % currentSongs.length))
    }
  }

  const handlePrevSong = () => {
    if (seekTime > 0) {
      setSeekTime(0)
    } else {
      if (currentIndex !== 0) {
        dispatch(prevSong(currentIndex - 1))
      }
    }
  }

  const handleMute = () => {
    if (ref.current) {
      setMute((prev) => !prev)
    }
  }

  useEffect(() => {
    mute ? (ref.current.volume = 0.0) : (ref.current.volume = 1.0)
  }, [mute])

  useEffect(() => {
    ref.current.currentTime = seekTime
  }, [seekTime])

  const formattedTime = `${Math.floor(songTime / 60)}:${`0${Math.floor(
    songTime % 60,
  )}`.slice(-2)}`

  const formattedDuration = `${Math.floor(
    currentSongDuration / 60,
  )}:${`0${Math.floor(currentSongDuration % 60)}`.slice(-2)}`

  return (
    <div className="w-full h-[inherit]">
      <audio
        src={activeSong?.url}
        ref={ref}
        onTimeUpdate={(event) => setSongTime(event.target.currentTime)}
        onEnded={handleNextSong}
        onLoadedData={(event) => setCurrentSongDuration(event.target.duration)}
      />

      <div className="w-full grid gap-8 h-fit">
        <div className="grid gap-2">
          {activeSong?.id ? (
            <span className="text-white text-[32px] font-bold">
              {activeSong.name}
            </span>
          ) : (
            <span className="text-white text-[32px] font-bold">Song title</span>
          )}
          {activeSong?.id ? (
            <span className="text-white/60 text-base">{activeSong.artist}</span>
          ) : (
            <span className="text-white/60 text-base">Song artist</span>
          )}
        </div>

        {activeSong?.id ? (
          <img
            src={`${coverBaseUrl}${activeSong.cover}`}
            className="rounded-lg"
            alt="song cover"
          />
        ) : (
          <div className="w-full aspect-square bg-white/[0.08]"></div>
        )}

        {activeSong?.id ? (
          <input
            type="range"
            value={songTime}
            min={0}
            max={currentSongDuration}
            onInput={(e) => setSeekTime(e.target.value)}
            className="appearance-none w-full overflow-hidden bg-white/20 rounded-2xl"
          />
        ) : (
          <div className="h-[6px] bg-white/[0.08] rounded-2xl"></div>
        )}

        <div className="flex w-full justify-between">
          <span className="text-white">{formattedTime}</span>
          <span className="text-white">{formattedDuration}</span>
        </div>
        <div className="flex justify-between">
          <img
            src="/public/menu.svg"
            className="cursor-pointer w-10 h-10 md:w-12 md:h-12"
          />
          <div className="flex gap-4 md:gap-8">
            <img
              src="/public/previous.svg"
              className="cursor-pointer w-10 h-10 md:w-12 md:h-12"
              onClick={activeSong?.id ? handlePrevSong : null}
            />
            {!isPlaying && (
              <img
                src="/public/play.svg"
                className="cursor-pointer w-10 h-10 md:w-12 md:h-12"
                onClick={activeSong?.id ? handlePlayPause : null}
              />
            )}
            {isPlaying && (
              <img
                src="/public/pause.svg"
                className="cursor-pointer w-10 h-10 md:w-12 md:h-12"
                onClick={activeSong?.id ? handlePlayPause : null}
              />
            )}
            <img
              src="/public/next.svg"
              className="cursor-pointer w-10 h-10 md:w-12 md:h-12"
              onClick={activeSong?.id ? handleNextSong : null}
            />
          </div>
          {!mute && (
            <img
              src="/public/volume.svg"
              width={48}
              height={48}
              className="cursor-pointer w-10 h-10 md:w-12 md:h-12"
              onClick={activeSong?.id ? handleMute : null}
            />
          )}
          {mute && (
            <img
              src="/public/mute.svg"
              width={48}
              height={48}
              className="cursor-pointer w-10 h-10 md:w-12 md:h-12"
              onClick={activeSong?.id ? handleMute : null}
            />
          )}
        </div>
      </div>
    </div>
  )
}
