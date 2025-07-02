import React, { useEffect, useState } from 'react'
import './FollowButton.css'

export default function FollowButton({ targetUserId }) {
  const [isFollowing, setIsFollowing] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const check = async () => {
      const token = localStorage.getItem('access_token')
      if (!token) { setLoading(false); return }
      try {
        const meRes = await fetch('http://localhost:8000/api/profile/', {
          headers: { Authorization: `Bearer ${token}` }
        })
        const me = await meRes.json()
        const folRes = await fetch(
          `http://localhost:8000/api/profile/${targetUserId}/followers/`,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        const followers = await folRes.json()
        const following = followers.some(f => f.follower === me.id)
        setIsFollowing(following)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    check()
  }, [targetUserId])

  const handleClick = async () => {
    const token = localStorage.getItem('access_token')
    if (!token) return
    if (isFollowing) {
      await fetch(
        `http://localhost:8000/api/unfollow/${targetUserId}/`,
        { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } }
      )
      setIsFollowing(false)
    } else {
      await fetch('http://localhost:8000/api/follow/', {
        method: 'POST',
        headers: {
          'Content-Type':  'application/json',
          Authorization:   `Bearer ${token}`
        },
        body: JSON.stringify({ followee: targetUserId })
      })
      setIsFollowing(true)
    }
  }

  if (loading) return null

  return (
    <button
      onClick={handleClick}
      className={isFollowing ? 'unfollow-btn' : 'follow-btn'}
    >
      {isFollowing ? 'Unfollow' : 'Follow'}
    </button>
  )
}
