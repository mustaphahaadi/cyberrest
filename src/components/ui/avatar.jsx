export default function Avatar({ src, alt, className = "", children }) {
  return (
    <span className={`inline-block rounded-full overflow-hidden bg-gray-200 ${className}`} style={{ width: 40, height: 40 }}>
      {src ? <img src={src} alt={alt} className="w-full h-full object-cover" /> : children}
    </span>
  )
}
