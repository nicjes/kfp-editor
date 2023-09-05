import './Header.css'

/**
 * The Header component displaying the title of the application.
 */
function Header() {
    return (
        <header className='header-global'>
            <h2 id='header-global-title'>Visual Editor for Kubeflow Pipelines</h2>
        </header>
    )
}

export default Header;
