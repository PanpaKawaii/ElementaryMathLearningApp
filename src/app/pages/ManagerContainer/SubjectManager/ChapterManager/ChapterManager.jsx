import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { deleteData, fetchData, postData } from '../../../../../mocks/CallingAPI.js';
import ConfirmDialog from '../../../../components/ConfirmDialog.jsx';
import SimpleButton from '../../../../components/SimpleButton.jsx';
import { useAuth } from '../../../../hooks/AuthContext/AuthContext.jsx';
import Loading from '../../../../layouts/Loading/Loading.jsx';
import '../ManagerStyle.css';
import EditChapterModal from './EditChapterModal.jsx';

export default function ChapterManager() {
    const { user } = useAuth();
    const location = useLocation();
    const subjectId = useParams().subject;
    const chapter = location.state;
    console.log('chapter', chapter);

    const [CHAPTERs, setCHAPTERs] = useState([]);
    const [form, setForm] = useState({ name: '', number: '', subjectId: subjectId });
    const [editing, setEditing] = useState(null);
    const [confirm, setConfirm] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [Refresh, setRefresh] = useState(0);
    const [GetAll, setGetAll] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // const token = user?.token;
        const token = '';
        const fetchDataAPI = async () => {
            try {
                setLoading(true);
                const chapterData = await fetchData('api/chapter', token);
                console.log('chapterData', chapterData);
                if (!GetAll) setCHAPTERs(chapterData.filter(chapter => chapter.subjectId == subjectId));
                else setCHAPTERs(chapterData);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchDataAPI();
    }, [user, Refresh, GetAll]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // const token = user?.token;
        const token = '';
        try {
            setLoading(true);
            form.number = Math.abs(form.number);
            const resultAddChapter = await postData('api/chapter', form, token);
            console.log('resultAddChapter', resultAddChapter);
            setForm({ name: '', number: '', subjectId: subjectId });
            setRefresh(p => p + 1);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteClick = (id) => {
        setSelectedId(id);
        setConfirm(true);
    };

    const handleDelete = async () => {
        // const token = user?.token;
        const token = '';
        try {
            setLoading(true);
            const resultDeleteChapter = await deleteData(`api/chapter/${selectedId}`, token);
            console.log('resultDeleteChapter', resultDeleteChapter);
            setRefresh(p => p + 1);
            setConfirm(false);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    const openEditModal = (data) => { setEditing(data); };
    const closeEditModal = () => { setEditing(null); };

    if (loading) return <Loading Size={'Large'} />
    return (
        <div className='chaptermanager-container manager-container'>
            <div className='title'>Chapter Manager</div>
            <form onSubmit={handleSubmit} className='add-form'>
                <input name='name' placeholder='Name' value={form.name} onChange={handleChange} required />
                <input name='number' placeholder='Number' value={form.number} onChange={handleChange} required />
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
                    textcolor={'#007bff'}
                    bgcolor={'#eee'}
                    active={false}
                    onToggle={() => setRefresh(p => p + 1)}
                >
                    <div className='text'>Refresh</div>
                </SimpleButton>
                <SimpleButton
                    width={'100px'}
                    height={'40px'}
                    radius={'8px'}
                    textcolor={GetAll ? '#fb8b24' : '#888'}
                    bgcolor={'#eee'}
                    active={false}
                    onToggle={() => setGetAll(p => !p)}
                >
                    <div className='text'>Get All <i className={`fa-solid fa-${GetAll ? 'check' : 'xmark'}`}></i></div>
                </SimpleButton>
            </form>

            <div className='table-container'>
                <table className='table'>
                    <tbody>
                        {CHAPTERs.map((data, i) => (
                            <tr key={data.id}>
                                <td className='fit-td'><div className='index convex'>#{i + 1}</div></td>
                                <td><div className='number convex'>No.{data.number}</div></td>
                                <td><div className='id convex'>ID: {data.id}</div></td>
                                <td><div className='name convex'>Chapter: {data.name}</div></td>
                                <td className='fit-td'>
                                    <div className='btn-box'>
                                        <div className='show-btn'>
                                            <SimpleButton
                                                width={'76px'}
                                                height={'32px'}
                                                radius={'8px'}
                                                textcolor={'#888'}
                                                bgcolor={'#eee'}
                                                active={false}
                                                onToggle={() => setSelectedId(p => p == data.id ? null : data.id)}
                                            >
                                                <i className={`fa-solid fa-${selectedId == data.id ? 'xmark' : 'ellipsis'}`}></i>
                                            </SimpleButton>
                                            {selectedId == data.id &&
                                                <div className='hidden-btn'>
                                                    <Link
                                                        to={`./${data.id}/topic`}
                                                    // state={data.topics}
                                                    >
                                                        <SimpleButton
                                                            width={'32px'}
                                                            height={'32px'}
                                                            radius={'8px'}
                                                            textcolor={'#007bff'}
                                                            bgcolor={'#eee'}
                                                            active={false}
                                                        >
                                                            <i className='fa-solid fa-magnifying-glass'></i>
                                                        </SimpleButton>
                                                    </Link>
                                                    <Link
                                                        to={`./${data.id}/topic`}
                                                    // state={data.topics}
                                                    >
                                                        <SimpleButton
                                                            width={'32px'}
                                                            height={'32px'}
                                                            radius={'8px'}
                                                            textcolor={'#8b4513'}
                                                            bgcolor={'#eee'}
                                                            active={false}
                                                        >
                                                            <i className='fa-solid fa-book'></i>
                                                        </SimpleButton>
                                                    </Link>
                                                    <SimpleButton
                                                        width={'32px'}
                                                        height={'32px'}
                                                        radius={'8px'}
                                                        textcolor={'#fb8b24'}
                                                        bgcolor={'#eee'}
                                                        active={false}
                                                        onToggle={() => openEditModal(data)}
                                                    >
                                                        <i className='fa-solid fa-pencil'></i>
                                                    </SimpleButton>
                                                    <SimpleButton
                                                        width={'32px'}
                                                        height={'32px'}
                                                        radius={'8px'}
                                                        textcolor={'#dc3545'}
                                                        bgcolor={'#eee'}
                                                        active={false}
                                                        onToggle={() => handleDeleteClick(data.id)}
                                                    >
                                                        <i className='fa-solid fa-trash-can'></i>
                                                    </SimpleButton>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {editing && (
                <EditChapterModal
                    chapter={editing}
                    onClose={closeEditModal}
                    setRefresh={setRefresh}
                />
            )}

            {confirm && (
                <ConfirmDialog
                    title={'Delete Confirmation'}
                    message={'Are you sure you want to delete this chapter?'}
                    button={'DELETE'}
                    color={'#dc3545'}
                    onConfirm={handleDelete}
                    onCancel={() => setConfirm(false)}
                />
            )}
        </div>
    )
}
