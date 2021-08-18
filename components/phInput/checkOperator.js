const operatorChecker = (ph) => {
  const regMyTel = /^(096|\+?9596)(9|8|7|6|)\d{7}$/g;
  const regMpt = /^(09|\+?959)(2[0-4]\d{5}|5[0-6]\d{5}|8[13-7]\d{5}|3[0-369]\d{6}|34\d{7}|4[1379]\d{6}|73\d{6}|91\d{6}|25\d{7}|26\d{7}|40\d{7}|42\d{7}|44\d{7}|45\d{7}||88\d{7}|89\d{7})$/g;
  const regOdo = /^(099|\+?9599)(9|8|7|6|5|4|3)\d{7}$/g;
  const regTelenor = /^(097|\+?9597)(9|8|7|6|5|4|3)\d{7}$/g;
  const regMec = /^(093|\+?9593)(0|1|2|3|6)\d{6}$/g;
  // 093(0|1|2|3|6)\\d{6}
  let phoneNumber = 0;
  if (ph.length > 11) {
    phoneNumber = ph.substr(0, ph.length - 1);
  } else {
    phoneNumber = ph;
  }

  if (phoneNumber.match(regMyTel)) {
    return 1;
  } if (phoneNumber.match(regMpt)) {
    return 2;
  } if (phoneNumber.match(regOdo)) {
    return 3;
  } if (phoneNumber.match(regTelenor)) {
    return message4;
  } if (phoneNumber.match(regMec)) {
    return 5;
  }
  return 0;
};

export default operatorChecker;
