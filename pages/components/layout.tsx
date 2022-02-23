import styles from './layout.module.css';

const Layout = ({ children }: any) => {
  return (
    <div className='styles.container'>{children}</div>
  )
}

export default Layout