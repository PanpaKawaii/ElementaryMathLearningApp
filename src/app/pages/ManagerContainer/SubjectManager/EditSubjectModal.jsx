import { useState } from 'react';
import { putData } from '../../../../mocks/CallingAPI.js';
import Button from '../../../components/Button.jsx';
import { useAuth } from '../../../hooks/AuthContext/AuthContext.jsx';
import './EditModal.css';

export default function EditSubjectModal({ subject, onClose }) {
    const { user } = useAuth();

    const [form, setForm] = useState({ ...subject });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const UpdateSubject = async (SubjectId) => {
        // const token = user?.token;
        const token = '';
        try {
            // const resultUpdateSubject = await putData(`api/user?id=${UserData.id}`, form, token);
            // console.log('resultUpdateSubject', resultUpdateSubject);
            console.log('resultUpdateSubject');

            onClose();
        } catch (error) {
            setError(error);
        } finally { }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        UpdateSubject(subject.id);
    };

    return (
        <div className='modal-backdrop'>
            <div className='modal-box'>
                <h3>Edit Subject</h3>
                <form onSubmit={handleUpdate}>
                    <input name='name' value={form.name} onChange={handleChange} required />
                    <input name='image' value={form.image} onChange={handleChange} required />
                    <input name='price' value={form.price} onChange={handleChange} required />
                    <div className='modal-actions'>
                        <Button
                            width={'100px'}
                            height={'40px'}
                            border={'6px'}
                            radius={'12px'}
                            maincolor={'edit'}
                            active={false}
                            onToggle={handleUpdate}
                        >
                            <div className='text'>SAVE</div>
                        </Button>
                        <Button
                            width={'100px'}
                            height={'40px'}
                            border={'6px'}
                            radius={'12px'}
                            maincolor={'white'}
                            active={false}
                            onToggle={() => onClose()}
                        >
                            <div className='text'>CANCEL</div>
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
