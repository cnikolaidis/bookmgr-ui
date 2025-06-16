import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Books = () => {
	const navigate = useNavigate();

	const [books, setBooks] = useState([]);
	const [expandedBooks, setExpandedBooks] = useState({});

	useEffect(() => {
		loadBooks();
	}, []);

	const loadBooks = () => axios.get('http://localhost:8080/books')
			.then(res => setBooks(res.data))
			.catch(err => console.error('Error fetching books', err));

	const toggleAuthors = (isbn) => {
		if (expandedBooks[isbn]) {
			setExpandedBooks(prev => ({ ...prev, [isbn]: null }));
		} else {
			axios.get(`http://localhost:8080/books/${isbn}/authors`)
				.then(res => {
					setExpandedBooks(prev => ({ ...prev, [isbn]: res.data }));
				})
				.catch(err => console.error('Error fetching authors', err));
		}
	};

	const deleteBook = (isbn) => {
		if (!window.confirm(`Να διαγραφεί το βιβλίο με ISBN ${isbn};`)) {
			return;
		}
		axios.delete(`http://localhost:8080/books/${isbn}`)
			.then(() => loadBooks())
			.catch(e => alert(e.response.data.message));
	};

	return (
		<div>
			<p style={{ textAlign: 'center', fontSize: '20px', fontWeight: 'bold', marginBottom: '40px' }}>Λίστα Βιβλίων</p>
			<div style={{ justifySelf: 'center' }}>
				<button onClick={() => navigate('/editBook')}>Προσθήκη</button>
			</div>
			<ul>
				{
					books.map(book => (
						<li style={{ border: '1px solid black', margin: '5px' }} key={book.isbn}>
							<div style={{ display: 'flex' }}>
								<div style={{ display: 'flex' }}>
									<p style={{ padding: '5px' }}><b style={{ fontWeight: 'bold' }}>ISBN:</b> {book.isbn}</p>
									<p style={{ padding: '5px' }}><b style={{ fontWeight: 'bold' }}>Τίτλος:</b> {book.title}</p>
									<p style={{ padding: '5px' }}><b style={{ fontWeight: 'bold' }}>Κατηγορία:</b> {book.category || '–'}</p>
									<p style={{ padding: '5px' }}><b style={{ fontWeight: 'bold' }}>Έτος Έκδοσης:</b> {book.publicationYear || '–'}</p>
								</div>
								<div style={{ flexGrow: '1' }}></div>
								<div style={{ display: 'flex' }}>
									<button onClick={() => toggleAuthors(book.isbn)}>{expandedBooks[book.isbn] ? 'Απόκρυψη Συγγραφέων' : 'Δες Συγγραφείς'}</button>
									<button onClick={() => navigate(`/editBook/${book.isbn}`)}>Επεξεργασία</button>
									<button onClick={() => deleteBook(book.isbn)}>Διαγραφή</button>
								</div>
							</div>
							{
								expandedBooks[book.isbn] && (
									<div>
										<ul>
											{expandedBooks[book.isbn].length > 0 ? (
												expandedBooks[book.isbn].map(author => (
													<li key={author.id}>
														<p style={{ margin: '5px' }}>- <span>{author.name}</span> {author.nationality && ` (${author.nationality})`}</p>
													</li>
												))
											) : (
												<li>Δεν υπάρχουν συγγραφείς.</li>
											)}
										</ul>
									</div>
								)
							}
						</li>)
					)
				}
			</ul>
		</div>
	);
};

export default Books;