import React from "react";
import classNames from "classnames";

import './Badge.scss'
//badge color component
const Badge =  ({color,onClick,className}) =>
 <i onClick={onClick} className={`badge badge--${color}
//  if in color is some data set badge color
  ${classNames('badge', {[`badge--${color}`] : color},className)}`}> </i> 

export default Badge;