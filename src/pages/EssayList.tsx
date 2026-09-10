import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

interface Essay {
  id: number
  title: string
  created_at: string
}

export default function EssayList() {
  const { t } = useTranslation()
  const [essays, setEssays] = useState<Essay[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/essays')
      .then((res) => res.json())
      .then((data: Essay[]) => {
        setEssays(data)
        setLoading(false)
      })
  }, [])

  if (loading) return <p>{t('list.loading')}</p>
  if (!essays.length) return <p>{t('list.empty')}</p>

  return (
    <section>
      <h2>{t('nav.list')}</h2>
      <ul className="essay-list">
        {essays.map((essay) => (
          <li key={essay.id}>
            <Link to={`/essays/${essay.id}`}>
              <span className="title">{essay.title}</span>
              <time dateTime={essay.created_at}>
                {new Date(essay.created_at).toLocaleString()}
              </time>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
