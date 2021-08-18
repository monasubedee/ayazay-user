import React from 'react';

const MpuForm = ({ mpu, actionUrl, formRef }) => {
  return (
    <form action={actionUrl} style={{ display: 'none' }} method='POST' name='mpuForm' ref={formRef}>
      <input type='hidden' id='merchantID' name='merchantID' value={mpu.merchantId} />
      <br />
      <input type='hidden' id='invoiceNo' name='invoiceNo' value={mpu.invoiceNo} />
      <br />
      <input type='hidden' id='productDesc' name='productDesc' value={mpu.productDesc} />
      <br />
      <input type='hidden' id='amount' name='amount' value={mpu.amount} />
      <br />
      <input type='hidden' id='”currencyCode”' name='currencyCode' value={mpu.currencyCode} />
      <input type='hidden' id='”userDefined1”' name='userDefined1' value={mpu.user_defined_1} />
      <br />
      <input type='hidden' id='”userDefined2”' name='userDefined2' value='' />
      <br />
      <input type='hidden' id='”userDefined3”' name='userDefined3' value='' />
      <br />
      <input type='hidden' id='hashValue' name='hashValue' value={mpu.hashValue} />
      <br />
    </form>
  );
};

export default MpuForm;
