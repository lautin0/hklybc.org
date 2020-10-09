import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { Container, Row, Col, OverlayTrigger, Tooltip } from "react-bootstrap";

// react-bootstrap components

// core components

function Sharing1() {

  const [hallelujah, setHallelujah] = useState(false);
  const [pray, setPray] = useState(false);

  const setReaction = (reaction: string) => {
    if (reaction === 'hallelujah') {
      setHallelujah(!hallelujah)
      setPray(false)
    } else if (reaction === 'pray') {
      setHallelujah(false)
      setPray(!pray)
    }
  }

  useEffect(() => {
    document.querySelector('.scroll-animations .animated')?.classList.remove("animate__fadeInLeft");
  }, [])

  useEffect(() => {
    // Check if element is scrolled into footer
    const isScrolledIntoFooter = () => {
      var docViewTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      var docViewBottom = docViewTop + window.innerHeight

      let el: any = document.querySelector("div#reaction-bar");

      if (el == null)
        return false
      return docViewBottom > el.getBoundingClientRect().top + window.pageYOffset
    }

    // If element is scrolled into view, fade it in
    const handleScroll = () => {
      if (isScrolledIntoFooter() === true) {
        document.querySelector('.scroll-animations .animated')?.classList.add("animate__fadeOut");
        document.querySelector('.scroll-animations .animated')?.classList.remove("animate__fadeIn");
      } else {
        document.querySelector('.scroll-animations .animated')?.classList.add("animate__fadeIn");
        document.querySelector('.scroll-animations .animated')?.classList.remove("animate__fadeOut");
      }
    }

    window.addEventListener("scroll", (e: any) => {
      handleScroll();
    })

    return function cleanup() {
      window.removeEventListener("scroll", handleScroll);
    };
  })

  const renderTooltip = (props: any, text: string) => (
    <Tooltip {...props}>{text}</Tooltip>
  );

  return (
    <Container style={{ paddingTop: 90, paddingBottom: 90, borderRadius: '.5rem', marginBottom: 100 }}>
      <Row className="text-left d-none d-lg-block scroll-animations" style={{ position: "sticky", top: '40vh' }}>
        <div style={{ position: "absolute", marginTop: 80 }} className="animated animate__animated animate__fast">
          <OverlayTrigger placement="auto" overlay={(props: any) => renderTooltip(props, '哈利路亞')}>
            <div className="my-3" style={{ cursor: 'pointer' }} onClick={() => setReaction('hallelujah')}>
              <div style={{ display: 'inline' }}>
                <i className={`fas fa-hanukiah reaction ${hallelujah ? "reacted" : ""}`}></i>
              </div>
              <span style={{ fontSize: 24 }} className="m-1">0</span>
            </div>
          </OverlayTrigger>
          <OverlayTrigger placement="auto" overlay={(props: any) => renderTooltip(props, '記念')}>
            <div className="my-3" style={{ cursor: 'pointer' }} onClick={() => setReaction('pray')}>
              <div style={{ display: 'inline' }}>
                <i className={`fas fa-praying-hands reaction ${pray ? "reacted" : ""}`}></i>
              </div>
              <span style={{ fontSize: 24 }} className="m-1">0</span>
            </div>
          </OverlayTrigger>
        </div>
      </Row>
      <Row className="text-left" style={{ alignItems: 'baseline' }}>
        <Col lg={{ offset: 4 }}><h3><strong>疫情中的信仰 - 神的應許和人的盼望</strong></h3></Col>
        <Col className="text-right pr-5" lg={12}><h5 style={{ color: 'gray' }}>古偉健弟兄 2020年4月5日</h5></Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col className="text-left sharing" lg="8" md="12">
          <p>經文:詩 91:1~16</p>
          <p>(是在 1Mar2020的崇拜講道之領受)</p>
          <p>在疫情中，在大家都擔心自己和家人的健康時。這時候，</p>
          <p>信徒的盼望是什麼呢? 神的應許是什麼呢?</p>
          <p>詩篇 91<br /> 3他必救你脫離捕鳥人的網羅、和毒害的瘟疫。</p>
          <p>6也不怕黑夜行的瘟疫、或是午間滅人的毒病。</p>
          <p>7雖有千人仆倒在你旁邊、萬人仆倒在你右邊、這災卻不得臨近你。</p>
          <p>10禍患必不臨到你、災害也不挨近你的帳棚。</p>
          <p>11因他要為你吩咐他的使者、在你行的一切道路上保護你。</p>
          <p>12他們要用手托著你、免得你的腳碰在石頭上。</p>
          <p>&nbsp;&nbsp;&nbsp; 我們若以字面意思去理解這經文，認為神應許信靠他的人不會染疫而死，這就錯了!在 太 4:6， 撒旦以 詩 91:12經文的文字直解去誤導主耶穌。引誘祂去認為神應許的保護和拯救，是 在於人今 生的肉身需要。我們若要求神不論情況地成就祂這應許，就是試探神。神有時會於 今生的危難中 作出拯救和保護(以色列人出埃及)，但有時卻不會(如使徒殉道)。</p>
          <p>&nbsp;&nbsp;&nbsp; 神真正的拯救和保護是救人脱離罪，罪的原型就是人服侍自己的心，離棄神(亞當夏娃)。 罪人只 服侍自己"今生的需求和渴望"，又希望神服侍他"今生的需求和渴望"，適時地為他作出 保護和拯 救。人根本不明白"罪"和"神的拯救"，也不知道自己真正的需要。罪就是服侍自己。 神的拯救就是 救人脫離不服侍神而服侍自己的境况。這才是神真正的應許!人應當不再在今生 服侍自己，卻要 在今生和永恆中服侍神。</p>
          <p>&nbsp;&nbsp;&nbsp; 在疫情中，或面對其他叫人死亡的天災人禍，人應當檢視自己是否有罪，是否要悔改，是 否能 面對神的審判。人不應單單求神的拯救。人肉身總會死的，罪人會死並且要受審判是神 的命定。 " 那殺身體不能殺靈魂的、不要怕他們.惟有能把身體和靈魂都滅在地獄裡的、正要 怕他。"太 10:28</p>
          <p>正如 路加福音 13:1-9 "正當那時、有人將彼拉多使加利利人的血攙雜在他們祭物中的事、告訴耶穌。 耶穌說、你們 以 為這些加利利人比眾加利利人更有罪、所以受這害麼。 我告訴你們、不是的.你們若不悔 改、都 要如此滅亡。 從前西羅亞樓倒塌了、壓死十八個人.你們以為那些人比一切住在耶路 撒冷的人更 有罪麼。 我告訴你們、不是的.你們若不悔改、都要如此滅亡。 於是用比喻說、 一個人有一棵無 花果樹、栽在葡萄園裡.他來到樹前找果子、卻找不著。 就對管園的說、看 哪、我這三年、來到 這無花果樹前找果子、竟找不著、把他砍了罷.何必白佔地土呢。管園 的說、主阿、今年且留 著、等我周圍掘開土、加上糞.以後若結果子便罷.不然再把他砍 了。"</p>
          <p>信徒真正的盼望是:不論是生是死，靠着基督救贖脱離罪，能在神的面前站立得着，不是白佔 地土的人!</p>
          <p>互勉!</p>
          <hr />
          <p>牧者建議信徒進深學習:<br /> 查考「罪」的釋義。閱讀《 證主聖經神學辭典 》，請了解有哪三個因素使罪的悲劇變得複 雜?從而定下對付罪的方法和生活方式。</p>
        </Col>
      </Row>
      <Row className="text-left mt-5" id="reaction-bar">
        <Col className="form-inline" lg={{ offset: 2 }}>
          <OverlayTrigger placement="auto" overlay={(props: any) => renderTooltip(props, '哈利路亞')}>
            <div className="m-3" style={{ cursor: 'pointer' }} onClick={() => setReaction('hallelujah')}>
              <div style={{ display: 'inline' }}>
                <i className={`fas fa-hanukiah reaction ${hallelujah ? "reacted" : ""}`}></i>
              </div>
              <span style={{ fontSize: 24 }} className="m-1">0</span>
            </div>
          </OverlayTrigger>
          <OverlayTrigger placement="auto" overlay={(props: any) => renderTooltip(props, '記念')}>
            <div className="m-3" style={{ cursor: 'pointer' }} onClick={() => setReaction('pray')}>
              <div style={{ display: 'inline' }}>
                <i className={`fas fa-praying-hands reaction ${pray ? "reacted" : ""}`}></i>
              </div>
              <span style={{ fontSize: 24 }} className="m-1">0</span>
            </div>
          </OverlayTrigger>
        </Col>
      </Row>
    </Container>
  );
}

export default Sharing1;
