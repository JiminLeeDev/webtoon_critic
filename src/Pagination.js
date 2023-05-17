function Pagination({
  page,
  pre_clickable,
  next_clickable,
  pre_click,
  next_click,
}) {
  return (
    <div style={{ width: "100%", textAlign: "center" }}>
      <span
        style={{
          backgroundColor: "lightgrey",
          cursor: "pointer",
          padding: "0.25% 0.5%",
          opacity: pre_clickable ? "1" : "0.35",
          pointerEvents: pre_clickable ? "" : "none",
        }}
        onClick={pre_click}
      >
        {"<"}
      </span>
      <span style={{ margin: "0% 1%" }}>{page}</span>
      <span
        style={{
          backgroundColor: "lightgrey",
          cursor: "pointer",
          padding: "0.25% 0.5%",
          opacity: next_clickable ? "1" : "0.35",
          pointerEvents: next_clickable ? "" : "none",
        }}
        onClick={next_click}
      >
        {">"}
      </span>
    </div>
  );
}

export default Pagination;
