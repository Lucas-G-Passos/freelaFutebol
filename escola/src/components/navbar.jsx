import './css/navbar.css'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import PeopleIcon from '@mui/icons-material/People';
import EngineeringIcon from '@mui/icons-material/Engineering';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ApartmentIcon from '@mui/icons-material/Apartment';
import GroupsIcon from '@mui/icons-material/Groups';

export default function Navbar() {


    const navigate = useNavigate();


    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <div id='navbar'>
                <div id='top-button-cont'>
                    <NavLink to={'/dashboard'} className='navlink'>
                        <div className='navbutton'>
                            <DashboardIcon />
                            Dashboard
                        </div>
                    </NavLink>
                    <NavLink to={'/aluno'} className='navlink'>
                        <div className='navbutton'>
                            <PeopleIcon />
                            Aluno
                        </div>
                    </NavLink>
                    <NavLink to={'/funcionario'} className='navlink'>
                        <div className='navbutton'>
                            <EngineeringIcon />
                            Funcionario
                        </div>
                    </NavLink>
                    <NavLink to={'/turmas'} className='navlink'>
                        <div className='navbutton'>
                            <GroupsIcon />
                            Turmas
                        </div>
                    </NavLink>
                    <NavLink to={'/filiais'} className='navlink'>
                        <div className='navbutton'>
                            <ApartmentIcon />
                            Filiais
                        </div>
                    </NavLink>
                </div>

                <div id='bottom-button-cont'>
                    <a className='navlink' onClick={(e) => {
                        e.preventDefault();
                        localStorage.removeItem('token');
                        navigate('/');
                    }}>
                        <div className='navbutton'>
                            <LogoutIcon />
                            Logout
                        </div>
                    </a>
                </div>
            </div>
            <div style={{ flexGrow: 1, backgroundColor: 'var(--surface-a0)' }}>
                <Outlet />
            </div>
        </div>
    )
}

