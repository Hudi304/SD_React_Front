import './form-input.scss';

interface AccountProfileFormProps {
  label: string;
  defaultText: string;
  type: string;
}

export function FormItem(props: AccountProfileFormProps) : JSX.Element  {
  return (
    <div className="profile-form-item">
      <label className="form-label">{props.label}</label>
      <br />
      <input className="input" type={props.type} defaultValue={props.defaultText} />
      <br />
    </div>
  );
}
