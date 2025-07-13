import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { deleteData, fetchData, postData } from '../../../../../../mocks/CallingAPI.js';
import ConfirmDialog from '../../../../../components/ConfirmDialog.jsx';
import SimpleButton from '../../../../../components/SimpleButton.jsx';
import { useAuth } from '../../../../../hooks/AuthContext/AuthContext.jsx';
import Loading from '../../../../../layouts/Loading/Loading.jsx';
import '../../ManagerStyle.css';
import EditTopicModal from './EditTopicModal.jsx';

export default function TopicManager() {
    const { user } = useAuth();
    const location = useLocation();
    const chapterId = useParams().chapter;
    const topic = location.state;
    console.log('topic', topic);

    const [TOPICs, setTOPICs] = useState([]);
    const [form, setForm] = useState({ name: '', number: '', chapterId: chapterId });
    const [editing, setEditing] = useState(null);
    const [confirm, setConfirm] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [Refresh, setRefresh] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // const token = user?.token;
        const token = '';
        const fetchDataAPI = async () => {
            try {
                setLoading(true);
                const topicData = await fetchData('api/topic', token);
                console.log('topicData', topicData);
                setTOPICs(topicData.filter(topic => topic.chapterId == chapterId));
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
            form.number = Math.abs(form.number);
            const resultAddTopic = await postData('api/topic', form, token);
            console.log('resultAddTopic', resultAddTopic);
            setForm({ name: '', number: '', chapterId: chapterId });
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
            const resultDeleteTopic = await deleteData(`api/topic/${selectedId}`, token);
            console.log('resultDeleteTopic', resultDeleteTopic);
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
        <div className='topicmanager-container manager-container'>
            <div className='title'>Topic Manager</div>
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
            </form>

            <div className='table-container'>
                <table className='table'>
                    <tbody>
                        {TOPICs.map((data, i) => (
                            <tr key={data.id}>
                                {/* <td className='fit-td'>#{i + 1}</td> */}
                                <td className='fit-td'><div className='number convex'>No.{data.number}</div></td>
                                <td className='fit-td'><div className='id convex'>ID: {data.id}</div></td>
                                <td><div className='name convex'>Topic: {data.name}</div></td>
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
                                                        to={`./${data.id}/question`}
                                                        // state={data.questions}
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
                                                        to={`./${data.id}/question`}
                                                        // state={data.questions}
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
                <EditTopicModal
                    topic={editing}
                    onClose={closeEditModal}
                    setRefresh={setRefresh}
                />
            )}

            {confirm && (
                <ConfirmDialog
                    title={'Delete Confirmation'}
                    message={'Are you sure you want to delete this topic?'}
                    button={'DELETE'}
                    color={'#dc3545'}
                    onConfirm={handleDelete}
                    onCancel={() => setConfirm(false)}
                />
            )}
        </div>
    )
}
