import { useMutation } from '@apollo/client';
import { AdminWorshipForm, AdminWorshipFormDoc, setSysMessage, setLoading, setSystemFailure } from 'actions';
import { RBRef } from 'adapter/types';
import { ADD_WORSHIP } from 'graphqls/graphql';
import React, { useEffect, useMemo, useState } from 'react'
import { Form, Col, Button } from 'react-bootstrap';
import { useFieldArray, useForm } from 'react-hook-form';
import ReactQuill from 'react-quill';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { RootState } from 'reducers';

function WorshipCreate() {

  const history = useHistory()

  const formDef = useSelector((state: RootState) => state.admin.form.formInstance)

  const { register, setValue, getValues, handleSubmit, reset, trigger, control, errors } = useForm({
    defaultValues: {
      ...formDef
    }
  })

  const { fields, append, remove, prepend } = useFieldArray({
    control,
    name: "docs"
  });

  const [addWorship, { data, loading: addWorshipLoading, error: addWorshipError }] = useMutation(ADD_WORSHIP);

  const dispatch = useDispatch();

  const editorModules = useMemo(() => ({
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
  }), []);

  const dropdownData = [
    { value: '', display: '請選擇', disabled: true },
    { value: '主日崇拜', display: '主日崇拜' },
    { value: '分享主日', display: '分享主日' },
  ]

  const docTypes = [
    { value: '', display: '請選擇', disabled: true },
    { value: 'docx', display: 'docx' },
    { value: 'pdf', display: 'pdf' },
  ]

  // const handleInputChange = (e: any) => {
  //   setValue(e.currentTarget.name, e.currentTarget.value)
  //   trigger()
  // }

  // const handleDocsInputChange = (e: any, idx: any) => {
  //   let decloy = getValues("docs")
  //   let doc = decloy[idx]
  //   doc = { ...doc, [e.currentTarget.name]: e.currentTarget.value }
  //   decloy[idx] = doc;
  //   setValue("docs", [...decloy])
  // }

  const onSubmit = (data: any, e: any) => {
    dispatch(setLoading(true))
    let tmp = data
    let tmpDocs: any[] = []
    data.docs.forEach((e: any) => {
      tmpDocs.push({...e})
    });
    delete tmp.docs
    addWorship({
      variables: {
        input: {
          ...tmp
        },
        docs: [...tmpDocs]
      }
    }).catch((err: any) => {
      console.log(err)
      dispatch(setLoading(false))
      dispatch(setSystemFailure(err))
      reset();
    })
  }

  useEffect(() => {
    if (data !== undefined) {
      dispatch(setSysMessage('儲存成功!'))
      dispatch(setLoading(false))
      reset();
      history.push('/admin/worships')
    }
  }, [data])

  useEffect(() => {
    // Object.keys(formDef).forEach(e => {
    //   if (getRequired().includes(e))
    //     register({ name: e }, { required: true })
    //   else
    //     register(e)
    // })
    register('note')
    register('verse')
  }, [register])

  useEffect(() => {
    document.title = "管理控制台"
  }, [])

  const getRequired = () => {
    return ['type', 'title', 'worshipId', 'messenger', 'link']
  }

  const addRow = () => {
    append({ title: '', link: '', type: '' })
  }

  const inputTextGenerator = (name: string, label: string,
    placeholder?: string, md?: number, sm?: number, skipValidate: boolean = false) => {
    return <>
      <Form.Group as={Col} md={md} sm={sm}>
        <Form.Label className={(!skipValidate && errors[name]) ? "admin invalid" : ""}>{label}</Form.Label>
        <Form.Control
          className={(!skipValidate && errors[name]) ? "form-control admin invalid" : "form-control admin"}
          placeholder={placeholder}
          // onChange={(e: any) => updateFn(e, fnParam && fnParam)}
          // value={targetState?.[name]}
          ref={((getRequired().includes(name) ? register({ required: true }) : register()) as RBRef)}
          name={name}
        ></Form.Control>
        {(!skipValidate && errors[name]) && <label style={{ opacity: .6, color: '#FF3636' }}>必須輸入這欄</label>}
      </Form.Group>
    </>
  }

  const dropdownGenerator = (name: string, label: string, ds: any[], md?: number, sm?: number, skipValidate: boolean = false) => {
    return <>
      <Form.Group as={Col} md={md} sm={sm}>
        <Form.Label className={(!skipValidate && errors[name]) ? "admin invalid" : ""}>{label}</Form.Label>
        <Form.Control
          as="select"
          className={(!skipValidate && errors[name]) ? "form-control admin invalid" : "form-control admin"}
          // onChange={(e: any) => updateFn(e, fnParam && fnParam)}
          // value={getValues(name)}
          defaultValue=""
          ref={((getRequired().includes(name) ? register({ required: true }) : register()) as RBRef)}
          name={name}
        >
          {ds.map((item, idx) => {
            return <option key={idx} disabled={item.disabled} value={item.value}>{item.display}</option>
          })}
        </Form.Control>
        {(!skipValidate && errors[name]) && <label style={{ opacity: .6, color: '#FF3636' }}>必須選擇其中一項</label>}
      </Form.Group>
    </>
  }

  const quillGenerator = (name: string, label: string) => {

    const handleChange = (content: any) => {
      setValue(name, content)
    }

    return <>
      <Form.Label>{label}</Form.Label>
      <ReactQuill
        className="mb-3"
        value={(getValues(name) as string) || ''}
        onChange={handleChange}
        modules={editorModules}
        style={{
          width: '100%',
          minHeight: 400,
        }}
      />
    </>
  }

  const rowGenerator = () => {

    return fields.map((item: any, idx: number) => {
      return <Form.Row key={idx}>
        {inputTextGenerator(`docs[${idx}].link`, `檔案${idx + 1}連結`, 'e.g. https://www.abc.com/', 6, 12, true)}
        {inputTextGenerator(`docs[${idx}].title`, '名稱', undefined, 3, 12, true)}
        {dropdownGenerator(`docs[${idx}].type`, '檔案類型', docTypes, 3, 12, true)}
        <Form.Group as={Col} className="text-right" md={12}>
          <Button className="mx-1" onClick={() => addRow()} variant="info"><i className="fa fa-plus"></i></Button>
          <Button onClick={() => remove(idx)} variant="info"><i className="fa fa-trash"></i></Button>
        </Form.Group>
      </Form.Row>
    })
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="category mt-5" style={{ color: 'black' }}>崇拜資料</h2>
      <Form.Row>
        {inputTextGenerator('title', '講題', '請輸入講題')}
        {inputTextGenerator('worshipId', '日期', 'YYYYMMDD')}
      </Form.Row>
      <Form.Row>
        {dropdownGenerator('type', '分類', dropdownData)}
        {inputTextGenerator('messenger', '講員', '請輸入講員姓名')}
      </Form.Row>
      <Form.Row>
        {inputTextGenerator('link', '影片連結', 'e.g. https://www.abc.com/')}
      </Form.Row>
      {rowGenerator()}
      <Form.Row className="mb-5">
        {quillGenerator('note', '講道筆記')}
      </Form.Row>
      <Form.Row className="mb-5">
        {quillGenerator('verse', '經文')}
      </Form.Row>
      <Form.Row>
        <Form.Group>
          <Button
            variant="primary"
            type="submit"
          >儲存</Button>
          <Button
            className="mx-3"
            onClick={() => {
              reset()
            }}
          >
            重設
          </Button>
        </Form.Group>
      </Form.Row>
    </Form>
  )
}

export default WorshipCreate;