"use client";

import { useState, useEffect } from "react";

interface rockLyrics {
  lyrics: string;
  author: string;
}

const rockLyrics: rockLyrics[] = [
  {
    lyrics: "It's better to burn out than to fade away",
    author: "Every JS library",
  },
  {
    lyrics: "I wanna rock and roll all night and party every day",
    author: "No deploy on Friday",
  },
  {
    lyrics: "Born to be wild",
    author: "Vibe code at 3 AM",
  },
  {
    lyrics: "Livin' on a prayer",
    author: "git push origin main --force",
  },
  {
    lyrics: "You shook me all night long",
    author: "Bugs in the code",
  },
  {
    lyrics: "Highway to hell",
    author: "Debugging Jquery again",
  },
  {
    lyrics: "Don't stop believin'",
    author: "TAD - Test After Deploy",
  },
];

export default function Footer() {
  const [randomLyric, setRandomLyric] = useState<rockLyrics | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * rockLyrics.length);
      setRandomLyric(rockLyrics[randomIndex]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="font-sans bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="md:grid grid-cols-1 gap-8 md:grid-cols-4 flex justify-center items-center">
          <div className="md:col-span-2">
            <p
              className="font-bold text-[#9af6a3] text-md text-background/80"
              id="rock-lyric"
            >
              {randomLyric?.lyrics}{" "}
              <span className="text-white text-sm font-normal">
                - {randomLyric?.author}{" "}
              </span>
            </p>
            <p className="text-sm text-background/80">
              © {new Date().getFullYear()} Murillo Wolf. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
