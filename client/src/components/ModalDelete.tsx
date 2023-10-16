import { useState } from "react";
import { Duty } from "./Duty";
import { Button, Modal } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

interface Props {
  duty: Duty;
  deleteDuty: (id: string) => Promise<void>;
}

const ModalDelete = ({ duty, deleteDuty }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    deleteDuty(duty.id);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const buttonContainerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '8px',
  };

  return (
    <>
      <Button style={buttonContainerStyle} type="primary" icon={<DeleteOutlined />} onClick={showModal}>
        Delete
      </Button>
      <Modal 
        title="Deleting Duty" 
        open={isModalOpen} 
        onOk={handleOk} 
        onCancel={handleCancel}>
        <h3>Are you sure you want to delete the duty?</h3>
        <p>Name of the duty: {duty.name}</p>
      </Modal>
    </>
  );
};

export default ModalDelete;
