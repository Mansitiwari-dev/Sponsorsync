import React, { useState, useRef } from 'react';
import { DraftMedia } from '../../types';

interface MediaPreviewPlayerProps {
  draft: DraftMedia;
  onUploadNewVersion?: () => void;
  canUpload?: boolean;
}

export const MediaPreviewPlayer: React.FC<MediaPreviewPlayerProps> = ({
  draft,
  onUploadNewVersion,
  canUpload = false,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(15);
  const [showSignedDetails, setShowSignedDetails] = useState(false);
  const [phoneFrameOverlay, setPhoneFrameOverlay] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      if (videoRef.current.duration) {
        setDuration(videoRef.current.duration);
      }
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = val;
      setCurrentTime(val);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
      {/* Media Header */}
      <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-pink-100 text-pink-600 flex items-center justify-center font-bold text-xs">
            v{draft.version}
          </span>
          <div>
            <span className="font-bold text-slate-900 text-xs block truncate max-w-[220px]">
              {draft.title}
            </span>
            <span className="text-[10px] text-slate-500">{draft.submittedAt}</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setShowSignedDetails(!showSignedDetails)}
            className="px-2 py-1 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-slate-900 text-[10px] font-semibold flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-xs text-emerald-600">verified</span>
            <span>Signed Token</span>
          </button>

          {canUpload && (
            <button
              onClick={onUploadNewVersion}
              className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200 text-[10px] font-semibold hover:bg-indigo-100"
            >
              Upload New Cut
            </button>
          )}
        </div>
      </div>

      {/* Signed URL & SHA-256 Security Banner */}
      {showSignedDetails && (
        <div className="p-3 bg-indigo-950 text-indigo-100 text-[10px] font-mono border-b border-indigo-900 space-y-1.5 animate-in fade-in">
          <div className="flex items-center justify-between text-indigo-300">
            <span>S3/Supabase Secure Vault Signed URL</span>
            <span className="text-emerald-400 font-bold">{draft.signedUrlExpiresAt}</span>
          </div>
          <div className="p-1.5 bg-black/40 rounded text-slate-300 break-all text-[9px]">
            {draft.signedUrl}
          </div>
          <div className="flex items-center gap-1 text-[9px] text-indigo-400">
            <span>SHA-256:</span>
            <span className="truncate">{draft.sha256Hash}</span>
          </div>
        </div>
      )}

      {/* Media Player Container */}
      <div className="relative bg-black flex items-center justify-center min-h-[300px] overflow-hidden group">
        <video
          ref={videoRef}
          src={draft.previewUrl}
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => setIsPlaying(false)}
          playsInline
          className={`max-h-[360px] object-contain transition-all ${
            phoneFrameOverlay ? 'aspect-[9/16]' : 'w-full'
          }`}
        />

        {/* TikTok / Reel UI Simulation Overlay */}
        {phoneFrameOverlay && (
          <div className="absolute inset-0 pointer-events-none p-4 flex flex-col justify-between text-white">
            <div className="flex justify-between items-center text-xs opacity-80">
              <span className="font-semibold text-[11px] bg-black/40 px-2 py-0.5 rounded-full">
                SponsorSync Preview
              </span>
              <span className="material-symbols-outlined text-sm">hd</span>
            </div>

            <div className="flex justify-between items-end">
              <div className="max-w-[75%] space-y-1 text-left bg-black/30 p-2 rounded-xl backdrop-blur-2xs">
                <span className="font-bold text-xs block">@elenavance × Lumina Nova</span>
                <p className="text-[10px] opacity-90 line-clamp-2">
                  ANC switch test in a noisy café. #sponsored #LuminaNova #audio
                </p>
              </div>

              <div className="flex flex-col items-center gap-3 opacity-90 text-[10px]">
                <div className="flex flex-col items-center">
                  <span className="material-symbols-outlined text-xl">favorite</span>
                  <span>14.2K</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="material-symbols-outlined text-xl">chat_bubble</span>
                  <span>412</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="material-symbols-outlined text-xl">bookmark</span>
                  <span>1.8K</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Big Central Play Button Overlay */}
        {!isPlaying && (
          <button
            onClick={togglePlay}
            className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-white/90 text-indigo-600 flex items-center justify-center shadow-lg active:scale-95 transition-transform"
          >
            <span className="material-symbols-outlined text-3xl font-bold ml-1">play_arrow</span>
          </button>
        )}
      </div>

      {/* Scrub & Playback Controls */}
      <div className="p-3 bg-white space-y-2">
        <div className="flex items-center gap-2">
          <button
            onClick={togglePlay}
            className="w-8 h-8 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 flex items-center justify-center transition-colors shrink-0"
          >
            <span className="material-symbols-outlined text-lg">
              {isPlaying ? 'pause' : 'play_arrow'}
            </span>
          </button>

          {/* Time Scrubber */}
          <input
            type="range"
            min={0}
            max={duration || 100}
            step={0.1}
            value={currentTime}
            onChange={handleSeek}
            className="flex-1 accent-indigo-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
          />

          <span className="text-[10px] font-mono text-slate-500 tabular-nums shrink-0">
            {Math.floor(currentTime)}s / {Math.floor(duration)}s
          </span>

          {/* Speed Toggle */}
          <button
            onClick={() => {
              if (videoRef.current) {
                const nextSpeed = videoRef.current.playbackRate === 1 ? 1.5 : videoRef.current.playbackRate === 1.5 ? 2 : 1;
                videoRef.current.playbackRate = nextSpeed;
              }
            }}
            className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-100 hover:bg-slate-200 text-slate-700"
            title="Playback Speed"
          >
            {videoRef.current?.playbackRate || 1}x
          </button>

          <button
            onClick={() => setPhoneFrameOverlay(!phoneFrameOverlay)}
            title="Toggle Social Mock Overlay"
            className={`p-1.5 rounded-lg border text-xs transition-colors ${
              phoneFrameOverlay
                ? 'bg-indigo-50 border-indigo-300 text-indigo-700'
                : 'bg-slate-50 border-slate-200 text-slate-500'
            }`}
          >
            <span className="material-symbols-outlined text-sm">phone_iphone</span>
          </button>
        </div>

        {/* Revisions Notes changelog with clickable timestamps */}
        {draft.revisionsNotes && draft.revisionsNotes.length > 0 && (
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[11px] space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-700 block text-[10px] uppercase tracking-wider">
                Version {draft.version} Changelog (Click time to jump):
              </span>
              <span className="text-[9px] text-indigo-600 font-medium">Interactive Review</span>
            </div>
            <ul className="list-disc list-inside text-slate-600 space-y-1">
              {draft.revisionsNotes.map((note, idx) => (
                <li key={idx} className="leading-snug">
                  {note.includes('0:18') ? (
                    <span>
                      Adjusted coffee grinder volume down at{' '}
                      <button
                        type="button"
                        onClick={() => {
                          if (videoRef.current) {
                            videoRef.current.currentTime = 18;
                            setCurrentTime(18);
                            videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
                          }
                        }}
                        className="px-1.5 py-0.2 rounded bg-indigo-100 text-indigo-700 font-mono font-bold hover:bg-indigo-200 cursor-pointer"
                      >
                        0:18
                      </button>{' '}
                      so ANC voiceover is crystal clear.
                    </span>
                  ) : (
                    <span>{note}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
