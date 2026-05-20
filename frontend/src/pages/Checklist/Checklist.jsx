import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RiAddLine, RiSearchLine, RiCloseLine } from "react-icons/ri";
import ChecklistItem    from "../../components/checklist/ChecklistItem";
import ChecklistCard    from "../../components/checklist/ChecklistCard";
import ProgressTracker  from "../../components/checklist/ProgressTracker";
import { DEFAULT_CHECKLIST, CHECKLIST_CATEGORIES, PRIORITY_COLORS } from "../../data/checklistData";

const FILTERS    = ["All", "Pending", "Completed"];
const PRIORITIES = ["High", "Medium", "Low"];

const NEW_TASK_INIT = { task: "", category: "Planning", priority: "Medium", due: "" };

export default function Checklist() {
  const [items,        setItems]        = useState(DEFAULT_CHECKLIST);
  const [filter,       setFilter]       = useState("All");
  const [catFilter,    setCatFilter]    = useState("All");
  const [search,       setSearch]       = useState("");
  const [addOpen,      setAddOpen]      = useState(false);
  const [newTask,      setNewTask]      = useState(NEW_TASK_INIT);
  const [editItem,     setEditItem]     = useState(null);

  const done    = items.filter(i => i.done).length;
  const total   = items.length;
  const pending = total - done;

  const visible = useMemo(() => {
    let res = [...items];
    if (filter === "Completed") res = res.filter(i => i.done);
    if (filter === "Pending")   res = res.filter(i => !i.done);
    if (catFilter !== "All")    res = res.filter(i => i.category === catFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      res = res.filter(i => i.task.toLowerCase().includes(q) || i.category.toLowerCase().includes(q));
    }
    return res;
  }, [items, filter, catFilter, search]);

  const toggle = (id) => setItems(prev => prev.map(i => i.id === id ? { ...i, done: !i.done } : i));
  const remove = (id) => setItems(prev => prev.filter(i => i.id !== id));

  const addTask = (e) => {
    e.preventDefault();
    if (!newTask.task.trim()) return;
    if (editItem) {
      setItems(prev => prev.map(i => i.id === editItem.id ? { ...i, ...newTask } : i));
      setEditItem(null);
    } else {
      setItems(prev => [...prev, { ...newTask, id: `c${Date.now()}`, done: false }]);
    }
    setNewTask(NEW_TASK_INIT);
    setAddOpen(false);
  };

  const openEdit = (item) => {
    setEditItem(item);
    setNewTask({ task: item.task, category: item.category, priority: item.priority, due: item.due });
    setAddOpen(true);
  };

  return (
    <div className="bg-ivory min-h-screen">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-maroon-gradient py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: `radial-gradient(circle at 20% 50%, #C9A84C 1px, transparent 1px)`, backgroundSize: "36px 36px" }} />
        <div className="absolute -top-10 right-10 w-60 h-60 rounded-full bg-gold/10 blur-[80px] pointer-events-none" />
        <div className="container-luxury relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <p className="label-gold !text-gold/80 mb-2">✓ &nbsp; Wedding Planning</p>
            <h1 className="font-heading text-display-md text-maroon/70 mb-2">Wedding Checklist</h1>
            <p className="font-body text-creme/60 text-sm max-w-lg">
              Your step-by-step guide to the perfect wedding. Check off tasks as you go
              and never miss an important detail.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container-luxury px-4 sm:px-6 lg:px-8 py-10">

        {/* ── Stat cards + progress ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          <div className="lg:col-span-1">
            <ProgressTracker total={total} done={done} />
          </div>
          <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-4 content-start">
            <ChecklistCard label="Total Tasks"   count={total}   icon="📋" color="gold"   delay={0}    />
            <ChecklistCard label="Completed"     count={done}    icon="✅" color="green"  delay={0.08} />
            <ChecklistCard label="Pending"       count={pending} icon="⏳" color="amber"  delay={0.16} />
            <ChecklistCard label="High Priority" count={items.filter(i => i.priority === "High" && !i.done).length} icon="🔴" color="maroon" delay={0.24} />
          </div>
        </div>

        {/* ── Controls ── */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          {/* Search */}
          <div className="relative flex-1">
            <RiSearchLine size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
            <input type="text" placeholder="Search tasks…" value={search}
              onChange={e => setSearch(e.target.value)}
              className="input-luxury !pl-10 !py-2.5 text-sm w-full" />
          </div>

          {/* Status filter */}
          <div className="flex gap-2">
            {FILTERS.map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-4 py-2.5 rounded-xl text-xs font-body font-medium border
                            transition-all duration-200 whitespace-nowrap
                            ${filter === f ? "bg-maroon text-ivory/70 border-maroon" : "bg-white text-muted border-cream hover:border-gold"}`}>
                {f}
              </button>
            ))}
          </div>

          {/* Add task */}
          <button onClick={() => { setEditItem(null); setNewTask(NEW_TASK_INIT); setAddOpen(true); }}
            className="btn-primary !px-5 !py-2.5 !text-xs !gap-2 whitespace-nowrap">
            <RiAddLine size={15} /> Add Task
          </button>
        </div>

        {/* ── Category filter pills ── */}
        <div className="flex flex-wrap gap-2 mb-6">
          {CHECKLIST_CATEGORIES.map(c => (
            <button key={c} onClick={() => setCatFilter(c)}
              className={`px-3 py-1.5 rounded-full text-[11px] font-body font-medium border
                          transition-all duration-200
                          ${catFilter === c ? "bg-gold text-dark border-gold" : "bg-white text-muted border-cream hover:border-gold"}`}>
              {c}
            </button>
          ))}
        </div>

        {/* ── Task list ── */}
        <div className="flex flex-col gap-2">
          <AnimatePresence>
            {visible.map((item, i) => (
              <ChecklistItem
                key={item.id}
                item={item}
                index={i}
                onToggle={toggle}
                onDelete={remove}
                onEdit={openEdit}
              />
            ))}
          </AnimatePresence>

          {visible.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-20 gap-3">
              <span className="text-5xl">🎉</span>
              <h3 className="font-heading text-display-sm text-dark">
                {filter === "Completed" ? "No completed tasks yet" : "All tasks done!"}
              </h3>
              <p className="font-body text-sm text-muted">
                {filter === "Pending" ? "You're all caught up!" : "Try a different filter."}
              </p>
            </motion.div>
          )}
        </div>
      </div>

      {/* ── Add / Edit modal ── */}
      <AnimatePresence>
        {addOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-dark/40 backdrop-blur-sm"
              onClick={() => setAddOpen(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              onClick={e => e.stopPropagation()}
            >
              <div className="bg-ivory w-full max-w-md rounded-luxury-lg shadow-luxury-lg border border-cream">
                <div className="flex items-center justify-between px-6 py-5 border-b border-cream">
                  <h3 className="font-heading text-lg font-semibold text-dark">
                    {editItem ? "Edit Task" : "Add New Task"}
                  </h3>
                  <button onClick={() => setAddOpen(false)}
                    className="w-8 h-8 rounded-full bg-cream flex items-center justify-center text-muted hover:text-maroon transition-colors">
                    <RiCloseLine size={18} />
                  </button>
                </div>
                <form onSubmit={addTask} className="p-6 flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-body text-xs font-medium text-dark/70">Task Name *</label>
                    <input value={newTask.task} onChange={e => setNewTask(p => ({ ...p, task: e.target.value }))}
                      className="input-luxury text-sm" placeholder="e.g. Book florist" autoFocus />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-body text-xs font-medium text-dark/70">Category</label>
                      <select value={newTask.category}
                        onChange={e => setNewTask(p => ({ ...p, category: e.target.value }))}
                        className="select-luxury text-sm">
                        {CHECKLIST_CATEGORIES.filter(c => c !== "All").map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="font-body text-xs font-medium text-dark/70">Priority</label>
                      <div className="flex gap-1.5">
                        {PRIORITIES.map(p => {
                          const s = PRIORITY_COLORS[p];
                          const active = newTask.priority === p;
                          return (
                            <button key={p} type="button"
                              onClick={() => setNewTask(prev => ({ ...prev, priority: p }))}
                              className={`flex-1 py-2.5 rounded-xl text-[10px] font-body font-semibold border transition-all
                                          ${active ? `${s.bg} ${s.text} ${s.border}` : "bg-white text-muted border-cream hover:border-gold"}`}>
                              {p}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-body text-xs font-medium text-dark/70">Due / Timeline</label>
                    <input value={newTask.due} onChange={e => setNewTask(p => ({ ...p, due: e.target.value }))}
                      className="input-luxury text-sm" placeholder="e.g. 3 months before" />
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button type="button" onClick={() => setAddOpen(false)}
                      className="btn-secondary flex-1 !justify-center !py-3 !text-sm">Cancel</button>
                    <button type="submit" className="btn-primary flex-1 !justify-center !py-3 !text-sm">
                      {editItem ? "Save Changes" : "Add Task"}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}