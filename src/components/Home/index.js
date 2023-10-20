import {Component} from 'react'
import {Link} from 'react-router-dom'
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

class Home extends Component {
  state = {courseList: [], status: statusConstants.initial}

  componentDidMount() {
    this.getDetails()
  }

  getDetails = async () => {
    this.setState({status: statusConstants.process})
    const url = 'https://apis.ccbp.in/te/courses'

    const response = await fetch(url)
    if (response.ok === true) {
      const data = await response.json()

      const updatedData = data.courses.map(each => {
        const formattedData = {
          id: each.id,
          logoUrl: each.logo_url,
          name: each.name,
        }
        return formattedData
      })
      console.log(updatedData)
      this.setState({status: statusConstants.success, courseList: updatedData})
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
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#4656a1" height="50" width="50" />
    </div>
  )

  renderSuccessView = () => {
    const {courseList} = this.state
    return (
      <ul className="courses-list-view">
        {courseList.map(each => (
          <Link className="link" key={each.id} to={`/courses/${each.id}`}>
            <li className="courses-list-item">
              <img className="courses-img" src={each.logoUrl} alt={each.name} />
              <p className="courses-name">{each.name}</p>
            </li>
          </Link>
        ))}
      </ul>
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
    return (
      <div className="home-container">
        <Header />
        <h1>Courses</h1>
        <div className="home-courses-container">{this.renderCoursesView()}</div>
      </div>
    )
  }
}

export default Home
