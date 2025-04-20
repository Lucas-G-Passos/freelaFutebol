import './css/dashboard.css';
import { useState, useEffect, useRef } from "react";


export default function Dashboard() {
    const boxRef = useRef(null);
    const [width, setWidth] = useState(0);
    const [stats, setStats] = useState({
        inad: 0,
        total: 0,
        percent: 0,
    });

    //store widht in a state to update the inad Bar
    useEffect(() => {
        const logAndSetWidth = () => {
            if (boxRef.current) {
                const w = boxRef.current.getBoundingClientRect().width;
                console.log('Element width:', w);
                setWidth(w);
            }
        };

        // Initial check
        logAndSetWidth();

        // Update on window resize
        window.addEventListener('resize', logAndSetWidth);

        // Cleanup
        return () => window.removeEventListener('resize', logAndSetWidth);
    }, []);



    //Fetch stats
    useEffect(() => {
        async function fetchData() {
            try {
                const [inadRes, totalRes] = await Promise.all([
                    fetch('http://localhost:5000/api/aluno/inadimplente/total'),
                    fetch('http://localhost:5000/api/aluno/total')
                ]);

                const inadData = await inadRes.json();
                const totalData = await totalRes.json();

                setStats({
                    inad: inadData.total,
                    total: totalData.total,
                    percent: Math.round(Number((inadData.total / totalData.total) * 100))
                });

                console.log(stats.inad);
                console.log(stats.total);
                console.log(stats.percent)

            } catch (error) {
                console.error('Erro ao buscar dados:', error);
                setStats({ percent: 0, inad: 0, total: 0 });
            }
        }

        fetchData();
    }, []);


    return (
        <div id="rootDashboard">
            <div id="title">
                <img src='/escudo.svg'></img>
                <h1>Novo Horizontino</h1>
            </div>

            <div id="widget">
                <div id='barTotal' ref={boxRef}></div>
                <div id='barInad' style={{ '--percent': `${stats.percent}%` }}></div>

                <div className="legend">
                    <div><span className='legendaSpanInad'>●</span>{stats.inad} inadimplentes ({stats.percent})%</div>
                    <div><span className='legendaSpanTotal'>●</span>{stats.total} alunos no total</div>
                </div>
            </div>
        </div>
    );
}
