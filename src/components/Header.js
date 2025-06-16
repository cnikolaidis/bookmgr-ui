import { useNavigate } from 'react-router-dom';

const App = () =>
{
    const navigate = useNavigate();

    return (
        <div style={{ justifyItems: 'center' }}>
            <p style={{ fontSize: '32px', fontWeight: 'bold', cursor: 'pointer' }} onClick={() => navigate('/')}>Διαχείριση Βιβλίων / Συγγραφέων</p>
            <br/>
            <button onClick={() => navigate('/books')}>Books</button>
            <button onClick={() => navigate('/authors')}>Authors</button>
            <br/>
            <br/>
        </div>
    );
}

export default App;