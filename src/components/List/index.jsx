import React from "react";
import axios from 'axios';
import classNames from "classnames";

import Badge from '../Badge'
import removeSvg from '../../assets/img/remove.svg'

import './List.scss'

const List = ({items, isRemovable, onClick,onRemove,onClickItem,activeItem}) => {

    const removeList = (item) => {
        if(window.confirm('Do you want to delete list?') ){
            axios.delete('http://localhost:3001/lists/' + item.id).then(() => {
                onRemove(item.id);
            });
        }
    }
return(
<ul onClick={onClick} className="list">
    {items.map((item , index) =>(
        // if item is active in app.js file (<List>) than active is assigned for li
    <li
     key = {index}  
     className={classNames(item.className, {'active' : item.active})}
        onClick={onClickItem ? () => onClickItem(item) : null}
        >
        <i>
            {item.icon ? item.icon  : <Badge color={item.color.name}/>}</i>
        <span>{item.name}

        {item.tasks &&` (${item.tasks.length})` }</span>
        {isRemovable && 
        <img  className="list__remove-icon" 
        src={removeSvg} 
        alt='remove icon'
        onClick={() => removeList(item)}
        />
        }
    </li>
    ))}
    </ul>
    );
};
export default List;