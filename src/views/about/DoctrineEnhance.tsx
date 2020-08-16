import React, { useEffect } from "react";

// react-bootstrap components
import { Container, Row, Col, Dropdown } from "react-bootstrap";
import IndexNavbar from "components/Navbars/IndexNavbar";
import DoctrinePageHeader from "components/Headers/DoctrinePageHeader";
import DefaultFooter from "components/Footers/DefaultFooter";

// core components

function DoctrineEnhance() {

  //Default scroll to top
  window.scrollTo(0, 0)

  React.useEffect(() => {
    document.body.classList.add("profile-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    return function cleanup() {
      document.body.classList.remove("profile-page");
      document.body.classList.remove("sidebar-collapse");
    };
  });

  return (
    <>
      <IndexNavbar />
      <div className="wrapper">
        <DoctrinePageHeader />
        <div
          //className="section section-download"
          className="section"
        // data-background-color="black"
        >
          <Container>
            <Row className="justify-content-md-center mb-5">
              <Col className="text-left" lg="8" md="12">
                <Dropdown style={{ zIndex: 1001 }}>
                  <Dropdown.Toggle variant="light" id="dropdown-basic">
                    選擇章節
                </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="#chapter2">第二章 基本信條</Dropdown.Item>
                    <Dropdown.Item href="#chapter3">第三章 聖禮</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
            </Row>
            <Row className="justify-content-md-center">
              <Col className="text-left" lg="8" md="12">
                <h2 style={{ fontWeight: 'bold' }} id="chapter2" className="anchor">
                  <div className="d-flex justify-content-between">
                    <div>第二章 基本信條</div>
                    <div onClick={() => { window.scrollTo(0, 0) }} style={{ cursor: 'pointer' }}><i className="fas fa-chevron-up"></i></div>
                  </div>
                </h2>
                <p><b>第一條 : 聖經 </b></p>
                <p><b>我們相信新舊約聖經的原版經文每字每句絕對是神的默示，經聖靈管理的人寫成，因此完全準確無誤。我們相信聖經是神向人類顯明祂旨意的最高啟示。也是我們生活行事的一準則。( 提後3:16，彼後1:19-21 ) </b></p>
                <p><b>第二條 : 真神 </b></p>
                <p><b>我們相信只有一位神，就是宇宙的創造者。祂以三個位格啟示自己，就是父、子、聖靈，各有同等的權柄和榮耀，各有不同的職份，互相配合，完成偉大的救贖工作。 ( 出20:2-3，林前8:6 ) </b></p>
                <p><b>第三條 : 聖靈 </b></p>
                <p><b>我們相信聖靈是獨一真神所具有的三個位格中的一位，祂具有神的一切屬性和品格，與聖父和聖子同等，有相同的本性。祂的工作是叫世人為罪，為公義和為審判，自己責備自己;亦叫信徒藉著祂的洗(重生)歸入基督，藉著祂的印記，同住，充滿和引導，走公義的道路。我們相信悔改信靠主的人必定得著聖靈豐富的賞賜，但我們堅決反對「恩典的第二工」的說法(認為人得救以後必須有聖靈充滿或澆灌的特殊經歷)，我們也反對靈恩派強調聖靈充滿的人必然有醫病和說方言的恩賜。(約16:8，約14:16-17，約14:26，約7:39,來9:14，弗1:13-14，徒1:5，林前12:13) </b></p>
                <p><b>第四條 : 主耶穌基督 </b></p>
                <p><b>我們相信主耶穌基督是從聖靈感孕，藉童貞女瑪利亞所生。祂是從神那裡來的真神，是「神在肉身顯現」。祂的一生完全聖潔無過，死的時候，為我們的罪惡作了完全的挽回祭，不是以殉道士的身份而死，而是甘願代替罪人的地位而死。衪第三天從死裏復活，然後帶著身體升到天上。祂還要帶著身體再來，使祂的聖民被提上天，並要登上大衛的寶座，建立祂的國度，是在大災難和千禧年之前，隨時再來。(約1:11，約1:18，約3:16，約20:2，來4:15，徒2:22-24，提前2:6，腓3:20，徒15:16-17，徒1:11，林前15:3-4) </b></p>
                <p><b>第五條 : 人 </b></p>
                <p><b>我們相信聖經的教導，人是神直接創造出來的，不是由任何一種形式的生命演變而來。原是純潔無罪的人，只因一次自甘墮落，致使全人類在本性和行為上也成為罪人，與神所要求的聖潔完全隔絕，甚至偏向罪惡，所以毫無盼望，要受公義的刑罰，永遠沉淪。( 創1:27，賽53:6，羅3:23，羅5:12-19 ) </b></p>
                <p><b>第六條 : 救恩 </b></p>
                <p><b>我們相信聖經所說，罪人得救贖全是神的旨意和恩典，藉著神兒子中保的工作成就的完全不出於行為。罪人要得拯救，必須悔改靠主耶穌基督，得著新生命，並藉著相信神的話，經歷聖靈的更新，接受新的性情。信福音的人也從基督得著稱義的大恩，就是罪過得蒙赦免，並且因著救主寶血的潔淨，被稱為義。我們相信所有接受主的人所得的救恩和稱義的地位是永遠堅定和穩固。( 弗2:8-10，徒13:39，彼後1:4，約3:3-6，約10:28-29，來4:2，彼前1:18-23 ) </b></p>
                <p><b>第七條 : 教會 </b></p>
                <p><b>我們相信聖經所說，耶穌基督的教會是在五旬節正式成立，並且有兩方面的意義:一是各地有形式的教會，二是「祂的身體」。各地的教會是指當地信而受浸一同聚集的會眾，藉著福音連繫起來，一同遵行基督的律例，聽從祂的吩咐，並享用主話語中應許的恩典和權利。按照聖經的教訓，教會的職事有二，一是牧師或稱監督，長老，二是執事。他們的資格，要求和責任在提摩太前後書和提多書都有詳盡的闡釋。教會即是「基督的身體」是指所有真實信靠基督的人組成的，不論是猶太人或外邦人，不論是那一個宗派的成員，也不論他們在天國或在地上有甚麼樣的地位。( 太28:19-20，徒2:41-42，弗1:22-23，來12:23，提多書 第一章 ) </b></p>
                <p><b>第八條 : 浸禮和主的晚餐(聖餐) </b></p>
                <p><b>聖經告訴我們，基督徒的浸禮是奉父、子、聖靈的名，把一個相信主的人浸入水裡，作為一個莊嚴而美麗的表記，表明他與救主同釘死、同埋葬、同復活，他向罪死了，卻因主得著復活的新生命。基督徒必須接受浸禮，始能正式加入該地的教會成為會員，並享受地方教會一切的權利。我們相信主的晚餐是要我們紀念祂的死，直等到祂再來。領這晚餐之前，我們必須小心省察自己。( 羅6:4-5 , 徒8:36-39,林前11:23-28 ) </b></p>
                <p><b>第九條 : 永遠的國度 </b></p>
                <p><b>我們相信聖經的教導，所有義和不義的人都要經過身體的復活。所有藉信心，靠主的名得稱為義的人，要在永恒裡享受神的同在;所有不信、不肯悔改、拒絕神救恩的人卻要永遠受刑罰。( 詩16:11，約14:2，太25:46，約5:28-29 ) </b></p>
                <p><b>第十條 : 撒但 </b></p>
                <p><b>我們相信聖經的記載，有一個惡魔,是「這世界的神」,是「空中掌權者的首領」，充滿了各樣的詭計，時常企圖亂神的計劃，並使人陷在他的網羅裡。然而，主在十字架勝過他，他以後也要受永遠的刑罰。( 弗2:2，啟12:9，林後4:4，來2:14，林後11:13-15 ) </b></p>
                <p><b>第十一條 : 基督徒的生活</b></p>
                <p><b>我們相信聖經的教導，每一個信主的人都要靠著聖靈的幫助，活出基督徒的愛和聖潔，彰顯誠實、正直、寬恕、愛、和各種屬靈的美德。我們也相信這一切美德會幫助人更加謙卑，更熱心事奉主，叫主的名更多被人尊崇。( 林後7:1，帖前4:7，腓4:8，弗4:32，弗5:1-2，弗5:7-10,15-20，彼前5:5-6，箴15:33，加5:22-25 ) </b></p>
                <p><b>第十二條 : 聖經中分別的原則</b></p>
                <p><b>我們接受聖經的教導，信主的人該從世界和背道者之中分別出來，任何與本會信仰相違之基督教組織，我們絕不參加，這是基於神永恒的原則，要把真理和虛謊分別，神也特別吩咐信的人要離開不信的人和背道的弟兄。實行這真理的人必須存敬虔、謙卑、憐憫的態度，但也必須有堅定的信心，免得影響福音工作，使失喪的人缺乏合宜的帶領和引導。二十世紀的教會正推行合一運動，主張福音派和不信派的教會聯合起來推廣福音工作。這種違反聖經原則和教導的行動，我們絕對不會同意。( 太18:15,加1:8-9,太10:34-39,林後6:14,林後11:4,提前6:3-6，提後2:16-18，多3:10，羅16:17，林前5:7-13 ) </b></p>
                <h2 style={{ fontWeight: 'bold', marginTop: 70 }} id="chapter3" className="anchor">
                  <div className="d-flex justify-content-between">
                    <div>第三章 聖禮</div>
                    <div onClick={() => { window.scrollTo(0, 0) }} style={{ cursor: 'pointer' }}><i className="fas fa-chevron-up"></i></div>
                  </div>
                </h2>
                <p><b>第一條 : 浸禮 </b></p>
                <p><b>凡已相信耶穌基督，並加入本會者，必須接受浸禮，藉此表明已經重生得救，脫離罪的權勢，被主買贖，歸入主的名下，與主同死同活，願意一生一世遵行主的教訓，為主而活。</b></p>
                <p><b>第二條 : 聖餐 </b></p>
                <p><b>聖餐是紀念主的流血捨命，為救贖我們而死在十字架上。我們感謝祂，紀念祂，直到祂再來。信徒應該在經常的嚴謹生活及自我審察的情況下進行。</b></p>
              </Col>
            </Row>
          </Container>
        </div>
        <DefaultFooter />
      </div>
    </>
  );
}

export default DoctrineEnhance;
