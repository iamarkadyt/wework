import React, { Component } from 'react'
import './ProfileView.scss'
import { shape, string, func, arrayOf } from 'prop-types'
import { followerType, profileType } from '../../types/index'
import { connect } from 'react-redux'
import { deleteExperience, deleteEducation } from '../../state/actions/profileActions'
import { followAPerson, unfollowAPerson } from '../../state/actions/userActions'
import Bio from './Bio/Bio'
import DangerZone from './DangerZone/DangerZone'
import Education from './Education/Education'
import Experience from './Experience/Experience'
import Overview from './Overview/Overview'
import Skills from './Skills/Skills'

class ProfileView extends Component {
  defaultDeletingState = {
    deletingExpEntries: false,
    deletingEduEntries: false
  }

  constructor(props) {
    super(props)
    this.state = {
        ...this.defaultDeletingState
    }
  }

  quitEntryDeletingMode() {
    this.setState(this.defaultDeletingState)
  }

  setExpDeleting(bool) {
    this.setState({
      deletingExpEntries: bool
    })
  }

  setEduDeleting(bool) {
    this.setState({
      deletingEduEntries: bool
    })
  }

  navTo(where) {
    const {
      history,
      match
    } = this.props

    const baseUrl = match.url || ''
    return history.push(`${baseUrl}/${where}`)
  }

  render() {
    const {
      authedUser: {
        id: authedUserId,
        following
      },
      profile: {
        user: { _id },
        bio,
        skills,
        experience,
        education
      },
      profile,
      deleteExperience,
      deleteEducation,
      followAPerson,
      unfollowAPerson,
      match,
      history
    } = this.props

    const profileBelongsToAuthedUser = authedUserId === _id
    const isFollowingProfileOwner = !!following.find(item => item.user === _id)

    const commonProps = {
      history,
      baseUrl: match.url || '',
      profileBelongsToAuthedUser
    }

    return (
      <div className="ProfileView-container">
        <Overview 
          profile={profile} 
          quitEntryDeletingMode={this.quitEntryDeletingMode.bind(this)}
          isFollowingProfileOwner={isFollowingProfileOwner}
          unfollowAPerson={unfollowAPerson}
          followAPerson={followAPerson} 
          navTo={this.navTo.bind(this)}
          {...commonProps} />
        <Bio bio={bio} />
        <Skills skills={skills} />
        <Experience 
          experience={experience}
          deleteExperience={deleteExperience}
          isDeleting={this.state.deletingExpEntries}
          setDeleting={this.setExpDeleting.bind(this)}
          quitEntryDeletingMode={this.quitEntryDeletingMode.bind(this)}
          {...commonProps} />
        <Education 
          education={education} 
          deleteEducation={deleteEducation}
          isDeleting={this.state.deletingEduEntries}
          setDeleting={this.setEduDeleting.bind(this)}
          quitEntryDeletingMode={this.quitEntryDeletingMode.bind(this)}
          {...commonProps} />
        <DangerZone 
          quitEntryDeletingMode={this.quitEntryDeletingMode.bind(this)}
          {...commonProps} />
      </div>
    )
  }
}

ProfileView.propTypes = {
  authedUser: shape({
    id: string.isRequired,
    following: arrayOf(followerType).isRequired
  }).isRequired,
  history: shape({
    push: func.isRequired
  }).isRequired,
  match: shape({
    url: string.isRequired
  }).isRequired,
  deleteEducation: func.isRequired,
  deleteExperience: func.isRequired,
  followAPerson: func.isRequired,
  unfollowAPerson: func.isRequired,
  profile: profileType.isRequired             
}

export { ProfileView as _UnconnectedProfileView }
export default connect(state => ({
  authedUser: state.user
}), { deleteEducation, deleteExperience, followAPerson, unfollowAPerson })(ProfileView)
