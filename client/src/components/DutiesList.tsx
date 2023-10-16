import { useEffect, useState } from "react";
import { Duty } from "./Duty";
import ModalDelete from "./ModalDelete";
import {useNavigate} from 'react-router-dom'
import React from 'react';
import { Card, Row, Divider, Col, Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';

const DutiesList = () => {
  const [duties, setDuties] = useState<Duty[]>([]);
  const navigate = useNavigate();

  const getDuties = async () => {
    const response = await fetch("http://localhost:4000/duty");
    const data = await response.json();
    setDuties(data);
  };

  const deleteDuty = async (id: string) => {
    await fetch("http://localhost:4000/duty/" + id, {
      method: "DELETE",
    });
    setDuties(duties.filter((duty) => duty.id !== id));
  };

  useEffect(() => {getDuties();}, []);

  const gridStyle: React.CSSProperties = {
    // width: '25%',
    // textAlign: 'center',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  };

  const cardContentStyle: React.CSSProperties = {
    maxHeight: '100px', // Limit the maximum height of the card content
    overflow: 'hidden',
  };

  const buttonContainerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '8px',
  };

  return (
    
<>
      <Divider orientation="center">List of Duties</Divider>
      <Row justify={"center"} gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
      {duties.map((duty) => (
          <Col span={6} key={duty.id}>
            <Card title={duty.name} bordered={false} style={gridStyle}>
              <div style={cardContentStyle}>
                <Button
                  style={buttonContainerStyle}
                  icon={<EditOutlined />}
                  type="primary"
                  htmlType="submit"
                  onClick={() => navigate(`/edit-duty/${duty.id}`)}
                >
                  Edit
                </Button>
                <ModalDelete duty={duty} deleteDuty={deleteDuty} />
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default DutiesList;
