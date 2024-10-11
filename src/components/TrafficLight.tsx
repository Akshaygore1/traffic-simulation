import { STATES } from "../lib/enums";

const TrafficLight = ({ state }: { state: string }) => {
  return (
    <div className="flex flex-col gap-2 p-4 bg-gray-800 rounded-lg">
      <div
        className={`w-8 h-8 rounded-full transition-all duration-300 ${
          state === STATES.RED
            ? "bg-red-500 shadow-red-500/50 shadow-md blur-sm"
            : "bg-red-900"
        }`}
      />
      <div
        className={`w-8 h-8 rounded-full transition-all duration-300 ${
          state === STATES.YELLOW
            ? "bg-yellow-500 shadow-yellow-500/50 shadow-md blur-sm"
            : "bg-yellow-900"
        }`}
      />
      <div
        className={`w-8 h-8 rounded-full transition-all duration-300 ${
          state === STATES.GREEN
            ? "bg-green-500 shadow-green-500/50 shadow-md blur-sm"
            : "bg-green-900"
        }`}
      />
    </div>
  );
};

export default TrafficLight;
