"use client";

import { useCallback } from "react";

import Particles from "react-tsparticles";

import { loadFull } from "tsparticles";

export default function ParticlesBackground() {

  const particlesInit = useCallback(async (engine: any) => {

    await loadFull(engine);

  }, []);

  return (

    <Particles
      id="tsparticles"
      init={particlesInit}

      options={{
        fullScreen: {
          enable: true,
          zIndex: -1,
        },

        background: {
          color: {
            value: "#000000",
          },
        },

        fpsLimit: 120,

        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "repulse",
            },

            resize: true,
          },

          modes: {
            repulse: {
              distance: 120,
              duration: 0.4,
            },
          },
        },

        particles: {

          color: {
            value: [
              "#00ffff",
              "#3b82f6",
              "#8b5cf6",
              "#ffffff",
            ],
          },

          links: {
            color: "#00ffff",
            distance: 140,
            enable: true,
            opacity: 0.25,
            width: 1,
          },

          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: false,
            speed: 1.2,
            straight: false,
          },

          number: {
            density: {
              enable: true,
              area: 900,
            },

            value: 110,
          },

          opacity: {
            value: 0.6,
          },

          shape: {
            type: "circle",
          },

          size: {
            value: {
              min: 1,
              max: 4,
            },
          },
        },

        detectRetina: true,
      }}
    />

  );
}