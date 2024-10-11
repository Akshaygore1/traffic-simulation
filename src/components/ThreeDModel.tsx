import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { useSpring, a } from "@react-spring/three";

function TrafficLight3D() {
  const [lightState, setLightState] = useState("red");

  const springProps = useSpring({
    red: lightState === "red" ? 1 : 0,
    yellow: lightState === "yellow" ? 1 : 0,
    green: lightState === "green" ? 1 : 0,
  });

  const changeLight = () => {
    switch (lightState) {
      case "red":
        setLightState("green");
        break;
      case "green":
        setLightState("yellow");
        break;
      case "yellow":
        setLightState("red");
        break;
      default:
        setLightState("red");
    }
  };

  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <group onClick={changeLight}>
        <mesh position={[0, 2, 0]}>
          <cylinderGeometry args={[0.5, 0.5, 1, 32]} />
          <a.meshStandardMaterial color="black" />
        </mesh>
        <mesh position={[0, 1.5, 0]}>
          <sphereGeometry args={[0.4, 32, 32]} />
          <a.meshStandardMaterial
            color={`rgba(255, 0, 0, ${springProps.red})`}
          />
        </mesh>
        <mesh position={[0, 0.5, 0]}>
          <sphereGeometry args={[0.4, 32, 32]} />
          <a.meshStandardMaterial
            color={`rgba(255, 255, 0, ${springProps.yellow})`}
          />
        </mesh>
        <mesh position={[0, -0.5, 0]}>
          <sphereGeometry args={[0.4, 32, 32]} />
          <a.meshStandardMaterial
            color={`rgba(0, 255, 0, ${springProps.green})`}
          />
        </mesh>
      </group>
    </Canvas>
  );
}

export default TrafficLight3D;
