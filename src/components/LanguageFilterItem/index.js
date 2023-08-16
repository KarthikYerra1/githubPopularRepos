import './index.css'

const LangaugeFilterItem = props => {
  const {details, changeActiveLanguage, isActive} = props
  const {id, language} = details
  const className = isActive ? 'active-btn btn' : 'btn'

  const onClickLanguage = () => {
    changeActiveLanguage(id)
  }

  return (
    <li className="language-list-item">
      <button type="button" className={className} onClick={onClickLanguage}>
        {language}
      </button>
    </li>
  )
}

export default LangaugeFilterItem
