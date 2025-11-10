import heroImage from '@assets/generated_images/Savanna_landscape_hero_background_0419d288.png';

export default function Hero() {
  return (
    <div className="relative h-[40vh] min-h-[300px] overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
      
      <div className="relative h-full flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 font-serif">
          Hyena Footprint Identification
        </h1>
        <p className="text-lg md:text-xl text-white/90 max-w-2xl">
          Advanced AI-powered analysis for wildlife research and conservation. 
          Upload footprint images to identify individual hyenas instantly.
        </p>
      </div>
    </div>
  );
}
