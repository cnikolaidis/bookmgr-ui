import SelectableTable from '../components/SelectableTable';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const EditBook = () => {
	const navigate = useNavigate();

	const { isbn } = useParams();
	const isNewBook = isbn === undefined;
	const [loading, setLoading] = useState(true);
	const [authors, setAuthors] = useState([]);
	const [selectedAuthors, setSelectedAuthors] = useState([]);

	const [form, setForm] = useState({
		isbn: isbn,
		title: '',
		category: '',
		publicationYear: '',
		authorIds: []
	});

	useEffect(() => {
		axios.get('http://localhost:8080/authors')
			.then(r => setAuthors(r.data))
			.catch(e => console.error(e));
		if (isNewBook) {
			setLoading(false);
		}
		else {
			axios.get(`http://localhost:8080/books/${isbn}`)
				.then(res => {
					const { isbn, title, category, publicationYear, authors } = res.data;
					setForm({ isbn, title, category, publicationYear, authorIds: authors.map(x => x.id) });
					setLoading(false);
				})
				.catch(err => console.error(err));
		}
	}, [isNewBook, isbn]);

	const handleChange = (e) => {
		setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		form.authorIds = selectedAuthors;
		if (isNewBook) {
			axios.post(`http://localhost:8080/books`, form)
				.then(() => navigate('/books'))
				.catch(err => alert(err.response.data.message));
		}
		else {
			axios.put(`http://localhost:8080/books`, form)
				.then(() => navigate('/books'))
				.catch(err => alert(err.response.data.message));
		}
	};

	if (loading) return <p>Φόρτωση...</p>;

	return (
		<div>
			<p style={{ textAlign: 'center', fontSize: '20px', fontWeight: 'bold', marginBottom: '40px' }}>{ isNewBook ? 'Προσθήκη Βιβλίου' : 'Επεξεργασία Βιβλίου' }</p>
			<form onSubmit={handleSubmit}>
				<div style={{ display: 'flex', justifySelf: 'center' }}>
					<div style={{ padding: '5px' }}>
						<label>ISBN</label>
						<input
							type="text"
							name="isbn"
							value={form.isbn}
							onChange={handleChange}
							readOnly={!isNewBook}
							required/>
					</div>
					<div style={{ padding: '5px' }}>
						<label>Τίτλος</label>
						<input
							type="text"
							name="title"
							value={form.title}
							onChange={handleChange}
							required/>
					</div>
					<div style={{ padding: '5px' }}>
						<label>Κατηγορία</label>
						<input
							type="text"
							name="category"
							value={form.category}
							onChange={handleChange}/>
					</div>
					<div style={{ padding: '5px' }}>
						<label>Έτος Έκδοσης</label>
						<input
							type="number"
							name="publicationYear"
							value={form.publicationYear}
							onChange={handleChange}
							required/>
					</div>
				</div>
				<SelectableTable
					data={authors}
					selected={form.authorIds}
					columns={[ { key: 'name', label: 'Name' }, { key: 'nationality', label: 'Nationality' }, { key: 'dateOfBirth', label: 'Birth Date' } ]}
					onSelectionChange={setSelectedAuthors}/>
				<div style={{ justifySelf: 'center' }}>
					<button type="submit">Αποθήκευση</button>
				</div>
			</form>
		</div>
	);
};

export default EditBook;