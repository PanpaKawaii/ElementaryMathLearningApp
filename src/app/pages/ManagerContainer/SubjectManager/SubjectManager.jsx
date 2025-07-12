import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteData, fetchData, postData } from '../../../../mocks/CallingAPI.js';
import SimpleButton from '../../../components/SimpleButton.jsx';
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
            const resultAddSubject = await postData('api/subject', form, token);
            console.log('resultAddSubject', resultAddSubject);
            setRefresh(p => p + 1);
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
            const resultDeleteSubject = await deleteData(`api/subject/${SubjectId}`, token);
            console.log('resultDeleteSubject', resultDeleteSubject);
            setRefresh(p => p + 1);
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
                <SimpleButton
                    width={'80px'}
                    height={'40px'}
                    radius={'8px'}
                    textcolor={'#28a745'}
                    bgcolor={'#eee'}
                    active={false}
                    onToggle={handleSubmit}
                >
                    <div className='text'>ADD</div>
                </SimpleButton>
                <SimpleButton
                    width={'80px'}
                    height={'40px'}
                    radius={'8px'}
                    textcolor={'#888'}
                    bgcolor={'#eee'}
                    active={false}
                    onToggle={() => setRefresh(p => p + 1)}
                >
                    <div className='text'>Refresh</div>
                </SimpleButton>
            </form>

            <table className='table'>
                <thead>
                    <tr>
                        {/* <th>#</th> */}
                        <th>ID</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {SUBJECTs.map((s, i) => (
                        <tr key={s.id}>
                            {/* <td className='fit-td'>#{i + 1}</td> */}
                            <td className='fit-td'>{s.id}</td>
                            <td className='fit-td'><img src={s.image} alt='subject' /></td>
                            <td>{s.name}</td>
                            <td>{s.price.toLocaleString('vi-VN')} VND</td>
                            <td className='fit-td'>
                                <div className='btn-box'>
                                    <SimpleButton
                                        width={'80px'}
                                        height={'40px'}
                                        radius={'8px'}
                                        textcolor={'#fb8b24'}
                                        bgcolor={'#eee'}
                                        active={false}
                                        onToggle={() => openEditModal(s)}
                                    >
                                        <div className='text'>EDIT</div>
                                    </SimpleButton>
                                    <SimpleButton
                                        width={'80px'}
                                        height={'40px'}
                                        radius={'8px'}
                                        textcolor={'#dc3545'}
                                        bgcolor={'#eee'}
                                        active={false}
                                        onToggle={() => handleDelete(s.id)}
                                    >
                                        <div className='text'>DELETE</div>
                                    </SimpleButton>
                                    <Link
                                        to={`./${s.id}/chapter`}
                                        state={s.chapters}
                                    >
                                        <SimpleButton
                                            width={'80px'}
                                            height={'40px'}
                                            radius={'8px'}
                                            textcolor={'#007bff'}
                                            bgcolor={'#eee'}
                                            active={false}
                                        >
                                            <div className='text'>VIEW</div>
                                        </SimpleButton>
                                    </Link>
                                    {/* <Button
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
                                    </Link> */}
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
                    setRefresh={setRefresh}
                />
            )}
        </div>
    )
}
