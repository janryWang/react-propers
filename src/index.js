import React from "react"

const isFn = fn => typeof fn === "function"

const getPathSegments = path => {
    if (isArr(path)) return path
    if (isStr(path) && path) {
        const pathArr = path.split(".")
        const parts = []

        for (let i = 0; i < pathArr.length; i++) {
            let p = pathArr[i]

            while (p[p.length - 1] === "\\" && pathArr[i + 1] !== undefined) {
                p = p.slice(0, -1) + "."
                p += pathArr[++i]
            }

            parts.push(p)
        }
        return parts
    }
    return []
}

const _createElement = React.createElement

const getSelector = (props, selector) => {
    selector = Array.isArray(selector) ? selector : [selector]
    for (let i = 0; i < selector.length; i++) {
        let item = props[selector[i]]
        if (item !== undefined || item !== null) return item
    }
}

export class Propers extends React.Component {
    static defaultProps = {
        selector: "$id"
    }

    buildCreateElement() {
        const { traverse, selector, state } = this.props
        return function(component, props, ...children) {
            if (!isFn(traverse)) return _createElement.apply(null, arguments)
            const $selector = props && getSelector(props, selector)
            const $props = $selector
                ? traverse(
                      props,
                      Object.defineProperties(
                          {},
                          {
                              path: {
                                  get: () => {
                                      return getPathSegments(String($selector))
                                  }
                              },
                              key: {
                                  value: $selector,
                                  writable: false
                              },
                              payload: {
                                  value: props,
                                  writable: false
                              },
                              index: {
                                  value: $selector,
                                  writable: false
                              },
                              component: {
                                  value: component,
                                  writable: false
                              },
                              state: {
                                  value: state,
                                  writable: false
                              }
                          }
                      )
                  )
                : props
            if ($selector) {
                if ($props) {
                    delete $props[$selector]
                    return _createElement(component, $props, ...children)
                }
            } else {
                return _createElement(component, $props, ...children)
            }
        }
    }

    render() {
        const { children } = this.props
        if (!isFn(children)) return children

        this.react = this.react || {
            ...React,
            createElement: this.buildCreateElement()
        }

        return children(this.react)
    }
}

export default Propers
