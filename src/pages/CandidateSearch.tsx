import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface'; // Importar la interfaz Candidate

// const CandidateSearch = () => {
//   return <h1>CandidateSearch</h1>;
// };

// export default CandidateSearch;

const CandidateSearch = () => {
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [usernameIndex, setUsernameIndex] = useState(0);
  const [candidateList, setCandidateList] = useState<string[]>([]);

  //const usernames = ['octocat', 'torvalds', 'gaearon', 'sindresorhus']; // ejemplo

  const fetchCandidateSet = async () => {
    try {
      const data = await searchGithub();
      console.log("Data: ", data)
      const usernames = data.map((user: any) => user.login);
      setCandidateList(usernames);
      await fetchNextCandidate();
    } catch (error) {
      console.error('Error fetching candidates:', error);
      // return [];
    }
  }

  const fetchNextCandidate = async () => {
    if (usernameIndex >= candidateList.length) {
      setCandidate(null);
      return;
    }
    let username = candidateList[usernameIndex];
    console.log("Username: ", username)
    if(!username) {
      username = 'octocat';
    }
    const data = await searchGithubUser(username);
    setCandidate(data);
    setUsernameIndex(prev => prev + 1);
  };

  const handleAccept = () => {
    if (candidate) {
      const saved = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
      localStorage.setItem('savedCandidates', JSON.stringify([...saved, candidate]));
    }
    fetchNextCandidate();
  };

  const handleReject = () => {
    fetchNextCandidate();
  };

  useEffect(() => {
    fetchCandidateSet();
    fetchNextCandidate();
  }, []);

  if (!candidate) {
    return <h2>No more candidates available</h2>;
  }

  return (
    <div className="card">
      <img src={candidate.avatar_url} alt={candidate.name} width="100" />
      <h2>{candidate.name} (<i>{candidate.login}</i>)</h2>
      <p>Location: {candidate.location}</p>
      <p>Email: <a href={`mailto:${candidate.email}`}>{candidate.email}</a></p>
      <p>Company: {candidate.company}</p>
      <p>Bio: {candidate.bio}</p>
      <div>
        <button onClick={handleReject}>❌</button>
        <button onClick={handleAccept}>✅</button>
      </div>
    </div>
  );
};

export default CandidateSearch;