import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const EditAuthor = () => {
	const navigate = useNavigate();

	const { id } = useParams();
	const isNewAuthor = id === undefined;
	const [loading, setLoading] = useState(true);
	const [, setBooks] = useState([]);
	const [selectedBooks] = useState([]);

	const [form, setForm] = useState({
		id: 0,
		name: '',
		nationality: '',
		dateOfBirth: '',
		bookIsbns: []
	});

	useEffect(() => {
		axios.get('http://localhost:8080/books')
			.then(r => setBooks(r.data))
			.catch(e => console.error(e));
		if (isNewAuthor) {
			setLoading(false);
		}
		else {
			axios.get(`http://localhost:8080/authors/${id}`)
				.then(res => {
					const { id, name, nationality, dateOfBirth, bookIsbns } = res.data;
					setForm({ id, name, nationality, dateOfBirth, bookIsbns });
					setLoading(false);
				})
				.catch(err => console.error(err));
		}
	}, [isNewAuthor, id]);

	const handleChange = (e) => {
		setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		form.bookIsbns = selectedBooks;
		if (isNewAuthor) {
			axios.post(`http://localhost:8080/authors`, form)
				.then(() => navigate('/authors'))
				.catch(err => alert(err.response.data.message));
		}
		else {
			axios.put(`http://localhost:8080/authors`, form)
				.then(() => navigate('/authors'))
				.catch(err => alert(err.response.data.message));
		}
	};

	if (loading) return <p>Φόρτωση...</p>;

	return (
		<div>
			<p style={{ textAlign: 'center', fontSize: '20px', fontWeight: 'bold', marginBottom: '40px' }}>{ isNewAuthor ? 'Προσθήκη Συγγραφέα' : 'Επεξεργασία Συγγραφέα' }</p>
			<form onSubmit={handleSubmit}>
				<div style={{ display: 'flex', justifySelf: 'center' }}>
					<input type="hidden" name="id" value={form.id}/>
					<div style={{ padding: '5px' }}>
						<label>Όνομα</label>
						<input
							type="text"
							name="name"
							value={form.name}
							onChange={handleChange}
							required/>
					</div>
					<div style={{ padding: '5px' }}>
						<label className="block font-semibold">Εθνικότητα</label>
						<input
							type="text"
							name="nationality"
							value={form.nationality}
							onChange={handleChange}/>
					</div>
					<div style={{ padding: '5px' }}>
						<label className="block font-semibold">Ημερομηνία Γέννησης</label>
						<input
							type="date"
							name="dateOfBirth"
							value={form.dateOfBirth || ''}
							onChange={handleChange}/>
					</div>
				</div>
				<div style={{ justifySelf: 'center' }}>
					<button type="submit">Αποθήκευση</button>
				</div>
			</form>
		</div>
	);
};

export default EditAuthor;