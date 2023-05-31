import Portrait from "./Portrait";

function ToonListViwer({ isPc, isTablet, webtoons }) {
  return webtoons.length === 0 ? (
    <div style={{ textAlign: "center", margin: "5%" }}>
      찾으시는 카테고리의 웹툰이 없어요..ㅠㅠ 죄송합니다 흑흑...
    </div>
  ) : (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${isPc ? 8 : isTablet ? 6 : 4}, minmax(${
          isPc ? "120px" : isTablet ? "110px" : "50px"
        }, 1fr))`,
      }}
    >
      {webtoons.map((webtoon) => {
        return (
          <div
            style={{ position: "relative", margin: "5%" }}
            key={webtoon.webtoonId}
          >
            <Portrait
              src={webtoon ? webtoon.img : ""}
              title={webtoon.title}
              platform={webtoon.service}
              address={webtoon.url}
              update_day={webtoon.updateDays}
            />
          </div>
        );
      })}
    </div>
  );
}

export default ToonListViwer;
