import { STATES } from "../lib/enums";

const TrafficLight = ({ state }: { state: string }) => {
  return (
    <div className="flex flex-col gap-2 p-4 bg-gray-800 rounded-lg">
      <div
        className={`w-8 h-8 rounded-full ${
          state === STATES.RED ? "bg-red-500" : "bg-red-900"
        }`}
      />
      <div
        className={`w-8 h-8 rounded-full ${
          state === STATES.YELLOW ? "bg-yellow-500" : "bg-yellow-900"
        }`}
      />
      <div
        className={`w-8 h-8 rounded-full ${
          state === STATES.GREEN ? "bg-green-500" : "bg-green-900"
        }`}
      />
    </div>
  );
};

export default TrafficLight;
