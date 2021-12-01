import {useRouter } from 'next/router';
import styles from '../styles/Toolbar.module.css';
export const Toolbar= () => {
    const Router=useRouter();
    return(
        <div className={styles.main}>
            <div onClick={ () => Router.push('/')}>Home</div>
            <div onClick={ ()=> window.location.href= ''}> Twitter</div>
            <div onClick={ ()=> window.location.href= ''}>gitHub</div>
        </div>
    )

};