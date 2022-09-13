// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {eachItem, onChangeActiveLanguage} = props

  const onClickLanguageItem = () => {
    onChangeActiveLanguage(eachItem.id)
  }

  return (
    <li className="nav-header" onClick={onClickLanguageItem}>
      <button type="button" className="language-button">
        {eachItem.language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
