import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

export default function FollowersCount({ username: usernameProp }) {
  const { username: usernameParam } = useParams()
  const username = usernameProp || usernameParam
  const [count, setCount]     = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!username) {
      setCount(0)
      setLoading(false)
      return
    }
    const token = localStorage.getItem('access_token')
    fetch(`http://localhost:8000/api/profile/${username}/followers/`, {
      headers: token
        ? { Authorization: `Bearer ${token}` }
        : {}
    })
      .then(res => res.json())
      .then(data => {
        setCount(Array.isArray(data) ? data.length : 0)
      })
      .catch(() => {
        setCount(0)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [username])

  if (loading) return <span>Loading…</span>

  return (
    <span className="followers-count">
      {count} {count === 1 ? 'Follower' : 'Followers'}
    </span>
  )
}