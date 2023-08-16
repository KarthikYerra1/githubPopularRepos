import {Component} from 'react'
import Loader from 'react-loader-spinner'

import RepositoryItem from '../RepositoryItem'
import LanguageFilterItem from '../LanguageFilterItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class GithubPopularRepos extends Component {
  state = {
    activeLanguageOption: languageFiltersData[0].id,
    apiStatus: apiStatusConstants.initial,
    reposList: [],
  }

  componentDidMount() {
    this.getAllRepositories()
  }

  changeActiveLanguage = id => {
    this.setState(
      {
        activeLanguageOption: id,
      },
      this.getAllRepositories,
    )
  }

  renderRepositoriesList = () => {
    const {reposList} = this.state
    return (
      <>
        <ul className="repos-list">
          {reposList.map(each => (
            <RepositoryItem key={each.id} details={each} />
          ))}
        </ul>
      </>
    )
  }

  renderLoaderView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  getAllRepositories = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const {activeLanguageOption} = this.state

    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${activeLanguageOption}`
    const response = await fetch(apiUrl)
    const data = await response.json()
    const updatedData = data.popular_repos.map(eachRepo => ({
      name: eachRepo.name,
      id: eachRepo.id,
      issuesCount: eachRepo.issues_count,
      forksCount: eachRepo.forks_count,
      starsCount: eachRepo.stars_count,
      avatarUrl: eachRepo.avatar_url,
    }))
    this.setState({
      apiStatus: apiStatusConstants.success,
      reposList: updatedData,
    })
  }

  renderReposList = apiStatus => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderRepositoriesList()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  render() {
    const {activeLanguageOption, apiStatus} = this.state

    return (
      <div className="app-container">
        <h1 className="products-heading">Popular</h1>
        <ul className="language-list">
          {languageFiltersData.map(each => (
            <LanguageFilterItem
              key={each.id}
              details={each}
              changeActiveLanguage={this.changeActiveLanguage}
              isActive={each.id === activeLanguageOption}
            />
          ))}
        </ul>
        <div className="repos-list-container">
          {this.renderReposList(apiStatus)}
        </div>
      </div>
    )
  }
}

export default GithubPopularRepos
