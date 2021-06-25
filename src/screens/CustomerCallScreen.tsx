import React, { FC } from 'react';
import CustomerVideoChat from '../components/CustomerCallScreenComponents/CustomerVideoChat';
import '../styles/css/calls.scss';

const CustomerCall: FC = () => {
  return (
    <>
      <h1>Getting Assistance</h1>
      <div className="customer-call-container">
        <CustomerVideoChat />
      </div>
    </>
  );
};

export default CustomerCall;
