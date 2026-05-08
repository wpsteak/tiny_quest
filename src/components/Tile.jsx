export default function Tile({ item, extraClass = "", draggable, onSelect }) {
  function handleDragStart(e) {
    if (!draggable) return;
    e.dataTransfer.setData("text/plain", item.id);
  }
  function handleClick(e) {
    e.stopPropagation();
    if (onSelect) onSelect();
  }
  return (
    <button
      type="button"
      className={`tile ${extraClass}`.trim()}
      draggable={draggable}
      data-item={item.id}
      onDragStart={handleDragStart}
      onClick={handleClick}
      disabled={!draggable}
    >
      {item.icon && <span>{item.icon}</span>}
      <span>
        {item.label}
        {item.detail && <small>{item.detail}</small>}
      </span>
    </button>
  );
}
