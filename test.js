import test from "ava"
import React from "react"
import Enzyme, { shallow } from "enzyme"
import Adapter from "enzyme-adapter-react-16"
import Propers from "./src/index"

Enzyme.configure({ adapter: new Adapter() })

test("normal", t => {
    const dom1 = shallow(
        <Propers
            traverse={props => {
                return false
            }}
        >
            {React => <div $id="123">lalalalala</div>}
        </Propers>
    )

    const dom2 = shallow(
        <Propers
            traverse={props => {
                return { className: "123" }
            }}
        >
            {React => (
                <>
                    <div $id="aaa">lalalalala</div>
                    <div $id="bbb">hahahahaha</div>
                </>
            )}
        </Propers>
    )

    t.is(dom1.text(), "")
    t.is(
        dom2.html(),
        '<div class="123">lalalalala</div><div class="123">hahahahaha</div>'
    )
})
