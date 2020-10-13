import React, { useState, useEffect } from "react";
import CheckIcon from "@material-ui/icons/Check";
import "./Dropdown.css";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import { useStateValue } from "../../Redux/StateProvider";

const Dropdown = ({ items, multiselect = false }) => {
  const [{ categoryt }, dispatch] = useStateValue();
  const [open, setOpen] = useState(false);
  const [selection, setSelection] = useState([]);
  const [checked, setChecked] = useState(false);
  var [title, setTitle] = useState("Select Category");

  const toggle = () => setOpen(!open);

  const tog = () => setChecked(!checked);

  useEffect(() => {
    setTitle(selection[0]?.value);
    dispatch({
      type: "SET_CATEGORY",
      item: {
        title: selection[0]?.value,
      },
    });
  }, [checked]);

  const handleOnclick = (item) => {
    if (!selection.some((current) => current.id == item.id)) {
      if (!multiselect) {
        setSelection([item]);
        tog(!checked);
        // settoCategory(item);
      } else if (multiselect) {
        setSelection([...selection, item]);
      } else {
        let selectionAfterRemoval = selection;
        selectionAfterRemoval = selectionAfterRemoval.filter(
          (current) => current.id !== item.id
        );
        setSelection([...selectionAfterRemoval]);
      }
    }
  };

  const ifItemSelected = (item) => {
    if (selection.find((current) => current.id == item.id)) {
      return true;
    }
    return false;
  };

  return (
    <div className="dd-wrapper">
      <div
        className="dd-header"
        tabIndex={0}
        role="button"
        onKeyPress={() => toggle(!open)}
        onClick={() => toggle(!open)}
      >
        <div className="dd-header-title">
          <span className="dd-header-title-bold">
            <h4>{title}</h4>
          </span>
          <span>{open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}</span>
        </div>
      </div>
      {open && (
        <ul className="dd-list">
          {items.map((item) => (
            <li className="dd-list-item" key={item.id}>
              <button
                type="button"
                onClick={() => handleOnclick(item)}
                onKeyPress={() => tog(!checked)}
              >
                <span>
                  <h3>{item?.value}</h3>
                </span>
                <span>
                  {ifItemSelected(item) && (
                    <h3>
                      <CheckIcon />
                    </h3>
                  )}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
