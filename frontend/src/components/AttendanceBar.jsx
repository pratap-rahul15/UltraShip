// AttendanceBar component to visualize attendance percentage with color coding.
export default function AttendanceBar({ value }) {
  const percentage = value || 0;
  const color =
    percentage >= 80
      ? "bg-green-500"
      : percentage >= 50
      ? "bg-yellow-500"
      : "bg-red-500";

// attendance bar design.
  return (
    <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
      <div
        className={`${color} h-full transition-all duration-700`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}
