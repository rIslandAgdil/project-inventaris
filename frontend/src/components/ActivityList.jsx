export function ActivityRow({ timeAgo, message }) {
  return (
    <div className="grid grid-cols-[150px_1fr] items-center px-4 py-3 border-b last:border-b-0">
      <span className="text-xs text-slate-500">{timeAgo}</span>
      <span className="text-sm">
        {message.before} <span className="font-medium">{message.entity}</span> {message.after}
      </span>
    </div>
  );
}

export default function ActivityList({ items = [] }) {
  return (
    <div className="bg-white border rounded-xl overflow-hidden">
      {items.length === 0 ? (
        <div className="p-4 text-sm text-slate-500">Belum ada aktivitas.</div>
      ) : (
        items.map((it, idx) => <ActivityRow key={idx} {...it} />)
      )}
    </div>
  );
}
