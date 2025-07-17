import { useState } from 'react';
import { patchData, putData } from '../../../../mocks/CallingAPI.js';
import SimpleButton from '../../../components/SimpleButton.jsx';
import { useAuth } from '../../../hooks/AuthContext/AuthContext.jsx';
import '../SubjectManager/EditModal.css';

export default function EditUserModal({ userprop, onClose, setRefresh, USERs }) {
    const { user } = useAuth();

    const [form, setForm] = useState({ ...userprop });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const Update = async (id) => {
        // const token = user?.token;
        const token = '';
        try {
            // form.price = Math.abs(form.price);
            console.log('`api/user?id=${id}`');
            const resultUpdateUser = await putData(`api/user?id=${id}`, { ...form, password: '123456' }, token);
            console.log('resultUpdateUser', resultUpdateUser);
            onClose();
            setRefresh(p => p + 1);
        } catch (error) {
            console.log('Fail');
        } finally { }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        Update(userprop.id);
    };

    return (
        <div className='edit-modal'>
            <div className='modal-box'>
                <div className='title'>Edit User</div>
                <form onSubmit={handleUpdate} className='user-edit-form'>
                    <input name='name' placeholder='Name' value={form.name} onChange={handleChange} required />
                    <input name='username' placeholder='Username' value={form.username} onChange={handleChange} required />
                    <input name='password' placeholder='Password' value={form.password} onChange={handleChange} required />
                    {/* <input name='role' placeholder='Role' value={form.role} onChange={handleChange} required /> */}
                    <div className='flex'>
                        <select>
                            <option value={userprop.role}>{userprop.role}</option>
                            <option value={'Admin'}>Admin</option>
                            <option value={'Teacher'}>Teacher</option>
                            <option value={'Parent'}>Parent</option>
                            <option value={'Student'}>Student</option>
                        </select>
                        {/* <input name='curatorId' placeholder='curatorId' value={form.curatorId} onChange={handleChange} required /> */}
                        <select>
                            <option value={userprop.curatorId}>[{userprop.curatorId || 'none'}] {USERs.find(u => u.id == userprop.curatorId)?.name}</option>
                            {USERs.filter(u => u.role == 'Parent' && u.id != userprop.curatorId).map((u, i) => (
                                <option key={i} value={u.id}>[{u.id}] {u.name}</option>
                            ))}
                        </select>
                    </div>
                    <input name='email' placeholder='Email' value={form.email} onChange={handleChange} required />
                    <input name='point' placeholder='Point' value={form.point} onChange={handleChange} required />
                    <input name='joinedDate' placeholder='Joined Date' value={form.joinedDate} onChange={handleChange} required />
                    <input name='dayStreak' placeholder='Day Streak' value={form.dayStreak} onChange={handleChange} required />
                    <input name='highestDayStreak' placeholder='Highest Day Streak' value={form.highestDayStreak} onChange={handleChange} required />
                    <input name='image' placeholder='Image URL' value={form.image} onChange={handleChange} required />
                    <div className='image-container'><img src={form.image} alt='avatar' /></div>
                    <input name='lastOnline' placeholder='Last Online' value={form.lastOnline} onChange={handleChange} required />
                    {/* <input name='type' placeholder='Type' value={form.type} onChange={handleChange} required /> */}
                    <select>
                        <option value={userprop.type}>{userprop.type}</option>
                        <option value={'Regular'}>Regular</option>
                        <option value={'VIP'}>VIP</option>
                    </select>
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
