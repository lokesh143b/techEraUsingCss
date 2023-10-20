import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import FailureView from '../FailureView'
import './index.css'

const statusConstants = {
  initial: 'INITIAL',
  process: 'PROCESS',
  failure: 'FAILURE',
  success: 'SUCCESS',
}

class CourseDetails extends Component {
  state = {courseDetails: {}, status: statusConstants.initial}

  componentDidMount() {
    this.getDetails()
  }

  getDetails = async () => {
    this.setState({status: statusConstants.process})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/te/courses/${id}`

    const response = await fetch(url)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = {
        id: data.course_details.id,
        imageUrl: data.course_details.image_url,
        description: data.course_details.description,
        name: data.course_details.name,
      }
      this.setState({
        courseDetails: updatedData,
        status: statusConstants.success,
      })
    } else {
      this.setState({status: statusConstants.failure})
    }
  }

  retry = () => this.getDetails()

  renderFailureView = () => {
    const {status} = this.state
    return <FailureView status={status} retry={this.retry} />
  }

  renderLoaderView = () => (
    <div data-testid="loader" className="loader">
      <Loader type="ThreeDots" color="#4656a1" height="50" width="50" />
    </div>
  )

  renderSuccessView = () => {
    const {courseDetails} = this.state

    return (
      <div className="details-container">
        <img
          className="course-img"
          src={courseDetails.imageUrl}
          alt={courseDetails.name}
        />
        <div className="head-desc-container">
          <h1 className="course-heading">{courseDetails.name}</h1>
          <p className="course-description">{courseDetails.description}</p>
        </div>
      </div>
    )
  }

  renderCoursesView = () => {
    const {status} = this.state

    switch (status) {
      case statusConstants.process:
        return this.renderLoaderView()

      case statusConstants.failure:
        return this.renderFailureView()

      case statusConstants.success:
        return this.renderSuccessView()

      default:
        return null
    }
  }

  render() {
    const {courseDetails} = this.state
    console.log(courseDetails)
    return (
      <div>
        <Header />
        <div className="course-bottom-container">
          {this.renderCoursesView()}
        </div>
      </div>
    )
  }
}

export default CourseDetails
