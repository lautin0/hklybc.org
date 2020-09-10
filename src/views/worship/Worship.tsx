import React, { useState, useRef, useEffect } from "react";
import 'react-quill/dist/quill.snow.css'
import { useParams } from "react-router";
// import domtoimage from 'dom-to-image'
import ImageModal from "components/Modals/ImageModal";
import { useDispatch } from "react-redux";
import { setImage, setLoading } from "actions";
import { Container, Row, Col, Tabs, Tab, Button } from "react-bootstrap";
import ReactQuill from "react-quill";
import ReactToPrint from "react-to-print";
import { ComponentToPrintProps } from "./types/types";
import DOMPurify from "dompurify";
import worshipData from "../../assets/data/data.json"
import moment from "moment";
import html2canvas from 'html2canvas'

function Worship() {
  const dispatch = useDispatch();
  let { id } = useParams();

  const [key, setKey] = useState('home')
  const [data, setData] = useState('')
  const componentRef: any = useRef();

  const handleChange = (content: any) => {
    setData(content);
  }

  const ComponentToPrint = React.forwardRef((props: ComponentToPrintProps, ref: any) => {
    return (
      <div className="m-5" ref={ref} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(props.content) }}>
      </div>
    )
  })

  const editorModules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      // [{ 'size': ['small', 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6] }],
      [{ 'font': [] }],
      // ['blockquote', 'code-block'],
      // [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
      // [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
      // [{ 'direction': 'rtl' }],                         // text direction
      [{ 'align': [] }],
      ['clean']                                         // remove formatting button
    ]
  };

  const handleDownloadNote = () => {
    dispatch(setLoading(true))
    // domtoimage.toPng(document.getElementsByClassName('ql-editor')[0], { bgcolor: '#ffffe6', quality: .15 })
    //   .then(async function (data: any) {
    //     dispatch(setImage(data))
    //     dispatch(setLoading(false))
    //   });    
    // let offsetY = 0
    // if (window.innerWidth < 577)
    //   offsetY = 1100
    // else if (window.innerWidth < 769)
    //   offsetY = 1050
    // else
    //   offsetY = 1000
    let el = document.getElementsByClassName('ql-editor')[0] as HTMLElement
    let offsetY = window.pageYOffset + el.getBoundingClientRect().top
    html2canvas(el, { scale: 1, useCORS: true, backgroundColor: '#ffffe6', height: el.clientHeight, y: offsetY })
      .then(function (canvas: HTMLCanvasElement) {
        dispatch(setImage(canvas.toDataURL()))
        dispatch(setLoading(false))
      });
  }

  const wData = worshipData.filter(x => x.id == id)[0]

  useEffect(() => {
    setData(wData.note);
  }, [wData])

  return (
    <div className="section">
      <ImageModal />
      <Container style={{ marginTop: -20 }}>
        <Row className="justify-content-md-center">
          <Col className="text-center" lg="8" md="12">
            <h2>{`${moment(wData.id, 'YYYYMMDD').format('LL')} ${wData.type}`}</h2>
          </Col>
        </Row>
        {wData.link != '' && <Row className="justify-content-center mt-3">
          <iframe width="660" height="371" src={wData.link} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </Row>}
        <Row className="mt-5 mb-5 text-center justify-content-center ml-1 mr-1">
          <Tabs
            id=""
            activeKey={key}
            onSelect={(k: any) => setKey(k)}
            className="nav-justified w-100 mb-5"
            style={{ fontSize: 20 }}
          >
            <Tab eventKey="home" title="筆記">
              <div className="mb-2 form-inline">
                {wData.docs.map((value, index) => {
                  return <div style={{ width: 'fit-content' }} className="mr-3" key={index}>
                    <a href={value.link} target="_blank" className="dl-link">
                      <div>
                        {value.type === 'pdf' && (<i style={{ fontSize: 48, color: '#f04100' }} className="far fa-file-pdf"></i>)}
                        {value.type === 'docx' && (<i style={{ fontSize: 48, color: '#285595' }} className="far fa-file-word"></i>)}
                      </div>
                      <div>
                        <label>{value.title + '.' + value.type}</label>
                      </div>
                    </a>
                  </div>
                })}
              </div>
              <Row>
                <ReactQuill
                  className="mb-3"
                  value={data}
                  onChange={handleChange}
                  modules={editorModules}
                  style={{
                    minHeight: 500,
                    maxWidth: '98vw'
                  }}
                />
              </Row>
              <Row className="mt-5 justify-content-end">
                <div className="d-block d-lg-none">
                  <Button style={{ transform: 'translate(0px, 25px)' }} variant="primary" onClick={handleDownloadNote}>
                    文字轉圖<i className="ml-1 fas fa-exchange-alt"></i>
                  </Button>
                </div>
                <div className="d-none d-lg-block">
                  <ReactToPrint
                    trigger={() =>
                      <Button variant="primary">另存PDF<i className="fa fa-print ml-1" aria-hidden="true"></i>
                      </Button>}
                    content={() => componentRef.current}
                  />
                  <div className="d-none">
                    <ComponentToPrint
                      ref={el => (componentRef.current = el)}
                      content={data}
                    />
                  </div>
                </div>
              </Row>
            </Tab>
            <Tab eventKey="scripture" title="經文">
              <div className="text-left mb-5 verse" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(wData.verse) }}>
              </div>
            </Tab>
          </Tabs>
        </Row>
      </Container>
    </div>
  )
}

export default Worship;