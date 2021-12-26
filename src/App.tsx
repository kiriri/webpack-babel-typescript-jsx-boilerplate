import { JSXElement, JSXProps } from "../runtime/jsx-runtime";

interface ListProps extends JSXProps{
  items:number[]
}
function List({ items } : {items:number[]}) : JSXElement<ListProps> {
  return (
    <ul>
      {items.map((item, i) => (
        <ListItem id={i.toString()}>
          <Anchor value={item.toString()} />
        </ListItem>
      ))}
    </ul>
  );
}

interface ListItemProps extends JSXProps{
  children?:JSXElement[]|JSXElement,
  id:string
}
function ListItem({ children, id }:ListItemProps) : JSXElement<ListItemProps> {
  return <li id={id}>{children}</li>;
}

interface AnchorProps extends JSXProps{
  value:string|number
}
function Anchor({ value } : AnchorProps) : JSXElement<AnchorProps> {
  return <a href="#">{value}</a>;
}

function App() : JSXElement<ListProps> {
  return <List items={[1, 2, 3, 4]} />;
}

export default App;
