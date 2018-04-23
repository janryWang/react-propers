# react-propers

> Select react doms , and update props.



### Usage

```
import React from "react"
import ReactDOM from "react-dom"
import Propers from "react-propers"

ReactDOM.render(
   <Propers selector="$id" traverse={(props,{key})=>{
       switch(key){
           case "aaa":
             return {
                 className:"aaa"
             }
           case "bbb":
             return {
                 className:"bbb"
             }
           case "ccc":
             return {
                 className:"ccc"
             }
           case "ddd":
             return false
       }
       return props
   }}>
      {React=>(
       <>
         <div $id="aaa">111</div>
         <div $id="bbb">222</div>
         <div $id="ccc">333</div>
         <div $id="ddd">444</div>
       </>
      )}
   </Propers>
)

//out put

<div class="aaa">111</div><div class="bbb">222</div><div class="ccc">333</div>
```



### Install

```
npm install --save react-propers
```

