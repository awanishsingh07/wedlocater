export default function SectionHeader({ label, title, action, onAction }) {
  return (
    <div className="flex items-end justify-between gap-4 mb-6">
      <div>
        {label && <p className="label-gold mb-1">{label}</p>}
        <h2 className="font-heading text-display-sm text-dark">{title}</h2>
      </div>
      {action && (
        <button
          onClick={onAction}
          className="font-body text-xs font-medium text-maroon
                     hover:text-gold transition-colors duration-200 whitespace-nowrap"
        >
          {action} →
        </button>
      )}
    </div>
  );
}