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
                <button className='btn close-btn' onClick={() => onClose()}><i className='fa-solid fa-xmark'></i></button>
                <form onSubmit={handleUpdate} className='user-edit-form'>
                    <div className='image-container'><img src={form.image || null} alt='avatar' /></div>
                    <div className='input-group'>
                        <input name='image' placeholder=' ' value={form.image} onChange={handleChange} required />
                        <label htmlFor='image'>Image URL</label>
                    </div>
                    <div className='input-group'>
                        <input name='name' placeholder=' ' value={form.name} onChange={handleChange} required />
                        <label htmlFor='name'>Name</label>
                    </div>
                    {/* <div className='input-group'>
                        <input name='username' placeholder=' ' value={form.username} onChange={handleChange} required />
                        <label htmlFor='username'>Username</label>
                    </div> */}
                    {/* <div className='input-group'>
                        <input name='password' placeholder=' ' value={form.password} onChange={handleChange} required />
                        <label htmlFor='password'>Password</label>
                    </div> */}
                    <div className='flex'>
                        <div className='input-group group-1'>
                            <select name='role' onChange={handleChange}>
                                <option value={userprop.role}>{userprop.role}</option>
                                <option value={'Admin'}>Admin</option>
                                <option value={'Teacher'}>Teacher</option>
                                <option value={'Parent'}>Parent</option>
                                <option value={'Student'}>Student</option>
                                <option value={'Blocked'}>Blocked</option>
                            </select>
                            <label htmlFor='role'>Role</label>
                        </div>
                        <div className='input-group group-2'>
                            <select name='curatorId' onChange={handleChange}>
                                <option value={userprop.curatorId}>[ID{userprop.curatorId || 'none'}] {USERs.find(u => u.id == userprop.curatorId)?.name}</option>
                                {USERs.filter(u => u.role == 'Parent' && u.id != userprop.curatorId && u.id != userprop.id).map((u, i) => (
                                    <option key={i} value={u.id}>[ID{u.id}] {u.name}</option>
                                ))}
                            </select>
                            <label htmlFor='curatorId'>Curator</label>
                        </div>
                    </div>
                    <div className='input-group'>
                        <input name='email' placeholder=' ' value={form.email} onChange={handleChange} required />
                        <label htmlFor='email'>Email</label>
                    </div>
                    <div className='flex'>
                        <div className='input-group'>
                            <input name='point' placeholder=' ' value={form.point} onChange={handleChange} required />
                            <label htmlFor='point'>Point <i className='fa-solid fa-lightbulb'></i></label>
                        </div>
                        {/* <div className='input-group'>
                        <input type='date' name='joinedDate' placeholder=' ' value={form.joinedDate} onChange={handleChange} required />
                        <label htmlFor='joinedDate'>Joined Date</label>
                    </div> */}
                        <div className='input-group'>
                            <input name='dayStreak' placeholder=' ' value={form.dayStreak} onChange={handleChange} required />
                            <label htmlFor='dayStreak'>Day Streak <i className='fa-solid fa-fire'></i></label>
                        </div>
                        <div className='input-group'>
                            <input name='highestDayStreak' placeholder=' ' value={form.highestDayStreak} onChange={handleChange} required />
                            <label htmlFor='highestDayStreak'>Highest <i className='fa-solid fa-fire'></i></label>
                        </div>
                    </div>
                    {/* <div className='input-group'>
                        <input type='date' name='lastOnline' placeholder=' ' value={form.lastOnline} onChange={handleChange} required />
                        <label htmlFor='lastOnline'>Last Online</label>
                    </div> */}
                    <div className='input-group group-1'>
                        <select name='type' onChange={handleChange}>
                            <option value={userprop.type}>{userprop.type}</option>
                            <option value={'Regular'}>Regular</option>
                            <option value={'VIP'}>VIP</option>
                        </select>
                        <label htmlFor='type'>Type</label>
                    </div>
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
