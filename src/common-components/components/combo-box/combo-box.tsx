// import { useEffect, useState } from 'react';
import './combo-box.scss';

// interface ComboBoxProps {
//   // label: string;
//   // defaultText: string;
//   // type: string;
// }

export function ComboBox() {
  return (
    <div className="text-box-container debugTextBox">
      <label className="form-label debug">"props.label"</label>
      <br />
      <input className="input debug" value="props.defaultText"/>
        <select>
          <option value="grapefruit">Grapefruit</option>
          <option value="lime">Lime</option>
          <option selected value="coconut">
            Coconut
          </option>
          <option value="mango">Mango</option>
        </select>
      
    </div>
  );
}
