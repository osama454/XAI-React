import React from "react";

const F1 =(()=> {
  console.log(1);
  return "1"
})
const F2 = ()=> {
  console.log(2);
  return "2"
}
const F3 = ()=> {
  console.log(3);
  return "3"
}
let f2 = <F2/>
const App = ()=>{
  const [state, setState] = React.useState(0);
  let c = React.useMemo(F1,[state])
  return <div>
     {c}
    {f2}
    <F3/>
    <button onClick={()=>setState(state+1)}>{state}</button>
  </div>
}
export default App;
