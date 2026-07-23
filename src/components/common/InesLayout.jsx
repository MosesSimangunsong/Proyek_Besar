import RomanticTextCursor from '../effects/RomanticTextCursor'
import AppLayout from './AppLayout'

export default function InesLayout(props) {
  return (
    <>
      <RomanticTextCursor />
      <AppLayout {...props} />
    </>
  )
}
