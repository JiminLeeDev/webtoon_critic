import { useEffect, useState } from "react";
import Portrait from "./Portrait";
import { useMediaQuery } from "react-responsive";
import Tag from "./Tag";
import Pagination from "./Pagination";
import "./fonts.css";

function App() {
  const isPc = useMediaQuery({
    query: "(min-width:1200px)",
  });
  const isTablet = useMediaQuery({
    query: "(min-width:800px) and (max-width:1200px)",
  });
  const isMobile = useMediaQuery({
    query: "(min-width:600px) and (max-width:800px)",
  });

  const [reqOptions, setReqOptions] = useState({
    day: "",
    service: "",
    page: 0,
    perPage: 48,
  });

  const [paginationClickable, setPaginationClickable] = useState({
    next: true,
    pre: true,
  });

  const reload = () => {
    fetch(
      `https://korea-webtoon-api.herokuapp.com/?perPage=${
        reqOptions.perPage
      }&page=${reqOptions.page}${
        reqOptions.service !== "" ? `&service=${reqOptions.service}` : ""
      }${reqOptions.day !== "" ? `&updateDay=${reqOptions.day}` : ""}`
    )
      .then((res) => res.json())
      .then((res) => {
        setPaginationClickable({
          paginationClickable,
          pre: reqOptions.page > 0,
        });

        if (res.webtoons.length < reqOptions.perPage) {
          setPaginationClickable({ ...paginationClickable, next: false });

          if (res.webtoons.length === 0) {
            setReqOptions({ ...reqOptions, page: reqOptions.page - 1 });

            return;
          }
        } else {
          setPaginationClickable({ ...paginationClickable, next: true });
        }

        setWebtoons(res.webtoons);
      });
  };
  const [webtoons, setWebtoons] = useState([]);

  useEffect(() => {
    reload();
  }, [reqOptions]);

  return (
    <div
      style={{
        padding: "5% 5%",
        fontFamily: "Happiness-Sans-Title",
        backgroundColor: "",
      }}
    >
      <div>
        <div style={{ margin: "1% 0% 1% 0%" }}>
          {[
            { content: "월요일", setReqDay: "mon" },
            { content: "화요일", setReqDay: "tue" },
            { content: "수요일", setReqDay: "wed" },
            { content: "목요일", setReqDay: "thu" },
            { content: "금요일", setReqDay: "fri" },
            { content: "토요일", setReqDay: "sat" },
            { content: "일요일", setReqDay: "sun" },
            { content: "모든 요일", setReqDay: "" },
          ].map((dayTag) => (
            <Tag
              content={dayTag.content}
              event={() =>
                setReqOptions({ ...reqOptions, day: dayTag.setReqDay, page: 0 })
              }
              selected={reqOptions.day === dayTag.setReqDay}
            />
          ))}
        </div>

        <div style={{ margin: "3% 0% 1% 0%" }}>
          {[
            { content: "네이버", setReqService: "naver" },
            { content: "카카오", setReqService: "kakao" },
            { content: "카카오페이지", setReqService: "kakaoPage" },
            { content: "모든 플랫폼", setReqService: "" },
          ].map((serviceTag) => (
            <Tag
              content={serviceTag.content}
              event={() =>
                setReqOptions({
                  ...reqOptions,
                  service: serviceTag.setReqService,
                  page: 0,
                })
              }
              selected={reqOptions.service === serviceTag.setReqService}
            />
          ))}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${
              isPc ? 8 : isTablet ? 6 : 4
            }, minmax(${isPc ? "120px" : isTablet ? "110px" : "50px"}, 1fr))`,
          }}
        >
          {webtoons.map((webtoon) => (
            <div
              style={{ position: "relative", margin: "5% 5%" }}
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
          ))}
        </div>
      </div>

      <Pagination
        page={reqOptions.page + 1}
        pre_clickable={paginationClickable.pre}
        next_clickable={paginationClickable.next}
        pre_click={() =>
          setReqOptions({
            ...reqOptions,
            page: reqOptions.page === 0 ? 0 : reqOptions.page - 1,
          })
        }
        next_click={() =>
          setReqOptions({ ...reqOptions, page: reqOptions.page + 1 })
        }
      />

      <div style={{ fontFamily: "sans-serif" }}>
        <p style={{ textAlign: "center", marginTop: "10%" }}>
          This page develop with "Happiness-Sans-Title" font.
        </p>

        <p style={{ textAlign: "center", marginTop: "2%" }}>
          Copyright 2023. Gym Lee. All rights reserved.
        </p>

        <a
          href="https://github.com/JiminLeeDev/webtoon_critic"
          style={{
            textAlign: "center",
            marginTop: "2%",
            textDecoration: "none",
            color: "black",
            display: "block",
          }}
        >
          GitHub
        </a>
      </div>
    </div>
  );
}

export default App;
