import React from 'react'
import { useState } from 'react'
// import { DropDownArrow } from '../../../pages/svgs'
import './input-drop-down.scss'

interface DropDownFormItemProps {
    id: string
    label: string
    defaultText: string
    options: string[]
    name: string
    onChange: any
}

export default function FormDropDownItem(props: DropDownFormItemProps): JSX.Element {
    const [inputState, setInputState] = useState('select something')

    function listItemOnClick(item: string) {
        setInputState(item)
        props.onChange(props.name, item)
    }

    function inputOnChange(e: React.ChangeEvent<HTMLInputElement>): void {
        setInputState(e.target.value)
        props.onChange(props.name, e.target.value)
    }

    return (
        <div className="profile-form-drop-down-item ">
            <label className="form-label ">{props.label}</label>
            <br />
            <div className="dropdown ">
                <input id={props.id} className="drop-down-input" value={inputState} onChange={inputOnChange} />

                <div className="arrow-row ">
                    <div className=" arrow">{/* <DropDownArrow></DropDownArrow> */}</div>
                </div>

                <div className="dropdown-content">
                    <nav className="scrollbar">
                        <ul className="list">
                            {props.options.map(item => (
                                <li className="list-item" key={item}>
                                    <button className="list-button" onClick={() => listItemOnClick(item)}>
                                        {item}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    )
}
