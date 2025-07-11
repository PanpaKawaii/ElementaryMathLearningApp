import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteData, fetchData, postData } from '../../../../mocks/CallingAPI.js';
import Button from '../../../components/Button.jsx';
import { useAuth } from '../../../hooks/AuthContext/AuthContext.jsx';
import Loading from '../../../layouts/Loading/Loading.jsx';
import EditSubjectModal from './EditSubjectModal.jsx';
import './ManagerStyle.css';

export default function SubjectManager() {
    const { user } = useAuth();

    const [SUBJECTs, setSUBJECTs] = useState([]);
    const [form, setForm] = useState({ name: '', image: '', price: '' });
    const [editingSubject, setEditingSubject] = useState(null);
    const [Refresh, setRefresh] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // const token = user?.token;
        const token = '';
        const fetchDataAPI = async () => {
            try {
                const subjectData = await fetchData('api/subject', token);
                console.log('subjectData', subjectData);
                setSUBJECTs(subjectData);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchDataAPI();
    }, [user, Refresh]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // const token = user?.token;
        const token = '';
        try {
            setLoading(true);
            // const resultAddSubject = await postData('api/subject', form, token);
            // console.log('resultAddSubject', resultAddSubject);
            console.log('resultDeleteSubject');
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (SubjectId) => {
        // const token = user?.token;
        const token = '';
        try {
            setLoading(true);
            // const resultDeleteSubject = await deleteData(`api/subject/${SubjectId}`, token);
            // console.log('resultDeleteSubject', resultDeleteSubject);
            console.log('resultDeleteSubject');
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    const openEditModal = (subject) => { setEditingSubject(subject); };
    const closeEditModal = () => { setEditingSubject(null); };

    if (loading) return <Loading Size={'Large'} />
    return (
        <div className='subjectmanager-container learn-container'>
            <div className='title'>Subject Manager</div>
            <form onSubmit={handleSubmit} className='add-form'>
                <input name='name' placeholder='Name' value={form.name} onChange={handleChange} required />
                <input name='image' placeholder='Image URL' value={form.image} onChange={handleChange} required />
                <input name='price' placeholder='Price' value={form.price} onChange={handleChange} required />
                <Button
                    width={'80px'}
                    height={'32px'}
                    border={'6px'}
                    radius={'8px'}
                    maincolor={'correct'}
                    active={false}
                    onToggle={handleSubmit}
                >
                    <div className='text'>ADD</div>
                </Button>
                <Button
                    width={'100px'}
                    height={'32px'}
                    border={'6px'}
                    radius={'8px'}
                    maincolor={'correct'}
                    active={false}
                    onToggle={() => setRefresh(p => p + 1)}
                >
                    <div className='text'>Refresh</div>
                </Button>
            </form>

            <table className='table'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Image</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {SUBJECTs.map((s) => (
                        <tr key={s.id}>
                            <td>{s.id}</td>
                            <td>{s.name}</td>
                            <td><img src={s.image} alt='subject' width='80' /></td>
                            <td>{s.price.toLocaleString('vi-VN')} VND</td>
                            <td>
                                <div className='btn-box'>
                                    <Button
                                        width={'80px'}
                                        height={'40px'}
                                        border={'6px'}
                                        radius={'12px'}
                                        maincolor={'edit'}
                                        active={false}
                                        onToggle={() => openEditModal(s)}
                                    >
                                        <div className='text'>EDIT</div>
                                    </Button>
                                    <Button
                                        width={'80px'}
                                        height={'40px'}
                                        border={'6px'}
                                        radius={'12px'}
                                        maincolor={'incorrect'}
                                        active={false}
                                        onToggle={() => handleDelete(s.id)}
                                    >
                                        <div className='text'>DELETE</div>
                                    </Button>
                                    <Link
                                        to={`./${s.id}/chapter`}
                                        state={s.chapters}
                                    >
                                        <Button
                                            width={'80px'}
                                            height={'40px'}
                                            border={'6px'}
                                            radius={'12px'}
                                            maincolor={'correct'}
                                            active={false}
                                        >
                                            <div className='text'>VIEW</div>
                                        </Button>
                                    </Link>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {editingSubject && (
                <EditSubjectModal
                    subject={editingSubject}
                    onClose={closeEditModal}
                />
            )}
        </div>
    )
}
