import { setSystemFailure } from 'actions';
import { RBRef } from 'adapter/types';
import usePost from 'hooks/usePost';
import moment from 'moment';
import { useEffect } from 'react';
import { Row, Col, Form, Button, Spinner, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { RootState } from 'reducers';
import { getTimePastStr, getTokenValue } from 'utils/utils';
import Validators from 'utils/validator';

import defaultAvatar from "assets/img/default-avatar.png";
import { Post, useUserProfilePicUriQuery } from 'generated/graphql';
import UNIVERSALS from 'Universals';
import { useIntl } from 'react-intl';

function CommentSection(props: any) {

  const intl = useIntl()

  const { id, type } = props

  const dispatch = useDispatch()

  const tokenPair = useSelector((state: RootState) => state.auth.tokenPair);

  const location = useLocation();

  const { commentPending, postData, addComment, setCommentPending } = usePost({ id: id })

  const { loading, data: profilePicData } = useUserProfilePicUriQuery({
    variables: {
      username: localStorage.getItem('token') != null ? getTokenValue(localStorage.getItem('token')).username : ''
    },
    notifyOnNetworkStatusChange: true
  })

  const { register, handleSubmit, reset, errors } = useForm();

  const onSubmit = (data: any) => {
    setCommentPending(true)
    addComment({
      variables: {
        input: {
          parentId: id,
          title: "",
          subtitle: "",
          type: type,
          content: data.content,
          username: getTokenValue(tokenPair?.token)?.username,
          toUsername: postData?.post?.user.username
        },
      }
    }).catch(e => {
      dispatch(setSystemFailure(e))
    })
  }

  useEffect(() => {
    if (commentPending !== undefined)
      !commentPending && reset()
  }, [commentPending, reset])

  return <Row className="justify-content-md-center mt-5">
    <Col md={12} lg={8} className="mb-3"><h4>{intl.formatMessage({ id: "app.comment" })}</h4></Col>
    {postData && postData.post?.comments.map(c => {
      let e = c as Post
      return <Col key={e._id} md={12} lg={8} className="my-2 d-inline-flex">
        <div className="profile-page pt-3">
          <div className="photo-container" style={{ width: 50, height: 50 }}>
            {!e.user.profilePicURI && <img alt="..." src={defaultAvatar}></img>}
            {e.user.profilePicURI && <img alt="..." src={UNIVERSALS.GOOGLE_STORAGE_ENDPOINT + e.user.profilePicURI}></img>}
          </div>
        </div>
        <div className="ml-5">
          <div className="mb-2">
            {e.user.role !== "MEMBER" && <OverlayTrigger overlay={(props: any) => <Tooltip {...props}>{e.user.role === "ADMIN" ? "網站管理人員" : (e.user.role === "WORKER" ? "教會同工" : "")}</Tooltip>}>
              <a
                href="/"
                onClick={(e) => e.preventDefault()}
                className={"comment-user-link " + (e.user.role === "ADMIN" ? "admin" : (e.user.role === "WORKER" ? "worker" : ""))}
              >{e.username}{e.user.role === "ADMIN" ? <i className="ml-1 fas fa-star user-badge admin-badge"></i> : (e.user.role === "WORKER" ? <i className="ml-1 fas fa-star user-badge worker-badge"></i> : null)}</a>
            </OverlayTrigger>}
            {e.user.role === "MEMBER" && <a
              href="/"
              onClick={(e) => e.preventDefault()}
              className={"comment-user-link "}
            >{e.username}</a>}
          </div>
          <p><b>{e.content}</b></p>
          <p className="category">{getTimePastStr(moment(e.creDttm))}</p>
        </div>
      </Col>
    })}
    {(tokenPair?.token && getTokenValue(tokenPair?.token)?.role.toUpperCase() !== 'PUBLIC') && <Col
      style={{ borderTop: '.5px lightgrey solid' }}
      md={12} lg={8}
      className="my-2 pt-5 d-md-inline-flex"
    >
      <div className="profile-page pt-3">
        <div className="photo-container mb-3 my-md-0 ml-3 mx-md-auto" style={{ width: 50, height: 50 }}>
          {(loading || !profilePicData?.user?.profilePicURI) && <img alt="..." src={defaultAvatar}></img>}
          {(!loading && profilePicData?.user?.profilePicURI) && <img alt="..." src={UNIVERSALS.GOOGLE_STORAGE_ENDPOINT + profilePicData?.user.profilePicURI}></img>}
        </div>
      </div>
      <Form className="ml-md-5 col-md-10 col-sm-12" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-2" style={{ fontSize: 20 }}>{intl.formatMessage({ id: "app.comment.your-comment" })}</div>
        <Form.Control
          style={{
            borderLeft: '.5px lightgrey solid',
            borderRight: '.5px lightgrey solid',
            borderTop: '.5px lightgrey solid',
            borderRadius: '.5rem',
            minHeight: 150,
            fontSize: 18,
            padding: 10
          }}
          name="content"
          ref={register({ validate: Validators.NoWhiteSpace }) as RBRef}
          as="textarea"
          rows={4}
          placeholder={intl.formatMessage({ id: "app.comment.comment-here" })}
          className="my-3"
        ></Form.Control>
        {errors.content && <label style={{ opacity: .6, color: 'red' }}>{intl.formatMessage({ id: "app.validation.required" })}</label>}
        <div className="text-right">
          <Button
            variant="primary"
            type="submit"
          >
            {!commentPending && <i className="fas fa-paper-plane mr-2"></i>}
            {commentPending && <Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
            />}
            {intl.formatMessage({ id: "app.buttons.send" })}</Button>
        </div>
      </Form>
    </Col>}
    {(tokenPair?.token && getTokenValue(tokenPair?.token)?.role.toUpperCase() === 'PUBLIC') && <Col style={{ borderTop: '.5px lightgrey solid' }} md={12} lg={8} className="my-2 pt-5 d-inline-flex">
      <div style={{ fontSize: 18 }}>{intl.formatMessage({ id: "app.comment.please-use-personal-account-to-comment" })}</div>
    </Col>}
    {!tokenPair?.token && <Col style={{ borderTop: '.5px lightgrey solid' }} md={12} lg={8} className="my-2 pt-5 d-inline-flex">
      <div style={{ fontSize: 18 }}>{intl.formatMessage({ id: "app.comment.please" })} <Link to={`/login-page?relayState=${location.pathname}`}>{intl.formatMessage({ id: "app.login" })}</Link> {intl.formatMessage({ id: "app.comment.to-comment" })}</div>
    </Col>}
  </Row>
}

export default CommentSection;