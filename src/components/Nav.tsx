import { Link } from 'react-router-dom';

const Nav = () => {
  // TODO: Add necessary code to display the navigation bar and link between the pages
  return (
   // <div>Nav</div>
  <div>
<nav className="nav">
  <ul style={{ display: 'flex', gap: '1rem', listStyle: 'none' }}>
    <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
    <li className="nav-item"><Link className="nav-link" to="/SavedCandidates">Potential Candidates</Link></li>
  </ul>
</nav>
  </div> 
  );
};

export default Nav;
