import { appCopy } from '../../data/appCopy'

export default function ReadyToWatchScene({ onContinue }) {
  return (
    <div className="hb-moment">
      <h2 className="hb-heading">{appCopy.surprise.readyTitle}</h2>
      <button type="button" className="hb-btn" onClick={onContinue}>
        {appCopy.surprise.videoButtonLabel}
      </button>
    </div>
  )
}
