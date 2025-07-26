import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { deleteData, fetchData, postData } from '../../../../../../../mocks/CallingAPI.js';
import ConfirmDialog from '../../../../../../components/ConfirmDialog.jsx';
import SimpleButton from '../../../../../../components/SimpleButton.jsx';
import { useAuth } from '../../../../../../hooks/AuthContext/AuthContext.jsx';
import Loading from '../../../../../../layouts/Loading/Loading.jsx';
import '../../../ManagerStyle.css';
import EditQuestionModal from './EditQuestionModal.jsx';

export default function QuestionManager() {
    const { user } = useAuth();
    const location = useLocation();
    const topicId = useParams().topic;
    const question = location.state;
    console.log('question', question);

    const [QUESTIONs, setQUESTIONs] = useState([]);
    const [form, setForm] = useState({ number: '', type: 'Multiple Choice', question1: '', correctAnswer: '', answers: '', explanation: '', note: 'Regular', topicId: topicId });
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
                const topicData = await fetchData(`api/topic/${topicId}`, token);
                console.log('topicData', topicData);
                if (!GetAll) setQUESTIONs(topicData?.questions);
                else setQUESTIONs(topicData?.questions);
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
            const resultAddQuestion = await postData('api/question', form, token);
            console.log('resultAddQuestion', resultAddQuestion);
            setForm({ number: '', type: 'Multiple Choice', question1: '', correctAnswer: '', answers: '', explanation: '', note: 'Regular', topicId: topicId });
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
            const resultDeleteQuestion = await deleteData(`api/question/${selectedId}`, token);
            console.log('resultDeleteQuestion', resultDeleteQuestion);
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
        <div className='questionmanager-container manager-container'>
            <div className='title'>Question Manager</div>
            <form onSubmit={handleSubmit} className='add-form'>
                <input name='number' placeholder='Number' value={form.number} onChange={handleChange} required />
                <input name='type' placeholder='Type' value={form.type} onChange={handleChange} required disabled />
                <select name='note' onChange={handleChange}>
                    <option value={form.note}>{form.note}</option>
                    {form.note != 'Regular' && <option value={'Regular'}>Regular</option>}
                    {form.note != 'Advanced' && <option value={'Advanced'}>Advanced</option>}
                </select>
                {/* <input name='note' placeholder='Regular/Advanced' value={form.note} onChange={handleChange} required /> */}
                <input name='question1' placeholder='Question Content' value={form.question1} onChange={handleChange} required />
                <input name='answers' placeholder='Full Answers' value={form.answers} onChange={handleChange} required />
                <input name='correctAnswer' placeholder='Correct' value={form.correctAnswer} onChange={handleChange} required />
                <input name='explanation' placeholder='Explanation' value={form.explanation} onChange={handleChange} />
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
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>No.</th>
                            <th>ID</th>
                            <th>Question</th>
                            <th>Answers</th>
                            <th>Correct</th>
                            <th>Explanation</th>
                            <th>Note</th>
                            <th>Type</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {QUESTIONs.map((data, i) => (
                            <tr key={data.id}>
                                <td className='fit-td'><div className='index'>#{i + 1}</div></td>
                                <td className='fit-td'><div className='number'>{data.number}</div></td>
                                <td className='fit-td'><div className='id'>{data.id}</div></td>
                                <td className='large-td'><div className='question'>{data.question1}</div></td>
                                <td className='fit-td'><div className='answers'>{data.answers.replace(/@@/g, ', ')}</div></td>
                                <td className='fit-td'><div className='correct'>{data.correctAnswer} <i className='fa-solid fa-check'></i></div></td>
                                <td><div className='explanation'>{data.explanation || <i className='no-data'>No data</i>}</div></td>
                                <td className='fit-td'><div className={`note ${data.note == 'Advanced' ? 'gold' : ''}`}>{data.note}</div></td>
                                <td><div className='type'>{data.type}</div></td>
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
                                                    {/* <Link
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
                                                    </Link> */}
                                                    {/* <Link
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
                                                    </Link> */}
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
                <EditQuestionModal
                    question={editing}
                    onClose={closeEditModal}
                    setRefresh={setRefresh}
                />
            )}

            {confirm && (
                <ConfirmDialog
                    title={'Delete Confirmation'}
                    message={'Are you sure you want to delete this question?'}
                    button={'DELETE'}
                    color={'#dc3545'}
                    onConfirm={handleDelete}
                    onCancel={() => setConfirm(false)}
                />
            )}
        </div>
    )
}
