import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import Pagination from "./Pagination";
import ToonListViwer from "./ToonListViewer";
import Footer from "./Footer";
import "./fonts.css";
import SearchOptionList from "./SearchOptionList";
import Header from "./Header";

function App() {
  const isPc = useMediaQuery({
    query: "(min-width:1200px)",
  });
  const isTablet = useMediaQuery({
    query: "(min-width:800px) and (max-width:1200px)",
  });

  const [reqOptions, setReqOptions] = useState({
    day: "",
    service: "",
    perPage: 48,
    adult: "",
    free: "",
  });

  const [page, setPage] = useState(0);
  const [webtoonDatas, setWebttonDatas] = useState([]);
  const [filteredWebtoons, setFilteredWebtoons] = useState([]);
  const [webtoonPerPage, setWebtoonPerPage] = useState([]);
  const [loaded, setloaded] = useState(false);

  const callApi = () => {
    setloaded(false);

    fetch(`https://korea-webtoon-api.herokuapp.com/`)
      .then((res) => res.json())
      .then((count_res) => {
        fetch(
          `https://korea-webtoon-api.herokuapp.com/?perPage=${
            reqOptions.service === ""
              ? count_res.totalWebtoonCount
              : reqOptions.service === "naver"
              ? count_res.naverWebtoonCount
              : reqOptions.service === "kakao"
              ? count_res.kakaoWebtoonCount
              : count_res.kakaoPageWebtoonCount
          }&${
            reqOptions.service !== "" ? `&service=${reqOptions.service}` : ""
          }&${reqOptions.day !== "" ? `&updateDay=${reqOptions.day}` : ""}`
        )
          .then((res) => res.json())
          .then((res) => {
            setWebttonDatas(res.webtoons);

            setloaded(true);
          });
      });
  };

  const fitlerWebtoons = () => {
    if (webtoonDatas === undefined) {
      setFilteredWebtoons([]);
    } else {
      setFilteredWebtoons(
        webtoonDatas.filter((webtoonData) => {
          let isFilterable = true;

          if (reqOptions.adult !== "") {
            if (reqOptions.adult !== webtoonData.additional.adult) {
              isFilterable = false;
            }
          }

          if (reqOptions.free !== "") {
            if (
              !webtoonData.additional.singularityList.includes(reqOptions.free)
            ) {
              isFilterable = false;
            }
          }

          if (isFilterable) {
            return webtoonData;
          }
        })
      );
    }
  };

  const divideWebtoonByPage = () => {
    let idx = 0;
    let webtoons = [];
    let Pages = [];

    filteredWebtoons.map((webtoon) => {
      if (idx < reqOptions.perPage) {
        webtoons.push(webtoon);
        idx++;
      } else {
        Pages.push(webtoons);

        webtoons = [];
        idx = 0;
      }
    });

    if (webtoons !== []) {
      Pages.push(webtoons);
    }

    setWebtoonPerPage(Pages);
  };

  useEffect(() => {
    callApi();
  }, [reqOptions.day, reqOptions.service]);

  useEffect(() => {
    fitlerWebtoons();
  }, [webtoonDatas, reqOptions.adult, reqOptions.free]);

  useEffect(() => {
    setPage(0);

    divideWebtoonByPage();
  }, [filteredWebtoons]);

  return (
    <div
      style={{
        padding: "5% 5%",
        fontFamily: "Happiness-Sans-Title",
        backgroundColor: "",
      }}
    >
      <Header />

      <div
        style={{
          opacity: loaded ? "1" : "0.35",
          pointerEvents: loaded ? "initial" : "none",
          userSelect: loaded ? "initial" : "none",
        }}
      >
        <SearchOptionList reqOptionState={{ reqOptions, setReqOptions }} />

        <ToonListViwer
          isPc={isPc}
          isTablet={isTablet}
          webtoons={webtoonPerPage.length === 0 ? [] : webtoonPerPage[page]}
        />

        <Pagination
          page={page}
          pre_clickable={page > 0}
          next_clickable={webtoonPerPage.length > page + 1}
          pre_click={() => setPage(page - 1)}
          next_click={() => setPage(page + 1)}
        />
      </div>

      <Footer />
    </div>
  );
}

export default App;
