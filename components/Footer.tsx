export default function Footer() {
  return (
    <footer className="bg-charcoal text-snowWhite py-8">
      <div className="max-w-7xl w-full mx-auto px-4 text-center space-y-6">
        {/* Title */}
        <p className="Staatliches font-bold text-2xl">Backcountry Nepal</p>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-4">
          {["Home", "Highlights", "Itinerary", "Gallery", "Booking", "Testimonials"].map(
            (item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="hover:text-goldenYellow transition-colors"
              >
                {item}
              </a>
            )
          )}
        </div>

        {/* Copyright */}
        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} Backcountry Nepal. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
