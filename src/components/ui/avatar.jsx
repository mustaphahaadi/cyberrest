import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader } from "@/components/ui/dialog";

export function Avatar({ src, alt, className = "", children }) {
  return (
    <span
      className={`inline-block rounded-full overflow-hidden bg-gray-200 ${className}`}
      style={{ width: 40, height: 40 }}
    >
      {src ? (
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      ) : (
        children
      )}
    </span>
  );
}

export function AvatarFallback({ children, className = "" }) {
  return (
    <span
      className={`flex items-center justify-center w-full h-full text-gray-500 ${className}`}
    >
      {children}
    </span>
  );
}

export function AvatarImage({ src, alt, className = "" }) {
  return (
    <img
      src={src}
      alt={alt}
      className={`w-full h-full object-cover ${className}`}
    />
  );
}
