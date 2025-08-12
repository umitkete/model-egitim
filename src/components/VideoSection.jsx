export default function VideoSection() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 text-center">
      {/* Başlık */}
      <h1 className="text-4xl md:text-5xl font-bold text-[black] mb-6">
        EĞİTİMDE EN DOĞRU MODEL!
      </h1>

      {/* Video */}
      <div className="relative w-full h-0 pb-[56.25%] overflow-hidden rounded-lg shadow-lg">
        <iframe
          src="https://player.vimeo.com/video/1073684630?autoplay=1&muted=1&loop=1"
          title="Tanıtım Videosu"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full"
        ></iframe>
      </div>
    </div>
  );
}
