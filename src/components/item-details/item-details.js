import React, { useState, useEffect } from "react";
import ErrorButton from "../error-button/error-button";

import "./item-details.css";

const Record = ({ item, field, label }) => {
  return (
    <li className="list-group-item">
      <span className="term">{label}</span>
      <span>{item[field]}</span>
    </li>
  );
};

export { Record };

const ItemDetails = props => {
  const [item, setItem] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    updateItem();
  }, [props.itemid]);

  const updateItem = () => {
    const { itemId, getData, getImageUrl } = props;
    if (!itemId) {
      return;
    }

    getData(itemId).then(item => {
      setItem(item);
      setImage(getImageUrl(item));
    });
  };

  if (!item) {
    return <span>Select a item from a list</span>;
  }

  const { name } = item;

  return (
    <div className="item-details card">
      <img className="item-image" src={image} alt="character" />
      <div className="card-body">
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          {React.Children.map(props.children, child => {
            return React.cloneElement(child, { item });
          })}
        </ul>
        <ErrorButton />
      </div>
    </div>
  );
};

export default ItemDetails;
