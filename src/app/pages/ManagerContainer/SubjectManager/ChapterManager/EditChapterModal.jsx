import { useState } from 'react';
import { putData } from '../../../../../mocks/CallingAPI.js';
import SimpleButton from '../../../../components/SimpleButton.jsx';
import { useAuth } from '../../../../hooks/AuthContext/AuthContext.jsx';
import '../EditModal.css';

export default function EditChapterModal({ chapter, onClose, setRefresh }) {
    const { user } = useAuth();

    const [form, setForm] = useState({ ...chapter });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const Update = async (id) => {
        // const token = user?.token;
        const token = '';
        try {
            form.number = Math.abs(form.number);
            const resultUpdateChapter = await putData(`api/chapter/${id}`, form, token);
            console.log('resultUpdateChapter', resultUpdateChapter);
            onClose();
            setRefresh(p => p + 1);
        } catch (error) { } finally { }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        Update(chapter.id);
    };

    return (
        <div className='edit-modal'>
            <div className='modal-box'>
                <div className='title'>Edit Chapter</div>
                <form onSubmit={handleUpdate}>
                    <input name='name' placeholder='Name' value={form.name} onChange={handleChange} required />
                    <input name='number' placeholder='Number' value={form.number} onChange={handleChange} required />
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
