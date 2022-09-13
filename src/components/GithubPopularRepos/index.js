import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import LanguageFilterItem from '../LanguageFilterItem'
import './index.css'
import RepositoryItem from '../RepositoryItem'

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
    activeLanguage: languageFiltersData[0].id,
    resposList: [],

    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({apiStatus: 'IN_PROGRESS'})
    const {activeLanguage} = this.state
    const url = `https://apis.ccbp.in/popular-repos?language=${activeLanguage}`
    const options = {
      method: 'GET',
    }

    const response = await fetch(url, options)
    const data = await response.json()
    console.log(response)

    if (response.ok === true) {
      this.onSuccess(data)
    }

    if (response.ok !== true) {
      this.setState({apiStatus: 'FAILURE'})
    }
  }

  onSuccess = data => {
    const formattedData = {
      popularRepos: data.popular_repos,
    }
    const formattedData1 = this.getformattedData(formattedData.popularRepos)

    this.setState({
      resposList: formattedData1,

      apiStatus: 'SUCCESS',
    })
  }

  getformattedData = reposdata => {
    const reposeData = reposdata.map(eachItem => ({
      id: eachItem.id,
      name: eachItem.name,
      issuesCount: eachItem.issues_count,
      forksCount: eachItem.forks_count,
      starsCount: eachItem.stars_count,
      avatarUrl: eachItem.avatar_url,
    }))

    return reposeData
  }

  onChangeActiveLanguage = languageId => {
    this.setState({activeLanguage: languageId}, this.getData)
  }

  renderData = () => {
    const {resposList} = this.state
    return (
      <div className="repository-itmes-container">
        <ul className="repos-list">
          {resposList.map(eachItem => (
            <RepositoryItem eachItem={eachItem} key={eachItem.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderLoader = () => (
    <div>
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderFailure = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-image"
      />
      <h1>Something went wrong</h1>
    </div>
  )

  render() {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return (
          <div className="repos-container">
            <h1>Popular</h1>
            <ul className="list">
              {languageFiltersData.map(eachItem => (
                <LanguageFilterItem
                  eachItem={eachItem}
                  key={eachItem.id}
                  onChangeActiveLanguage={this.onChangeActiveLanguage}
                />
              ))}
            </ul>
            {this.renderData()}
          </div>
        )

      case apiStatusConstants.inProgress:
        return (
          <div className="repos-container">
            <h1>Popular</h1>
            <ul className="list">
              {languageFiltersData.map(eachItem => (
                <LanguageFilterItem
                  eachItem={eachItem}
                  key={eachItem.id}
                  onChangeActiveLanguage={this.onChangeActiveLanguage}
                />
              ))}
            </ul>
            {this.renderLoader()}
          </div>
        )

      case apiStatusConstants.failure:
        return (
          <div className="repos-container">
            <h1>Popular</h1>
            <ul className="list">
              {languageFiltersData.map(eachItem => (
                <LanguageFilterItem
                  eachItem={eachItem}
                  key={eachItem.id}
                  onChangeActiveLanguage={this.onChangeActiveLanguage}
                />
              ))}
            </ul>
            {this.renderFailure()}
          </div>
        )

      default:
        return null
    }
  }
}

export default GithubPopularRepos
