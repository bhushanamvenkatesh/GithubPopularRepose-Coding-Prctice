// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {eachItem} = props
  const {name, issuesCount, forksCount, starsCount, avatarUrl} = eachItem

  return (
    <li className="each-repo">
      <img src={avatarUrl} alt={name} className="repo-image" />
      <h1 className="name-heading">{name}</h1>
      <div className="stars-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="start-image"
        />
        <p>{starsCount}</p>
        <p>stars_count</p>
      </div>

      <div className="stars-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png "
          alt="forks"
          className="start-image"
        />
        <p>{forksCount}</p>
        <p>forks_count</p>
      </div>

      <div className="stars-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="start-image"
        />
        <p>{issuesCount}</p>
        <p>issues_count</p>
      </div>
    </li>
  )
}

export default RepositoryItem
