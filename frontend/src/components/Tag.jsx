// Tag component to display a styled tag with children content.
export default function Tag({ children }) {
  return (
    <span
      className="
        px-3 py-1 text-xs rounded-full
        bg-blue-100 text-blue-700 
        font-medium
      "
    >
      {children}
    </span>
  );
}
