import { Link } from '@redwoodjs/router'

interface LinkItemProps {
  linkClass?: string
  path: string | (() => string)
  name: string
  handleClick?: () => void
}

const LinkItem = ({
  linkClass,
  path,
  name,
  handleClick = () => {},
}: LinkItemProps) => {
  return (
    <li>
      {typeof path === 'string' ? (
        <a
          href={path}
          target="_blank"
          className={`whitespace-nowrap ${linkClass}`}
          rel="noopener noreferrer"
        >
          {name}
        </a>
      ) : (
        <Link className={linkClass} onClick={handleClick} to={path()}>
          {name}
        </Link>
      )}
    </li>
  )
}

export { LinkItem }
