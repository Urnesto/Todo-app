import React, {useState ,useEffect} from "react";
import axios from "axios";

import List from '../List'
import Badge from '../Badge'


import closeSvg from '../../assets/img/close.svg'
import './AddButtonList.scss'

const AddList = ({colors, onAdd}) => {
const [visiblePopup,setVisiblePopup] = useState(false);
const [selectedColor,setSelectedColor] = useState(3);
const [inputValue, setInputValue] = useState('') ;
const [isLoading, setIsLoading] =useState(false)

useEffect(() => {
  if (Array.isArray(colors)) {
    setSelectedColor(colors[0].id);
  }
}, [colors]);

const onClose = () => {
  setVisiblePopup(false);
setInputValue('');
setSelectedColor([colors[0].id]);
}

const addList = () => {
  if (!inputValue) {
    alert('Enter list name');
    return;
  }
  setIsLoading(true);
  axios.post('http://localhost:3001/lists',{name: inputValue, colorId: selectedColor}).then(({data}) =>{
    const color = colors.filter(c => c.id === selectedColor)[0].name;
  const listObj = {...data , color: {name: color}};
  onAdd(listObj);
  onClose();
  }).catch(e => {
    alert('Error');
  }).finally(() => {
    setIsLoading(false);
  });



};


    return(
        <div className="add-list">
        <List 
        onClick={() => setVisiblePopup(!visiblePopup) }
        items={[
          {
          className: "list__add-button",
          icon: ( <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 1V15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M1 8H15" stroke="black" strokeWidth="2" strokeLlinecap="round" strokeLinejoin="round"/>
          </svg>
          ),
          name: 'Add List'
        }
      ]}
      />
      {/* if visiblePopup true show div (open button) */}
      {visiblePopup && (
      <div className="add-list__popup">
        <img 
        onClick={onClose}
        src={closeSvg
        } alt="Close button"
         className="add-list__popup-close-btn"/>

        <input value={inputValue} 
        onChange={e => {setInputValue(e.target.value)}}
        className="field"
         type="text"
          placeholder="List Name"/>

        <div className="add-list__popup-colors">
              {
                colors.map(color => (
                  <Badge onClick={() =>setSelectedColor(color.id)} 
                  key={color.id}
                   color={color.name}
                   //if selected color = color id than set badge active
                   className={selectedColor === color.id && 'active'}
                   />
                ))
              }
        </div>
        <button onClick={addList} className="button">
        {isLoading ? 'Loading....' : 'Add'}
        </button>
      </div>)}
    </div>
    );
};

export default AddList;