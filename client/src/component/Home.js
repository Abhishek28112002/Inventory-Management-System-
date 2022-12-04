import React, { useEffect } from 'react';
import { useState,useSortBy } from 'react';
import './Home.css';

function Checklist() {
  const listgeht=()=>{
    let listh=localStorage.getItem('lists');
    if(listh)
    {
      return JSON.parse(localStorage.getItem('lists'));
    }
    else
    return [];
  }
const [item,setitem]= useState(listgeht());
const [newitem,setnewitem]= useState([]);
const [text,settext]=useState();
const [sorttext,setsortext]=useState("asc");
const [search,setsearch]=useState('');
const sorting=(col)=>{
if(sorttext=="asc")
{
const sorted=[...item].sort((a,b)=>
a[col].toLowerCase()>b[col].toLowerCase()?1:-1);
setitem(sorted);
setsortext("dsc")
}
else{
  const sorted=[...item].sort((a,b)=>
a[col].toLowerCase()<b[col].toLowerCase()?1:-1);
setitem(sorted);
setsortext("asc")
}
}
useEffect(()=>{
localStorage.setItem('lists',JSON.stringify(item));
setnewitem(item);
},[item])
  return (

<div className='body'>
<h1>TO-DO LIST</h1>
  <input type="text" value={text} onChange={(e)=>settext(e.target.value)} placeholder="write here"></input>
  <button onClick={()=>{setitem([...item,{
    id:item.length,
    value:`${text}`,
  }])
  item.sort();
  settext('')
  }}>ADD task</button>
<table>
  <tr>
  <th onClick={()=>sorting("value")}>Description</th>
  <th><input onChange={e=>{setsearch(e.target.value)
  setnewitem(item.filter((p)=>{
    return p.value.indexOf({search})!=-1&&search!=null;
  }))
  console.log(newitem);
console.log(item);
  }}></input></th>
    <th className='delt'>delete</th>
  </tr>
  {newitem.map(it=>( 

    <tr key={it.id}>
      <td style={{colspan:"2"}}>{it.value}</td>      
     <td ><button className='delete' type='button' onClick={()=>{
      setitem(item.filter(p=>{
         return(p.id!=it.id)
       }))
     }}> Delete </button></td> 
    </tr>
    
    ))
}

</table>
  </div>
  );
}

export default Checklist;
