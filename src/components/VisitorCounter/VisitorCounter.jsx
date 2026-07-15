import { FaUserGroup } from 'react-icons/fa6'
import useVisitorCount from '../../hooks/useVisitorCount'
import './visitorcounter.css'

export default function VisitorCounter() {
  const visitors = useVisitorCount()
  return (
    <div className="visitor-badge" title={`${visitors.toLocaleString()} total site visitors`}>
      <span className="visitor-live-dot" />
      <FaUserGroup size={12} />
      <span className="visitor-count">{visitors.toLocaleString()}</span>
      <span className="visitor-label">visitors</span>
    </div>
  )
}
