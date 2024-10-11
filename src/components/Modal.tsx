import { DIRECTIONS } from "../lib/enums";
import DirectionControl from "./Directioncontrol";
import { useEffect, useRef } from "react";

const SettingsModal = ({
  isOpen,
  onClose,
  greenDurations,
  onDurationChange,
}: {
  isOpen: boolean;
  onClose: () => void;
  greenDurations: Record<string, number>;
  onDurationChange: (direction: string, duration: number) => void;
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div ref={modalRef} className="bg-white p-4 rounded-lg w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Traffic Light Settings</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>
        <div className="space-y-4">
          {DIRECTIONS.map((direction) => (
            <DirectionControl
              key={direction}
              direction={direction}
              greenDuration={greenDurations[direction]}
              onChange={(duration) => onDurationChange(direction, duration)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
