import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import "./Toggle.scss";

const Toggle = (props) => {
  const valueYes = "Yes";
  const valueNo = "No";
  let { valueOn = valueYes, valueOff = valueNo, valueDefault } = props;
  const switchRef = useRef();
  const [currentValue, setCurrentValue] = useState(
    valueDefault || valueOff || valueOn || valueNo
  );

  const onchangeHandeler = () => {
    if (switchRef.current.checked) {
      setCurrentValue(valueOn || valueYes);
      props.onChange && props.onChange(valueOn || valueYes);
    } else {
      setCurrentValue(valueOff || valueNo);
      props.onChange && props.onChange(valueOff || valueNo);
    }
  };

  return (
    <label className={`switch ${props.disabled ? "disabled" : ""}`}>
      <input
        type="checkbox"
        onChange={onchangeHandeler}
        name={props && props.name}
        ref={switchRef}
        defaultChecked={currentValue == valueOn ? true : false}
        value={currentValue}
        disabled={props.disabled}
      />
      <span className={`slider ${props && props.rounded ? "round" : ""}`}>
        <span className="sliderBefore">
          {props.rounded ? "" : currentValue}
        </span>
      </span>
    </label>
  );
};

Toggle.propTypes = {
  valueOn: PropTypes.string,
  valueOff: PropTypes.string,
  valueDefault: PropTypes.string,
  rounded: PropTypes.bool,
};

export default Toggle;
