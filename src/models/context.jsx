import { createElement, createContext, useContext } from "react";

const MyCreateContext = (value = () => {}) => {
  const Context = createContext({});
  // eslint-disable-next-line react/prop-types
  const Provider = (props) => {
    return createElement(
      Context.Provider,
      { value: value(props) },
      // eslint-disable-next-line react/prop-types
      props?.children
    );
  };
  const Use = () => {
    const ctx = useContext(Context);
    if (!ctx) {
      throw new Error("context must be within a provider!");
    }
    return ctx;
  };
  return {
    get Context() {
      return Context;
    },
    get Provider() {
      return Provider;
    },
    get Use() {
      return Use;
    },
  };
};
export default MyCreateContext;

// const Myctx = createContext();

// function themeProv (){
//  const [theme, sTheme] = useState('light')

//  const toggle = ()=>{
//      sTheme(theme === 'light'? 'dark' : 'light')
//  }

// return <Myctx.Provider value={{theme,toggle }}/>

// }
// useContext(Myctx)

// function page1 (){
// const {theme, toggle} = useContext(Myctx);

// }
