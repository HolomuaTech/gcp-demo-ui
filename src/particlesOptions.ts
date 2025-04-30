import { useMemo } from 'react'
import { ISourceOptions, } from "@tsparticles/engine"
import { useColorMode } from '@chakra-ui/react';

export function useParticlesOptions() {
  const { colorMode } = useColorMode();

  const [fg, bg] = colorMode === "light" ? ['#000', '#fff'] : ['#fff', '#000']

  return useMemo<ISourceOptions>(
    () => ({
      background: {
        color: {
          value: bg
        },
        opacity: 1
      },
      fpsLimit: 40,
      detectRetina: true,
      clear: true,
      delay: 0,
      duration: 0,

      interactivity: {
        detectsOn: "window",
        events: {
          onHover: {
            enable: true,
            mode: "connect",
          },
          resize: {
            delay: 0.5,
            enable: true
          }
        }
      },
      particles: {
        bounce: {
          horizontal: {
            value: 1
          },
          vertical: {
            value: 1
          }
        },
        color: {
          value: fg,
        },
        effect: {
          close: true,
          fill: true,
        },
        move: {
          angle: {
            offset: 0,
            value: 90
          },
          center: {
            x: 50,
            y: 50,
            mode: "percent",
            radius: 0
          },
          enable: true,
          gravity: {
            acceleration: 15,
            enable: true,
            inverse: true,
            maxSpeed: 100
          },
          outModes: {
            default: "destroy",
            bottom: "destroy",
            left: "destroy",
            right: "destroy",
            top: "none"
          },
          random: false,
          size: false,
          speed: {
            min: 4,
            max: 10
          },
          straight: false,
          trail: {
            enable: true,
            length: 10,
            fill: {
              color: {
                value: bg
              }
            }
          },
        },
        opacity: {
          value: 1,
        },
        shape: {
          close: true,
          fill: true,
          options: {},
          type: "circle"
        },
        size: {
          value: {
            min: 0.1,
            max: 2
          },
          animation: {
            count: 0,
            enable: true,
            speed: 2.5,
            decay: 0,
            delay: 0,
            sync: true,
            mode: "auto",
            startValue: "max",
            destroy: "min"
          }
        },
        // stroke: {
        //   width: 1,
        //   color: {
        //     value: "#ffffff",
        //   }
        // },
        destroy: {
          bounds: {},
          mode: "split",
          split: {
            count: 1,
            factor: {
              value: 0.333333
            },
            rate: {
              value: 100
            },
            sizeOffset: true,
            particles: {
              stroke: {
                width: 0
              },
              color: {
                value: [
                  "#ff595e",
                  "#ffca3a",
                  "#8ac926",
                  "#1982c4",
                  "#6a4c93"
                ]
              },
              number: {
                value: 0
              },
              opacity: {
                value: {
                  min: 0.1,
                  max: 1
                },
                animation: {
                  enable: true,
                  speed: 0.7,
                  sync: false,
                  startValue: "max",
                  destroy: "min"
                }
              },
              shape: {
                type: "circle"
              },
              size: {
                value: {
                  min: 1,
                  max: 2
                },
                animation: {
                  enable: true,
                  speed: 5,
                  count: 1,
                  sync: false,
                  startValue: "min",
                  destroy: "none"
                }
              },
              life: {
                count: 1,
                duration: {
                  value: {
                    min: 1,
                    max: 2
                  }
                }
              },
              move: {
                decay: 0.05,
                enable: true,
                gravity: {
                  enable: true,
                  inverse: false,
                  acceleration: 5
                },
                speed: {
                  min: 5,
                  max: 10
                },
                direction: "none",
                outModes: "destroy"
              }
            }
          }
        },
        twinkle: {
          lines: {
            enable: false,
            frequency: 1,
            opacity: 1
          },
          particles: {
            enable: true,
            frequency: 0.05,
            opacity: 1,
            color: {
              value: fg
            }
          }
        },
        life: {
          count: 1,
          delay: {
            value: 0,
            sync: false
          },
          duration: {
            value: 0,
            sync: false
          }
        },
        rotate: {
          value: 0,
          direction: "clockwise",
          path: true
        }
      },
      pauseOnBlur: true,
      pauseOnOutsideViewport: true,
      smooth: false,
      zLayers: 100,
      emitters: {
        autoPlay: true,
        fill: true,
        life: {
          wait: false,
          count: 0,
          delay: 0.1,
          duration: 0.1
        },
        rate: {
          quantity: 1,
          delay: 0.15
        },
        shape: {
          options: {},
          replace: {
            color: false,
            opacity: false
          },
          type: "square"
        },
        startCount: 0,
        size: {
          mode: "percent",
          height: 0,
          width: 100
        },
        direction: "top",
        particles: {},
        position: {
          x: 50,
          y: 100
        }
      },

    }),
    [bg, fg],
  );
}
