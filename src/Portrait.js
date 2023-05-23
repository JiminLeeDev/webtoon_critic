import kakao_icon from "./icons/kakao_icon.png";
import naver_icon from "./icons/naver_icon.png";
import kakao_page_icon from "./icons/kakao_page_icon.png";
import styles from "./portrait.module.css";

function Portrait({ src, title, platform, update_day, address }) {
  return (
    <div
      className={styles.wrapper}
      onMouseOver={(event) => (event.currentTarget.style.opacity = 0.75)}
      onMouseLeave={(event) => (event.currentTarget.style.opacity = 1)}
      onClick={() => window.open(address, false)}
    >
      <img src={src ? src : ""} alt="" className={styles.poster} />

      <div className={styles.title}>{title}</div>

      <img
        src={
          platform === "naver"
            ? naver_icon
            : platform === "kakao"
            ? kakao_icon
            : platform === "kakaoPage"
            ? kakao_page_icon
            : ""
        }
        alt=""
        className={styles.icon}
      />
    </div>
  );
}

export default Portrait;
