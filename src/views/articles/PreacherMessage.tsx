import { useMutation, useQuery } from "@apollo/client";
import { setSysMessage, setSystemFailure } from "actions";
import CommentSection from "components/Comments/CommentSection";
import { NewReaction, Post, ReactionType } from "generated/graphql";
import { REACT_TO_POST, GET_POST } from "graphqls/graphql";
import moment from "moment";
import React, { useEffect, useState } from "react";

// react-bootstrap components
import { Container, Row, Col, Tooltip, OverlayTrigger } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { RootState } from "reducers";
import { getKeyValue, getTokenValue } from "utils/utils";
// core components

function PreacherMessage() {

  const tokenPair = useSelector((state: RootState) => state.auth.tokenPair);

  const dispatch = useDispatch()

  const location = useLocation()

  const [post, setPost] = useState<any>()

  const [react, { data: resultPost }] = useMutation<{ post: Post }, { input: NewReaction }>(REACT_TO_POST);
  const { loading, data, refetch } = useQuery<{ post: Post }, { oid: string }>(GET_POST, { variables: { oid: "5f850dc4e52fde7c2930c34b" }, notifyOnNetworkStatusChange: true });

  const setReaction = (reaction: ReactionType) => {
    if (tokenPair?.token == null) {
      dispatch(setSysMessage('請先登入'))
      return
    } else if (getTokenValue(tokenPair?.token)?.role.toUpperCase() === 'PUBLIC') {
      dispatch(setSysMessage('使用公眾號不能表達心情，請轉為私號'))
      return
    }
    react({
      variables: {
        input: {
          username: getTokenValue(tokenPair?.token).username,
          postOID: data?.post._id,
          type: reaction
        },
      }
    }).catch(e => {
      dispatch(setSystemFailure(e))
    })
  }


  useEffect(() => {
    if (data !== undefined) {
      setPost(data.post)
    } else if (resultPost !== undefined) {
      setPost(resultPost)
    }
  }, [data, resultPost])

  useEffect(() => {
    document.querySelector('.scroll-animations .animated')?.classList.remove("animate__fadeInLeft");
  }, [])

  useEffect(() => {
    refetch && refetch()
  }, [location, refetch])

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

  const renderTooltip = (props: any, type: string) => {
    const currUser = getTokenValue(tokenPair?.token)?.username;
    let usernames: any[] = post.reactions
      .filter((r: any) =>
        r.type === type.toUpperCase()
      )
      .map((x: any) => {
        return x.username
      })
    let text = ''
    if (type === 'pray')
      text = '記念'
    else
      text = '哈利路亞'

    let sentence = "{0}{1}表示 " + text
    let userClause = ""
    if (usernames.some(x => x === currUser)) {
      const idx = usernames.indexOf(currUser);
      const clone = [...usernames]
      usernames[0] = clone[idx]
      usernames[idx] = clone[0]
    }
    usernames.slice(0, 2).map((user: any, i: number) => {
      if (userClause.length > 0)
        userClause += ", "
      userClause += (user === currUser ? '你' : user)
      return user
    })

    if (userClause.length > 0)
      sentence = sentence.replace('{0}', userClause)
    if (usernames.length - 2 > 0)
      sentence = sentence.replace('{1}', `和另外 ${usernames.length - 2} 人`)
    else
      sentence = sentence.replace('{1}', '')

    return <Tooltip {...props}> {usernames.length > 0 ? sentence : text}</Tooltip>
  };

  const isReacted = (type: string): boolean => {
    if (tokenPair?.token == null)
      return false
    return post.reactions.filter((r: any) =>
      r.username === getTokenValue(tokenPair?.token).username &&
      r.type === type.toUpperCase()
    ).length > 0
  }

  const reactionCount = (type: string): number => {
    return post.reactions.filter((r: any) =>
      r.type === type.toUpperCase()
    ).length
  }

  useEffect(() => {
    //Default scroll to top
    window.scrollTo(0, 0)
  }, [])


  return (
    <>
      <div className="section">
        {loading && <Container style={{ marginTop: -20, marginBottom: 60  }}>
          <div className="text-center">
            <div className="spinner-grow text-secondary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </Container>}
        {(!loading && post != null) && <Container>
          <Row className="text-left d-none d-lg-block scroll-animations" style={{ position: "sticky", top: '40vh' }}>
            <div style={{ position: "absolute", marginTop: 80 }} className="animated animate__animated animate__fast">
              <OverlayTrigger overlay={(props: any) => renderTooltip(props, 'hallelujah')}>
                <div className="my-3" onClick={() => setReaction(ReactionType.Hallelujah)}>
                  <div style={{ display: 'inline', cursor: 'pointer' }}>
                    <i className={`fas fa-hanukiah reaction ${isReacted('hallelujah') ? "reacted" : ""}`}></i>
                  </div>
                  <span style={{ fontSize: 24 }} className="m-1">{reactionCount('hallelujah')}</span>
                </div>
              </OverlayTrigger>
              <OverlayTrigger overlay={(props: any) => renderTooltip(props, 'pray')}>
                <div className="my-3" onClick={() => setReaction(ReactionType.Pray)}>
                  <div style={{ display: 'inline', cursor: 'pointer' }}>
                    <i className={`fas fa-praying-hands reaction ${isReacted('pray') ? "reacted" : ""}`}></i>
                  </div>
                  <span style={{ fontSize: 24 }} className="m-1">{reactionCount('pray')}</span>
                </div>
              </OverlayTrigger>
            </div>
          </Row>
          <Row className="text-left" style={{ alignItems: 'baseline' }}>
            <Col lg={{ span: 4, offset: 4 }}><h3><strong>{post.title}</strong></h3></Col>
            <Col lg={4}><h5 style={{ color: 'gray' }}>{moment(post.creDttm, 'YYYY-MM-DDTHH:mm:ssZ').format('Y')}年{moment(post.creDttm, 'YYYY-MM-DDTHH:mm:ssZ').format('M')}月{moment(post.creDttm, 'YYYY-MM-DDTHH:mm:ssZ').format('D')}日</h5></Col>
          </Row>
          <Row className="justify-content-md-center">
            <Col className="text-left" lg="8" md="12" dangerouslySetInnerHTML={{ __html: post.content }}>
            </Col>
          </Row>
          <Row className="text-left mt-5" id="reaction-bar">
            <Col className="form-inline" lg={{ offset: 2 }}>
              <OverlayTrigger overlay={(props: any) => renderTooltip(props, 'hallelujah')}>
                <div className="m-3" onClick={() => setReaction(ReactionType.Hallelujah)}>
                  <div style={{ display: 'inline', cursor: 'pointer' }}>
                    <i className={`fas fa-hanukiah reaction ${isReacted('hallelujah') ? "reacted" : ""}`}></i>
                  </div>
                  <span style={{ fontSize: 24 }} className="m-1">{reactionCount('hallelujah')}</span>
                </div>
              </OverlayTrigger>
              <OverlayTrigger overlay={(props: any) => renderTooltip(props, 'pray')}>
                <div className="m-3" onClick={() => setReaction(ReactionType.Pray)}>
                  <div style={{ display: 'inline', cursor: 'pointer' }}>
                    <i className={`fas fa-praying-hands reaction ${isReacted('pray') ? "reacted" : ""}`}></i>
                  </div>
                  <span style={{ fontSize: 24 }} className="m-1">{reactionCount('pray')}</span>
                </div>
              </OverlayTrigger>
            </Col>
          </Row>
          <CommentSection id="5f850dc4e52fde7c2930c34b" type="PREACHER" />
        </Container>}
      </div>
    </>
  );
}

export default PreacherMessage;
