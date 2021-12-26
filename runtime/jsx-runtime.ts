export interface JSXProps  {
  children?:JSXElement|JSXElement[]
}

export type JSXElement<Props extends JSXProps = JSXProps> = {
  type:string,
  props:Props
};

export type JSXFactory<T extends JSXProps = JSXProps> = (props?:JSXProps) => JSXElement<JSXProps>; 

function jsx<T extends JSXProps>(type:JSXFactory<T>, config:T) {
  if (typeof type === "function") {
    return type(config);
  }
  
const { children = [], ...props } = config;
  const childrenProps = [].concat(children);
  return {
    type,
    props: {
      ...props,
      children: childrenProps.map((child) =>
        typeof child === "object" ? child : createTextElement(child)
      ),
    },
  };
}

function createTextElement(text) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: [],
    },
  };
}

function render(element, container) {
  const dom =
    element.type === "TEXT_ELEMENT"
      ? container.ownerDocument.createTextNode("")
      : container.ownerDocument.createElement(element.type);
  const isProperty = (key) => key !== "children";
  Object.keys(element.props)
    .filter(isProperty)
    .forEach((name) => {
      dom[name] = element.props[name];
    });
  element.props.children.forEach((child) => render(child, dom));
  container.appendChild(dom);
}

export { jsx, render };
