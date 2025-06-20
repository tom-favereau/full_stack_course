import { useState, forwardRef, useImperativeHandle } from 'react'

const Togglable = forwardRef(({ buttonLabelActivate, buttonLabelDesactivate, children }, ref) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    useImperativeHandle(ref, () => {
        return { toggleVisibility }
    })

    return (
        <div>
            <div style={hideWhenVisible}>
                <button onClick={toggleVisibility}>{buttonLabelActivate}</button>
            </div>
            <div style={showWhenVisible}>
                {children}
                <button id="cancel-button" onClick={toggleVisibility}>{buttonLabelDesactivate}</button>
            </div>
        </div>
    )
})

export default Togglable