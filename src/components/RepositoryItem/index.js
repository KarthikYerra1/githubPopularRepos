import './index.css'

const RepositoryItem = props => {
  const {details} = props
  const {name, issuesCount, forksCount, starsCount, avatarUrl} = details

  return (
    <li className="repository-list-item">
      <div className="list-item-container">
        <img className="avatar-img" src={avatarUrl} alt={name} />
        <h1 className="repo-name">{name}</h1>
        <div className="count-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
            alt="stars"
            className="repo-imgs"
          />
          <p className="count-number">{`${starsCount} stars`}</p>
        </div>
        <div className="count-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
            alt="forks"
            className="repo-imgs"
          />
          <p className="count-number">{`${forksCount} forks`}</p>
        </div>
        <div className="count-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
            alt="open issues"
            className="repo-imgs"
          />
          <p className="count-number">{`${issuesCount} open issues`}</p>
        </div>
      </div>
    </li>
  )
}

export default RepositoryItem
