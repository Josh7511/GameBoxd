import React, { useEffect, useState } from 'react'

export default function FollowButton({ targetUserId }) {
  const [isFollowing, setIsFollowing] = useState(false)
  const [loading, setLoading]         = useState(true)

  useEffect(() => {
    async function check() {
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
        setIsFollowing(followers.some(f => f.follower === me.id))
      } catch {
        /* ignore */
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
      await fetch(`http://localhost:8000/api/unfollow/${targetUserId}/`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      })
      setIsFollowing(false)
    } else {
      await fetch('http://localhost:8000/api/follow/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization:  `Bearer ${token}`
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
      className={`h-7 w-24 text-sm rounded flex items-center justify-center ml-5 mt-10 transition-colors duration-200 ${
        isFollowing
          ? 'bg-accent-hover hover:bg-accent text-text'
          : 'bg-accent hover:bg-accent-hover text-text'
      }`}
    >
      {isFollowing ? 'Unfollow' : 'Follow'}
    </button>
  )
}
