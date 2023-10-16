import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {Form, Button, Row, Col, Divider, Card, Input} from 'antd'

const style: React.CSSProperties = { background: '#0092ff', padding: '8px 0', textAlign:'center'};

const DutyForm = () => {
  const [filledForm, setFilledForm] = useState(false)

  const [duty, setDuty] = useState({name: "",});
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);

  const navigate = useNavigate();
  const params = useParams<{ id: string }>();

  const getDuty = async (id: string) => {
    const response = await fetch("http://localhost:4000/duty/" + id);
    const data = await response.json();
    setDuty({name: data.name});
  };

  useEffect(() => {
    if (params.id) {
      setEditing(true);
      getDuty(params.id);
    }
  }, [params.id]);

  type FieldType = {
    name?: string;
  };

  const onFinish = async (e: FormEvent<HTMLFormElement>) => {
    setLoading(true);
    if (editing) {
      await fetch("http://localhost:4000/duty/" + params.id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(duty),
      });
    } else {
      await fetch("http://localhost:4000/duty", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(duty),
      });
    }
    setLoading(true);
    navigate("/");
    console.log('Success:', duty.name);
  };
  
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const handleChange = (e: any)=>{
    const dutyName: string = e.target.value
    if(dutyName !== '') {
      setFilledForm(true)
    } else {
      setFilledForm(false)
    }
    setDuty({name: dutyName});
  }
  
  return (
    <>
      <Divider orientation="center">Duty</Divider>
      <Row justify={"center"} gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col span={6}>
          <Card title={<h2>{editing ? "Edit Duty" : "New Duty"}</h2>} bordered={false}>
            <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ maxWidth: 600 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off">              
              <Form.Item<FieldType>
                label="Duty"
                name="name"
                rules={[{ required: true, message: 'Please input your duty!' }]}
              >
                <Input placeholder="Type your duty" value={duty.name} onChange={handleChange}/>
              </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit" disabled={duty.name === ''} loading={loading}>
                {editing ? "Update" : "Save"}
              </Button>
            </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default DutyForm;
