import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import NavBar     from '../components/NavBar'
import GameArtwork from '../components/GameArtwork'
import GameCover  from '../components/GameCover'
import GameTitle  from '../components/GameTitle'
import GameYear   from '../components/GameYear'
import GameSummary from '../components/GameSummary'
import GameGenres from '../components/GameGenres'
import GameThemes from '../components/GameThemes'
import GameLogForm  from '../components/GameLogForm'
import GameReviews  from '../components/GameReviews'

export default function GameDetails() {
  const navigate = useNavigate()
  const { id }   = useParams()

  return (
    <div className="bg-[#1e1e1e] text-[#e0e0e0] min-h-screen">
      <NavBar />
      <div className="w-full">
        <GameArtwork />
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-[250px_1fr] gap-8">
        <div className="sticky top-24">
          <GameCover />
        </div>

        <div className="space-y-8">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold text-[#8f5ed3]">
                <GameTitle />
              </h1>
              <h3 className="text-lg">{<GameYear />}</h3>
              <div className="prose prose-invert">
                <GameSummary />
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[#8f5ed3] border-b border-[#e0e0e0] pb-1">
                  Genres:
                </h3>
                <GameGenres />
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[#8f5ed3] border-b border-[#e0e0e0] pb-1">
                  Themes:
                </h3>
                <GameThemes />
              </div>
            </div>

            <div className="bg-[#2a2a2a] p-6 rounded-lg shadow-lg">
              <GameLogForm />
            </div>
          </div>

          <div>
            <h4 className="text-2xl font-semibold text-[#8f5ed3] border-b border-[#e0e0e0] pb-1">
              Game Reviews:
            </h4>
            <div className="mt-4">
              <GameReviews />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
