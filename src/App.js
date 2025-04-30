// src/App.js
import React, { useState, useEffect, useRef, useCallback } from 'react';
import './App.css';
import { FaStepBackward, FaStepForward, FaPlay, FaPause, FaRandom, FaRedo } from 'react-icons/fa';

function App() {
  const [tracks, setTracks] = useState([]);
  const [folders] = useState(['mp3-tracks-1']); // Use a single folder or your actual folders
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [clock, setClock] = useState(() => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  });
  const [isLoading, setIsLoading] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const audioRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setClock(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Fetch tracks from Cloudinary
  useEffect(() => {
    const fetchTracks = async () => {
      try {
        setIsLoading(true);
        const allTracks = [];
        for (const folder of folders) {
          const folderTracks = [
            {
              id: `${folder}/track1`,
              title: `h2o bottle flip`,
              url: `https://res.cloudinary.com/dtvecsd0q/video/upload/v1745950768/%EF%BC%B6%EF%BC%A9%EF%BC%B2%EF%BC%A9%EF%BC%AE%EF%BC%A7_pprtgf.mp3`,
              duration: 3600
            },
            {
              id: `${folder}/track2`,
              title: `jazzyWazzler`,
              url: `https://res.cloudinary.com/dtvecsd0q/video/upload/v1745950670/Smooth_beats_that_are_just_a_vibe___chill_playlist_wgjcrp.mp3`,
              duration: 3600
            },
            {
              id: `${folder}/track3`,
              title: `theDrivin`,
              url: `https://res.cloudinary.com/dtvecsd0q/video/upload/v1745950529/%EF%BC%A3%EF%BC%A8%EF%BC%A9%EF%BC%AC%EF%BC%AC_%EF%BC%B2%EF%BC%A9%EF%BC%A4%EF%BC%A5_-_1_HOUR_tut27d.mp3`,
              duration: 3600
            },
            {
              id: `${folder}/track4`,
              title: `pianoJazzo`,
              url: `https://res.cloudinary.com/dtvecsd0q/video/upload/v1745950430/%EF%BC%B7%EF%BC%A9%EF%BC%AE%EF%BC%B4%EF%BC%A5%EF%BC%B2_%EF%BC%A3%EF%BC%A8%EF%BC%A9%EF%BC%AC%EF%BC%AC_-_1_HOUR_tqakpz.mp3`,
              duration: 3600
            }
          ];
          allTracks.push(...folderTracks);
        }
        setTracks(allTracks);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching tracks:', error);
        setIsLoading(false);
      }
    };

    fetchTracks();
  }, [folders]);

  // Handle time update
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      if (repeat) {
        audio.currentTime = 0;
        audio.play();
      } else {
        handleNext();
      }
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [repeat]);

  // Load and play track when currentTrackIndex changes
  useEffect(() => {
    if (tracks.length === 0) return;
    const audio = audioRef.current;
    if (!audio) return;
    audio.src = tracks[currentTrackIndex].url;
    audio.load();
    if (isPlaying) {
      audio.play().catch(err => console.error('Playback failed:', err));
    }
  }, [currentTrackIndex, tracks, isPlaying]);

  // Update audio volume when volume state changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(err => console.error('Playback failed:', err));
    }
    setIsPlaying(!isPlaying);
  };

  const handlePrevious = () => {
    if (currentTime > 10) {
      audioRef.current.currentTime = 0;
    } else {
      setCurrentTrackIndex((prevIndex) => {
        if (prevIndex === 0) {
          return tracks.length - 1;
        }
        return prevIndex - 1;
      });
    }
  };

  const handleNext = useCallback(() => {
    if (shuffle) {
      let nextIndex;
      do {
        nextIndex = Math.floor(Math.random() * tracks.length);
      } while (nextIndex === currentTrackIndex && tracks.length > 1);
      setCurrentTrackIndex(nextIndex);
    } else {
      setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % tracks.length);
    }
  }, [shuffle, tracks, currentTrackIndex]);

  const handleProgressChange = (e) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    audioRef.current.currentTime = newTime;
  };

  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${hours > 0 ? `${hours}:` : ''}${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const currentTrack = tracks[currentTrackIndex];

  return (
    <div className="neumorph-app">
      <audio ref={audioRef} />
      <header className="neumorph-header">
        <span className="icon clock-icon" title="Current time">{clock}</span>
        <div className="radio-title-img-wrapper">
          <img
            src="/radioTitle.png"
            alt="Radio Title"
            className="radio-title-img"
          />
        </div>
        <span
          className="icon"
          style={{ cursor: 'pointer' }}
          title="About"
          onClick={() => setShowAbout(true)}
        >&#9881;</span>
      </header>
      <div className="neumorph-circle-outer">
        <div className="neumorph-circle-inner">
          <img
            src="/drivin.png"
            alt="Album Art"
            className="drivin-img"
          />
        </div>
        <div className="neumorph-progress"></div>
      </div>
      <div className="track-info">
        <div className="track-title">{currentTrack?.title || "No track selected"}</div>
        <div className="track-artist">{currentTrack?.artist || "Unknown artist"}</div>
      </div>
      <div className="neumorph-controls">
        <button className="neumorph-btn" onClick={handlePrevious}><FaStepBackward /></button>
        <button className="neumorph-btn play" onClick={togglePlay}>
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        <button className="neumorph-btn" onClick={handleNext}><FaStepForward /></button>
      </div>
      <div className="neumorph-bottom-row">
        <FaRandom
          className={`neumorph-icon ${shuffle ? 'active' : ''}`}
          onClick={() => {
            setShuffle((prev) => {
              const newVal = !prev;
              if (newVal) {
                let nextIndex = currentTrackIndex;
                if (tracks.length > 1) {
                  while (nextIndex === currentTrackIndex) {
                    nextIndex = Math.floor(Math.random() * tracks.length);
                  }
                }
                setCurrentTrackIndex(nextIndex);
                setIsPlaying(true);
                setTimeout(() => {
                  audioRef.current.play().catch(() => {});
                }, 0);
              }
              return newVal;
            });
          }}
          title="Shuffle"
          style={{ cursor: 'pointer' }}
        />
        <FaRedo
          className={`neumorph-icon ${repeat ? 'active' : ''}`}
          onClick={() => {
            setRepeat((prev) => {
              const newVal = !prev;
              if (newVal && !isPlaying) {
                setIsPlaying(true);
                setTimeout(() => {
                  audioRef.current.play().catch(() => {});
                }, 0);
              }
              return newVal;
            });
          }}
          title="Repeat"
          style={{ cursor: 'pointer' }}
        />
      </div>

      {showAbout && (
        <div className="about-modal-backdrop" onClick={() => setShowAbout(false)}>
          <div className="about-modal" onClick={e => e.stopPropagation()}>
            <h2>About This App</h2>
            <p>
              <strong>Stack:</strong> React, Cloudinary, Modern CSS<br />
              <strong>Design:</strong> Neumorphic, Responsive, Custom Icons<br />
              <strong>Credits:</strong> Developed by Addison Lilholt<br />
              <strong>Year:</strong> 2025
            </p>
            <button className="about-close-btn" onClick={() => setShowAbout(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;