import CakeCandle from './CakeCandle'

export default function MomentReveal({ heading, body, festive = false }) {
  return (
    <div className="hb-moment">
      <h2 className="hb-heading">{heading}</h2>
      <p className="hb-body">{body}</p>
      {festive ? <CakeCandle /> : null}
    </div>
  )
}
