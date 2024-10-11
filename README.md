# Trip Simulation

A React-based traffic simulation project that implements a four-way traffic light system using Vite, TypeScript, and Tailwind CSS.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm (v6 or higher)

## 🚀 Quick Start

1. Clone the repository:
```bash
git clone <url>
```

2. Navigate to the project directory:
```bash
cd traffic-simulation
```

3. Install dependencies:
```bash
npm install
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173` by default.

## 🚦 Traffic System Logic

### Overview
The traffic light system simulates a four-way intersection with traffic lights in all four directions (North, East, South, West). Only one direction can have a green light at a time, ensuring safe traffic flow.

<img src="https://github.com/user-attachments/assets/545a6b26-4d33-4437-b0eb-21a8c689b6f5" alt="description" width="400"/>

### Key Components

#### State Management
```typescript
const [currentDirection, setCurrentDirection] = useState(0);
const [nextDirection, setNextDirection] = useState<number | null>(null);
const [currentState, setCurrentState] = useState<keyof typeof STATES>(STATES.GREEN);
```
- `currentDirection`: Tracks which direction currently has priority (0: North, 1: East, 2: South, 3: West)
- `nextDirection`: Stores the next direction to turn green
- `currentState`: Represents the current light state (GREEN, YELLOW, RED)

#### Timing Configuration
```typescript
const [greenDurations, setGreenDurations] = useState<Record<string, number>>(
  DIRECTIONS.reduce(
    (acc, dir) => ({ ...acc, [dir]: DEFAULT_GREEN_DURATION }),
    {}
  )
);
```
- Each direction can have its own green light duration
- Default duration is set through `DEFAULT_GREEN_DURATION`
- Yellow light duration is fixed (`YELLOW_DURATION`)

### Traffic Light Cycle

1. **Green Light Phase**
   - Active direction shows green light
   - Other directions show red
   - Timer runs based on direction's configured green duration

2. **Yellow Light Phase**
   - Current direction transitions to yellow
   - Next direction is calculated (`(currentDirection + 1) % 4`)
   - Yellow light duration is fixed

3. **Direction Change**
   - After yellow phase, current direction changes
   - New direction gets green light
   - Cycle repeats

### State Calculation
```typescript
const getLightState = (directionIndex: number) => {
  if (directionIndex === currentDirection) {
    return currentState;
  }
  if (directionIndex === nextDirection && currentState === STATES.YELLOW) {
    return STATES.YELLOW;
  }
  return STATES.RED;
};
```
This function determines the state of each traffic light based on:
- Current active direction
- Next scheduled direction
- Current phase of the cycle

### Settings Configuration
- Users can modify green light duration for each direction
- Settings are accessible through a modal interface
- Changes take effect in the next cycle

## 🏗️ Project Structure

```
src/
├── lib/
│   └── enums.ts               # Enumeration types and constants
├── components/
│   ├── DirectionControl.tsx    # Direction control component
│   ├── Modal.tsx               # Modal dialog component
│   └── TrafficLight.tsx        # Traffic light component
├── App.tsx                     # Application entry point    
├── main.tsx                    # Main application component
└── TrafficLightSystem.tsx      # Traffic light system component
```

## 🛠️ Tech Stack

- [Vite](https://vitejs.dev/) - Next Generation Frontend Tooling
- [React](https://reactjs.org/) - A JavaScript library for building user interfaces
- [TypeScript](https://www.typescriptlang.org/) - JavaScript with syntax for types
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
