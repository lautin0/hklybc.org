import { Button, Chip, LinearProgress, makeStyles, Typography } from "@material-ui/core";
import { blue, green, grey, yellow } from "@material-ui/core/colors";
import { DataGrid, GridCellParams, GridColDef, GridColumnHeaderParams, GridRowData, GridRowsProp } from "@material-ui/data-grid";
import { AddCircle, Block, Build } from "@material-ui/icons";
import clsx from "clsx";
import RouterBreadcrumbs from "components/Breadcrumbs/RouterBreadcrumbs";
import { AccountStatus, useChangeAccountStatusMutation, useUsersQuery } from "generated/graphql";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useDecisionModalStore, useModalStore } from "store";

const useStyles = makeStyles(theme => ({
   badgeAdmin: {
      backgroundColor: yellow[800],
      color: theme.palette.primary.contrastText
   },
   badgeWorker: {
      backgroundColor: blue[500],
      color: theme.palette.primary.contrastText
   },
   badgeActive: {
      backgroundColor: green[500],
      color: theme.palette.primary.contrastText
   },
   badgeSuspended: {
      backgroundColor: grey[500],
      color: theme.palette.primary.contrastText
   },
   success: {
      backgroundColor: green[700],
      color: theme.palette.primary.contrastText,
      "&:hover": {
        backgroundColor: green[600]
      }
    }
}))

export default function UserManage() {

   const classes = useStyles()

   const history = useHistory()
   const location = useLocation()

   const setMessage = useModalStore(state => state.setMessage)
   const setErrorModal = useModalStore(state => state.setError)
   const decision = useDecisionModalStore()

   const { loading, data: uData, refetch } = useUsersQuery({ notifyOnNetworkStatusChange: true })
   const [changeStatus, {loading: changeStatLoading}] = useChangeAccountStatusMutation()

   const [data, setData] = useState<GridRowsProp>([])

   const columns: GridColDef[] = [
      { field: 'dob', hide: true },
      { field: 'email', hide: true },
      { field: 'phone', hide: true },
      { field: 'username', headerName: '用戶名稱', width: 200 },
      { field: 'name', headerName: '英文名稱', width: 200 },
      { field: 'nameC', headerName: '中文名稱', width: 200 },
      { field: 'title', headerName: '英文頭銜', hide: true, width: 200 },
      { field: 'titleC', headerName: '中文頭銜', hide: true, width: 200 },
      {
         field: 'role',
         headerName: '角色',
         width: 150,
         renderCell: (params: GridCellParams) => {
            if (params.value === "WORKER")
               return <Chip className={classes.badgeWorker} label="教會同工" />
            else if (params.value === "ADMIN")
               return <Chip className={classes.badgeAdmin} label="網站管理員" />
            else
               return <></>
         }
      },
      {
         field: 'gender',
         headerName: '性別',
         width: 100,
         renderCell: (params: GridCellParams) => (
            <Typography>{params.value === "MALE" ? "男" : "女"}</Typography>
         ),
      },
      {
         field: '_id',
         width: 250,
         renderHeader: (params: GridColumnHeaderParams) => (
            <></>
         ),
         renderCell: (params: GridCellParams) => (
            <div>
               <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  style={{ marginLeft: 16 }}
                  startIcon={<Build />}
                  onClick={(e) => onEditClicked(e, params.row['username'])}
               >
                  檢視
               </Button>
               {params.row['role'] !== "ADMIN" && <Button
                  disabled={params.row['status'] === "SUSPENDED"}
                  variant="contained"
                  color="secondary"
                  size="small"
                  style={{ marginLeft: 16 }}
                  startIcon={<Block />}
                  onClick={() => onSuspendClicked(params.row)}
               >
                  停用帳戶
               </Button>}
            </div>
         ),
      },
      {
         field: 'status',
         headerName: '狀態',
         width: 150,
         renderCell: (params: GridCellParams) => {
            if (params.value === "SUSPENDED")
               return <Chip className={classes.badgeSuspended} label="已停用" />
            // else if (params.value === "ACTIVE")
            //    return <Chip className={classes.badgeActive} label="已啟用" />
            else
               return <></>
         }
      },
   ];

   function onEditClicked(e: any, username: any) {
      history.push('/admin/user/' + username)
   }

   function onSuspendClicked(row: GridRowData) {
      decision.setMessage("確定停用帳戶?")
      decision.setPositiveFn(() => {
         changeStatus({
            variables: {
               username: row['username'],
               status: AccountStatus.Suspended
            }
         })
            .then(e => {
               setMessage('app.sys.save-success')
               history.push('/admin/users')
            }).catch((err: any) => {
               setErrorModal(err)
            })
      })
   }

   useEffect(() => {
      if (uData === undefined)
         return
      setData(uData.users.map((x, i) => ({ ...x, id: i })))
   }, [uData])

   useEffect(() => {
      uData && refetch();
   }, [location, refetch, uData])

   return (
      <>
         {changeStatLoading && <LinearProgress />}
         <RouterBreadcrumbs />
         <Typography className="my-3" variant="h5">會員管理</Typography>
         <Button
            className={clsx(classes.success, "my-3")}
            variant="contained"
            startIcon={<AddCircle />}
            onClick={() => history.push('/admin/user/new')}
         >建立</Button>
         <div style={{ width: '100%' }}>
            <DataGrid loading={loading} autoHeight pageSize={10} rows={data} columns={columns} />
         </div>
      </>
   )
}