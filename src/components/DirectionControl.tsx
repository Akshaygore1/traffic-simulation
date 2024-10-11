const DirectionControl = ({
  direction,
  greenDuration,
  onChange,
}: {
  direction: string;
  greenDuration: number;
  onChange: (duration: number) => void;
}) => {
  return (
    <div className="flex flex-col gap-2 p-2">
      <label htmlFor={`${direction}-duration`} className="text-sm font-medium">
        {direction} Green Duration (seconds)
      </label>
      <input
        id={`${direction}-duration`}
        type="range"
        min="1"
        max="10"
        step="0.1"
        value={greenDuration / 1000}
        onChange={(e) => onChange(parseFloat(e.target.value) * 1000)}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-500"
      />
      <span className="text-xs text-gray-500">
        {(greenDuration / 1000).toFixed(1)}s
      </span>
    </div>
  );
};

export default DirectionControl;
