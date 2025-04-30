// src/App.js
import React, { useState, useEffect, useRef, useCallback } from 'react';
import './App.css';
import { FaStepBackward, FaStepForward, FaPlay, FaPause, FaRandom, FaRedo } from 'react-icons/fa';

function App() {
  const [tracks, setTracks] = useState([]);
  const [folders] = useState(['mp3-tracks-1']);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [clock, setClock] = useState(() => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  });
  const audioRef = useRef(null);

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
        const allTracks = [];
        for (const folder of folders) {
          const folderTracks = [
            {
              id: `${folder}/track2`,
              title: `jazzyWazzler`,
              url: `https://res.cloudinary.com/dtvecsd0q/video/upload/v1745950670/Smooth_beats_that_are_just_a_vibe___chill_playlist_wgjcrp.mp3`,
              duration: 3600
            },
            {
              id: `${folder}/track1`,
              title: `h2o bottle flip`,
              url: `https://res.cloudinary.com/dtvecsd0q/video/upload/v1745950768/%EF%BC%B6%EF%BC%A9%EF%BC%A2%EF%BC%A9%EF%BC%AE%EF%BC%A7_pprtgf.mp3`,
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
            },
            {
              id: `${folder}/track4`,
              title: `Yiptize`,
              url: `https://res.cloudinary.com/dtvecsd0q/video/upload/v1745950322/%EF%BC%A1%EF%BC%B5%EF%BC%B4%EF%BC%B5%EF%BC%AD%EF%BC%AE_%EF%BC%A3%EF%BC%A8%EF%BC%A9%EF%BC%AC%EF%BC%AC_-_1_HOUR_yptze2.mp3`,
              duration: 3600
            },
            {
              id: `${folder}/track4`,
              title: `studySession`,
              url: `https://res.cloudinary.com/dtvecsd0q/video/upload/v1745950210/1_A.M_Study_Session_lofi_hip_hop_4_1_qnjoa2.mp3`,
              duration: 3600
            },
            {
              id: `${folder}/track4`,
              title: `WarmDays`,
              url: `https://res.cloudinary.com/dtvecsd0q/video/upload/v1745950044/lofi_songs_for_warm_days_ftgstv.mp3`,
              duration: 3600
            },
            {
              id: `${folder}/track4`,
              title: `ColdDays`,
              url: `https://res.cloudinary.com/dtvecsd0q/video/upload/v1745950038/lofi_songs_for_cold_days_jt4rub.mp3`,
              duration: 3600
            },
            {
              id: `${folder}/track4`,
              title: `lofiHipHop`,
              url: `https://res.cloudinary.com/dtvecsd0q/video/upload/v1745949575/1_A.M_Study_Session_lofi_hip_hop_4_xtnruj.mp3`,
              duration: 3600
            },
            {
              id: `${folder}/track4`,
              title: `estasTonne`,
              url: `https://res.cloudinary.com/dtvecsd0q/video/upload/v1743707350/Estas_Tonne_-_Old_Style_Full_Album_4_toccic.mp3`,
              duration: 3600
            },
            {
              id: `${folder}/track4`,
              title: `seasideJapaneseCafe`,
              url: `https://res.cloudinary.com/dtvecsd0q/video/upload/v1743703901/Seaside_Lofi_in_a_Japanese_Cafe%CC%81_Relaxing_Lo_Fi_Beats_with_Ocean_Breeze_Ambience_Cozy_Lofi_Music_4_fcgfzb.mp3`,
              duration: 3600
            },
            {
              id: `${folder}/track4`,
              title: `DeepFocus`,
              url: `https://res.cloudinary.com/dtvecsd0q/video/upload/v1743697560/Chill_Lofi_Beats_chill_lo-fi_hip_hop_beats_Lofi_Deep_Focus_Work_Study__Reading_4_mzmzts.mp3`,
              duration: 3600
            },
            {
              id: `${folder}/track4`,
              title: `PeacefulSunrise`,
              url: `https://res.cloudinary.com/dtvecsd0q/video/upload/v1743692358/Peaceful_Sunrise_Piano_Guitar_for_Relaxation_4_uxy49x.mp3`,
              duration: 3600
            },
            {
              id: `${folder}/track4`,
              title: `PositiveVibes`,
              url: `https://res.cloudinary.com/dtvecsd0q/video/upload/v1743689886/WORK_MUSIC_-_Ambient_Tunes_for_Focused_Energy_Productivity_4_att2pt.mp3`,
              duration: 3600
            },
            {
              id: `${folder}/track4`,
              title: `CalmVibes`,
              url: `https://res.cloudinary.com/dtvecsd0q/video/upload/v1740790841/1_hour_of_aesthetic_calm_lofi_music_chill_4_p5mjqn.mp3`,
              duration: 3600
            },
            {
              id: `${folder}/track4`,
              title: `relazingCat`,
              url: `https://res.cloudinary.com/dtvecsd0q/video/upload/v1740790674/1_Hour_Lofi_Cat_Relax_with_my_cat_-_Sleep_Relax_Study_Chill_4_qqgaut.mp3`,
              duration: 3600
            },
            {
              id: `${folder}/track4`,
              title: `justWannaStay`,
              url: `https://res.cloudinary.com/dtvecsd0q/video/upload/v1739498833/Just_wanna_stay_here_forever_lofi_hip_hop_mix_4_waxyif.mp3`,
              duration: 3600
            },
            {
              id: `${folder}/track4`,
              title: `eizdong`,
              url: `https://res.cloudinary.com/dtvecsd0q/video/upload/v1739497734/Seoul_City_View_-_chill___lofi_hiphop_beats_to_sleep_relax_study_to___%E1%84%85%E1%85%A9%E1%84%91%E1%85%A1%E1%84%8B%E1%85%B5_%E1%84%89%E1%85%A5%E1%84%8B%E1%85%AE%E1%86%AF_%E1%84%89%E1%85%B5%E1%84%90%E1%85%B5_%E1%84%8B%E1%85%A3%E1%84%80%E1%85%A7%E1%86%BC_%E1%84%80%E1%85%A1%E1%86%B7%E1%84%89%E1%85%A1%E1%86%BC_%E1%84%82%E1%85%A6%E1%84%8B%E1%85%A9%E1%86%AB%E1%84%89%E1%85%B5%E1%84%90%E1%85%B5_4_eizdpn.mp3`,
              duration: 3600
            },
            {
              id: `${folder}/track4`,
              title: `trueHipHop`,
              url: `https://res.cloudinary.com/dtvecsd0q/video/upload/v1739497605/Scratches_Jazz_Boom_Bap__A_True_Hip-Hop_Experience_4_pj5awd.mp3`,
              duration: 3600
            },
            {
              id: `${folder}/track4`,
              title: `comfortZone`,
              url: `https://res.cloudinary.com/dtvecsd0q/video/upload/v1739497428/comfort_zone._4_mvgogu.mp3`,
              duration: 3600
            },
            {
              id: `${folder}/track4`,
              title: `snowingInTokyo`,
              url: `https://res.cloudinary.com/dtvecsd0q/video/upload/v1739496827/SNOWING_IN_%EF%BC%AF%EF%BC%B3%EF%BC%A1%EF%BC%AB%EF%BC%A1_Lofi_Hip_Hop_4_dwjuaw.mp3`,
              duration: 3600
            },
            {
              id: `${folder}/track4`,
              title: `chillWorkMusic`,
              url: `https://res.cloudinary.com/dtvecsd0q/video/upload/v1739496795/Chill_Work_Music_chill_lo-fi_hip_hop_beats_4_soqp92.mp3`,
              duration: 3600
            },
            {
              id: `${folder}/track4`,
              title: `hipHopMix`,
              url: `https://res.cloudinary.com/dtvecsd0q/video/upload/v1739496721/Lofi_Beats_Mix_chill_lo-fi_hip_hop_beats_4_jvhske.mp3`,
              duration: 3600
            },
            {
              id: `${folder}/track4`,
              title: `on the road`,
              url: `https://res.cloudinary.com/dtvecsd0q/video/upload/v1743705255/On_the_Road_Again_-_Groove_Monkey_-_4_jhb4a2.mp3`,
              duration: 3600
            }
          ];
          allTracks.push(...folderTracks);
        }
        setTracks(allTracks);
      } catch (error) {
        console.error('Error fetching tracks:', error);
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

    const handleEnded = () => {
      if (repeat) {
        audio.currentTime = 0;
        audio.play();
      } else {
        handleNext();
      }
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [repeat, handleNext]);

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