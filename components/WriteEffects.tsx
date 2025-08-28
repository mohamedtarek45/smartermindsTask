"use client";
import { Typewriter } from "react-simple-typewriter";

const WriteEffects = () => {

  return (
    <div className="flex ">

      <p className="mx-2">Wlecome!</p>
      <span className="text-red-400">

      <Typewriter
        words={['Search for a GitHub user 🔍', 'Explore repositories ⭐']}
        loop ={0}
        cursor
        
        typeSpeed={70}
        deleteSpeed={50}
        delaySpeed={1000}
        />
        </span>
        </div>

  );
};

export default WriteEffects;
