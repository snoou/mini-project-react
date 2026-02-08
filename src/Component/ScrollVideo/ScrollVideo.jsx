import React, { useRef, useEffect, useState } from "react";

const ScrollVideo = () => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [title, setTitle] = useState("Black Cat");

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;

    const handleScroll = () => {
      if (!video || !container) return;

      const scrolled = window.scrollY;
      const maxScroll = container.scrollHeight - window.innerHeight;
      let progress = scrolled / maxScroll;

      progress = Math.min(Math.max(progress, 0), 1);

      if (video.duration && !isNaN(video.duration)) {
        video.currentTime = video.duration * progress;
      }

      // تغییر متن با اسکرول
      if (progress < 0.33) setTitle("Black Cat");
      else if (progress < 0.66) setTitle("Pure Focus");
      else setTitle("Cinematic Motion");
    };

    window.addEventListener("scroll", handleScroll);
    video?.pause();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Scroll Section */}
      <div ref={containerRef} className="relative h-[500vh] bg-black">
        <div className="sticky top-0 h-screen w-full overflow-hidden">

          {/* Video */}
          <video
            ref={videoRef}
            src="/LQb7XDLl.mp4"
            muted
            playsInline
            preload="auto"
            className="h-full w-full object-cover pointer-events-none"
          />

          {/* Overlay */}
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center text-white">

            <h1 className="text-5xl md:text-7xl font-bold tracking-wide drop-shadow-2xl">
              {title}
            </h1>

            <p className="mt-6 max-w-xl text-lg text-white/80">
              A scroll-driven cinematic experience with smooth motion and
              minimal design.
            </p>

            <button className="mt-10 rounded-full border border-white/50 bg-black/40 px-8 py-3 text-sm backdrop-blur-md transition hover:bg-white/10">
              Discover More
            </button>
          </div>

          {/* Gradient shadow */}
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-black" />
        </div>
      </div>

      {/* Next Content */}
      <div className="flex h-screen items-center justify-center bg-white text-black">
        <div className="text-center">
          <h2 className="text-3xl font-bold">More Content</h2>
          <p className="mt-4 text-gray-600">
            Product details, features, or footer content goes here.
          </p>
        </div>
      </div>
    </>
  );
};

export default ScrollVideo;
