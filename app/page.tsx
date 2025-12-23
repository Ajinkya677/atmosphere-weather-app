import React from 'react';
import { 
  CloudRain, 
  MapPin, 
  Wind, 
  Droplets, 
  Sun, 
  Cloud, 
  Calendar, 
  MoreHorizontal 
} from 'lucide-react';

const WeatherDashboard = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4 font-sans">
      
      {/* Main Container / Glass Card */}
      <div className="relative w-full max-w-md bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl shadow-2xl overflow-hidden">
        
        {/* Background decorative glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Header Section */}
        <div className="p-6 flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 text-slate-400 text-sm mb-1">
              <MapPin size={16} className="text-blue-400" />
              <span className="uppercase tracking-wider">Pune, India</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-100">Today</h2>
            <p className="text-slate-400 text-xs">Tue, Dec 23</p>
          </div>
          <button className="p-2 hover:bg-white/5 rounded-full transition-colors text-slate-400">
            <MoreHorizontal size={20} />
          </button>
        </div>

        {/* Main Weather Display */}
        <div className="flex flex-col items-center justify-center py-4">
          <div className="relative">
             {/* Glowing Icon Background */}
            <div className="absolute inset-0 bg-yellow-400/20 blur-2xl rounded-full transform scale-75"></div>
            <CloudRain size={120} className="relative z-10 text-blue-400 drop-shadow-lg" />
          </div>
          
          <div className="mt-6 text-center">
            <h1 className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400">
              19°
            </h1>
            <p className="text-blue-300 text-lg font-medium mt-2">Heavy Rain</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="px-6 py-6">
          <div className="grid grid-cols-3 gap-4">
            {/* Wind */}
            <div className="bg-slate-800/50 p-3 rounded-2xl border border-slate-700/50 flex flex-col items-center justify-center gap-1 hover:bg-slate-800 transition-colors">
              <Wind size={20} className="text-slate-400 mb-1" />
              <span className="text-sm font-bold">12 km/h</span>
              <span className="text-[10px] text-slate-500 uppercase">Wind</span>
            </div>
            
            {/* Humidity */}
            <div className="bg-slate-800/50 p-3 rounded-2xl border border-slate-700/50 flex flex-col items-center justify-center gap-1 hover:bg-slate-800 transition-colors">
              <Droplets size={20} className="text-blue-400 mb-1" />
              <span className="text-sm font-bold">84%</span>
              <span className="text-[10px] text-slate-500 uppercase">Humidity</span>
            </div>

            {/* Chance of Rain */}
            <div className="bg-slate-800/50 p-3 rounded-2xl border border-slate-700/50 flex flex-col items-center justify-center gap-1 hover:bg-slate-800 transition-colors">
              <CloudRain size={20} className="text-purple-400 mb-1" />
              <span className="text-sm font-bold">92%</span>
              <span className="text-[10px] text-slate-500 uppercase">Rain</span>
            </div>
          </div>
        </div>

        {/* Weekly Forecast List */}
        <div className="px-6 pb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-200 font-semibold flex items-center gap-2">
              <Calendar size={16} className="text-slate-500"/> 
              Next 3 Days
            </h3>
            <span className="text-xs text-blue-400 cursor-pointer hover:underline">See 7 Days</span>
          </div>

          <div className="space-y-3">
            {/* Day 1 */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all cursor-default">
              <div className="flex items-center gap-4">
                <div className="bg-slate-800 p-2 rounded-lg">
                  <Sun size={20} className="text-yellow-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-200">Wednesday</p>
                  <p className="text-xs text-slate-500">Sunny</p>
                </div>
              </div>
              <span className="text-sm font-bold text-slate-300">24° <span className="text-slate-600 text-xs font-normal">/ 18°</span></span>
            </div>

            {/* Day 2 */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all cursor-default">
              <div className="flex items-center gap-4">
                <div className="bg-slate-800 p-2 rounded-lg">
                  <Cloud size={20} className="text-slate-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-200">Thursday</p>
                  <p className="text-xs text-slate-500">Cloudy</p>
                </div>
              </div>
              <span className="text-sm font-bold text-slate-300">21° <span className="text-slate-600 text-xs font-normal">/ 17°</span></span>
            </div>

            {/* Day 3 */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all cursor-default">
              <div className="flex items-center gap-4">
                <div className="bg-slate-800 p-2 rounded-lg">
                  <CloudRain size={20} className="text-blue-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-200">Friday</p>
                  <p className="text-xs text-slate-500">Showers</p>
                </div>
              </div>
              <span className="text-sm font-bold text-slate-300">19° <span className="text-slate-600 text-xs font-normal">/ 16°</span></span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default WeatherDashboard;