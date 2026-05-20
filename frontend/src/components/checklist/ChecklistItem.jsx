import { motion } from "framer-motion";
import { RiDeleteBinLine, RiEditLine } from "react-icons/ri";
import { PRIORITY_COLORS } from "../../data/checklistData";

export default function ChecklistItem({ item, onToggle, onDelete, onEdit, index = 0 }) {
  const priorityStyle = PRIORITY_COLORS[item.priority] || PRIORITY_COLORS.Low;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20, height: 0 }}
      transition={{ duration: 0.35, delay: index * 0.04, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`flex items-start gap-3 p-3.5 rounded-xl border transition-all duration-200 group
                  ${item.done
                    ? "bg-emerald-50/50 border-emerald-100 hover:border-emerald-200"
                    : "bg-white border-cream hover:border-gold/30 hover:shadow-luxury"
                  }`}
    >
      {/* Checkbox */}
      <button
        onClick={() => onToggle(item.id)}
        className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 mt-0.5
                    transition-all duration-200
                    ${item.done
                      ? "bg-emerald-500 border-emerald-500"
                      : "border-cream bg-white hover:border-gold"
                    }`}
      >
        {item.done && (
          <motion.svg
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            viewBox="0 0 12 12" className="w-3 h-3"
          >
            <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.8"
              strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </motion.svg>
        )}
      </button>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <p className={`font-body text-sm font-medium transition-all duration-200
                         ${item.done ? "line-through text-muted/50" : "text-dark"}`}>
            {item.task}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className={`text-[10px] font-body font-medium px-2 py-0.5 rounded-full border
                            ${priorityStyle.bg} ${priorityStyle.text} ${priorityStyle.border}`}>
            {item.priority}
          </span>
          <span className="text-[10px] font-body text-muted px-2 py-0.5 rounded-full
                           bg-cream/80 border border-cream">
            {item.category}
          </span>
          <span className="text-[10px] font-body text-muted">{item.due}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100
                      transition-opacity duration-200">
        {onEdit && (
          <button onClick={() => onEdit(item)}
            className="w-7 h-7 rounded-lg flex items-center justify-center
                       text-muted hover:text-gold hover:bg-cream transition-all">
            <RiEditLine size={13} />
          </button>
        )}
        <button onClick={() => onDelete(item.id)}
          className="w-7 h-7 rounded-lg flex items-center justify-center
                     text-muted hover:text-red-500 hover:bg-red-50 transition-all">
          <RiDeleteBinLine size={13} />
        </button>
      </div>
    </motion.div>
  );
}