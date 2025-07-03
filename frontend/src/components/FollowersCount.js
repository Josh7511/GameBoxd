import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

export default function FollowersCount({ username: usernameProp }) {
  const { username: usernameParam } = useParams()
  const username = usernameProp || usernameParam

  const [count, setCount]     = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(false)

  useEffect(() => {
    if (!username) {
      setLoading(false)
      return
    }
    const token = localStorage.getItem('access_token')

    fetch(`http://localhost:8000/api/profile/${username}/`, {
      headers: token
        ? { Authorization: `Bearer ${token}` }
        : {}
    })
      .then(res => {
        if (!res.ok) throw new Error('Profile fetch failed')
        return res.json()
      })
      .then(profileData => {
        const userId = profileData.id
        return fetch(`http://localhost:8000/api/profile/${userId}/followers/`, {
          headers: token
            ? { Authorization: `Bearer ${token}` }
            : {}
        })
      })
      .then(res => {
        if (!res.ok) throw new Error('Followers fetch failed')
        return res.json()
      })
      .then(followersData => {
        setCount(Array.isArray(followersData) ? followersData.length : 0)
      })
      .catch(() => {
        setError(true)
        setCount(0)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [username])

  if (loading) return <span>Loading…</span>
  if (error)   return <span>0 Followers</span>

  return (
    <span className="followers-count">
      {count} {count === 1 ? 'Follower' : 'Followers'}
    </span>
  )
}
