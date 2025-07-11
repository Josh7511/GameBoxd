import React, { useState, useEffect } from 'react'
import { useNavigate }                 from 'react-router-dom'
import NavBar                          from '../components/NavBar'
import placeholderAvatar               from '../assets/images/placeholder-avatar.png'
import placeholderCover                from '../assets/images/placeholder.png'

export default function EditProfile() {
  const navigate = useNavigate()
  const [form, setForm]           = useState({ email:'', bio:'', favorite_games:'' })
  const [avatarFile, setAvatarFile] = useState(null)
  const [preview, setPreview]       = useState(placeholderAvatar)
  const [error, setError]           = useState(null)
  const [favIds, setFavIds]         = useState(['','','',''])
  const [favGamesData, setFavGamesData] = useState([{}, {}, {}, {}])
  const [showModal, setShowModal]   = useState(false)
  const [editingSlot, setEditingSlot] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [suggestions, setSuggestions] = useState([])

  useEffect(() => {
    const token = localStorage.getItem('access_token')
    fetch('http://localhost:8000/api/profile/', {
      headers: { Authorization:`Bearer ${token}` }
    })
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(data => {
        const arr = (data.favorite_games||[]).slice(0,4)
        while(arr.length<4) arr.push('')
        setFavIds(arr)
        setForm({
          email: data.email||'',
          bio:   data.bio  ||'',
          favorite_games: JSON.stringify(arr.filter(Boolean))
        })
        setPreview(
          data.avatar
            ? `http://localhost:8000${data.avatar}`
            : placeholderAvatar
        )
      })
      .catch(()=> setError('Failed to load profile'))
  }, [])

  useEffect(() => {
    favIds.forEach((id, idx) => {
      if(!id) {
        setFavGamesData(p=>{ let c=[...p]; c[idx]={}; return c })
        return
      }
      fetch(`http://localhost:8000/api/search-by-id/?id=${id}`)
        .then(r=>r.json())
        .then(data=>{
          if(data.length){
            const g = data[0]
            setFavGamesData(p=>{
              let c=[...p]
              c[idx] = {
                id: g.id,
                name: g.name,
                coverUrl: g.cover
                  ? `https:${g.cover.url.replace('t_thumb','t_cover_big')}`
                  : null
              }
              return c
            })
          }
        })
        .catch(()=>{})
    })
  }, [favIds])

  useEffect(() => {
    if(!showModal || !searchTerm){
      setSuggestions([])
      return
    }
    fetch(`http://localhost:8000/api/search-igdb/?query=${encodeURIComponent(searchTerm)}`)
      .then(r=>r.json())
      .then(games=> setSuggestions(games.slice(0,5)))
      .catch(()=> setSuggestions([]))
  }, [searchTerm, showModal])

  const handleFile = e => {
    const file = e.target.files[0]
    setAvatarFile(file)
    setPreview(URL.createObjectURL(file))
  }
  const handleChange = e => {
    const { name, value } = e.target
    setForm(f=>({...f,[name]:value}))
  }
  const openModal = idx => {
    setEditingSlot(idx)
    setSearchTerm('')
    setShowModal(true)
  }
  const closeModal = () => {
    setShowModal(false)
    setEditingSlot(null)
    setSearchTerm('')
    setSuggestions([])
  }
  const pickSuggestion = game => {
    const updated = [...favIds]
    updated[editingSlot] = game.id
    setFavIds(updated)
    setForm(f=>({
      ...f,
      favorite_games: JSON.stringify(updated.filter(Boolean))
    }))
    closeModal()
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setError(null)
    const token = localStorage.getItem('access_token')
    const formData = new FormData()
    formData.append('email', form.email)
    formData.append('bio',   form.bio)
    formData.append('favorite_games', form.favorite_games)
    if(avatarFile) formData.append('avatar', avatarFile)

    const res = await fetch('http://localhost:8000/api/profile/edit/',{
      method:'PATCH',
      headers:{ Authorization:`Bearer ${token}` },
      body: formData
    })
    if(res.ok){
      navigate('/profile')
    } else {
      let text = await res.text()
      let msg = text
      if(res.headers.get('Content-Type')?.includes('application/json')){
        const j = JSON.parse(text)
        msg = Object.values(j).flat().join(' ')
      }
      setError(`Error ${res.status}: ${msg}`)
    }
  }

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-[#1e1e1e] text-[#e0e0e0] py-12 px-4">
        <div className="max-w-xl mx-auto bg-[#2a2a2a] p-6 rounded-xl shadow-lg space-y-6">
          <h1 className="text-2xl font-bold text-[#8f5ed3] text-center">Edit Profile</h1>
          {error && <p className="text-[#ff6b6b] text-center">{error}</p>}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block font-semibold mb-1">Avatar</label>
              <div className="flex justify-center mb-2">
                <img
                  src={preview}
                  alt="Avatar preview"
                  className="w-24 h-24 rounded-full object-cover"
                />
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleFile}
                className="w-full text-sm text-[#e0e0e0] file:bg-[#444] file:border file:border-[#555] file:rounded file:px-3 file:py-1"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full bg-[#333] border border-[#444] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#8f5ed3]"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Bio</label>
              <textarea
                name="bio"
                value={form.bio}
                onChange={handleChange}
                className="w-full bg-[#333] border border-[#444] rounded px-3 py-2 h-24 resize-y focus:outline-none focus:ring-2 focus:ring-[#8f5ed3]"
              />
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-2">Favorite Games</h2>
              <div className="grid grid-cols-4 gap-3">
                {favGamesData.map((game, idx) => (
                  <div
                    key={idx}
                    className="relative w-full pt-[100%] cursor-pointer"
                    onClick={()=>openModal(idx)}
                  >
                    <img
                      src={game.coverUrl||placeholderCover}
                      alt={game.name||`Slot ${idx+1}`}
                      className="absolute inset-0 w-full h-full object-cover rounded-md border border-[#444]"
                    />
                  </div>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#8f5ed3] hover:bg-[#7d4fc4] text-[#e0e0e0] py-2 rounded font-bold transition"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>

      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-[#2a2a2a] p-6 rounded-xl shadow-xl w-full max-w-md"
            onClick={e=>e.stopPropagation()}
          >
            <input
              type="text"
              placeholder="Search games..."
              value={searchTerm}
              onChange={e=>setSearchTerm(e.target.value)}
              autoFocus
              className="w-full bg-[#333] border border-[#444] rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-[#8f5ed3]"
            />
            {suggestions.length>0 && (
              <ul className="space-y-2 max-h-60 overflow-y-auto">
                {suggestions.map(g=>(
                  <li
                    key={g.id}
                    onClick={()=>pickSuggestion(g)}
                    className="flex items-center gap-2 p-2 rounded hover:bg-[#444] cursor-pointer"
                  >
                    <img
                      src={g.cover
                        ? `https:${g.cover.url.replace('t_thumb','t_cover_small')}`
                        : placeholderCover}
                      alt={g.name}
                      className="w-10 h-10 object-cover rounded"
                    />
                    <span>{g.name}</span>
                  </li>
                ))}
              </ul>
            )}
            <button
              onClick={closeModal}
              className="mt-4 block text-center text-[#8f5ed3] hover:text-[#7d4fc4] font-semibold"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  )
}
