import React, { useEffect, useMemo, useState } from "react";

type Item = {
  id: string;
  label: string;
  tags?: string[];
  meta?: { score?: number; note?: string | null };
  archived?: boolean;
};

export function CollieEdgeCasePlayground() {
  const [isEnabled, setIsEnabled] = useState(true);
  const [showDetails, setShowDetails] = useState(false);
  const [showArchived, setShowArchived] = useState(false);
  const [compact, setCompact] = useState(false);

  const [query, setQuery] = useState("");
  const [limit, setLimit] = useState(4);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [items, setItems] = useState<Item[]>([
    { id: "a1", label: "Alpha", tags: ["hot", "new"], meta: { score: 7, note: "Solid" } },
    { id: "b2", label: "Beta", tags: [], meta: { score: 0, note: null } },
    { id: "c3", label: "Gamma", tags: ["edge"], meta: { score: 12 }, archived: true },
    { id: "d4", label: "Delta", meta: {}, archived: false },
    { id: "e5", label: "Epsilon", tags: ["rare", "odd"], meta: { score: 3, note: "Low" } },
  ]);

  // Side-effect that changes behavior based on a toggle (good for testing rebuilds + control flow).
  useEffect(() => {
    if (!isEnabled) return;
    const t = window.setTimeout(() => {
      // noop-ish: just ensures effect runs; you’ll see it in console + state changes if you want.
      // (kept minimal to avoid being annoying)
      // console.log("Playground active");
    }, 250);
    return () => window.clearTimeout(t);
  }, [isEnabled]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = items;

    if (!showArchived) list = list.filter((x) => !x.archived);

    if (q) {
      list = list.filter((x) => {
        const tags = x.tags?.join(" ") ?? "";
        const note = x.meta?.note ?? "";
        return `${x.label} ${tags} ${note}`.toLowerCase().includes(q);
      });
    }

    return list;
  }, [items, query, showArchived]);

  const visible = filtered.slice(0, limit);
  const selected = items.find((x) => x.id === selectedId) ?? null;

  function toggleArchive(id: string) {
    setItems((prev) =>
      prev.map((x) => (x.id === id ? { ...x, archived: !x.archived } : x))
    );
  }

  function addItem() {
    const id = Math.random().toString(16).slice(2, 7);
    const next: Item = {
      id,
      label: query.trim() ? query.trim() : `New ${id}`,
      tags: query.includes("#") ? query.split("#").slice(1).filter(Boolean) : undefined,
      meta: { score: Math.floor(Math.random() * 13), note: Math.random() > 0.5 ? "Generated" : null },
    };
    setItems((prev) => [next, ...prev]);
  }

  const containerClass =
    "playground " +
    (isEnabled ? "is-enabled" : "is-disabled") +
    (compact ? " is-compact" : "") +
    (showDetails ? " show-details" : "");

  const headerStyle: React.CSSProperties = {
    padding: compact ? 8 : 14,
    border: "1px solid #2d2d2d",
    borderRadius: 10,
    userSelect: "none",
    opacity: isEnabled ? 1 : 0.6,
  };

  const bannerHtml = useMemo(() => {
    const safeLabel = (selected?.label ?? "nothing").replaceAll("<", "&lt;");
    return `<strong>Selected:</strong> <em>${safeLabel}</em> ${showDetails ? "• details on" : ""}`;
  }, [selected?.label, showDetails]);

  return (
    <section
      className={containerClass}
      data-collie="edge-cases"
      aria-label="Collie Edge Case Playground"
      style={{ fontFamily: "system-ui, sans-serif", lineHeight: 1.35 }}
    >
      <header style={headerStyle}>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
          <h2 style={{ margin: 0 }}>
            Collie Edge Cases{" "}
            {isEnabled ? <span aria-hidden="true">✅</span> : <span aria-hidden="true">⛔</span>}
          </h2>

          <div style={{ marginLeft: "auto", display: "flex", gap: 8, flexWrap: "wrap" }}>
            <button type="button" onClick={() => setIsEnabled((v) => !v)}>
              Toggle Enabled
            </button>
            <button type="button" onClick={() => setShowDetails((v) => !v)} disabled={!isEnabled}>
              Toggle Details
            </button>
            <button type="button" onClick={() => setShowArchived((v) => !v)} disabled={!isEnabled}>
              Toggle Archived
            </button>
            <button type="button" onClick={() => setCompact((v) => !v)}>
              Toggle Compact
            </button>
          </div>
        </div>

        <div
          style={{ marginTop: 10 }}
          // Collie should handle this attribute + value properly.
          dangerouslySetInnerHTML={{ __html: bannerHtml }}
        />

        <div style={{ marginTop: 10, display: "flex", gap: 8, flexWrap: "wrap" }}>
          <label style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <span>Search</span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder='Try: "alpha", "#hot", "generated"'
              disabled={!isEnabled}
              aria-invalid={query.length > 18 ? "true" : "false"}
            />
          </label>

          <label style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <span>Limit</span>
            <input
              type="number"
              value={limit}
              min={0}
              max={99}
              onChange={(e) => setLimit(Number(e.target.value || 0))}
              disabled={!isEnabled}
            />
          </label>

          <button type="button" onClick={addItem} disabled={!isEnabled || query.trim().length === 0}>
            Add from query
          </button>

          <button
            type="button"
            onClick={() => {
              setSelectedId(null);
              setQuery("");
              setLimit(4);
            }}
          >
            Reset
          </button>
        </div>

        {query.length > 18 && (
          <p role="alert" style={{ marginTop: 10 }}>
            🚩 Query is getting long (testing conditional warnings / aria-invalid).
          </p>
        )}
      </header>

      {!isEnabled ? (
        <div style={{ marginTop: 14, padding: 12, border: "1px dashed #999", borderRadius: 10 }}>
          <p style={{ margin: 0 }}>
            Disabled mode: content is gated behind a top-level conditional.
          </p>
        </div>
      ) : (
        <>
          <main style={{ marginTop: 14 }}>
            {visible.length === 0 ? (
              <p>
                No results for <code>{query || "(empty query)"}</code>
                {showArchived ? "" : " (archived are hidden)"}.
              </p>
            ) : (
              <ul style={{ paddingLeft: 18 }}>
                {visible.map((item, index) => {
                  const isSelected = item.id === selectedId;
                  const score = item.meta?.score ?? 0;

                  return (
                    <li
                      key={item.id}
                      className={
                        "row " +
                        (isSelected ? "is-selected" : "") +
                        (item.archived ? " is-archived" : "") +
                        (score >= 10 ? " is-high" : "")
                      }
                      data-index={index}
                      aria-current={isSelected ? "true" : undefined}
                      style={{
                        marginBottom: 10,
                        opacity: item.archived ? 0.6 : 1,
                      }}
                    >
                      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <button
                          type="button"
                          onClick={() => setSelectedId((prev) => (prev === item.id ? null : item.id))}
                        >
                          {isSelected ? "Unselect" : "Select"}
                        </button>

                        <strong>{item.label}</strong>

                        {/* Conditional render based on numeric threshold */}
                        {score >= 10 ? (
                          <span title="score >= 10" aria-label="High score">
                            🔥
                          </span>
                        ) : score === 0 ? (
                          <span title="score is 0" aria-label="Zero score">
                            🧊
                          </span>
                        ) : (
                          <span title="score in-between" aria-label="Medium score">
                            ✳️
                          </span>
                        )}

                        <span style={{ marginLeft: "auto" }}>
                          <code>{item.id}</code>
                        </span>
                      </div>

                      {/* Optional chaining + nullish coalescing */}
                      {showDetails && (
                        <div style={{ marginTop: 8 }}>
                          <div>
                            <span>Score:</span> <strong>{item.meta?.score ?? "n/a"}</strong>
                          </div>

                          <div>
                            <span>Note:</span>{" "}
                            {item.meta?.note ? (
                              <em>{item.meta.note}</em>
                            ) : (
                              <span style={{ opacity: 0.7 }}>(none)</span>
                            )}
                          </div>

                          <div>
                            <span>Tags:</span>{" "}
                            {item.tags?.length ? (
                              <>
                                {item.tags.map((t) => (
                                  <code key={t} style={{ marginRight: 6 }}>
                                    #{t}
                                  </code>
                                ))}
                              </>
                            ) : (
                              <span style={{ opacity: 0.7 }}>(none)</span>
                            )}
                          </div>
                        </div>
                      )}

                      <div style={{ marginTop: 8, display: "flex", gap: 8, flexWrap: "wrap" }}>
                        <button type="button" onClick={() => toggleArchive(item.id)}>
                          {item.archived ? "Unarchive" : "Archive"}
                        </button>

                        {/* A deliberately “weird but real” boolean attr */}
                        <button type="button" disabled={item.archived && !showArchived}>
                          Disabled when archived+hidden
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}

            {/* Show-more pattern */}
            {filtered.length > limit && (
              <button type="button" onClick={() => setLimit((n) => n + 4)} style={{ marginTop: 8 }}>
                Show more ({filtered.length - limit} left)
              </button>
            )}
          </main>

          <aside style={{ marginTop: 16, padding: 12, border: "1px solid #444", borderRadius: 10 }}>
            <h3 style={{ marginTop: 0 }}>Selection Panel</h3>

            {selected ? (
              <>
                <p style={{ marginTop: 0 }}>
                  Selected: <strong>{selected.label}</strong>{" "}
                  {selected.archived ? <span>(archived)</span> : null}
                </p>

                {/* Fragment + conditional nodes */}
                <p>
                  {selected.meta?.score ?? 0} points{" "}
                  {selected.meta?.score && selected.meta.score > 9 ? <>(nice)</> : null}
                </p>
              </>
            ) : (
              <p style={{ marginTop: 0, opacity: 0.8 }}>
                Nothing selected. Click “Select” on any row.
              </p>
            )}
          </aside>
        </>
      )}
    </section>
  );
}
