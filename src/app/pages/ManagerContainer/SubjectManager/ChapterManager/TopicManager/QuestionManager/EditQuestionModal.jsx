import { useState } from 'react';
import { patchData } from '../../../../../../../mocks/CallingAPI.js';
import SimpleButton from '../../../../../../components/SimpleButton.jsx';
import { useAuth } from '../../../../../../hooks/AuthContext/AuthContext.jsx';
import '../../../EditModal.css';

export default function EditQuestionModal({ question, onClose, setRefresh }) {
    const { user } = useAuth();

    const [form, setForm] = useState({ ...question });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const Update = async (id) => {
        // const token = user?.token;
        const token = '';
        try {
            form.number = Math.abs(form.number);
            const resultUpdateQuestion = await patchData(`api/question?id=${id}`, form, token);
            console.log('resultUpdateQuestion', resultUpdateQuestion);
            onClose();
            setRefresh(p => p + 1);
        } catch (error) { } finally { }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        Update(question.id);
    };

    return (
        <div className='edit-modal'>
            <div className='modal-box'>
                <div className='title'>Edit Question</div>
                <form onSubmit={handleUpdate}>
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
                    <div className='btn-box'>
                        <SimpleButton
                            width={'80px'}
                            height={'40px'}
                            radius={'8px'}
                            textcolor={'#28a745'}
                            bgcolor={'#eee'}
                            active={false}
                            onToggle={handleUpdate}
                        >
                            <div className='text'>SAVE</div>
                        </SimpleButton>
                        <SimpleButton
                            width={'80px'}
                            height={'40px'}
                            radius={'8px'}
                            textcolor={'#888'}
                            bgcolor={'#eee'}
                            active={false}
                            onToggle={() => onClose()}
                        >
                            <div className='text'>CANCEL</div>
                        </SimpleButton>
                    </div>
                </form>
            </div>
        </div>
    )
}
