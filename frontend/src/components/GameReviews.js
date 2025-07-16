import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import placeholderAvatar from '../assets/images/placeholder-avatar.png'

export default function GameReviews() {
  const { id } = useParams()
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    fetch(`http://localhost:8000/api/game-log-by-id/?query=${id}`)
      .then(res => res.json())
      .then(data => setReviews(data))
      .catch(err => console.error('Fetch Error', err))
  }, [id])

  const renderStars = rating => {
    const full = Math.floor(rating)
    const half = rating % 1 >= 0.5
    return (
      <>
        {Array.from({ length: full }).map((_, i) => (
          <span key={i} className="text-accent text-base mr-1">★</span>
        ))}
        {half && <span className="text-accent text-base">½</span>}
      </>
    )
  }

  return (
    <div className="flex flex-col gap-4 max-w-xl mx-auto my-4 px-4">
      {reviews.map(log => {
        const date = new Date(log.date_played).toLocaleDateString()
        return (
          <div
            key={log.id}
            className="flex flex-col gap-2 p-4 pt-0 border-b border-text border-opacity-10"
          >
            <div className="flex items-center gap-3">
              <img
                src={log.user_avatar || placeholderAvatar}
                alt={`${log.user}'s avatar`}
                className="w-10 h-10 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex flex-col gap-1">
                <p className="m-0 text-text text-sm">
                  Review by{' '}
                  <Link
                    to={`/profile/${log.user}`}
                    className="font-semibold hover:text-accent"
                  >
                    {log.user}
                  </Link>
                </p>
                <div className="flex">{renderStars(log.rating)}</div>
              </div>
            </div>
            <p className="m-0 text-text leading-relaxed break-words">
              {log.review}
            </p>
            <div className="flex justify-between items-center text-sm text-text">
              <span>{date}</span>
              <button className="flex items-center gap-1 bg-transparent border-none text-text text-sm cursor-pointer hover:text-secondary">
                ♥ Like review
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}
