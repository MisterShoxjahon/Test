import React, { useState, useEffect } from 'react'
import { facts } from '../data/facts'

const Factcard = () => {
  const [fact, setFact] = useState('')
  const [fade, setFade] = useState(false)
  const [seenFacts, setSeenFacts] = useState([])
  const [allSeen, setAllSeen] = useState(false)

  const getRandomFact = () => {
    const unseenFacts = facts.filter(f => !seenFacts.includes(f))
    if (unseenFacts.length === 0) {
      setAllSeen(true)
      return
    }
    const random = Math.floor(Math.random() * unseenFacts.length)
    setFact(unseenFacts[random])
    setSeenFacts(prev => [...prev, unseenFacts[random]])
    if (unseenFacts.length === 1) {
      setAllSeen(true)
    }
  }

  useEffect(() => {
    getRandomFact()
  }, [])

  const handleNewFact = () => {
    if (allSeen) return
    setFade(true)
    setTimeout(() => {
      getRandomFact()
      setFade(false)
    }, 300)
  }

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 transition-colors duration-500`}>
      <div className="mb-6 text-gray-400 text-lg font-medium">
        You have seen <span className="text-indigo-400 font-bold">{seenFacts.length}</span> out of <span className="text-indigo-400 font-bold">{facts.length}</span> facts
      </div>
      <div className={`w-full max-w-md p-8 rounded-3xl shadow-2xl border border-gray-700 bg-gradient-to-br from-gray-800 to-gray-900 transition-all duration-300 ${fade ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
        <h2 className="text-3xl font-bold text-indigo-400 mb-4 text-center drop-shadow">Did you know?</h2>
        <p className="text-lg text-gray-200 mb-8 text-center min-h-[56px] transition-colors duration-200">{fact}</p>
        <button
          className="w-full py-3 px-6 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-semibold text-lg shadow-lg hover:from-indigo-400 hover:to-blue-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"   
          onClick={handleNewFact}
          disabled={allSeen}
        >
          {allSeen ? 'You have seen all facts!' : 'Show me another fact'}
        </button>
      </div>
    </div>
  )
}

export default Factcard
