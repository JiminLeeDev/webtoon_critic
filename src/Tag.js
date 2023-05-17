import styles from "./tag.module.css";

function Tag({ content, event, selected }) {
  return (
    <p
      className={styles.tag}
      style={{
        opacity: selected ? "0.35" : "1",
        pointerEvents: selected ? "none" : "",
      }}
      onMouseOver={(event) => {
        if (!selected) {
          event.target.style.backgroundColor = "lightpink";
        }
      }}
      onMouseLeave={(event) => {
        if (!selected) {
          event.target.style.backgroundColor = "pink";
        }
      }}
      onClick={event ? event : undefined}
    >
      {content}
    </p>
  );
}

export default Tag;
