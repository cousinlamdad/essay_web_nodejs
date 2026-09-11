import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import InputEssay from './pages/InputEssay'
import EssayList from './pages/EssayList'
import EssayDetail from './pages/EssayDetail'

function App() {
  const { t, i18n } = useTranslation()

  return (
    <BrowserRouter>
      <header className="app-header">
        <h1>{t('app.title')}</h1>
        <nav>
          <Link to="/essays">{t('nav.list')}</Link>
          <Link to="/">{t('nav.input')}</Link>
          <button
            type="button"
            onClick={() => i18n.changeLanguage(i18n.language === 'en' ? 'zh' : 'en')}
          >
            {i18n.language === 'en' ? '中文' : 'EN'}
          </button>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<InputEssay />} />
          <Route path="/essays" element={<EssayList />} />
          <Route path="/essays/:id" element={<EssayDetail />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
