function Footer() {
  return (
    <div style={{ fontFamily: "sans-serif" }}>
      <a
        style={{
          textAlign: "center",
          marginTop: "10%",
          textDecoration: "none",
          color: "black",
          display: "block",
        }}
        href="https://noonnu.cc/font_page/902"
      >
        This page develop with "Happiness-Sans-Title" font.
      </a>

      <a
        href="https://noonnu.cc/font_page/1042"
        style={{
          textAlign: "center",
          marginTop: "1%",
          textDecoration: "none",
          color: "black",
          display: "block",
        }}
      >
        This page develop with "Tenada" font.
      </a>

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
  );
}

export default Footer;
