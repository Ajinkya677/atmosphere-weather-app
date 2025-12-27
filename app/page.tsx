"use client";


import { useEffect, useState } from "react";
import { 
  Cloud, 
  Sun, 
  CloudRain, 
  Wind, 
  Droplets, 
  Eye, 
  Gauge, 
  Thermometer,
  MapPin,
  Search,
  CloudSun,
  CloudMoon,
  Moon,
  Sunrise,
  Sunset,
  Sparkles
} from "lucide-react";

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

console.log("API KEY USED BY APP:", API_KEY);

const Index = () => {

  const [currentWeather, setCurrentWeather] = useState<any>(null);

useEffect(() => {
  const fetchWeather = async () => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=Mumbai&units=metric&appid=${API_KEY}`
      );

      const data = await res.json();
      console.log("Weather API response:", data);

      if (!res.ok) {
        throw new Error(data.message || "API failed");
      }

      setCurrentWeather({
        location: data.name,
        country: data.sys.country,
        temperature: Math.round(data.main.temp),
        condition: data.weather[0].main,
        high: Math.round(data.main.temp_max),
        low: Math.round(data.main.temp_min),
        feelsLike: Math.round(data.main.feels_like),
      });

    } catch (error) {
      console.error("Weather API error:", error);
      // ✅ STOP infinite loading
      setCurrentWeather("ERROR");
    }
  };

  fetchWeather();
}, []);



  const hourlyForecast = [
    { time: "Now", temp: 24, icon: "sun" },
    { time: "2PM", temp: 26, icon: "sun" },
    { time: "3PM", temp: 27, icon: "cloud-sun" },
    { time: "4PM", temp: 28, icon: "cloud-sun" },
    { time: "5PM", temp: 26, icon: "cloud" },
    { time: "6PM", temp: 24, icon: "sunset" },
    { time: "7PM", temp: 22, icon: "moon" },
    { time: "8PM", temp: 20, icon: "cloud-moon" },
  ];

  const weeklyForecast = [
    { day: "Today", high: 28, low: 18, icon: "cloud-sun", condition: "Partly Cloudy" },
    { day: "Tomorrow", high: 30, low: 20, icon: "sun", condition: "Sunny" },
    { day: "Wednesday", high: 26, low: 17, icon: "cloud-rain", condition: "Light Rain" },
    { day: "Thursday", high: 24, low: 16, icon: "cloud-rain", condition: "Rainy" },
    { day: "Friday", high: 27, low: 18, icon: "cloud-sun", condition: "Partly Cloudy" },
    { day: "Saturday", high: 29, low: 19, icon: "sun", condition: "Sunny" },
    { day: "Sunday", high: 31, low: 21, icon: "sun", condition: "Clear" },
  ];

  const weatherDetails = [
    { label: "Humidity", value: "65%", icon: Droplets, color: "primary" },
    { label: "Wind", value: "12 km/h", icon: Wind, color: "accent" },
    { label: "Visibility", value: "10 km", icon: Eye, color: "primary" },
    { label: "Pressure", value: "1015 hPa", icon: Gauge, color: "accent" },
    { label: "Feels Like", value: "26°", icon: Thermometer, color: "weather-warm" },
    { label: "UV Index", value: "6 High", icon: Sun, color: "weather-warm" },
  ];

  const getIcon = (iconName: string, size: number = 24, className: string = "") => {
    const iconProps = { size, className };
    switch (iconName) {
      case "sun": return <Sun {...iconProps} />;
      case "cloud": return <Cloud {...iconProps} />;
      case "cloud-sun": return <CloudSun {...iconProps} />;
      case "cloud-rain": return <CloudRain {...iconProps} />;
      case "cloud-moon": return <CloudMoon {...iconProps} />;
      case "moon": return <Moon {...iconProps} />;
      case "sunset": return <Sunset {...iconProps} />;
      case "sunrise": return <Sunrise {...iconProps} />;
      default: return <Sun {...iconProps} />;
    }
  };

 if (currentWeather === null) {
  return (
    <div className="min-h-screen flex items-center justify-center text-xl">
      Loading weather...
    </div>
  );
}

if (currentWeather === "ERROR") {
  return (
    <div className="min-h-screen flex items-center justify-center text-xl text-red-400">
      Failed to load weather
    </div>
  );
}




return (
    <div className="min-h-screen p-4 md:p-8 lg:p-12 perspective-1000 relative">
      
      {/* 3D Layered Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ perspective: '1000px' }}>
        {/* Deep space layer */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />
        
        {/* Animated gradient mesh */}
        <div 
          className="absolute -inset-[50%] opacity-60"
          style={{
            background: `
              radial-gradient(circle at 20% 20%, hsl(260 60% 25% / 0.4) 0%, transparent 40%),
              radial-gradient(circle at 80% 20%, hsl(200 70% 20% / 0.3) 0%, transparent 35%),
              radial-gradient(circle at 50% 60%, hsl(280 50% 20% / 0.35) 0%, transparent 45%),
              radial-gradient(circle at 20% 80%, hsl(220 60% 15% / 0.3) 0%, transparent 40%),
              radial-gradient(circle at 85% 75%, hsl(300 40% 18% / 0.25) 0%, transparent 35%)
            `,
            animation: 'mesh-float 25s ease-in-out infinite',
            transform: 'translateZ(-200px) scale(1.5)',
          }}
        />
        
        {/* Floating 3D geometric shapes */}
        <div 
          className="absolute top-[10%] left-[15%] w-64 h-64 rounded-full opacity-20"
          style={{
            background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, transparent 70%)',
            filter: 'blur(60px)',
            transform: 'translateZ(-100px)',
            animation: 'float-3d 12s ease-in-out infinite',
          }}
        />
        <div 
          className="absolute top-[30%] right-[10%] w-96 h-96 rounded-full opacity-15"
          style={{
            background: 'linear-gradient(225deg, hsl(var(--accent)) 0%, transparent 70%)',
            filter: 'blur(80px)',
            transform: 'translateZ(-150px)',
            animation: 'float-3d 15s ease-in-out infinite reverse',
          }}
        />
        <div 
          className="absolute bottom-[15%] left-[25%] w-80 h-80 rounded-full opacity-20"
          style={{
            background: 'linear-gradient(45deg, hsl(var(--weather-warm)) 0%, transparent 60%)',
            filter: 'blur(70px)',
            transform: 'translateZ(-120px)',
            animation: 'float-3d 18s ease-in-out infinite 2s',
          }}
        />
        
        {/* 3D Grid floor effect */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-[60vh] opacity-[0.08]"
          style={{
            background: `
              linear-gradient(90deg, hsl(var(--primary) / 0.5) 1px, transparent 1px),
              linear-gradient(180deg, hsl(var(--primary) / 0.5) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            transform: 'perspective(500px) rotateX(60deg) translateY(50%)',
            transformOrigin: 'center bottom',
            maskImage: 'linear-gradient(to top, black 0%, transparent 80%)',
            WebkitMaskImage: 'linear-gradient(to top, black 0%, transparent 80%)',
          }}
        />
        
        {/* Horizon glow */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-48"
          style={{
            background: 'linear-gradient(to top, hsl(var(--primary) / 0.1) 0%, transparent 100%)',
            filter: 'blur(40px)',
          }}
        />
        
        {/* Floating particles/stars */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.5 + 0.2,
                animation: `twinkle ${Math.random() * 4 + 3}s ease-in-out infinite ${Math.random() * 3}s`,
                boxShadow: '0 0 6px 1px rgba(255,255,255,0.3)',
              }}
            />
          ))}
        </div>
        
        {/* Nebula clouds */}
        <div 
          className="absolute top-[5%] right-[5%] w-[500px] h-[300px] opacity-10"
          style={{
            background: 'radial-gradient(ellipse, hsl(280 60% 50%) 0%, transparent 70%)',
            filter: 'blur(50px)',
            animation: 'nebula-drift 30s ease-in-out infinite',
          }}
        />
        <div 
          className="absolute bottom-[20%] left-[5%] w-[400px] h-[250px] opacity-10"
          style={{
            background: 'radial-gradient(ellipse, hsl(200 70% 40%) 0%, transparent 70%)',
            filter: 'blur(45px)',
            animation: 'nebula-drift 25s ease-in-out infinite reverse',
          }}
        />
        
        {/* Vignette overlay */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 80% 60% at 50% 40%, transparent 0%, hsl(0 0% 0% / 0.4) 100%)',
          }}
        />
      </div>
      
      <div className="mx-auto max-w-7xl preserve-3d relative z-10">
        
        {/* Header */}
        <header className="mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-fade-up">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 shadow-lg shadow-primary/10">
              <MapPin className="h-6 w-6 text-primary animate-pulse-slow" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground text-3d">{currentWeather.location}</h1>
              <p className="text-sm text-muted-foreground">{currentWeather.country}</p>
            </div>
          </div>
          <button className="neo-button flex items-center gap-3 text-muted-foreground hover:text-foreground group">
            <Search className="h-5 w-5 transition-transform group-hover:scale-110" />
            <span className="text-sm font-medium">Search location</span>
          </button>
        </header>

        {/* Main Weather Display */}
        <div className="mb-8 grid gap-8 lg:grid-cols-3">
          {/* Current Weather Card - Hero */}
          <div className="glass-card-lg p-8 lg:p-10 lg:col-span-2 animate-fade-up stagger-1 card-3d">
            <div className="card-3d-inner">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                <div className="space-y-4">
                  {/* Temperature Display */}
                  <div className="relative">
                    <div className="flex items-start gap-1">
                      <span className="text-[10rem] md:text-[12rem] font-extralight leading-none tracking-tighter text-gradient-warm">
                        {currentWeather.temperature}
                      </span>
                      <span className="mt-8 text-5xl font-light text-muted-foreground">°</span>
                    </div>
                    {/* Subtle reflection effect */}
                    <div className="absolute -bottom-4 left-0 text-[10rem] md:text-[12rem] font-extralight leading-none tracking-tighter opacity-[0.03] blur-sm scale-y-[-0.3] origin-top text-weather-warm">
                      {currentWeather.temperature}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-3xl font-semibold text-foreground text-3d flex items-center gap-3">
                      {currentWeather.condition}
                      <Sparkles className="h-6 w-6 text-weather-warm animate-pulse-slow" />
                    </p>
                    <div className="flex items-center gap-4">
                      <span className="stat-pill text-sm font-medium text-foreground">
                        H: {currentWeather.high}°
                      </span>
                      <span className="stat-pill text-sm font-medium text-muted-foreground">
                        L: {currentWeather.low}°
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Animated Sun Icon */}
                <div className="relative flex items-center justify-center">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-56 h-56 md:w-72 md:h-72 rounded-full bg-gradient-to-br from-weather-warm/30 via-weather-warm/10 to-transparent blur-3xl animate-pulse-slow" />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-40 h-40 md:w-52 md:h-52 rounded-full border border-weather-warm/20 animate-rotate-slow" />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border border-weather-warm/10 animate-rotate-slow" style={{ animationDirection: 'reverse', animationDuration: '30s' }} />
                  </div>
                  <Sun className="relative h-28 w-28 md:h-36 md:w-36 text-weather-warm weather-icon-glow animate-float" />
                </div>
              </div>
            </div>
          </div>

          {/* Sunrise/Sunset Card */}
          <div className="glass-card glass-card-hover p-6 animate-fade-up stagger-2">
            <h3 className="mb-6 text-xs font-semibold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-weather-warm animate-pulse" />
              Sun Cycle
            </h3>
            <div className="relative mb-8">
              <div className="h-28 w-full overflow-visible">
                <svg viewBox="0 0 200 120" className="w-full h-full">
                  <defs>
                    <linearGradient id="sunGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="hsl(var(--weather-warm))" stopOpacity="0.1" />
                      <stop offset="30%" stopColor="hsl(var(--weather-warm))" stopOpacity="0.8" />
                      <stop offset="70%" stopColor="hsl(var(--accent))" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.1" />
                    </linearGradient>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                    <radialGradient id="sunBall" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="hsl(45 100% 70%)" />
                      <stop offset="100%" stopColor="hsl(var(--weather-warm))" />
                    </radialGradient>
                  </defs>
                  {/* Horizon line */}
                  <line x1="0" y1="95" x2="200" y2="95" stroke="hsl(var(--border))" strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />
                  {/* Arc path */}
                  <path
                    d="M 10 95 Q 100 -10 190 95"
                    fill="none"
                    stroke="url(#sunGradient)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    filter="url(#glow)"
                  />
                  {/* Sun position */}
                  <circle cx="125" cy="40" r="14" fill="url(#sunBall)" filter="url(#glow)">
                    <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" />
                  </circle>
                  {/* Inner glow */}
                  <circle cx="125" cy="40" r="8" fill="hsl(45 100% 85%)" opacity="0.6" />
                </svg>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-weather-warm/20 to-weather-warm/5 border border-weather-warm/20 shadow-lg shadow-weather-warm/10">
                  <Sunrise className="h-5 w-5 text-weather-warm" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium">Sunrise</p>
                  <p className="text-lg font-bold text-foreground">6:24 AM</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-right">
                <div>
                  <p className="text-xs text-muted-foreground font-medium">Sunset</p>
                  <p className="text-lg font-bold text-foreground">7:48 PM</p>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/20 shadow-lg shadow-accent/10">
                  <Sunset className="h-5 w-5 text-accent" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hourly Forecast */}
        <div className="glass-card mb-8 p-6 animate-fade-up stagger-3">
          <h3 className="mb-6 text-xs font-semibold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Hourly Forecast
          </h3>
          <div className="flex gap-3 overflow-x-auto pb-3 scrollbar-hide">
            {hourlyForecast.map((hour, index) => (
              <div
                key={index}
                className={`flex min-w-[90px] flex-col items-center gap-4 rounded-2xl p-5 transition-all duration-500 ${
                  index === 0 
                    ? "bg-gradient-to-b from-primary/25 to-primary/5 border border-primary/30 shadow-lg shadow-primary/20" 
                    : "glass-card-hover border border-transparent hover:border-border/50"
                }`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <span className={`text-sm font-semibold ${index === 0 ? "text-primary" : "text-muted-foreground"}`}>
                  {hour.time}
                </span>
                <div className={index === 0 ? "weather-icon-cool-glow" : "icon-3d"}>
                  {getIcon(hour.icon, 32, index === 0 ? "text-primary" : "text-foreground/80")}
                </div>
                <span className={`text-xl font-bold ${index === 0 ? "text-primary" : "text-foreground"}`}>
                  {hour.temp}°
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Forecast & Details Grid */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* 7-Day Forecast */}
          <div className="glass-card p-6 animate-fade-up stagger-4">
            <h3 className="mb-6 text-xs font-semibold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              7-Day Forecast
            </h3>
            <div className="space-y-2">
              {weeklyForecast.map((day, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between rounded-xl p-4 transition-all duration-500 ${
                    index === 0 
                      ? "bg-gradient-to-r from-primary/15 via-primary/10 to-transparent border border-primary/25 shadow-lg shadow-primary/10" 
                      : "glass-card-hover border border-transparent hover:border-border/30"
                  }`}
                >
                  <span className={`w-28 font-semibold ${index === 0 ? "text-primary" : "text-foreground"}`}>
                    {day.day}
                  </span>
                  <div className="flex items-center gap-3">
                    <div className={index === 0 ? "weather-icon-cool-glow" : "icon-3d"}>
                      {getIcon(day.icon, 26, index === 0 ? "text-primary" : "text-foreground/70")}
                    </div>
                    <span className="hidden text-sm text-muted-foreground sm:inline w-28">{day.condition}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-foreground w-10 text-right">{day.high}°</span>
                    <div className="relative h-2 w-20 overflow-hidden rounded-full bg-depth-1 shadow-inner">
                      <div 
                        className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-weather-cool via-weather-warm to-weather-warm"
                        style={{ width: `${((day.high - day.low) / 15) * 100}%` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent" />
                    </div>
                    <span className="text-muted-foreground w-10">{day.low}°</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Weather Details */}
          <div className="glass-card p-6 animate-fade-up stagger-5">
            <h3 className="mb-6 text-xs font-semibold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-weather-warm animate-pulse" />
              Weather Details
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {weatherDetails.map((detail, index) => (
                <div
                  key={index}
                  className="glass-card glass-card-hover flex items-center gap-4 p-5 group"
                >
                  <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-${detail.color}/20 to-${detail.color}/5 border border-${detail.color}/20 shadow-lg group-hover:shadow-${detail.color}/20 transition-shadow duration-500`}>
                    <detail.icon className={`h-7 w-7 text-${detail.color} icon-3d`} />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{detail.label}</p>
                    <p className="text-xl font-bold text-foreground">{detail.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Air Quality Card */}
        <div className="mt-8 glass-card p-6 animate-fade-up stagger-6">
          <h3 className="mb-6 text-xs font-semibold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Air Quality Index
          </h3>
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-5">
              <div className="relative">
                <div className="absolute inset-0 bg-green-400/20 rounded-2xl blur-xl" />
                <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500/30 to-green-600/10 border border-green-500/30 shadow-lg shadow-green-500/20">
                  <span className="text-3xl font-bold text-green-400">42</span>
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-400 text-3d">Good</p>
                <p className="text-sm text-muted-foreground">Air quality is satisfactory</p>
              </div>
            </div>
            <div className="flex-1 max-w-lg">
              <div className="relative h-3 w-full overflow-hidden rounded-full bg-depth-1 shadow-inner">
                <div 
                  className="absolute inset-y-0 left-0 rounded-full transition-all duration-1000"
                  style={{ 
                    width: "28%",
                    background: "linear-gradient(90deg, #22c55e 0%, #84cc16 50%, #facc15 100%)"
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-white/15 to-transparent" />
              </div>
              <div className="mt-3 flex justify-between text-xs text-muted-foreground font-medium">
                <span>0</span>
                <span>50</span>
                <span>100</span>
                <span>150</span>
                <span>200+</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center animate-fade-up stagger-7">
          <p className="text-sm text-muted-foreground/60">
            Last updated: December 24, 2025 at 1:00 PM
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
