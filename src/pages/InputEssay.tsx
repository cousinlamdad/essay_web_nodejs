import { useState, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'

export default function InputEssay() {
  const { t } = useTranslation()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [status, setStatus] = useState('')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const res = await fetch('/api/essays', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content }),
    })
    if (!res.ok) {
      setStatus(t('input.error'))
      return
    }
    setStatus(t('input.saved'))
    setTitle('')
    setContent('')
  }

  return (
    <section>
      <h2>{t('nav.input')}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">{t('input.title')}</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="content">{t('input.content')}</label>
          <textarea
            id="content"
            rows={10}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <button type="submit">{t('input.submit')}</button>
      </form>
      {status && <p className="status">{status}</p>}
    </section>
  )
}
