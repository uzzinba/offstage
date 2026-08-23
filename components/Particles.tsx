"use client";

import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

// Usa any per evitare problemi di tipi
const ParticlesAny = Particles as any;

export default function ParticlesBackground() {
  return (
    <ParticlesAny
      id="tsparticles"
      // @ts-ignore
      init={async (engine: any) => {
        await loadSlim(engine);
      }}
      options={{
        fpsLimit: 60,
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "attract",
            },
          },
        },
        particles: {
          color: { value: "#E0A96D" },
          links: { enable: false },
          move: {
            enable: true,
            speed: 0.3,
            random: false,
            straight: false,
            outModes: { default: "out" },
          },
          number: {
            value: 40,
          },
          opacity: {
            value: 0.2,
            animation: {
              enable: true,
              speed: 1,
            },
          },
          size: {
            value: { min: 1, max: 3 },
          },
        },
        detectRetina: true,
      }}
      className="absolute inset-0 pointer-events-none"
    />
  );
}