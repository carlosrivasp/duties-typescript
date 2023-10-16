import { Menu, MenuProps } from "antd";
import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import { FormOutlined, HomeOutlined } from '@ant-design/icons';

const items: MenuProps['items'] = [
  {
    label: 'Home',
    key: '/',
    icon: <HomeOutlined />,
  },
  {
    label: 'New Duty',
    key: '/new-duty',
    icon: <FormOutlined />,
  },
];

const Navbar: React.FC = () => {

  const [current, setCurrent] = useState('/');

  const navigate = useNavigate();

  const onClick: MenuProps['onClick'] = (e) => {
    navigate(e.key)
    setCurrent(e.key);
  };
  
  return (
    <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
  );
};

export default Navbar;




