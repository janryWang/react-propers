import test from "ava"
import React from "react"
import Enzyme, { shallow } from "enzyme"
import Adapter from "enzyme-adapter-react-16"
import Propers from "../src/index"
import qverse from "qverse"

Enzyme.configure({ adapter: new Adapter() })

const testAll = (cases)=>{
    cases.forEach((_case,index)=>{
        _case && test(`${index+1}th case.`,(t)=>{
            const dom = shallow(
                <Propers
                    traverse={qverse(_case.traverse)}
                >
                    {_case.render}
                </Propers>
            )
            t.is(dom.html(),_case.equal)
        })
    })
}

testAll([
    {
        render(React){
            return <div><div id="123">lalalalala</div></div>
        },
        traverse($){
            $("*").display(false)
        },
        equal:"<div></div>"
    },
    {
        render(React){
            return (<div>
                <div id="aaa">lalalalala</div>
                <div id="bbb">hahahahaha</div>
            </div>)
        },
        traverse($){
            $("*").produce((props)=>{
                props.className = "123"
            })
        },
        equal:'<div><div id="aaa" class="123">lalalalala</div><div id="bbb" class="123">hahahahaha</div></div>'
    }
])
