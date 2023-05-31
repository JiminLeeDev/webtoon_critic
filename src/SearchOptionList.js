import Tag from "./Tag";

function SearchOptionList({ reqOptionState }) {
  const getOptionElements = (list) => {
    return list.map((item) => (
      <Tag
        content={item.content}
        event={() =>
          reqOptionState.setReqOptions({
            ...reqOptionState.reqOptions,
            [item.optionName]: item.optionValue,
            page: 0,
          })
        }
        selected={
          reqOptionState.reqOptions[item.optionName] === item.optionValue
        }
        key={item.content}
      />
    ));
  };

  return (
    <div>
      <div style={{ margin: "1% 0% 1% 0%" }}>
        {getOptionElements([
          { content: "월요일", optionName: "day", optionValue: "mon" },
          { content: "화요일", optionName: "day", optionValue: "tue" },
          { content: "수요일", optionName: "day", optionValue: "wed" },
          { content: "목요일", optionName: "day", optionValue: "thu" },
          { content: "금요일", optionName: "day", optionValue: "fri" },
          { content: "토요일", optionName: "day", optionValue: "sat" },
          { content: "일요일", optionName: "day", optionValue: "sun" },
          { content: "모든 요일", optionName: "day", optionValue: "" },
        ])}
      </div>

      <div style={{ margin: "3% 0% 1% 0%" }}>
        {getOptionElements([
          { content: "네이버", optionName: "service", optionValue: "naver" },
          { content: "카카오", optionName: "service", optionValue: "kakao" },
          {
            content: "카카오페이지",
            optionName: "day",
            optionValue: "kakaoPage",
          },
          { content: "모든 플랫폼", optionName: "service", optionValue: "" },
        ])}
      </div>

      <div style={{ margin: "3% 0% 1% 0%" }}>
        {getOptionElements([
          { content: "19+", optionName: "adult", optionValue: true },
          { content: "19-", optionName: "adult", optionValue: false },
          {
            content: "상관 없음",
            optionName: "adult",
            optionValue: "",
          },
        ])}
      </div>

      <div style={{ margin: "3% 0% 1% 0%" }}>
        {getOptionElements([
          { content: "무료", optionName: "free", optionValue: "free" },
          {
            content: "기다리면 무료",
            optionName: "free",
            optionValue: "waitFree",
          },
          {
            content: "상관 없음",
            optionName: "free",
            optionValue: "",
          },
        ])}
      </div>
    </div>
  );
}

export default SearchOptionList;
