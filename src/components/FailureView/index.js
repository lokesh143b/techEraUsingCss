import Loader from 'react-loader-spinner'
import './index.css'

const FailureView = props => {
  const {retry, status} = props

  const onClickRetry = () => {
    retry()
  }

  const renderLoaderView = () => (
    <div data-testid="loader" className="loader">
      <Loader type="ThreeDots" color="#4656a1" height="50" width="50" />
    </div>
  )

  const renderFailureViewBody = () => (
    <>
      <img
        className="failure-view-img"
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png "
        alt="failure view"
      />
      <h1 className="failure-view-heading">Oops! Something Went Wrong</h1>
      <p className="failure-view-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button onClick={onClickRetry} className="retry-btn" type="button">
        Retry
      </button>
    </>
  )

  return (
    <div className="failure-view-container">
      {status === 'PROCESS' ? renderLoaderView() : renderFailureViewBody()}
    </div>
  )
}

export default FailureView
