export function NavigationMenu({ children, className = "" }) {
  return <nav className={className}>{children}</nav>
}

export function NavigationMenuList({ children, className = "" }) {
  return <ul className={className}>{children}</ul>
}

export function NavigationMenuItem({ children, className = "" }) {
  return <li className={className}>{children}</li>
}

export function NavigationMenuLink({ children, className = "", ...props }) {
  return <a className={className} {...props}>{children}</a>
}

export function NavigationMenuTrigger({ children, className = "" }) {
  return <button className={className}>{children}</button>
}

export default { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, NavigationMenuTrigger }
