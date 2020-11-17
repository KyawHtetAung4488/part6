import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  return (
    props.noti
    ? <div style={style}>
        {props.noti}
      </div>
    : null
  )
}

const mapStateToProps = (state) => {
  return {
    noti: state.notification
  }
}

export default connect(
  mapStateToProps
)(Notification)