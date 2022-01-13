import './list-item-component.scss';

interface ListItemProps {
  content: string;
  parentID: string;
}

export default function ListItem(props: ListItemProps): JSX.Element {
  return (
    <li className="list-item">
      <button className="list-button" onClick={() => onCLick(props.parentID, props.content)}>
        {props.content}
      </button>
    </li>
  );
}

function onCLick(parentID: string, content: string) : void {
  //console.log(parentID);
  const input = document.getElementById(parentID);
  //console.log(input);
  input?.setAttribute('value', content);
  // input?.se
  // document.getElementById(parentID)?.getElementsByTagName("input")[0]?.value = "content"
}

//? trebuie un setState (asigura 2 way data biding-ul care in Angular se face automat)
