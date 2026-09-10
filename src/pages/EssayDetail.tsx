import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

interface Essay {
  id: number
  title: string
  content: string
  created_at: string
}

export default function EssayDetail() {
  const { id } = useParams<{ id: string }>()
  const { t } = useTranslation()
  const [essay, setEssay] = useState<Essay | null>(null)

  useEffect(() => {
    if (!id) return
    fetch(`/api/essays/${id}`)
      .then((res) => res.json())
      .then((data: Essay) => setEssay(data))
  }, [id])

  if (!essay) return <p>{t('list.loading')}</p>

  return (
    <article className="essay-detail">
      <h2>{essay.title}</h2>
      <p className="meta">
        {t('detail.created')}: {new Date(essay.created_at).toLocaleString()}
      </p>
      <pre>{essay.content}</pre>
      <Link to="/essays">
        <button type="button">{t('list.back')}</button>
      </Link>
    </article>
  )
}
