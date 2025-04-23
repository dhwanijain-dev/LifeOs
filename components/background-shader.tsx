import { useAppContext } from "@/components/app-provider";
import Ballpit from "./background1";
import Hyperspeed from "./background2";
import LetterGlitch from "./background3";
import Iridescence from "./background4";
import Aurora from "./background5";
import Threads from "./background6";
export default function BackgroundShader() {
  const { wallpaper } = useAppContext();

  const shaderStyles = {
    default: <Ballpit
      count={100}
      gravity={1}
      friction={0.8}
      wallBounce={0.95}
      followCursor={false}
    />,
    shader1: <Hyperspeed/>,
    shader2: <LetterGlitch
      glitchSpeed={50}  
      glitchColors={["#2b4539", "#61dca3", "#61b3dc"]}
      centerVignette={true}
      outerVignette={false}
      smooth={true}
    />,
    shader3: <Iridescence
      color={[1, 1, 1]}
      mouseReact={false}
      amplitude={0.1}
      speed={1.0}
    />,
    shader4: <Aurora
      colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
      blend={0.5}
      amplitude={1.0}
      speed={0.5}
    />,
    shader5:
      <Threads
        amplitude={1}
        distance={0}
        enableMouseInteraction={true}
      />,
  };

  return (
    // <div
    //   className={`absolute inset-0 transition-all duration-500 ${shaderStyles[wallpaper as keyof typeof shaderStyles] || shaderStyles.default
    //     }`}
    // />
    <div className="absolute inset-0 transition-all duration-500">
      {/* <Hyperspeed/> */}
      {shaderStyles[wallpaper as keyof typeof shaderStyles] || shaderStyles.default}
    </div>
  );
}