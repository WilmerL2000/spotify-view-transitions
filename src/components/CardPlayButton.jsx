import { usePlayerStore } from '../store/playStore';
import { Pause, Play } from './Player';

export function CardPlayButton({ id, size = 'small' }) {
  const { currentMusic, isPlaying, setIsPlaying, setCurrentMusic } =
    usePlayerStore((state) => state);

  const isPlayingPlaylist = isPlaying && currentMusic?.playlist.id === id;

  /**
   * The handleClick function toggles the playing state and fetches playlist information if not already
   * playing.
   * @returns If `isPlayingPlaylist` is true, the function will set `isPlaying` to false and return. If
   * `isPlayingPlaylist` is false, the function will fetch data from the specified API endpoint, set
   * `isPlaying` to true, and update the current music state with the songs and playlist data received
   * from the API.
   */
  const handleClick = () => {
    if (isPlayingPlaylist) {
      setIsPlaying(false);
      return;
    }

    fetch(`/api/get-info-playlist.json?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        const { songs, playlist } = data;

        setIsPlaying(true);
        setCurrentMusic({ songs, playlist, song: songs[0] });
      });
  };

  const iconClassName = size === 'small' ? 'w-4 h-4' : 'w-5 h-5';

  return (
    <button
      onClick={handleClick}
      className="card-play-button rounded-full bg-green-500 p-4 hover:scale-105 transition hover:bg-green-400"
    >
      {isPlayingPlaylist ? (
        <Pause className={iconClassName} />
      ) : (
        <Play className={iconClassName} />
      )}
    </button>
  );
}
