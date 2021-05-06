import { useMutation, useQuery } from '@apollo/client';
import { setSystemFailure } from 'actions';
import { MutationReadNotificationArgs, Notification, NotificationType, QueryNotificationsArgs } from 'generated/graphql';
import { GET_NOTIFICATIONS, READ_NOTIFICATIONS } from 'graphqls/graphql';
import moment from 'moment';
import React, { useEffect } from 'react'
import { NavDropdown } from 'react-bootstrap';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { RootState } from 'reducers';
import { getKeyValue, getTimePastStr, getTokenValue } from 'utils/utils';
import * as presets from '../../assets/data/data.json'

function NotificationBell(props: any) {

  const intl = useIntl()

  const location = useLocation()

  const dispatch = useDispatch()

  const tokenPair = useSelector((state: RootState) => state.auth.tokenPair);

  const { loading, data, refetch } = useQuery<{ notifications: Notification[] }, QueryNotificationsArgs>
    (GET_NOTIFICATIONS, { variables: { toUsername: getTokenValue(tokenPair?.token).username }, notifyOnNetworkStatusChange: true });
  const [readNotification] = useMutation<
    { readNotification: string },
    MutationReadNotificationArgs
  >(READ_NOTIFICATIONS, {
    refetchQueries: [
      { query: GET_NOTIFICATIONS, variables: { toUsername: getTokenValue(tokenPair?.token).username } }
    ]
  })

  useEffect(() => {
    refetch && refetch()
  }, [location, refetch])

  const handleClick = (i: number) => {
    if (data?.notifications[i].isRead)
      return
    const update = data?.notifications.map((e, idx) => {
      if (idx === i)
        return { ...e, isRead: true }
      return e
    })
    readNotification({
      variables: {
        input: update?.[i]._id
      }
    }).catch(e => {
      dispatch(setSystemFailure(e))
    })
  }

  return <NavDropdown
    id="app-bell"
    title={data ? <>
      <i className="fa fa-bell"
        style={data?.notifications?.filter(x => !x.isRead).length > 0 ? { fontSize: window.innerHeight > 375 ? 24 : 18, transform: 'translateX(10px)' } : { fontSize: window.innerHeight > 375 ? 24 : 18 }}>
      </i>
      {data?.notifications?.filter(x => !x.isRead).length > 0 && <span style={{ position: 'relative' }} className="badge badge-info">{data && data.notifications.filter(x => !x.isRead).length}</span>}
    </> : ""}
    className={`${props.className} app-bell-alert`}>
    <NavDropdown.Item
      style={{ width: 290, whiteSpace: 'pre-wrap' }}
    >
      <p style={{ fontSize: 18 }}><strong>{intl.formatMessage({ id: "app.notification" })}</strong></p>
    </NavDropdown.Item>
    <NavDropdown.Divider />
    {data && data.notifications.length === 0 && <div className="w-100 text-center text-secondary">{intl.formatMessage({ id: "app.notification.no-record" })}</div>}
    {(!loading && data && data.notifications.length > 0) && data.notifications.map((e: Notification, idx: number) => {
      return <div key={e._id}>
        <NavDropdown.Item
          as={Link}
          // to={e.path + e.param}
          to={`/${getKeyValue(presets.COMMON.NOTIFICATION_TYPE, e.type).PATH}/${e.param != null ? e.param : ''}`}
          onClick={() => {
            // e.preventDefault()
            handleClick(idx)
          }}
          style={{ width: 290, whiteSpace: 'pre-wrap', display: 'flex' }}
        >
          <div className="mr-2">
            <i style={{ fontSize: 24 }} className={e.type === NotificationType.Reaction ? "fa fa-thumbs-up" : "fas fa-comment-dots"}></i>
          </div>
          <div>
            <span>{(e.fromUsername == null ? "" : e.fromUsername) + " " + getKeyValue(presets.COMMON.NOTIFICATION_TYPE, e.type).LABEL}</span>
            <br />
            <span className="text-secondary">{getTimePastStr(moment(e.creDttm))}</span>
          </div>
          <div className="ml-auto">
            {!e.isRead && <span className="dot bg-info"></span>}
          </div>
        </NavDropdown.Item>
        <NavDropdown.Divider />
      </div>
    })}
    <NavDropdown.Item
      as={Link}
      href="#pablo"
      onClick={(e: any) => {
        e.preventDefault();
      }}
      to=""
      style={{ width: 290, whiteSpace: 'pre-wrap' }}
      className="text-center"
    >
      {/* <p className="w-100 text-primary">查看全部</p> */}
    </NavDropdown.Item>
  </NavDropdown>
}

export default NotificationBell;