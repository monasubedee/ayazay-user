import checkOperator from './checkOperator';

const PhInput = ({
  mask,
  value,
  onChange,
  onErrorCheck,
  ...otherProps
}) => {
  const handleChange = (e) => {
    const val = e.target.value;
    const cleanVal = val.replace(/[^\d]/g, '');

    if (cleanVal.length > 8 && checkOperator(cleanVal) === 0) {
      onErrorCheck(true);
    } else {
      onErrorCheck(false);
    }
    onChange(cleanVal);
  };

  const format = (value, mask) => {
    let i = 0;
    let lastReplacedIndex = -1;
    const filledMask = mask.replace(/#/g, (_, j) => {
      if (i >= value.length) {
        return '#';
      }
      lastReplacedIndex = j;
      return value[i++];
    });
    return filledMask.substring(0, lastReplacedIndex + 1);
  };

  return (
    <div>
      <input
        value={format(value, mask)}
        onChange={handleChange}
        {...otherProps}
        type={Number}
        className="phInput"
      />
      <style jsx>{`
          .phInput{
              outline:0;
                width: 100%;
                height: 60px;
                border-radius: 8px;
                border: solid 1px #cbcbcb;
                background-color: #f4f5f8;
                font-size: 20px;
                opacity: 0.44;
                color: #394358;
                padding: 22px 16px;
                 }

    `}</style>
    </div>
  );
};

export default PhInput;
