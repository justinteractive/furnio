export function MainMenu() {
  return (
    <aside className="w-2xs h-full flex flex-col justify-between p-6">
      <header>
        <h2>Main Menu</h2>
        <nav>
          <ul>
            <li>Dashboard</li>
            <li>Properties</li>
            <li>Items</li>
            <li>Lists</li>
            <li>People</li>
            <li>Search</li>
          </ul>
        </nav>
      </header>
      <footer>
        <nav>
          <ul>
            <li>Profile</li>
            <li>Logout</li>
          </ul>
        </nav>
      </footer>
    </aside>
  );
}