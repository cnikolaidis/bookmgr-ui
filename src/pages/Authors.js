import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Authors = () => {
	const navigate = useNavigate();

	const [authors, setAuthors] = useState([]);
	const [expandedAuthors, setExpandedAuthors] = useState({});

	useEffect(() => {
		loadAuthors();
	}, []);

	const loadAuthors = () => axios.get('http://localhost:8080/authors')
			.then(res => setAuthors(res.data))
			.catch(err => console.error('Error fetching authors', err));

	const toggleBooks = (authorId) => {
		if (expandedAuthors[authorId]) {
			setExpandedAuthors(prev => ({ ...prev, [authorId]: null }));
		} else {
			axios.get(`http://localhost:8080/authors/${authorId}/books`)
				.then(res => {
					setExpandedAuthors(prev => ({ ...prev, [authorId]: res.data }));
				})
				.catch(err => console.error('Error fetching books', err));
		}
	};

	const deleteAuthor = (id) => {
		if (!window.confirm(`Να διαγραφεί ο συγγραφέας με Id ${id};`)) {
			return;
		}
		axios.delete(`http://localhost:8080/authors/${id}`)
			.then(() => loadAuthors())
			.catch(e => alert(e.response.data.message));
	};

	return (
		<div>
			<p style={{ textAlign: 'center', fontSize: '20px', fontWeight: 'bold', marginBottom: '40px' }}>Λίστα Συγγραφέων</p>
			<div style={{ justifySelf: 'center' }}>
				<button onClick={() => navigate('/editAuthor')}>Προσθήκη</button>
			</div>
			<ul>
				{
					authors.map(author => (
						<li style={{ border: '1px solid black', margin: '5px' }} key={author.id}>
							<div style={{ display: 'flex' }}>
								<div style={{ display: 'flex' }}>
									<p style={{ padding: '5px' }}><b style={{ fontWeight: 'bold' }}>Όνομα:</b> {author.name}</p>
									<p style={{ padding: '5px' }}><b style={{ fontWeight: 'bold' }}>Εθνικότητα:</b> {author.nationality || 'Άγνωστη'}</p>
									<p style={{ padding: '5px' }}><b style={{ fontWeight: 'bold' }}>Ημ. Γέννησης:</b> {author.dateOfBirth || 'Άγνωστη'}</p>
								</div>
								<div style={{ flexGrow: '1' }}></div>
								<div style={{ display: 'flex' }}>
									<button onClick={() => toggleBooks(author.id)}>{expandedAuthors[author.id] ? 'Απόκρυψη Βιβλίων' : 'Δες Βιβλία'}</button>
									<button onClick={() => navigate(`/editAuthor/${author.id}`)}>Επεξεργασία</button>
									<button onClick={() => deleteAuthor(author.id)}>Διαγραφή</button>
								</div>
							</div>
							{
								expandedAuthors[author.id] && (
									<div>
										<ul>
											{expandedAuthors[author.id].length > 0 ? (
												expandedAuthors[author.id].map(book => (
													<li key={book.isbn}>
														<p style={{ margin: '5px' }}>- <span>{book.title}</span> ({book.publicationYear}) – {book.category}</p>
													</li>
												))
											) : (
												<li>Δεν υπάρχουν βιβλία.</li>
											)}
										</ul>
									</div>
								)
							}
						</li>
					))
				}
			</ul>
		</div>
	);
};

export default Authors;