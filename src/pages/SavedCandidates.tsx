// const SavedCandidates = () => {
//   return (
//     <>
//       <h1>Potential Candidates</h1>
//     </>
//   );
// };

// export default SavedCandidates;

import { useEffect, useState } from 'react';
import { Candidate } from '../interfaces/Candidate.interface';

const SavedCandidates = () => {
  const [saved, setSaved] = useState<Candidate[]>([]);

  useEffect(() => {
    const data = localStorage.getItem('savedCandidates');
    if (data) {
      setSaved(JSON.parse(data));
    }
  }, []);

  if (saved.length === 0) {
    return <h2>No candidates have been accepted</h2>;
  }

  return (
    <table className="table">
<thead>
  <tr>
    <th>Image</th>
    <th>Name</th>
    <th>Location</th>
    <th>Email</th>
    <th>Company</th>
    <th>Bio</th>
    <th>Reject</th>
  </tr>
</thead>
<tbody>
  {saved.map((c, i) => (
    <tr key={i}>
      <td><img src={c.avatar_url} width="50" /></td>
      <td>{c.name} (<i>{c.login}</i>)</td>
      <td>{c.location}</td>
      <td>{c.email}</td>
      <td>{c.company}</td>
      <td>{c.bio}</td>
      <td>
        <button className="reject" onClick={() => {
          const updatedSaved = saved.filter((_, index) => index !== i);
          setSaved(updatedSaved);
          localStorage.setItem('savedCandidates', JSON.stringify(updatedSaved));
        }}>❌</button>
      </td>
    </tr>
  ))}
</tbody>
    </table>
  );
};

export default SavedCandidates;