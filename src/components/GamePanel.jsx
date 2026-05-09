import Tile from "./Tile.jsx";
import { getLevelItems } from "../state/reducer.js";

export default function GamePanel({
  level,
  placements,
  selectedTileId,
  feedback,
  isLocked,
  onMoveTile,
  onSelectTile
}) {
  const items = getLevelItems(level);
  const remaining = items.filter((item) => !placements[item.id] || placements[item.id] === "source").length;

  function handleDragOver(e) {
    if (isLocked) return;
    e.preventDefault();
    e.currentTarget.classList.add("drag-over");
  }

  function handleDragLeave(e) {
    e.currentTarget.classList.remove("drag-over");
  }

  function handleDrop(e, zoneId) {
    if (isLocked) return;
    e.preventDefault();
    e.currentTarget.classList.remove("drag-over");
    const itemId = e.dataTransfer.getData("text/plain");
    if (itemId) onMoveTile(itemId, zoneId);
  }

  function handleZoneClick(zoneId) {
    if (isLocked) return;
    if (selectedTileId) onMoveTile(selectedTileId, zoneId);
  }

  function tileClassFor(itemId) {
    if (isLocked) return "correct";
    const result = feedback.tileResults && feedback.tileResults[itemId];
    if (result === "correct") return "correct";
    if (result === "wrong") return "wrong";
    if (selectedTileId === itemId) return "selected";
    return "";
  }

  function selectHandler(itemId) {
    if (isLocked) return undefined;
    return () => onSelectTile(selectedTileId === itemId ? null : itemId);
  }

  const sourceItems = items.filter((item) => !placements[item.id] || placements[item.id] === "source");
  const showSource = !level.hideSource;
  const sinkId = level.sink?.id;
  const sinkItems = sinkId ? items.filter((item) => placements[item.id] === sinkId) : [];
  const sinkTotal = sinkId ? items.filter((item) => item.target === sinkId).length : 0;
  const hasSink = Boolean(level.sink);

  function renderZone(zone) {
    const tilesInZone = items.filter((item) => placements[item.id] === zone.id);
    return (
      <section
        key={zone.id}
        className="drop-zone"
        data-zone={zone.id}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={(e) => handleDrop(e, zone.id)}
        onClick={() => handleZoneClick(zone.id)}
      >
        <div className="zone-name">
          <span>{zone.name}</span>
          <span className="zone-hint">{zone.hint}</span>
        </div>
        <div className="drop-zone-items">
          {tilesInZone.map((item) => (
            <Tile
              key={item.id}
              item={item}
              extraClass={tileClassFor(item.id)}
              draggable={!isLocked}
              onSelect={selectHandler(item.id)}
            />
          ))}
        </div>
      </section>
    );
  }

  return (
    <article className={`game-panel ${showSource ? "" : "no-source"} ${hasSink ? "has-sink" : ""}`.trim()}>
      {showSource && (
        <div className="items-column">
          <div className="panel-heading">
            <h3>{level.sourceTitle || "待整理"}</h3>
            <span className="counter">{remaining === 0 ? "已放完" : `剩 ${remaining} 個`}</span>
          </div>
          <div
            className="source-items"
            aria-label="可拖曳項目"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, "source")}
          >
            {sourceItems.map((item) => (
              <Tile
                key={item.id}
                item={item}
                extraClass={tileClassFor(item.id)}
                draggable={!isLocked}
                onSelect={selectHandler(item.id)}
              />
            ))}
          </div>
        </div>
      )}
      <div className="zones-column">
        <div className="panel-heading">
          <h3>{level.zoneTitle || "目標空間"}</h3>
        </div>
        <div className={`module-workspace ${hasSink ? "has-sink-row" : ""}`.trim()}>
          <div className="drop-zones">
            {level.zones.map(renderZone)}
          </div>
          {hasSink && (
            <div
              className="sink-items"
              aria-label={level.sink.title}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, sinkId)}
              onClick={() => handleZoneClick(sinkId)}
            >
              <div className="zone-name">
                <span>{level.sink.title}: {level.sink.name}</span>
                <span className="zone-hint">{sinkItems.length} / {sinkTotal}</span>
              </div>
              <div className="drop-zone-items">
                {sinkItems.map((item) => (
                  <Tile
                    key={item.id}
                    item={item}
                    extraClass={tileClassFor(item.id)}
                    draggable={!isLocked}
                    onSelect={selectHandler(item.id)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
