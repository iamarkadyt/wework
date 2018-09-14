import React, { Component } from 'react'
import { connect } from 'react-redux'
import './Reply.css'

import Field from '../Field/Field'

class Reply extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    clearFields = () => {
        this.setState({ text: '' })
    }

    render() {
        const { onSubmit, flat, rows, errors } = this.props
        const flatStyle = {
            borderRadius: 'unset',
            boxShadow: 'unset',
            marginTop: 'unset',
        }

        return <form
            className="Reply-container"
            style={flat ? flatStyle : null}
            onSubmit={e => {
                e.preventDefault()
                onSubmit(this.state, () => this.clearFields())
            }}>
            <Field
                type="textarea"
                rows={rows || "5"}
                value={this.state.text}
                onChange={e => this.setState({ text: e.target.value })}
                error={errors.text} />
            <Field
                type="submit"
                inline
                label="Submit" />
        </form>
    }
}

export default connect(state => ({
    errors: state.err.formErrors
}))(Reply)