import { useState } from 'react';
import { patchData, putData } from '../../../../mocks/CallingAPI.js';
import SimpleButton from '../../../components/SimpleButton.jsx';
import { useAuth } from '../../../hooks/AuthContext/AuthContext.jsx';
import '../SubjectManager/EditModal.css';

export default function EditUserModal({ userprop, onClose, setRefresh, USERs }) {
    const { user } = useAuth();

    const [form, setForm] = useState({ ...userprop });
    const [formPassword, setFormPassword] = useState({ old: '', new: '', confirm: '' });
    const [loading, setLoading] = useState(false);
    const [ChangePasswordError, setChangePasswordError] = useState({ value: '', name: '' });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const handleChangeFormPassword = (e) => {
        setFormPassword({ ...formPassword, [e.target.name]: e.target.value });
    };

    const Update = async (id) => {
        // const token = user?.token;
        const token = '';
        try {
            setLoading(true);
            form.point = Math.abs(form.point);
            form.dayStreak = Math.abs(form.dayStreak);
            form.highestDayStreak = Math.abs(form.highestDayStreak);
            console.log('`api/user?id=${id}`');
            const resultUpdateUser = await putData(`api/user?id=${id}`, { ...form, password: '123456' }, token); // === FIX ===
            console.log('resultUpdateUser', resultUpdateUser);
            onClose();
            setRefresh(p => p + 1);
        } catch (error) {
            console.log('Fail');
        } finally {
            setLoading(false);
        }
    };

    const ChangePassword = async (id) => {
        if (!formPassword.old) {
            console.error('Invalid old password');
            setChangePasswordError({
                value: 'Invalid old password',
                name: 'Old',
            });
            return;
        }
        if (!formPassword.new) {
            console.error('Invalid new password');
            setChangePasswordError({
                value: 'Invalid new password',
                name: 'New',
            });
            return;
        }
        if (!formPassword.confirm) {
            console.error('Invalid password confirmation');
            setChangePasswordError({
                value: 'Invalid password confirmation',
                name: 'Confirm',
            });
            return;
        }
        if (formPassword.new?.length < 6) {
            console.error('Password must be at least 6 characters long');
            setChangePasswordError({
                value: 'Password must be at least 6 characters long',
                name: 'New',
            });
            return;
        }
        if (formPassword.old != userprop.password) {
            console.error('Old password is wrong');
            setChangePasswordError({
                value: 'Old password is wrong',
                name: 'Old',
            });
            return;
        }
        if (formPassword.new != formPassword.confirm) {
            console.error('Wrong password confirmation');
            setChangePasswordError({
                value: 'Wrong password confirmation',
                name: 'New or Confirm',
            });
            return;
        }

        // const token = user?.token;
        const token = '';
        try {
            setLoading(true);
            console.log('`api/user?id=${id}`');
            const resultChangePassword = await putData(`api/user?id=${id}`, { ...form, password: formPassword.new }, token); // === FIX ===
            console.log('resultChangePassword', resultChangePassword);
            // onClose();
            setRefresh(p => p + 1);
        } catch (error) {
            console.log('Fail');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!loading) Update(userprop.id);
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        setChangePasswordError({ value: '', name: '' });
        if (!loading) ChangePassword(userprop.id);
    };

    return (
        <div className='edit-modal'>
            <div className='modal-box'>
                <button className='btn close-btn' onClick={() => onClose()}><i className='fa-solid fa-xmark'></i></button>
                <form onSubmit={handleUpdate} className='user-edit-form'>
                    <div className='edit-title'>Edit User</div>
                    <div className='flex'>
                        <div className='image-container'><img src={form.image || null} alt='avatar' /></div>
                        <div className='column'>
                            <div className='input-group'>
                                <input name='name' placeholder=' ' value={form.name} onChange={handleChange} required />
                                <label htmlFor='name'>Name</label>
                            </div>
                            <div className='input-group'>
                                <input name='image' placeholder=' ' value={form.image} onChange={handleChange} required />
                                <label htmlFor='image'>Image URL</label>
                            </div>
                        </div>
                    </div>
                    {/* <div className='input-group'>
                        <input name='username' placeholder=' ' value={form.username} onChange={handleChange} required />
                        <label htmlFor='username'>Username</label>
                    </div> */}
                    <div className='flex'>
                        {user?.role == 'Admin' &&
                            <div className='input-group group-1'>
                                <select name='role' onChange={handleChange}>
                                    <option value={userprop.role}>{userprop.role}</option>
                                    <option value={'Admin'}>Admin</option>
                                    <option value={'Teacher'}>Teacher</option>
                                    <option value={'Parent'}>Parent</option>
                                    <option value={'Student'}>Student</option>
                                    <option value={'Disable'}>Disable</option>
                                </select>
                                <label htmlFor='role'>Role</label>
                            </div>
                        }
                        {user?.role == 'Student' &&
                            <div className='input-group group-2'>
                                <select name='curatorId' onChange={handleChange}>
                                    <option value={userprop.curatorId}>[{userprop.curatorId || 'none'}] {USERs.find(u => u.id == userprop.curatorId)?.name}</option>
                                    {USERs.filter(u => u.role == 'Parent' && u.id != userprop.curatorId && u.id != userprop.id).map((u, i) => (
                                        <option key={i} value={u.id}>[{u.id}] {u.name}</option>
                                    ))}
                                </select>
                                <label htmlFor='curatorId'>Curator</label>
                            </div>
                        }
                    </div>
                    <div className='input-group'>
                        <input name='email' placeholder=' ' value={form.email} onChange={handleChange} required />
                        <label htmlFor='email'>Email</label>
                    </div>
                    {user?.role == 'Admin' &&
                        <>
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
                                    <label htmlFor='dayStreak'>Streak <i className='fa-solid fa-fire'></i></label>
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
                        </>
                    }
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

                {form.password &&
                    <form onSubmit={handleChangePassword} className='change-password-form'>
                        <div className='edit-title'>Change Password</div>
                        <div className='flex'>
                            <div className='input-group'>
                                <input
                                    type='password'
                                    name='old'
                                    placeholder=' '
                                    value={formPassword.old}
                                    onChange={handleChangeFormPassword}
                                    style={{ borderColor: ChangePasswordError.name.includes('Old') && '#dc3545', }}
                                    title={ChangePasswordError.name.includes('Old') ? ChangePasswordError.value : undefined}
                                    required />
                                <label htmlFor='old' style={{ borderColor: ChangePasswordError.name.includes('Old') && '#dc3545', }}>Old PW {formPassword.old}</label>
                            </div>
                            <div className='input-group'>
                                <input
                                    type='password'
                                    name='new'
                                    placeholder=' '
                                    value={formPassword.new}
                                    onChange={handleChangeFormPassword}
                                    style={{ borderColor: ChangePasswordError.name.includes('New') && '#dc3545', }}
                                    title={ChangePasswordError.name.includes('New') ? ChangePasswordError.value : undefined}
                                    required />
                                <label htmlFor='new' style={{ borderColor: ChangePasswordError.name.includes('New') && '#dc3545', }}>New PW {formPassword.new}</label>
                            </div>
                            <div className='input-group'>
                                <input
                                    type='password'
                                    name='confirm'
                                    placeholder=' '
                                    value={formPassword.confirm}
                                    onChange={handleChangeFormPassword}
                                    style={{ borderColor: ChangePasswordError.name.includes('Confirm') && '#dc3545', }}
                                    title={ChangePasswordError.name.includes('Confirm') ? ChangePasswordError.value : undefined}
                                    required />
                                <label htmlFor='confirm' style={{ borderColor: ChangePasswordError.name.includes('Confirm') && '#dc3545', }}>Confirm {formPassword.confirm}</label>
                            </div>
                        </div>
                        <div className='btn-box'>
                            <SimpleButton
                                width={'400px'}
                                height={'40px'}
                                radius={'8px'}
                                textcolor={'#28a745'}
                                bgcolor={'#eee'}
                                active={false}
                                onToggle={handleChangePassword}
                            >
                                <div className='text'>{loading ? '...' : 'CHANGE PASSWORD'}</div>
                            </SimpleButton>
                        </div>
                    </form>
                }
            </div>
        </div>
    )
}
