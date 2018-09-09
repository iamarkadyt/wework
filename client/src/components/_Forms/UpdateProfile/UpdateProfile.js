import React from 'react';
import Field from '../../Field/Field'
import { dismissOverlay } from '../../../state/actions/overlayActions'
import * as overlayTypes from '../../../helpers/overlayTypes'
import { updateUsersProfile } from '../../../state/actions/profileActions'
import { connect } from 'react-redux'
import './UpdateProfile.css'

class UpdateProfile extends React.Component {
    state = {
        showSocial: false,
        creating: true
    }

    constructor(props) {
        super(props)
        console.log(props)
        if (props.profile) {
            this.state = {
                showSocial: false,
                creating: false,
                ...props.profile
            }
        }
    }

    render() {
        const { dismissOverlay, updateUsersProfile, errors } = this.props

        return (
            <form className="UpdateProfile-container" onSubmit={e => {
                e.preventDefault()
                const { showSocial, creating, ...data } = this.state
                updateUsersProfile(data, () => {
                    dismissOverlay(
                        creating
                            ? overlayTypes.CREATING_PROFILE
                            : overlayTypes.UPDATING_PROFILE
                    )
                })
            }}>
                <h1>{this.state.creating ? 'Create' : 'Update'} profile</h1>
                <Field
                    type="text"
                    name="handle"
                    label="Profile handle:"
                    value={this.state.handle}
                    onChange={e => this.setState({ handle: e.target.value })}
                    error={errors.handle}
                    placeholder="someperson123" />
                <Field
                    type="text"
                    name="company"
                    label="Company:"
                    value={this.state.company}
                    onChange={e => this.setState({ company: e.target.value })}
                    error={errors.company}
                    placeholder="Facebook" />
                <Field
                    type="text"
                    name="website"
                    label="Personal Website:"
                    value={this.state.website}
                    onChange={e => this.setState({ website: e.target.value })}
                    error={errors.website}
                    placeholder="http://mywebsite.com" />
                <Field
                    type="text"
                    name="location"
                    label="Location:"
                    value={this.state.location}
                    onChange={e => this.setState({ location: e.target.value })}
                    error={errors.location}
                    placeholder="Seattle, WA" />
                <Field
                    type="text"
                    name="title"
                    label="Job title:"
                    value={this.state.title}
                    onChange={e => this.setState({ title: e.target.value })}
                    error={errors.title}
                    placeholder="Marketing Analyst" />
                <Field
                    type="list"
                    name="status"
                    label="Job seeker status:"
                    list={['Not open', 'Available for Employment', 'Actively Seeking']}
                    value={this.state.status}
                    onChange={value => this.setState({ status: value })}
                    error={errors.status} />
                <Field
                    type="multiselect"
                    name="skills"
                    label="Skills:"
                    list={['Python', 'Java', 'C++', 'Hospitality', 'Whatnot else']}
                    value={this.state.skills}
                    onChange={value => this.setState({ skills: value })}
                    error={errors.skills} />
                <Field
                    type="textarea"
                    name="bio"
                    label="Bio:"
                    value={this.state.bio}
                    onChange={e => this.setState({ bio: e.target.value })}
                    error={errors.bio}
                    placeholder="It's okay to brag here.." />
                <Field
                    type="button"
                    label="Toggle social media section"
                    onClick={e => {
                        e.preventDefault()
                        this.setState(prevState => ({ showSocial: !prevState.showSocial }))
                    }} />
                <div style={{ display: this.state.showSocial ? 'block' : 'none' }}>
                    <Field
                        type="text"
                        name="youtube"
                        label="Youtube:"
                        value={this.state.youtube}
                        onChange={e => this.setState({ youtube: e.target.value })}
                        error={errors.youtube}
                        placeholder="Please enter full channel URL" />
                    <Field
                        type="text"
                        name="twitter"
                        label="Twitter:"
                        value={this.state.twitter}
                        onChange={e => this.setState({ twitter: e.target.value })}
                        error={errors.twitter}
                        placeholder="Twitter profile URL" />
                    <Field
                        type="text"
                        name="instagram"
                        label="Instagram:"
                        value={this.state.instagram}
                        onChange={e => this.setState({ instagram: e.target.value })}
                        error={errors.instagram}
                        placeholder="Instagram URL" />
                    <Field
                        type="text"
                        name="facebook"
                        label="Facebook:"
                        value={this.state.facebook}
                        onChange={e => this.setState({ facebook: e.target.value })}
                        error={errors.facebook}
                        placeholder="Facebook profile URL" />
                    <Field
                        type="text"
                        name="linkedin"
                        label="LinkedIn:"
                        value={this.state.linkedin}
                        onChange={e => this.setState({ linkedin: e.target.value })}
                        error={errors.linkedin}
                        placeholder="LinkedIn URL" />
                    <Field
                        type="text"
                        name="githubusername"
                        label="Github:"
                        value={this.state.githubusername}
                        onChange={e => this.setState({ githubusername: e.target.value })}
                        error={errors.githubusername}
                        placeholder="Github username only" />
                </div>
                <Field
                    type="submit"
                    label={this.state.creating ? 'Create' : 'Update'} />
                <Field
                    type="button"
                    label="Cancel"
                    onClick={() => dismissOverlay(
                        this.state.creating
                            ? overlayTypes.CREATING_PROFILE
                            : overlayTypes.UPDATING_PROFILE
                    )} />
            </form>
        )
    }
}

export default connect(state => ({
    errors: state.err.formErrors
}), { dismissOverlay, updateUsersProfile })(UpdateProfile)