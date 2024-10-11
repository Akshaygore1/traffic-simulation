import { useState, useEffect } from "react";
import SettingsModal from "./components/Modal";
import TrafficLight from "./components/Trafficlight";
import {
  DEFAULT_GREEN_DURATION,
  DIRECTIONS,
  STATES,
  YELLOW_DURATION,
} from "./lib/enums";
import TrafficLight3D from "./components/ThreeDModel";

const TrafficLightSystem = () => {
  const [currentDirection, setCurrentDirection] = useState(0);
  const [nextDirection, setNextDirection] = useState<number | null>(null);
  const [currentState, setCurrentState] = useState<keyof typeof STATES>(
    STATES.GREEN
  );
  const [greenDurations, setGreenDurations] = useState<Record<string, number>>(
    DIRECTIONS.reduce(
      (acc, dir) => ({ ...acc, [dir]: DEFAULT_GREEN_DURATION }),
      {}
    )
  );
  const [isRunning, setIsRunning] = useState(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    let timer: ReturnType<typeof setTimeout> | undefined;

    if (currentState === STATES.GREEN) {
      timer = setTimeout(() => {
        setCurrentState(STATES.YELLOW);
        const next = (currentDirection + 1) % Object.keys(DIRECTIONS).length;
        setNextDirection(next);
      }, greenDurations[DIRECTIONS[currentDirection]]);
    } else if (currentState === STATES.YELLOW) {
      timer = setTimeout(() => {
        if (nextDirection !== null) {
          setCurrentDirection(nextDirection);
          setNextDirection(null);
          setCurrentState(STATES.GREEN);
        }
      }, YELLOW_DURATION);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [
    currentDirection,
    currentState,
    greenDurations,
    isRunning,
    nextDirection,
  ]);

  const handleGreenDurationChange = (direction: string, duration: number) => {
    setGreenDurations((prev) => ({
      ...prev,
      [direction]: duration,
    }));
  };

  const getLightState = (directionIndex: number) => {
    if (directionIndex === currentDirection) {
      return currentState;
    }
    // Show yellow for the next direction if we're transitioning
    if (directionIndex === nextDirection && currentState === STATES.YELLOW) {
      return STATES.YELLOW;
    }
    return STATES.RED;
  };

  return (
    <div className="container mx-auto p-4">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Traffic Light Simulation</h1>
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="px-4 py-2 bg-black rounded-lg text-white hover:bg-gray-700"
          >
            Settings
          </button>
        </div>

        <div className="flex flex-col items-center gap-8">
          {/* North light */}
          <TrafficLight state={getLightState(0)} />

          <div className="flex justify-around w-full">
            {/* West light */}
            <TrafficLight state={getLightState(3)} />

            {/* Center intersection */}

            {/* East light */}
            <TrafficLight state={getLightState(1)} />
          </div>

          {/* South light */}
          <TrafficLight state={getLightState(2)} />
        </div>

        <SettingsModal
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          greenDurations={greenDurations}
          onDurationChange={handleGreenDurationChange}
        />
      </div>
    </div>
  );
};

export default TrafficLightSystem;
