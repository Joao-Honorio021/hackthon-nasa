// app/components/SolarStoryCard.jsx
import React from 'react';
import { IoSunny } from 'react-icons/io5';

function getStormDetails(kp, date) {
  const formattedDate = date ? `on ${formatDateShort(date)}` : 'recently';
  
  if (kp >= 7) {
    return {
      text: `I sent a strong storm ${formattedDate}!`,
      emoji: "🤩",
      color: "text-yellow-300",
      narrative: "It was a powerful solar storm that may have caused interference with satellites, power grids, and communication systems on Earth."
    };
  }
  
  if (kp >= 5) {
    return {
      text: `I got a bit restless ${formattedDate}...`,
      emoji: "✨",
      color: "text-purple-300",
      narrative: "I released some solar flares that may have caused minor interference with GPS signals and radio communications."
    };
  }
  
  return {
    text: `Everything was calm ${formattedDate}!`,
    emoji: "☀️",
    color: "text-green-300",
    narrative: "Just shining gently and warming up the solar system. No storms during this period, everything worked normally on Earth."
  };
}

function formatDateShort(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    day: 'numeric', 
    month: 'long'
  });
}

function formatDateFull(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    day: '2-digit', 
    month: 'long', 
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

const SunCharacter = () => (
  <div className="flex-shrink-0">
    <IoSunny 
      className="text-yellow-400 text-8xl md:text-9xl animate-pulse-slow" 
      style={{ filter: "drop-shadow(0 0 15px rgba(252, 211, 77, 0.7))" }}
    />
  </div>
);

const SpeechBubble = ({ details }) => (
  <div className="relative w-full max-w-lg p-6 bg-indigo-800/60 border border-purple-400/50 rounded-2xl shadow-lg">
    <h2 className={`text-2xl font-bold mb-3 ${details.color}`}>
      {details.emoji} {details.text}
    </h2>
    <p className="text-lg leading-relaxed text-indigo-100">{details.narrative}</p>
    <div className="absolute left-[-20px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[15px] border-t-transparent border-r-[20px] border-r-indigo-800/60 border-b-[15px] border-b-transparent"></div>
  </div>
);

const KpVisualizer = ({ kp }) => {
  const bars = Math.min(Math.ceil(kp), 10);
  if (bars <= 1) return null;

  return (
    <div className="w-full max-w-lg mt-8 text-center">
      <p className="font-semibold text-purple-300 mb-4">
        Solar Activity Intensity (Kp Index: {kp})
      </p>
      <div className="flex justify-center items-end gap-2 h-20 animate-pulse-slow">
        {Array.from({ length: bars }).map((_, i) => (
          <div
            key={i}
            className="w-4 bg-gradient-to-t from-green-400 via-teal-400 to-purple-400 rounded-full animate-aurora-dance"
            style={{ 
              height: `${Math.random() * 60 + 40}%`, 
              animationDelay: `${i * 100}ms` 
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default function SolarStoryCard({ stormData, isLoading, error }) {
  if (isLoading) {
    return (
      <div className="text-white text-center p-8 animate-pulse">
        <IoSunny className="text-yellow-400 text-6xl mx-auto mb-4" />
        <p>Connecting with the Sun...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-400 text-center p-8 bg-red-900/20 rounded-lg border border-red-500/50 max-w-lg mx-auto">
        <p className="font-bold mb-2">Couldn't reach the Sun right now</p>
        <p className="text-sm text-red-300/80">There seems to be a communication problem. Please try again in a few moments.</p>
      </div>
    );
  }
  
  if (!stormData) {
    return (
      <div className="text-purple-300 text-center p-8 bg-indigo-900/30 rounded-lg border border-purple-500/30 max-w-lg mx-auto">
        <IoSunny className="text-yellow-400 text-6xl mx-auto mb-4" />
        <p className="font-bold mb-2">All quiet in space</p>
        <p className="text-sm text-purple-200/80">The Sun hasn't registered any geomagnetic storms in recent days. Just a regular day of being a star!</p>
      </div>
    );
  }
  
  const kp = stormData?.allKpIndex?.[0]?.kpIndex ?? 0;
  const stormDate = stormData?.startTime || stormData?.allKpIndex?.[0]?.observedTime;
  const stormDetails = getStormDetails(kp, stormDate);
  
  const sourceInfo = stormData?.gstID 
    ? `Event ${stormData.gstID} ${stormDate ? '• ' + formatDateFull(stormDate) : ''}`
    : "No recent geomagnetic storms found.";

  return (
    <div className="w-full max-w-4xl p-4 flex flex-col items-center font-sans text-white">
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 w-full">
        <SunCharacter />
        <SpeechBubble details={stormDetails} />
      </div>

      <KpVisualizer kp={kp} />

      <div className="mt-8 text-center">
        <p className="text-xs text-purple-300/80 mb-1">Source: NASA DONKI</p>
        <p className="text-xs text-purple-300/60">{sourceInfo}</p>
      </div>
    </div>
  );
}